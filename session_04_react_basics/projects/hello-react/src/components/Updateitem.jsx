import { useState } from "react";

function UpdateItem() {
  const [items, setItems] = useState([
    { id: 1, name: "Nguyễn Văn Minh", age: 20 },
    { id: 2, name: "Trần Thị An", age: 21 },
    { id: 3, name: "Lê Văn Linh", age: 19 },
    { id: 4, name: "Phạm Thị Hoa", age: 22 },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [saveMsg, setSaveMsg] = useState(""); // Thử thách 3
  const [editError, setEditError] = useState(""); // Thử thách 2

  function startEdit(item) {
    setEditingId(item.id);
    setEditName(item.name);
    setEditAge(item.age.toString());
    setEditError("");
    setSaveMsg("");
  }

  function saveEdit() {
    // Thử thách 2: không cho lưu nếu trống
    if (editName.trim() === "") {
      setEditError("⚠️ Tên không được để trống!");
      return;
    }
    if (editAge === "" || Number(editAge) <= 0) {
      setEditError("⚠️ Tuổi không hợp lệ!");
      return;
    }

    setItems(items.map((item) => (item.id === editingId ? { ...item, name: editName.trim(), age: parseInt(editAge) } : item)));

    setEditingId(null);
    setEditError("");

    // Thử thách 3: thông báo đã lưu
    setSaveMsg(`✅ Đã lưu thành công!`);
    setTimeout(() => setSaveMsg(""), 2000);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditError("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEdit();
  }

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Sửa thông tin sinh viên</h2>

      {/* Thử thách 3: thông báo lưu */}
      {saveMsg && (
        <p style={{ color: "#27ae60", padding: "8px 12px", background: "#eafaf1", borderRadius: "6px", marginBottom: "10px" }}>{saveMsg}</p>
      )}

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            padding: "12px 14px",
            margin: "6px 0",
            background: editingId === item.id ? "#eaf4fb" : "#f9f9f9",
            borderRadius: "6px",
            border: `1px solid ${editingId === item.id ? "#3498db" : "#eee"}`,
            transition: "all 0.2s",
          }}
        >
          {editingId === item.id ? (
            // Chế độ sửa
            <div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
                {/* Thử thách 1: input highlight khi đang sửa */}
                <input
                  value={editName}
                  onChange={(e) => {
                    setEditName(e.target.value);
                    setEditError("");
                  }}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  style={{
                    flex: 1,
                    padding: "7px 10px",
                    borderRadius: "4px",
                    border: "2px solid #3498db",
                    outline: "none",
                    boxShadow: "0 0 0 3px rgba(52,152,219,0.2)",
                  }}
                />
                <input
                  type="number"
                  value={editAge}
                  onChange={(e) => {
                    setEditAge(e.target.value);
                    setEditError("");
                  }}
                  onKeyDown={handleKeyDown}
                  style={{
                    width: "70px",
                    padding: "7px 10px",
                    borderRadius: "4px",
                    border: "2px solid #3498db",
                    outline: "none",
                    boxShadow: "0 0 0 3px rgba(52,152,219,0.2)",
                  }}
                />
                <button
                  onClick={saveEdit}
                  style={{ padding: "6px 14px", background: "#27ae60", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  ✓ Lưu
                </button>
                <button
                  onClick={cancelEdit}
                  style={{ padding: "6px 14px", background: "#95a5a6", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                >
                  ✕ Hủy
                </button>
              </div>
              {/* Thử thách 2: lỗi */}
              {editError && <p style={{ color: "#e74c3c", margin: 0, fontSize: "13px" }}>{editError}</p>}
              <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>Enter để lưu · Escape để hủy</p>
            </div>
          ) : (
            // Chế độ xem
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>
                {item.name} — <span style={{ color: "#666" }}>{item.age} tuổi</span>
              </span>
              <button
                onClick={() => startEdit(item)}
                style={{ padding: "5px 14px", background: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
              >
                ✏️ Sửa
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default UpdateItem;