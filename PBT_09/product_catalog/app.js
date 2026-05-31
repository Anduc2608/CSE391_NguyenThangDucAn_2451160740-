// --- 1. MẢNG DỮ LIỆU SẢN PHẨM (12 Sản phẩm - 4 Categories) ---
const products = [
    { id: 1, name: "iPhone 16 Pro", price: 28990000, category: "phone", image: "https://placehold.co/200?text=iPhone+16", rating: 4.8, inStock: true },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 29990000, category: "phone", image: "https://placehold.co/200?text=Galaxy+S24", rating: 4.7, inStock: true },
    { id: 3, name: "Google Pixel 9 Pro", price: 24500000, category: "phone", image: "https://placehold.co/200?text=Pixel+9", rating: 4.6, inStock: false },
    { id: 4, name: "MacBook Air M3", price: 27490000, category: "laptop", image: "https://placehold.co/200?text=MacBook+Air", rating: 4.9, inStock: true },
    { id: 5, name: "Dell XPS 13 OLED", price: 35990000, category: "laptop", image: "https://placehold.co/200?text=Dell+XPS", rating: 4.5, inStock: true },
    { id: 6, name: "ThinkPad X1 Carbon Gen 12", price: 42000000, category: "laptop", image: "https://placehold.co/200?text=ThinkPad+X1", rating: 4.4, inStock: true },
    { id: 7, name: "Sony WH-1000XM5", price: 6890000, category: "audio", image: "https://placehold.co/200?text=Sony+XM5", rating: 4.7, inStock: true },
    { id: 8, name: "AirPods Pro Gen 2", price: 5690000, category: "audio", image: "https://placehold.co/200?text=AirPods+Pro", rating: 4.6, inStock: true },
    { id: 9, name: "Marshall Acton III", price: 7490000, category: "audio", image: "https://placehold.co/200?text=Marshall+Acton", rating: 4.8, inStock: false },
    { id: 10, name: "Apple Watch Series 10", price: 10990000, category: "accessory", image: "https://placehold.co/200?text=Apple+Watch", rating: 4.5, inStock: true },
    { id: 11, name: "Anker Prime Power Bank", price: 2400000, category: "accessory", image: "https://placehold.co/200?text=Anker+Bank", rating: 4.3, inStock: true },
    { id: 12, name: "Keychron K2 V2 Mechanical", price: 1850000, category: "accessory", image: "https://placehold.co/200?text=Keychron+K2", rating: 4.6, inStock: true }
];

// --- 2. QUẢN LÝ TRẠNG THÁI ỨNG DỤNG (STATE) ---
let state = {
    searchQuery: "",
    selectedCategory: "all",
    sortOption: "default",
    cartCount: 0
};

// --- 3. ĐỊNH VỊ CÁC THÀNH PHẦN DOM ---
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilterContainer = document.getElementById("categoryFilterContainer");
const sortSelect = document.getElementById("sortSelect");
const darkModeToggle = document.getElementById("darkModeToggle");
const cartBadge = document.getElementById("cartBadge");

// --- 4. CÁC HÀM XỬ LÝ NGHIỆP VỤ ĐỘC LẬP (CORE FUNCTIONS) ---

// A. Hàm Render Danh sách sản phẩm
function renderProducts(productsList) {
    productGrid.textContent = ""; // Xóa dữ liệu cũ một cách an toàn

    if (productsList.length === 0) {
        const noResult = document.createElement("p");
        noResult.textContent = "Không tìm thấy sản phẩm phù hợp.";
        noResult.style.gridColumn = "1 / -1";
        noResult.style.textAlign = "center";
        productGrid.appendChild(noResult);
        return;
    }

    productsList.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.dataset.id = product.id;

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;

        const info = document.createElement("div");
        info.className = "product-info";

        const name = document.createElement("h3");
        name.className = "product-name";
        name.textContent = product.name;

        const meta = document.createElement("div");
        meta.className = "product-meta";
        
        const rating = document.createElement("span");
        rating.className = "rating";
        rating.textContent = `⭐ ${product.rating}`;
        
        const stock = document.createElement("span");
        stock.textContent = product.inStock ? "Còn hàng" : "Hết hàng";
        stock.style.color = product.inStock ? "#10b981" : "#ef4444";

        meta.appendChild(rating);
        meta.appendChild(stock);

        const price = document.createElement("div");
        price.className = "product-price";
        price.textContent = product.price.toLocaleString("vi-VN") + " đ";

        const addBtn = document.createElement("button");
        addBtn.className = "add-btn";
        addBtn.textContent = product.inStock ? "Thêm vào giỏ" : "Hết hàng";
        addBtn.disabled = !product.inStock;

        // Xử lý nút thêm vào giỏ hàng riêng biệt (tránh kích hoạt mở modal)
        addBtn.addEventListener("click", (e) => {
            e.stopPropagation(); 
            state.cartCount++;
            cartBadge.textContent = state.cartCount;
        });

        // Đẩy các thành phần nhỏ vào card
        info.appendChild(name);
        info.appendChild(meta);
        info.appendChild(price);
        info.appendChild(addBtn);

        card.appendChild(img);
        card.appendChild(info);

        productGrid.appendChild(card);
    });
}

