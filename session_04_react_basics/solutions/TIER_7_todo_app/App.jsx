import { useState } from "react";
import TodoItem from "./components/TodoItem";
import TodoFilter from "./components/TodoFilter";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Học React Tier 0-6", done: true, createdAt: Date.now() - 86400000 },
    { id: 2, text: "Làm Todo App Tier 7", done: false, createdAt: Date.now() - 3600000 },
    { id: 3, text: "Push lên GitHub", done: false, createdAt: Date.now() },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  // Sửa inline (Level 2)
  const [editingTodo, setEditingTodo] = useState(null);
  const [editValue, setEditValue] = useState("");

  // ===== THÊM =====
  function addTodo() {
    if (inputValue.trim() === "") return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: inputValue.trim(),
        done: false,
        createdAt: Date.now(), // Level 1: ngày tạo
      },
    ]);
    setInputValue("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") addTodo();
  }

  // ===== TOGGLE =====
  function toggleTodo(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  // ===== XÓA =====
  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  // Xóa tất cả hoàn thành (Level 2)
  function clearCompleted() {
    setTodos(todos.filter((t) => !t.done));
  }

  // ===== SỬA (Level 2) =====
  function startEdit(todo) {
    setEditingTodo(todo);
    setEditValue(todo.text);
  }

  function saveEdit() {
    if (editValue.trim() === "") return;
    setTodos(todos.map((t) => (t.id === editingTodo.id ? { ...t, text: editValue.trim() } : t)));
    setEditingTodo(null);
  }

  function cancelEdit() {
    setEditingTodo(null);
  }

  // ===== LỌC =====
  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "completed") return t.done;
    return true;
  });

  // ===== ĐẾM =====
  const activeCount = todos.filter((t) => !t.done).length;
  const completedCount = todos.filter((t) => t.done).length;

  // Level 1: placeholder theo filter
  const emptyMessage =
    todos.length === 0
      ? "📝 Chưa có công việc nào. Thêm việc đầu tiên đi!"
      : filter === "active"
        ? "🎉 Không có việc nào đang chờ!"
        : filter === "completed"
          ? "💪 Chưa hoàn thành việc nào!"
          : "Không có công việc phù hợp";

  return (
    <div
      style={{
        maxWidth: "520px",
        margin: "40px auto",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      {/* Tiêu đề */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h1 style={{ margin: "0 0 4px", fontSize: "28px" }}>📋 Todo List</h1>
        {/* Level 1: tổng số todos */}
        <p style={{ margin: 0, color: "#999", fontSize: "13px" }}>
          Tổng: {todos.length} việc · {activeCount} chưa xong · {completedCount} hoàn thành
        </p>
      </div>

      {/* Input thêm todo */}
      <div style={{ display: "flex", marginBottom: "16px", gap: "8px" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Thêm công việc mới... (Enter để thêm)"
          style={{
            flex: 1,
            padding: "10px 14px",
            fontSize: "15px",
            border: "2px solid #ddd",
            borderRadius: "8px",
            outline: "none",
            transition: "border 0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#3498db")}
          onBlur={(e) => (e.target.style.borderColor = "#ddd")}
        />
        <button
          onClick={addTodo}
          style={{
            padding: "10px 20px",
            background: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          Thêm
        </button>
      </div>

      {/* Bộ lọc */}
      <TodoFilter filter={filter} setFilter={setFilter} todos={todos} />

      {/* Danh sách */}
      {filteredTodos.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "#aaa" }}>
          <p style={{ fontSize: "32px", margin: "0 0 8px" }}>🌿</p>
          <p style={{ margin: 0 }}>{emptyMessage}</p>
        </div>
      ) : (
        filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={startEdit} />)
      )}

      {/* Footer */}
      {todos.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
            paddingTop: "12px",
            borderTop: "1px solid #eee",
            fontSize: "13px",
            color: "#666",
          }}
        >
          <span>{activeCount} việc chưa hoàn thành</span>
          {/* Level 2: xóa hoàn thành */}
          {completedCount > 0 && (
            <button
              onClick={clearCompleted}
              style={{
                background: "none",
                border: "none",
                color: "#e74c3c",
                cursor: "pointer",
                fontSize: "13px",
                textDecoration: "underline",
              }}
            >
              Xóa {completedCount} việc đã xong
            </button>
          )}
        </div>
      )}

      {/* Modal sửa (Level 2) */}
      {editingTodo && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "24px",
              borderRadius: "12px",
              width: "380px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ margin: "0 0 14px" }}>✏️ Sửa công việc</h3>
            <input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEdit();
                if (e.key === "Escape") cancelEdit();
              }}
              autoFocus
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "2px solid #3498db",
                fontSize: "15px",
                boxSizing: "border-box",
                marginBottom: "14px",
                outline: "none",
              }}
            />
            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
              <button
                onClick={cancelEdit}
                style={{ padding: "8px 18px", background: "#f0f0f0", border: "none", borderRadius: "6px", cursor: "pointer" }}
              >
                Hủy
              </button>
              <button
                onClick={saveEdit}
                style={{
                  padding: "8px 18px",
                  background: "#3498db",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Lưu
              </button>
            </div>
            <p style={{ margin: "10px 0 0", fontSize: "12px", color: "#aaa", textAlign: "center" }}>Enter để lưu · Escape để hủy</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;