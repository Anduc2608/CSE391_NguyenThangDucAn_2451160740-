import { useState } from "react";

function BooleanState() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Thử thách 1: ẩn/hiện mật khẩu
  const [showPass, setShowPass] = useState(false);
  const [pass, setPass] = useState("");

  // Thử thách 2: accordion — 3 mục độc lập
  const [openIndex, setOpenIndex] = useState(null);
  const accordionItems = [
    { title: "React là gì?", content: "React là thư viện JavaScript để xây dựng giao diện người dùng, do Meta phát triển." },
    {
      title: "useState dùng để làm gì?",
      content: "useState là hook giúp component lưu trữ và cập nhật dữ liệu, mỗi lần setState sẽ trigger re-render.",
    },
    {
      title: "Props khác state như thế nào?",
      content: "Props truyền từ cha xuống con (chỉ đọc), còn state là dữ liệu nội bộ của component (có thể thay đổi).",
    },
  ];

  // Thử thách 3: bóng đèn
  const [bulbOn, setBulbOn] = useState(false);

  const themeStyle = {
    backgroundColor: isDarkMode ? "#2c3e50" : "#fff",
    color: isDarkMode ? "#ecf0f1" : "#333",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    transition: "all 0.3s",
  };

  return (
    <div style={themeStyle}>
      <h2>Toggle Demo</h2>

      {/* Dark mode + Like */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            background: isDarkMode ? "#f39c12" : "#2c3e50",
            color: "white",
          }}
        >
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
        <button
          onClick={() => setIsLiked(!isLiked)}
          style={{ padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer", background: isLiked ? "#e74c3c" : "#ddd" }}
        >
          {isLiked ? "❤️ Đã thích" : "🤍 Thích"}
        </button>
      </div>

      {/* Thử thách 1: ẩn/hiện mật khẩu */}
      <div style={{ marginBottom: "20px", padding: "15px", background: isDarkMode ? "#34495e" : "#f9f9f9", borderRadius: "6px" }}>
        <h3 style={{ margin: "0 0 10px" }}>Thử thách 1 — Ẩn/Hiện mật khẩu</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type={showPass ? "text" : "password"}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Nhập mật khẩu..."
            style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
          />
          <button
            onClick={() => setShowPass(!showPass)}
            style={{ padding: "8px 14px", border: "1px solid #ddd", borderRadius: "4px", background: "#fff", cursor: "pointer" }}
          >
            {showPass ? "🙈 Ẩn" : "👁 Hiện"}
          </button>
        </div>
      </div>

      {/* Thử thách 2: Accordion */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ margin: "0 0 10px" }}>Thử thách 2 — Accordion</h3>
        {accordionItems.map((item, index) => (
          <div key={index} style={{ marginBottom: "6px", border: "1px solid #ddd", borderRadius: "6px", overflow: "hidden" }}>
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              style={{
                width: "100%",
                padding: "12px 16px",
                textAlign: "left",
                background: openIndex === index ? "#3498db" : isDarkMode ? "#34495e" : "#f0f0f0",
                color: openIndex === index ? "white" : isDarkMode ? "#ecf0f1" : "#333",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {item.title}
              <span>{openIndex === index ? "▲" : "▼"}</span>
            </button>
            {openIndex === index && <div style={{ padding: "12px 16px", background: isDarkMode ? "#2c3e50" : "#fff" }}>{item.content}</div>}
          </div>
        ))}
      </div>

      {/* Thử thách 3: Bóng đèn */}
      <div style={{ padding: "15px", background: isDarkMode ? "#34495e" : "#f9f9f9", borderRadius: "6px", textAlign: "center" }}>
        <h3 style={{ margin: "0 0 10px" }}>Thử thách 3 — Bóng đèn</h3>
        <div style={{ fontSize: "60px", marginBottom: "10px", filter: bulbOn ? "none" : "grayscale(1)" }}>💡</div>
        <p style={{ margin: "0 0 10px", color: bulbOn ? "#f39c12" : "#999" }}>{bulbOn ? "Đang bật 🌟" : "Đang tắt"}</p>
        <button
          onClick={() => setBulbOn(!bulbOn)}
          style={{
            padding: "8px 24px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            background: bulbOn ? "#e74c3c" : "#f39c12",
            color: "white",
            fontWeight: "bold",
          }}
        >
          {bulbOn ? "Tắt đèn" : "Bật đèn"}
        </button>
      </div>
    </div>
  );
}

export default BooleanState;