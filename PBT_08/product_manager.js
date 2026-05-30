const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", stock: 15, rating: 4.5 },
    { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", stock: 8, rating: 4.8 },
    { id: 3, name: "AirPods Pro", price: 6990000, category: "accessory", stock: 50, rating: 4.3 },
    { id: 4, name: "iPad Air", price: 16990000, category: "tablet", stock: 0, rating: 4.6 },
    { id: 5, name: "Samsung S24", price: 22990000, category: "phone", stock: 20, rating: 4.4 },
    { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", stock: 5, rating: 4.7 },
    { id: 7, name: "Galaxy Buds", price: 3490000, category: "accessory", stock: 100, rating: 4.1 },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", stock: 25, rating: 4.2 },
    { id: 9, name: "Pixel 9", price: 19990000, category: "phone", stock: 12, rating: 4.6 },
    { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop", stock: 3, rating: 4.5 }
];

// 1. Lọc sản phẩm còn hàng (stock > 0)
function getInStock(products) {
    return products.filter(p => p.stock > 0);
}

// 2. Lọc theo category VÀ khoảng giá
function filterProducts(products, category, minPrice, maxPrice) {
    return products.filter(p => 
        p.category === category && 
        p.price >= minPrice && 
        p.price <= maxPrice
    );
}

// 3. Sắp xếp theo giá (tăng/giảm)
// Mẹo: Dùng spread [...products] để clone mảng, tránh làm thay đổi (mutate) mảng gốc
function sortByPrice(products, order = "asc") {
    return [...products].sort((a, b) => 
        order === "desc" ? b.price - a.price : a.price - b.price
    );
}

// 4. Tìm sản phẩm rẻ nhất mỗi category
// Dùng reduce để gom nhóm (grouping). Khởi tạo bằng object rỗng {}.
function cheapestByCategory(products) {
    return products.reduce((acc, curr) => {
        const cat = curr.category;
        // Nếu category này chưa có trong object kết quả, HOẶC giá SP hiện tại rẻ hơn SP đang lưu
        if (!acc[cat] || curr.price < acc[cat].price) {
            acc[cat] = curr;
        }
        return acc;
    }, {});
}

// 5. Tính tổng giá trị kho (price × stock cho mỗi SP)
function totalInventoryValue(products) {
    return products.reduce((total, p) => total + (p.price * p.stock), 0);
}

// 6. Tạo mảng chỉ chứa { name, formattedPrice }
// Dùng destructuring { name, price } để code gọn hơn.
function formatProductList(products) {
    return products.map(({ name, price }) => ({
        name,
        formattedPrice: price.toLocaleString('vi-VN') + "đ"
    }));
}

// 7. Tính rating trung bình toàn bộ
function averageRating(products) {
    if (products.length === 0) return 0; // Đề phòng mảng rỗng chia cho 0 ra NaN
    const totalRating = products.reduce((sum, p) => sum + p.rating, 0);
    return totalRating / products.length;
}

// 8. Tìm sản phẩm theo keyword (tìm trong name, case-insensitive)
function searchProducts(products, keyword) {
    const lowerKeyword = keyword.toLowerCase();
    return products.filter(p => p.name.toLowerCase().includes(lowerKeyword));
}

// ==========================================
// CHẠY TEST
// ==========================================
console.log("=== IN-STOCK PRODUCTS ===");
console.log(getInStock(products));

console.log("\n=== PHONES 15-25 TRIỆU ===");
console.log(filterProducts(products, "phone", 15000000, 25000000));

console.log("\n=== CHEAPEST BY CATEGORY ===");
console.log(cheapestByCategory(products));

console.log("\n=== TOTAL INVENTORY VALUE ===");
console.log(totalInventoryValue(products).toLocaleString('vi-VN') + "đ");

console.log("\n=== TÌM KIẾM 'PRO' ===");
console.log(searchProducts(products, "pro"));