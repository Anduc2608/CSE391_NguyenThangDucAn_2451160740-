// --- 1. MẢNG DỮ LIỆU ---
const galleryData = [
    { id: 1, title: "Bàn phím cơ Custom", src: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500" },
    { id: 2, title: "Chuột Gaming không dây", src: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500" },
    { id: 3, title: "Màn hình OLED UltraWide", src: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500" },
    { id: 4, title: "Tai nghe chống ồn ANC", src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
    { id: 5, title: "Đèn LED để bàn thông minh", src: "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?w=500" },
    { id: 6, title: "Loa Bluetooth công suất lớn", src: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500" },
    { id: 7, title: "Giá đỡ Laptop hợp kim nhôm", src: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500" },
    { id: 8, title: "Lót chuột sợi Cordura cao cấp", src: "https://images.unsplash.com/photo-1632292224971-0d45778bd364?w=500" },
    { id: 9, title: "Microphone thu âm Podcast", src: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500" }
];

// --- 2. QUẢN LÝ TRẠNG THÁI (STATE) ---
let currentImgIndex = 0;
let slideshowInterval = null;
let lastFocusedElement = null; // Quá quan trọng để phục hồi Focus khi đóng Modal
let selectedCommandIndex = 0;
let filteredCommands = [];

// --- 3. ĐỊNH VỊ PHẦN TỬ DOM ---
const galleryGrid = document.getElementById("galleryGrid");
const slideshowBtn = document.getElementById("slideshowBtn");
const statusIndicator = document.getElementById("statusIndicator");

// Lightbox Elements
const lightboxModal = document.getElementById("lightboxModal");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightboxBtn = document.getElementById("closeLightboxBtn");
const prevImgBtn = document.getElementById("prevImgBtn");
const nextImgBtn = document.getElementById("nextImgBtn");

// Command Palette Elements
const commandPalette = document.getElementById("commandPalette");
const openPaletteBtn = document.getElementById("openPaletteBtn");
const paletteInput = document.getElementById("paletteInput");
const commandList = document.getElementById("commandList");

// --- 4. KHỞI TẠO RENDER DANH SÁCH ẢNH BAN ĐẦU ---
function initGallery() {
    galleryGrid.textContent = "";
    galleryData.forEach((img, index) => {
        const item = document.createElement("button");
        item.className = "gallery-item";
        item.setAttribute("aria-label", `Xem ảnh số ${index + 1}: ${img.title}`);
        item.dataset.index = index;

        const image = document.createElement("img");
        image.src = img.src;
        image.alt = img.title;

        const caption = document.createElement("p");
        caption.textContent = `${index + 1}. ${img.title}`;

        item.appendChild(image);
        item.appendChild(caption);
        galleryGrid.appendChild(item);
    });
}

// --- 5. LOGIC ĐIỀU KHIỂN TRÌNH XEM LIGHTBOX MODAL ---
function openLightbox(index) {
    lastFocusedElement = document.activeElement; // Lưu vết phần tử đang focus hiện tại
    currentImgIndex = parseInt(index);
    updateLightboxContent();
    
    lightboxModal.removeAttribute("aria-hidden");
    closeLightboxBtn.focus(); // DI CHUYỂN FOCUS VÀO TRONG MODAL ĐỂ TIẾP CẬN TRỰC QUAN
}

function closeLightbox() {
    if (lightboxModal.getAttribute("aria-hidden") === "true") return;
    lightboxModal.setAttribute("aria-hidden", "true");
    if (lastFocusedElement) lastFocusedElement.focus(); // KHÔI PHỤC FOCUS BAN ĐẦU
}

function updateLightboxContent() {
    const data = galleryData[currentImgIndex];
    lightboxImg.src = data.src;
    lightboxImg.alt = data.alt || data.title;
    lightboxCaption.textContent = `Ảnh ${currentImgIndex + 1}/${galleryData.length}: ${data.title}`;
}

function navigateLightbox(direction) {
    if (direction === "next") {
        currentImgIndex = (currentImgIndex + 1) % galleryData.length;
    } else {
        currentImgIndex = (currentImgIndex - 1 + galleryData.length) % galleryData.length;
    }
    updateLightboxContent();
}

// --- 6. LOGIC SLIDESHOW TỰ ĐỘNG ---
function toggleSlideshow() {
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        slideshowBtn.innerHTML = "▶️ Play Slideshow <kbd>Space</kbd>";
        statusIndicator.textContent = "Slideshow đang dừng";
    } else {
        statusIndicator.textContent = "Slideshow bắt đầu chạy tự động...";
        slideshowBtn.innerHTML = "⏸️ Pause Slideshow <kbd>Space</kbd>";
        // Tự động chuyển hình sau 2.5 giây
        slideshowInterval = setInterval(() => {
            if (lightboxModal.getAttribute("aria-hidden") === "true") {
                openLightbox((currentImgIndex + 1) % galleryData.length);
            } else {
                navigateLightbox("next");
            }
        }, 2500);
    }
}

// --- 7. LOGIC COMMAND PALETTE ---
const allCommands = [
    { name: "Toggle Dark Mode (Bật/Tắt chế độ tối)", shortcut: "D", action: () => document.body.classList.toggle("dark-theme") },
    { name: "Play/Pause Slideshow (Chạy trình chiếu)", shortcut: "Space", action: () => toggleSlideshow() },
    { name: "Close All Modals (Đóng toàn bộ cửa sổ)", shortcut: "Esc", action: () => { closeLightbox(); closePalette(); } },
    ...galleryData.map((img, i) => ({
        name: `Mở ảnh số ${i + 1}: ${img.title}`,
        shortcut: `${i + 1}`,
        action: () => { closePalette(); openLightbox(i); }
    }))
];

function openPalette() {
    lastFocusedElement = document.activeElement;
    commandPalette.removeAttribute("aria-hidden");
    paletteInput.value = "";
    filterCommands("");
    paletteInput.focus(); // Di chuyển focus trực tiếp vào ô Input tìm kiếm
}

function closePalette() {
    if (commandPalette.getAttribute("aria-hidden") === "true") return;
    commandPalette.setAttribute("aria-hidden", "true");
    if (lastFocusedElement) lastFocusedElement.focus();
}

function filterCommands(query) {
    filteredCommands = allCommands.filter(cmd => 
        cmd.name.toLowerCase().includes(query.toLowerCase())
    );
    selectedCommandIndex = 0;
    renderCommands();
}

function renderCommands() {
    commandList.textContent = "";
    if (filteredCommands.length === 0) {
        const noResult = document.createElement("li");
        noResult.className = "command-item";
        noResult.textContent = "Không tìm thấy lệnh nào phù hợp";
        commandList.appendChild(noResult);
        return;
    }

    filteredCommands.forEach((cmd, idx) => {
        const li = document.createElement("li");
        li.className = "command-item";
        if (idx === selectedCommandIndex) li.classList.add("selected");
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", idx === selectedCommandIndex ? "true" : "false");
        li.dataset.index = idx;

        const nameSpan = document.createElement("span");
        nameSpan.textContent = cmd.name;

        const kbdHint = document.createElement("kbd");
        kbdHint.textContent = cmd.shortcut;

        li.appendChild(nameSpan);
        li.appendChild(kbdHint);
        commandList.appendChild(li);
    });
}

function executeSelectedCommand() {
    if (filteredCommands[selectedCommandIndex]) {
        filteredCommands[selectedCommandIndex].action();
    }
}

// --- 8. ĐĂNG KÝ HỆ THỐNG SỰ KIỆN PHÍM BẤM TOÀN CỤC (GLOBAL KEYBOARD LISTENER) ---
window.addEventListener("keydown", (e) => {
    const isPaletteOpen = !commandPalette.hasAttribute("aria-hidden");
    const isLightboxOpen = !lightboxModal.hasAttribute("aria-hidden");

    // LỆNH TOÀN CỤC: Ctrl + K để mở Command Palette
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); // Ngăn trình duyệt kích hoạt thanh tìm kiếm mặc định
        if (isPaletteOpen) closePalette(); else openPalette();
        return;
    }

    // LỆNH TOÀN CỤC: Phím Escape để đóng nhanh bất kỳ cửa sổ nào
    if (e.key === "Escape") {
        closePalette();
        closeLightbox();
        return;
    }

    // A. XỬ LÝ KHI BẢNG LỆNH ĐANG MỞ
    if (isPaletteOpen) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            selectedCommandIndex = (selectedCommandIndex + 1) % filteredCommands.length;
            renderCommands();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            selectedCommandIndex = (selectedCommandIndex - 1 + filteredCommands.length) % filteredCommands.length;
            renderCommands();
        } else if (e.key === "Enter") {
            e.preventDefault();
            executeSelectedCommand();
        }
        return; // Chặn các phím bên dưới chạy trùng lập
    }

    // B. XỬ LÝ KHI TRÌNH LIGHTBOX ĐANG MỞ
    if (isLightboxOpen) {
        if (e.key === "ArrowRight") {
            navigateLightbox("next");
        } else if (e.key === "ArrowLeft") {
            navigateLightbox("prev");
        }
    }

    // C. XỬ LÝ KHI ĐANG Ở MÀN HÌNH CHÍNH (HOẶC ĐANG TRONG TRÌNH LIGHTBOX)
    // Phím Space để Play/Pause Slideshow
    if (e.key === " " || e.key === "Spacebar") {
        // Nếu người dùng không phải đang gõ text vào đâu đó
        if (document.activeElement.tagName !== "INPUT") {
            e.preventDefault(); // Ngăn chặn cuộn trang web bừa bãi xuống dưới
            toggleSlideshow();
        }
    }

    // Phím số từ 1 đến 9 để nhảy trực tiếp tới ảnh tương ứng
    if (e.key >= "1" && e.key <= "9") {
        if (document.activeElement.tagName !== "INPUT") {
            const index = parseInt(e.key) - 1;
            if (index < galleryData.length) {
                openLightbox(index);
            }
        }
    }
});

// --- 9. ĐĂNG KÝ CÁC EVENT CHUỘT / CLICK THƯỜNG ---
galleryGrid.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (item) openLightbox(item.dataset.index);
});

paletteInput.addEventListener("input", (e) => filterCommands(e.target.value));

commandList.addEventListener("click", (e) => {
    const item = e.target.closest(".command-item");
    if (item && item.dataset.index) {
        selectedCommandIndex = parseInt(item.dataset.index);
        executeSelectedCommand();
    }
});

slideshowBtn.addEventListener("click", toggleSlideshow);
openPaletteBtn.addEventListener("click", openPalette);
closeLightboxBtn.addEventListener("click", closeLightbox);
prevImgBtn.addEventListener("click", () => navigateLightbox("prev"));
nextImgBtn.addEventListener("click", () => navigateLightbox("next"));

// Click bên ngoài vùng Modal Content thì tự đóng cửa sổ
window.addEventListener("click", (e) => {
    if (e.target === lightboxModal) closeLightbox();
    if (e.target === commandPalette) closePalette();
});

// Khởi chạy ứng dụng lần đầu
initGallery();