function createCart() {
    // === PRIVATE DATA ===
    // Biến này bị "nhốt" trong closure, không thể truy cập từ bên ngoài
    let items = [];
    let activeDiscount = null;

    // === PUBLIC METHODS ===
    // Trả về một object chứa các hàm để tương tác với dữ liệu private
    return {
        // 1. Thêm sản phẩm
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                // Dùng spread operator để copy data, tránh tham chiếu trực tiếp object gốc
                items.push({ ...product, quantity });
            }
        },

        // 2. Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        // 3. Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }
            const item = items.find(i => i.id === productId);
            if (item) {
                item.quantity = newQuantity;
            }
        },

        // 4. Tính tổng tiền
        getTotal() {
            const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            // Áp dụng logic giảm giá
            if (activeDiscount === "SALE10") return subtotal * 0.9;
            if (activeDiscount === "SALE20") return subtotal * 0.8;
            if (activeDiscount === "FREESHIP") return Math.max(0, subtotal - 30000); // Tránh âm tiền
            
            return subtotal;
        },

        // 5. Áp dụng mã giảm giá
        applyDiscount(code) {
            const validCodes = ["SALE10", "SALE20", "FREESHIP"];
            if (validCodes.includes(code)) {
                activeDiscount = code;
            } else {
                console.log(`Mã giảm giá "${code}" không hợp lệ!`);
            }
        },

        // 6. In giỏ hàng dạng bảng ASCII
        printCart() {
            console.log("┌─────────────────────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm          │ SL │ Đơn giá      │ Tổng            │");
            console.log("├─────────────────────────────────────────────────────────────┤");
            
            if (items.length === 0) {
                console.log("│ Giỏ hàng trống!                                             │");
            } else {
                items.forEach((item, index) => {
                    const rowTotal = item.price * item.quantity;
                    
                    // Format độ dài chuỗi để căn lề cho đẹp (padding)
                    const stt = String(index + 1);
                    const name = item.name.padEnd(15, ' ');
                    const qty = String(item.quantity).padStart(2, ' ');
                    const price = item.price.toLocaleString('vi-VN').padStart(12, ' ');
                    const totalStr = rowTotal.toLocaleString('vi-VN').padStart(15, ' ');
                    
                    console.log(`│ ${stt} │ ${name} │ ${qty} │ ${price} │ ${totalStr} │`);
                });
            }
            
            console.log("├─────────────────────────────────────────────────────────────┤");
            
            const finalTotal = this.getTotal();
            const discountText = activeDiscount ? `(Mã: ${activeDiscount})` : '';
            const finalStr = finalTotal.toLocaleString('vi-VN') + "đ";
            
            // Căn lề cho dòng tổng kết
            const label = `│ Tổng cộng: ${discountText}`.padEnd(46, ' ');
            console.log(`${label} ${finalStr.padStart(13, ' ')} │`);
            console.log("└─────────────────────────────────────────────────────────────┘");
        },

        // 7. Lấy tổng số sản phẩm (tổng quantity)
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },

        // 8. Xóa toàn bộ giỏ
        clearCart() {
            items = [];
            activeDiscount = null;
        }
    };
}

// ==========================================
// CHẠY TEST
// ==========================================
const cart = createCart();

// Thêm SP
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên 2

// In ra lần 1
cart.printCart();

// Áp mã và in ra lần 2
cart.applyDiscount("SALE10");
cart.printCart();

// Test count và remove
console.log("Số SP trong giỏ:", cart.getItemCount()); // → 4
cart.removeItem(3);
console.log("Sau khi xóa AirPods, Số SP:", cart.getItemCount()); // → 2