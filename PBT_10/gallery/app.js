// --- 1. CONFIG & CẤU HÌNH TRẠNG THÁI (STATE) ---
let currentPage = 1;
const limit = 20;
let isLoading = false;

const galleryGrid = document.getElementById("galleryGrid");
const loadTrigger = document.getElementById("load-trigger");

// --- 2. LAZY LOADING IMAGES: Kích hoạt tải ảnh khi lọt vào Viewport ---
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Nếu tấm ảnh lọt vào tầm nhìn của thiết bị
        if (entry.isIntersecting) {
            const img = entry.target;
            
            // Đổ URL thật từ 'data-src' sang thuộc tính 'src' để kích hoạt tải ảnh
            img.src = img.dataset.src;
            
            // Khi trình duyệt tải xong ảnh hoàn toàn, kích hoạt hiệu ứng mờ biến sang rõ (fade-in)
            img.onload = () => {
                img.classList.add("loaded");
            };
            
            // Sau khi đã xử lý xong, ngừng giám sát tấm ảnh này để tối ưu tài nguyên máy
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: "0px 0px 100px 0px" // Tự động load trước khi ảnh hiển thị 100px để nâng cao trải nghiệm khách hàng
});

// --- 3. ĐỔ DỮ LIỆU VÀO GIAO DIỆN (RENDER CARD) ---
function renderPhotos(photos) {
    photos.forEach(photo => {
        const card = document.createElement("div");
        card.className = "photo-card";
        
        // Tối ưu hóa kích thước: Grid chỉ cần ảnh nhỏ (400x400), Lightbox cần ảnh nét hơn (1200x900)
        const thumbnailUrl = `https://picsum.photos/id/${photo.id}/400/400`;
        const largeUrl = `https://picsum.photos/id/${photo.id}/1200/900`;

        card.innerHTML = `
            <div class="image-wrapper">
                <img data-src="${thumbnailUrl}" alt="Photo by ${photo.author}" class="lazy-img">
            </div>
            <div class="photo-info">
                <p class="author">👤 ${photo.author}</p>
            </div>
        `;

        // Đăng ký tấm ảnh này vào bộ theo dõi Lazy Loading
        const targetImg = card.querySelector(".lazy-img");
        imageObserver.observe(targetImg);

        // Gắn sự kiện Click mở hộp đèn Lightbox hiển thị sắc nét
        card.addEventListener("click", () => openLightbox(largeUrl, photo.author));

        galleryGrid.appendChild(card);
    });
}

// --- 4. CORE FUNCTION: GỌI API LẤY DỮ LIỆU ---
async function loadMorePhotos() {
    if (isLoading) return; // Nếu đang trong tiến trình gọi API trước đó, chặn không cho spam gửi trùng lặp
    isLoading = true;
    loadTrigger.classList.remove("hidden"); // Hiện Spinner "Đang tải thêm..."

    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=${limit}`);
        
        if (!response.ok) {
            throw new Error(`HTTP Error status: ${response.status}`);
        }

        const photos = await response.json();

        if (photos.length > 0) {
            renderPhotos(photos);
            currentPage++; // Tăng trang số lên chuẩn bị cho đợt cuộn tiếp theo
        } else {
            // Hết ảnh để tải từ API
            loadTrigger.innerHTML = "<span>Thư viện đã hiển thị toàn bộ ảnh.</span>";
            infiniteObserver.unobserve(loadTrigger); // Tắt vĩnh viễn tính năng infinite scroll
        }
    } catch (error) {
        console.error("Lỗi tải ảnh:", error);
        loadTrigger.innerHTML = `<span style="color:#ef4444;">⚠️ Lỗi kết nối mạng, vui lòng kiểm tra lại.</span>`;
    } finally {
        isLoading = false;
    }
}

// --- 5. INFINITE SCROLL: Tự động bắt đáy trang web kích hoạt hàm ---
const infiniteObserver = new IntersectionObserver((entries) => {
    // Nếu dòng chữ "Đang tải thêm" chạm đáy màn hình hiển thị
    if (entries[0].isIntersecting) {
        loadMorePhotos();
    }
}, {
    rootMargin: "200px" // Bắt đầu load trước khi user cuộn hẳn xuống kịch đáy 200px giúp cuộn mượt không đứt quãng
});

// Kích hoạt quan sát vùng kích hoạt
infiniteObserver.observe(loadTrigger);

// --- 6. LIGHTBOX CONTROLLER (Quản lý hộp phóng to ảnh) ---
const lightboxModal = document.getElementById("lightboxModal");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxAuthor = document.getElementById("lightboxAuthor");
const closeLightboxBtn = document.getElementById("closeLightbox");

function openLightbox(url, author) {
    lightboxImg.src = url;
    lightboxAuthor.textContent = `Tác giả: ${author}`;
    lightboxModal.removeAttribute("aria-hidden");
    document.body.style.overflow = "hidden"; // Chặn thanh cuộn của trang chính khi đang xem ảnh phóng to
}

function closeLightbox() {
    lightboxModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ""; // Khôi phục lại thanh cuộn trang chính
    setTimeout(() => { lightboxImg.src = ""; }, 250); // Xóa link ảnh cũ khi đóng modal tránh nháy ảnh cũ lần sau
}

// Gắn sự kiện đóng hộp đèn
closeLightboxBtn.addEventListener("click", closeLightbox);
lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal) closeLightbox();
});

// Hỗ trợ bấm phím ESC trên bàn phím để đóng Lightbox nhanh chóng tăng tiện ích
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightboxModal.hasAttribute("aria-hidden")) {
        closeLightbox();
    }
});