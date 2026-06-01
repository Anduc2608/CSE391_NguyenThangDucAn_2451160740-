import { useState } from "react";

function StringState() {
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Thử thách 2: kiểm tra email hợp lệ
  const emailHopLe = email.includes("@") && email.includes(".");

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Nhập liệu</h2>

      {/* Thử thách 1: đếm ký tự */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Giới thiệu bản thân:</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={100}
          placeholder="Nhập giới thiệu..."
          rows={3}
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd", boxSizing: "border-box" }}
        />
        <p
          style={{
            textAlign: "right",
            margin: "4px 0 0",
            color: bio.length > 80 ? "#e74c3c" : "#666",
            fontSize: "13px",
          }}
        >
          {bio.length}/100 {bio.length > 80 && "⚠️ Sắp hết!"}
        </p>
      </div>

      {/* Thử thách 2: validate email */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email..."
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: `1px solid ${email === "" ? "#ddd" : emailHopLe ? "#27ae60" : "#e74c3c"}`,
            boxSizing: "border-box",
          }}
        />
        {email !== "" && (
          <p style={{ margin: "4px 0 0", fontSize: "13px", color: emailHopLe ? "#27ae60" : "#e74c3c" }}>
            {emailHopLe ? "✅ Email hợp lệ" : "❌ Email không hợp lệ"}
          </p>
        )}
      </div>

      {/* Thử thách 3: ẩn/hiện mật khẩu */}
      <div>
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>Mật khẩu:</label>
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu..."
            style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            style={{ padding: "8px 14px", border: "1px solid #ddd", borderRadius: "4px", background: "#f9f9f9", cursor: "pointer" }}
          >
            {showPassword ? "🙈 Ẩn" : "👁 Hiện"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StringState;