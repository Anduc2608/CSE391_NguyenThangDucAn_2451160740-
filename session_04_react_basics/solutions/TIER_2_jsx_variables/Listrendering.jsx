function ListRendering() {
  const products = [
    { id: 1, name: "Laptop Dell XPS", price: 25000000 },
    { id: 2, name: "Chuột Logitech", price: 500000 },
    { id: 3, name: "Bàn phím cơ", price: 1500000 },
    { id: 4, name: "Tai nghe Sony", price: 3000000 },
    { id: 5, name: "Cáp USB-C", price: 150000 },
  ];

  // Thử thách 3: Tính tổng
  const tongGia = products.reduce((sum, p) => sum + p.price, 0);

  // Định dạng tiền VND
  const formatGia = (gia) => gia.toLocaleString("vi-VN") + "đ";

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Danh sách sản phẩm</h2>

      {/* Thử thách 1 + 2 */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#3498db", color: "white" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>STT</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Tên sản phẩm</th>
            <th style={{ padding: "10px", textAlign: "right" }}>Giá</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} style={{ background: index % 2 === 0 ? "#fff" : "#f9f9f9" }}>
              <td style={{ padding: "10px", border: "1px solid #eee" }}>{index + 1}</td>
              <td style={{ padding: "10px", border: "1px solid #eee" }}>{product.name}</td>
              {/* Thử thách 2: Màu đỏ nếu > 1 triệu */}
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #eee",
                  textAlign: "right",
                  color: product.price > 1000000 ? "#e74c3c" : "#333",
                  fontWeight: product.price > 1000000 ? "bold" : "normal",
                }}
              >
                {formatGia(product.price)}
              </td>
            </tr>
          ))}
        </tbody>

        {/* Thử thách 3: Tổng giá */}
        <tfoot>
          <tr style={{ background: "#2ecc71", color: "white", fontWeight: "bold" }}>
            <td colSpan={2} style={{ padding: "10px" }}>
              Tổng cộng
            </td>
            <td style={{ padding: "10px", textAlign: "right" }}>{formatGia(tongGia)}</td>
          </tr>
        </tfoot>
      </table>

      <p style={{ color: "#666", fontSize: "13px", marginTop: "8px" }}>* Màu đỏ = sản phẩm giá trên 1.000.000đ</p>
    </div>
  );
}

export default ListRendering;