import { useState } from "react";

function ClickEvents() {
  const [message, setMessage] = useState("Chưa click");
  const [clickCount, setClickCount] = useState(0);

  // Thử thách 1: màu ngẫu nhiên
  const [bgColor, setBgColor] = useState("#f0f0f0");
  const randomColor = () => {
    const hex =
      "#" +
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0");
    setBgColor(hex);
  };

  // Thử thách 2: đếm riêng từng nút
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);
  const [countC, setCountC] = useState(0);

  // Thử thách 3: Like toggle
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(128);

  function handleLike() {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  }

  function handleClick() {
    setMessage("Đã click lúc " + new Date().toLocaleTimeString());
    setClickCount(clickCount + 1);
  }

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Click Events</h2>

      {/* Demo cơ bản */}
      <div style={{ marginBottom: "20px", padding: "15px", background: "#f9f9f9", borderRadius: "6px" }}>
        <p>{message}</p>
        <p>
          Số lần click: <strong>{clickCount}</strong>
        </p>
        <button
          onClick={handleClick}
          style={{
            padding: "8px 16px",
            background: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "8px",
          }}
        >
          Click me!
        </button>
        <button
          onClick={() => {
            setMessage("Đã reset!");
            setClickCount(0);
          }}
          style={{ padding: "8px 16px", background: "#95a5a6", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Reset
        </button>
      </div>

      {/* Thử thách 1 */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Thử thách 1 — Đổi màu ngẫu nhiên</h3>
        <div
          style={{
            background: bgColor,
            padding: "30px",
            borderRadius: "8px",
            textAlign: "center",
            marginBottom: "10px",
            transition: "background 0.3s",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>Màu hiện tại: {bgColor}</p>
        </div>
        <button
          onClick={randomColor}
          style={{ padding: "8px 16px", background: "#9b59b6", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          🎨 Đổi màu ngẫu nhiên
        </button>
      </div>

      {/* Thử thách 2 */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Thử thách 2 — Đếm riêng từng nút</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          {[
            { label: "Nút A", count: countA, set: setCountA, color: "#e74c3c" },
            { label: "Nút B", count: countB, set: setCountB, color: "#27ae60" },
            { label: "Nút C", count: countC, set: setCountC, color: "#f39c12" },
          ].map(({ label, count, set, color }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <button
                onClick={() => set(count + 1)}
                style={{
                  padding: "10px 20px",
                  background: color,
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                {label}
              </button>
              <span style={{ fontWeight: "bold", color }}>{count} lần</span>
            </div>
          ))}
        </div>
      </div>

      {/* Thử thách 3 */}
      <div>
        <h3>Thử thách 3 — Like toggle</h3>
        <button
          onClick={handleLike}
          style={{
            padding: "10px 20px",
            background: isLiked ? "#e74c3c" : "#f0f0f0",
            color: isLiked ? "white" : "#333",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "all 0.2s",
          }}
        >
          {isLiked ? "❤️" : "🤍"} {likeCount}
        </button>
      </div>
    </div>
  );
}

export default ClickEvents;