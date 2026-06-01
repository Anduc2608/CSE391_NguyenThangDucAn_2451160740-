function PriceTag({ originalPrice, salePrice }) {
  const discount = Math.round((1 - salePrice / originalPrice) * 100);
  const formatGia = (gia) => gia.toLocaleString("vi-VN") + "đ";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 16px",
        background: "#fff8f8",
        border: "1px solid #fdd",
        borderRadius: "8px",
        margin: "8px",
      }}
    >
      {/* Giá gốc gạch ngang */}
      <span
        style={{
          color: "#999",
          textDecoration: "line-through",
          fontSize: "14px",
        }}
      >
        {formatGia(originalPrice)}
      </span>

      {/* Giá sale */}
      <span
        style={{
          color: "#e74c3c",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        {formatGia(salePrice)}
      </span>

      {/* Badge giảm giá */}
      <span
        style={{
          background: "#e74c3c",
          color: "white",
          padding: "3px 8px",
          borderRadius: "12px",
          fontSize: "13px",
          fontWeight: "bold",
        }}
      >
        -{discount}%
      </span>
    </div>
  );
}

export default PriceTag;