// B. Hàm Lọc Theo Tìm Kiếm Realtime
function searchProducts(list, query) {
    if (!query) return list;
    return list.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
}

// C. Hàm Lọc Theo Danh Mục (Category)
function filterByCategory(list, category) {
    if (category === "all") return list;
    return list.filter(p => p.category === category);
}

// D. Hàm Sắp Xếp Dữ Liệu (Sort)
function sortProducts(list, criteria) {
    const sortedList = [...list]; // Clone mảng gốc tránh đột biến dữ liệu ngẫu nhiên
    if (criteria === "price-asc") return sortedList.sort((a, b) => a.price - b.price);
    if (criteria === "price-desc") return sortedList.sort((a, b) => b.price - a.price);
    if (criteria === "name-asc") return sortedList.sort((a, b) => a.name.localeCompare(b.name));
    if (criteria === "rating-desc") return sortedList.sort((a, b) => b.rating - a.rating);
    return sortedList;
}

// --- 5. HÀM PHỐI HỢP ĐIỀU PHỐI (COORDINATOR) ---
function updateCatalog() {
    let result = products;
    result = filterByCategory(result, state.selectedCategory);
    result = searchProducts(result, state.searchQuery);
    result = sortProducts(result, state.sortOption);
    renderProducts(result);
}

// --- 6. KHỞI TẠO BỘ LỌC CATEGORY DYNAMIC ---
function initCategoryButtons() {
    // Trích xuất các category độc nhất từ mảng sản phẩm gốc
    const categories = ["all", ...new Set(products.map(p => p.category))];
    
    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = "cat-btn";
        if (cat === "all") btn.classList.add("active");
        btn.textContent = cat === "all" ? "Tất cả" : cat;
        btn.dataset.category = cat;
        
        categoryFilterContainer.appendChild(btn);
    });
}

// --- 7. TẠO MODAL CHI TIẾT SẢN PHẨM HOÀN TOÀN BẰNG JAVASCRIPT ---
function openProductModal(product) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const content = document.createElement("div");
    content.className = "modal-content";

    const closeBtn = document.createElement("button");
    closeBtn.className = "close-modal";
    closeBtn.textContent = "✕";

    const title = document.createElement("h2");
    title.style.marginBottom = "15px";
    title.textContent = product.name;

    const img = document.createElement("img");
    img.src = product.image;
    img.style.width = "100%";
    img.style.maxHeight = "250px";
    img.style.objectFit = "contain";
    img.style.marginBottom = "20px";

    const desc = document.createElement("p");
    desc.style.color = "var(--text-muted)";
    desc.style.lineHeight = "1.6";
    desc.textContent = `Sản phẩm thuộc danh mục ${product.category.toUpperCase()}, đạt mức đánh giá chất lượng ${product.rating}/5 sao từ khách hàng. Hiện sản phẩm đang được định giá chính hãng tại phân khúc cao cấp.`;

    content.appendChild(closeBtn);
    content.appendChild(title);
    content.appendChild(img);
    content.appendChild(desc);
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    // Sự kiện đóng modal
    closeBtn.addEventListener("click", () => overlay.remove());
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });
}

// --- 8. ĐĂNG KÝ CÁC SỰ KIỆN ĐIỀU KHIỂN (EVENT LISTENERS) ---

// Sự kiện Tìm kiếm Realtime (Input event)
searchInput.addEventListener("input", (e) => {
    state.searchQuery = e.target.value.trim();
    updateCatalog();
});

// Sự kiện Lọc theo Category (Áp dụng Event Delegation lên Container của Group Buttons)
categoryFilterContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("cat-btn")) {
        document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        
        state.selectedCategory = e.target.dataset.category;
        updateCatalog();
    }
});

// Sự kiện Sắp xếp hình học (Sort dropdown)
sortSelect.addEventListener("change", (e) => {
    state.sortOption = e.target.value;
    updateCatalog();
});

// Sự kiện Click vào Card mở Modal (Áp dụng Event Delegation lên cha #productGrid)
productGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (card) {
        const productId = Number(card.dataset.id);
        const targetProduct = products.find(p => p.id === productId);
        if (targetProduct) openProductModal(targetProduct);
    }
});

// Sự kiện Toggle Dark Mode đơn giản thông qua class <body>
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    darkModeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// --- 9. RUN APPLICATION ---
initCategoryButtons();
updateCatalog();