// Bài 2.2 — Thử thách
// 1. Hiển thị icon 🔴/🟢 dựa vào trạng thái online/offline
// 2. Hiện/ẩn menu dựa vào isLoggedIn
// 3. Hiển thị "Hết hàng" khi stock = 0

function ConditionalRendering() {
  // Thử thách 1: Online/Offline
  const isOnline = true;

  // Thử thách 2: Login
  const isLoggedIn = true;
  const userName = "Trường";

  // Thử thách 3: Stock
  const products = [
    { id: 1, name: "iPhone 15", stock: 5 },
    { id: 2, name: "Samsung S24", stock: 0 },
    { id: 3, name: "Xiaomi 14", stock: 2 },
    { id: 4, name: "Oppo Reno", stock: 0 },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Thử thách 1 */}
      <div style={{ marginBottom: "20px", padding: "15px", background: "#f9f9f9", borderRadius: "8px" }}>
        <h2>Thử thách 1 — Trạng thái Online/Offline</h2>
        <p style={{ fontSize: "20px" }}>
          {isOnline ? "🟢" : "🔴"} Trạng thái: <strong style={{ color: isOnline ? "#27ae60" : "#e74c3c" }}>{isOnline ? "Online" : "Offline"}</strong>
        </p>
      </div>

      {/* Thử thách 2 */}
      <div style={{ marginBottom: "20px", padding: "15px", background: "#f9f9f9", borderRadius: "8px" }}>
        <h2>Thử thách 2 — Hiện/ẩn menu</h2>
        {isLoggedIn ? (
          <nav>
            <p>
              👋 Xin chào, <strong>{userName}</strong>!
            </p>
            <ul>
              <li>Trang cá nhân</li>
              <li>Cài đặt</li>
              <li>Đăng xuất</li>
            </ul>
          </nav>
        ) : (
          <p style={{ color: "#e74c3c" }}>
            🔒 Vui lòng <strong>đăng nhập</strong> để xem menu
          </p>
        )}
      </div>

      {/* Thử thách 3 */}
      <div style={{ padding: "15px", background: "#f9f9f9", borderRadius: "8px" }}>
        <h2>Thử thách 3 — Trạng thái hàng hóa</h2>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              margin: "5px 0",
              background: "#fff",
              borderRadius: "4px",
              border: "1px solid #eee",
            }}
          >
            <span>{product.name}</span>
            {product.stock === 0 ? (
              <span
                style={{
                  color: "#e74c3c",
                  fontWeight: "bold",
                  background: "#fde8e8",
                  padding: "3px 10px",
                  borderRadius: "12px",
                }}
              >
                Hết hàng
              </span>
            ) : (
              <span
                style={{
                  color: "#27ae60",
                  background: "#e8fdf0",
                  padding: "3px 10px",
                  borderRadius: "12px",
                }}
              >
                Còn {product.stock} cái
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConditionalRendering;