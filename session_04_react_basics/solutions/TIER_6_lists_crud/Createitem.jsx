import { useState, useRef } from "react";

function CreateItem() {
  const [items, setItems] = useState([
    { id: 1, name: "HTML" },
    { id: 2, name: "CSS" },
    { id: 3, name: "JavaScript" },
  ]);
  const [newName, setNewName] = useState("");
  const [successMsg, setSuccessMsg] = useState(""); // Thử thách 2
  const [error, setError] = useState(""); // Thử thách 1
  const inputRef = useRef(null); // Thử thách 3

  function handleAdd() {
    // Thử thách 1: validate
    if (newName.trim() === "") {
      setError("⚠️ Vui lòng nhập tên môn học!");
      setSuccessMsg("");
      return;
    }

    const newItem = { id: Date.now(), name: newName.trim() };
    setItems([...items, newItem]);
    setNewName("");
    setError("");

    // Thử thách 2: thông báo thành công
    setSuccessMsg(`✅ Đã thêm "${newItem.name}" thành công!`);
    setTimeout(() => setSuccessMsg(""), 2000);

    // Thử thách 3: focus lại input
    inputRef.current?.focus();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleAdd();
  }

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Thêm môn học</h2>

      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <input
          ref={inputRef}
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
            setError("");
          }}
          onKeyDown={handleKeyDown}
          placeholder="Nhập tên môn học..."
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "4px",
            border: `1px solid ${error ? "#e74c3c" : "#ddd"}`,
          }}
        />
        <button
          onClick={handleAdd}
          style={{ padding: "8px 16px", background: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          ➕ Thêm
        </button>
      </div>

      {/* Thử thách 1: lỗi */}
      {error && <p style={{ color: "#e74c3c", margin: "0 0 8px", fontSize: "13px" }}>{error}</p>}

      {/* Thử thách 2: thành công */}
      {successMsg && <p style={{ color: "#27ae60", margin: "0 0 8px", fontSize: "13px" }}>{successMsg}</p>}

      <h3 style={{ marginBottom: "8px" }}>Danh sách ({items.length} môn):</h3>
      {items.map((item, index) => (
        <div
          key={item.id}
          style={{
            padding: "10px",
            borderBottom: "1px solid #eee",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ color: "#999", fontSize: "13px", width: "24px" }}>{index + 1}.</span>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export default CreateItem;