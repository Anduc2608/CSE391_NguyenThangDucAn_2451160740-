function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 14px",
        margin: "5px 0",
        background: todo.done ? "#f0fff4" : "#fff",
        border: `1px solid ${todo.done ? "#b2dfdb" : "#eee"}`,
        borderRadius: "8px",
        transition: "all 0.2s",
        gap: "10px",
      }}
    >
      {/* Checkbox toggle */}
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        style={{ width: "18px", height: "18px", cursor: "pointer", flexShrink: 0 }}
      />

      {/* Nội dung todo */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            textDecoration: todo.done ? "line-through" : "none",
            color: todo.done ? "#999" : "#333",
            fontSize: "15px",
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {todo.text}
        </span>
        <span style={{ fontSize: "11px", color: "#bbb" }}>{new Date(todo.createdAt).toLocaleString("vi-VN")}</span>
      </div>

      {/* Nút sửa */}
      <button
        onClick={() => onEdit(todo)}
        style={{
          padding: "4px 10px",
          background: "#f0f0f0",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "13px",
          flexShrink: 0,
        }}
      >
        ✏️
      </button>

      {/* Nút xóa */}
      <button
        onClick={() => onDelete(todo.id)}
        style={{
          padding: "4px 10px",
          background: "#fde8e8",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "13px",
          flexShrink: 0,
        }}
      >
        🗑
      </button>
    </div>
  );
}

export default TodoItem;