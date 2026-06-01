import { useState, useEffect } from "react";

function DeleteItem() {
  const [items, setItems] = useState([
    { id: 1, name: "Nguyễn Văn Minh" },
    { id: 2, name: "Trần Thị An" },
    { id: 3, name: "Lê Văn Linh" },
    { id: 4, name: "Phạm Thị Hoa" },
  ]);

  const [deleteMsg, setDeleteMsg] = useState(""); // Thử thách 1
  const [lastDeleted, setLastDeleted] = useState(null); // Thử thách 2
  const [undoTimer, setUndoTimer] = useState(0); // Thử thách 2

  // Thử thách 2: đếm ngược undo
  useEffect(() => {
    if (undoTimer <= 0) return;
    const t = setTimeout(() => setUndoTimer((u) => u - 1), 1000);
    return () => clearTimeout(t);
  }, [undoTimer]);

  function handleDelete(item) {
    // Thử thách 3: confirm trước khi xóa
    if (!window.confirm(`Bạn có chắc muốn xóa "${item.name}"?`)) return;

    setItems((prev) => prev.filter((i) => i.id !== item.id));

    // Thử thách 1: thông báo đã xóa
    setDeleteMsg(`🗑 Đã xóa "${item.name}"`);
    setTimeout(() => setDeleteMsg(""), 3000);

    // Thử thách 2: lưu lại để undo
    setLastDeleted(item);
    setUndoTimer(3);
  }

  function handleUndo() {
    if (!lastDeleted) return;
    setItems((prev) => [...prev, lastDeleted]);
    setLastDeleted(null);
    setUndoTimer(0);
    setDeleteMsg(`↩️ Đã hoàn tác xóa "${lastDeleted.name}"`);
    setTimeout(() => setDeleteMsg(""), 2000);
  }

  function handleDeleteAll() {
    if (!window.confirm("Bạn có chắc muốn xóa TẤT CẢ?")) return;
    setItems([]);
    setDeleteMsg("🗑 Đã xóa tất cả");
    setTimeout(() => setDeleteMsg(""), 2000);
  }

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Xóa sinh viên</h2>

      {/* Thông báo */}
      {deleteMsg && (
        <div
          style={{
            padding: "10px 14px",
            marginBottom: "12px",
            background: "#fef9e7",
            border: "1px solid #f39c12",
            borderRadius: "6px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "14px" }}>{deleteMsg}</span>
          {/* Thử thách 2: nút undo */}
          {lastDeleted && undoTimer > 0 && (
            <button
              onClick={handleUndo}
              style={{
                padding: "4px 12px",
                background: "#f39c12",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              ↩️ Hoàn tác ({undoTimer}s)
            </button>
          )}
        </div>
      )}

      {items.length > 0 && (
        <button
          onClick={handleDeleteAll}
          style={{
            marginBottom: "12px",
            padding: "8px 16px",
            background: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          🗑 Xóa tất cả
        </button>
      )}

      {items.length === 0 ? (
        <p style={{ color: "#999", textAlign: "center", padding: "20px" }}>Danh sách trống</p>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 14px",
              margin: "5px 0",
              background: "#f9f9f9",
              borderRadius: "6px",
              border: "1px solid #eee",
            }}
          >
            <span>{item.name}</span>
            <button
              onClick={() => handleDelete(item)}
              style={{ padding: "4px 12px", background: "#e74c3c", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Xóa
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default DeleteItem;