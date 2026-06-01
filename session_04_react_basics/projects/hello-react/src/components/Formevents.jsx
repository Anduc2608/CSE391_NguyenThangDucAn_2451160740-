import { useState } from "react";

function FormEvents() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Thử thách 3: lỗi realtime
  const errors = {
    email: formData.email !== "" && !formData.email.includes("@") ? "Email phải có ký tự @" : "",
    password: formData.password !== "" && formData.password.length < 6 ? "Mật khẩu tối thiểu 6 ký tự" : "",
    confirmPassword: formData.confirmPassword !== "" && formData.confirmPassword !== formData.password ? "Mật khẩu xác nhận không khớp" : "",
  };

  const hasError = Object.values(errors).some((e) => e !== "");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formData.name === "" || formData.email === "" || formData.password === "") {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (hasError) {
      alert("Vui lòng sửa các lỗi trước khi gửi!");
      return;
    }
    setSubmitted(true);
  }

  function handleReset() {
    setFormData({ name: "", email: "", password: "", confirmPassword: "", message: "" });
    setSubmitted(false);
  }

  const fieldStyle = (field) => ({
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: `1px solid ${errors[field] ? "#e74c3c" : "#ddd"}`,
    boxSizing: "border-box",
  });

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", maxWidth: "420px" }}>
      <h2>Form đăng ký tài khoản</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          {/* Tên */}
          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Họ tên *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd", boxSizing: "border-box" }}
            />
          </div>

          {/* Email — Thử thách 1 + 3 */}
          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Email *</label>
            <input name="email" value={formData.email} onChange={handleChange} placeholder="example@email.com" style={fieldStyle("email")} />
            {errors.email && <p style={{ color: "#e74c3c", margin: "4px 0 0", fontSize: "12px" }}>⚠️ {errors.email}</p>}
          </div>

          {/* Mật khẩu — Thử thách 3 */}
          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Mật khẩu *</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Tối thiểu 6 ký tự"
              style={fieldStyle("password")}
            />
            {errors.password && <p style={{ color: "#e74c3c", margin: "4px 0 0", fontSize: "12px" }}>⚠️ {errors.password}</p>}
          </div>

          {/* Xác nhận mật khẩu — Thử thách 2 */}
          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Xác nhận mật khẩu *</label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu"
              style={fieldStyle("confirmPassword")}
            />
            {errors.confirmPassword && <p style={{ color: "#e74c3c", margin: "4px 0 0", fontSize: "12px" }}>⚠️ {errors.confirmPassword}</p>}
            {!errors.confirmPassword && formData.confirmPassword !== "" && (
              <p style={{ color: "#27ae60", margin: "4px 0 0", fontSize: "12px" }}>✅ Mật khẩu khớp</p>
            )}
          </div>

          {/* Tin nhắn */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Tin nhắn</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              placeholder="Lời nhắn (không bắt buộc)..."
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd", boxSizing: "border-box", resize: "vertical" }}
            />
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: "10px",
                background: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Đăng ký
            </button>
            <button
              type="button"
              onClick={handleReset}
              style={{ padding: "10px 20px", background: "#95a5a6", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Xóa
            </button>
          </div>
        </form>
      ) : (
        <div style={{ background: "#d4edda", padding: "16px", borderRadius: "6px" }}>
          <h3 style={{ margin: "0 0 10px", color: "#155724" }}>✅ Đăng ký thành công!</h3>
          <p style={{ margin: "4px 0" }}>
            Họ tên: <strong>{formData.name}</strong>
          </p>
          <p style={{ margin: "4px 0" }}>
            Email: <strong>{formData.email}</strong>
          </p>
          {formData.message && (
            <p style={{ margin: "4px 0" }}>
              Tin nhắn: <em>{formData.message}</em>
            </p>
          )}
          <button
            onClick={handleReset}
            style={{
              marginTop: "12px",
              padding: "8px 20px",
              background: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Đăng ký lại
          </button>
        </div>
      )}
    </div>
  );
}

export default FormEvents;