function TodoFilter({ filter, setFilter, todos }) {
  const filters = [
    { key: "all", label: "Tất cả", count: todos.length },
    { key: "active", label: "Chưa xong", count: todos.filter((t) => !t.done).length },
    { key: "completed", label: "Hoàn thành", count: todos.filter((t) => t.done).length },
  ];

  return (
    <div style={{ display: "flex", gap: "6px", marginBottom: "15px" }}>
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => setFilter(f.key)}
          style={{
            flex: 1,
            padding: "8px",
            background: filter === f.key ? "#3498db" : "#f0f0f0",
            color: filter === f.key ? "white" : "#555",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: filter === f.key ? "bold" : "normal",
            transition: "all 0.2s",
            fontSize: "13px",
          }}
        >
          {f.label}
          <span
            style={{
              marginLeft: "6px",
              background: filter === f.key ? "rgba(255,255,255,0.3)" : "#ddd",
              color: filter === f.key ? "white" : "#666",
              padding: "1px 7px",
              borderRadius: "10px",
              fontSize: "12px",
            }}
          >
            {f.count}
          </span>
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;