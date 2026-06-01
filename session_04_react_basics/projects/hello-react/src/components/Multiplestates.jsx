import { useState } from "react";

function MultipleStates() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState(""); // Thử thách 1
  const [isStudent, setIsStudent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Thử thách 2: validate
  function validate() {
    const newErrors = {};
    if (name.trim() === "") newErrors.name = "Vui lòng nhập tên";
    if (age === "") newErrors.age = "Vui lòng nhập tuổi";
    else if (Number(age) <= 0 || Number(age) >= 100) newErrors.age = "Tuổi phải từ 1 đến 99";
    if (email === "") newErrors.email = "Vui lòng nhập email";
    else if (!email.includes("@")) newErrors.email = "Email không hợp lệ";
    return newErrors;
  }

  function handleSubmit() {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  function handleReset() {
    setName("");
    setAge("");
    setEmail("");
    setIsStudent(false);
    setSubmitted(false);
    setErrors({});
  }

  const inputStyle = (field) => ({
    padding: "8px",
    borderRadius: "4px",
    border: `1px solid ${errors[field] ? "#e74c3c" : "#ddd"}`,
    width: "100%",
    boxSizing: "border-box",
  });

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", maxWidth: "400px" }}>
      <h2>Form đăng ký</h2>

      {/* Thử thách 3: preview realtime */}
      {name.trim() !== "" && !submitted && (
        <div style={{ padding: "10px", background: "#eaf4fb", borderRadius: "6px", marginBottom: "15px" }}>
          👋 Xin chào <strong>{name}</strong>!
        </div>
      )}

      {!submitted ? (
        <div>
          {/* Tên */}
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>Tên:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle("name")} />
            {errors.name && <p style={{ color: "#e74c3c", margin: "4px 0 0", fontSize: "13px" }}>{errors.name}</p>}
          </div>

          {/* Tuổi — Thử thách 2 */}
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>Tuổi (1-99):</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} style={inputStyle("age")} />
            {errors.age && <p style={{ color: "#e74c3c", margin: "4px 0 0", fontSize: "13px" }}>{errors.age}</p>}
          </div>

          {/* Email — Thử thách 1 */}
          <div style={{ marginBottom: "12px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle("email")} />
            {errors.email && <p style={{ color: "#e74c3c", margin: "4px 0 0", fontSize: "13px" }}>{errors.email}</p>}
          </div>

          {/* Sinh viên */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ cursor: "pointer" }}>
              <input type="checkbox" checked={isStudent} onChange={(e) => setIsStudent(e.target.checked)} style={{ marginRight: "8px" }} />
              Là sinh viên
            </label>
          </div>

          <button
            onClick={handleSubmit}
            style={{
              padding: "10px 24px",
              background: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "8px",
            }}
          >
            Đăng ký
          </button>
          <button
            onClick={handleReset}
            style={{ padding: "10px 24px", background: "#95a5a6", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Xóa
          </button>
        </div>
      ) : (
        <div style={{ background: "#d4edda", padding: "15px", borderRadius: "6px" }}>
          <h3 style={{ margin: "0 0 10px", color: "#155724" }}>✅ Đăng ký thành công!</h3>
          <p style={{ margin: "4px 0" }}>
            Tên: <strong>{name}</strong>
          </p>
          <p style={{ margin: "4px 0" }}>
            Tuổi: <strong>{age}</strong>
          </p>
          <p style={{ margin: "4px 0" }}>
            Email: <strong>{email}</strong>
          </p>
          <p style={{ margin: "4px 0" }}>
            Sinh viên: <strong>{isStudent ? "Có" : "Không"}</strong>
          </p>
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

export default MultipleStates;