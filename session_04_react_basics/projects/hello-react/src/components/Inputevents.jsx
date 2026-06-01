import { useState } from "react";

function InputEvents() {
  // Thử thách 1: validate email
  const [email, setEmail] = useState("");
  const emailHopLe = email.includes("@") && email.includes(".");

  // Thử thách 2: preview realtime
  const [hoTen, setHoTen] = useState("");
  const [chucVu, setChucVu] = useState("");

  // Thử thách 3: đếm số từ
  const [text, setText] = useState("");
  const soTu = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const soKyTu = text.length;

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Input Events</h2>

      {/* Thử thách 1 */}
      <div style={{ marginBottom: "20px", padding: "15px", background: "#f9f9f9", borderRadius: "6px" }}>
        <h3 style={{ margin: "0 0 10px" }}>Thử thách 1 — Validate Email</h3>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email..."
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: `2px solid ${email === "" ? "#ddd" : emailHopLe ? "#27ae60" : "#e74c3c"}`,
            boxSizing: "border-box",
          }}
        />
        {email !== "" && (
          <p style={{ margin: "6px 0 0", color: emailHopLe ? "#27ae60" : "#e74c3c", fontSize: "13px" }}>
            {emailHopLe ? "✅ Email hợp lệ" : "❌ Email phải có @ và dấu chấm"}
          </p>
        )}
      </div>

      {/* Thử thách 2 */}
      <div style={{ marginBottom: "20px", padding: "15px", background: "#f9f9f9", borderRadius: "6px" }}>
        <h3 style={{ margin: "0 0 10px" }}>Thử thách 2 — Preview realtime</h3>
        <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
          <input
            value={hoTen}
            onChange={(e) => setHoTen(e.target.value)}
            placeholder="Họ tên..."
            style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
          />
          <input
            value={chucVu}
            onChange={(e) => setChucVu(e.target.value)}
            placeholder="Chức vụ..."
            style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
          />
        </div>
        {/* Preview card */}
        <div
          style={{
            padding: "15px",
            background: "white",
            borderRadius: "8px",
            border: "1px solid #ddd",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "#3498db",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: "bold",
              flexShrink: 0,
            }}
          >
            {hoTen ? hoTen[0].toUpperCase() : "?"}
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: "bold" }}>{hoTen || "Họ tên của bạn"}</p>
            <p style={{ margin: 0, color: "#666", fontSize: "13px" }}>{chucVu || "Chức vụ"}</p>
          </div>
        </div>
      </div>

      {/* Thử thách 3 */}
      <div style={{ padding: "15px", background: "#f9f9f9", borderRadius: "6px" }}>
        <h3 style={{ margin: "0 0 10px" }}>Thử thách 3 — Đếm số từ</h3>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nhập đoạn văn bản..."
          rows={4}
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd", boxSizing: "border-box", resize: "vertical" }}
        />
        <div style={{ display: "flex", gap: "20px", marginTop: "8px" }}>
          <span style={{ color: "#3498db" }}>
            📝 Số từ: <strong>{soTu}</strong>
          </span>
          <span style={{ color: "#9b59b6" }}>
            🔤 Số ký tự: <strong>{soKyTu}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

export default InputEvents;