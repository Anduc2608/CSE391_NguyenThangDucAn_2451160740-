import { useState } from "react";

function KeyboardEvents() {
  const [lastKey, setLastKey] = useState("");
  const [log, setLog] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Thử thách 1: game đoán phím
  const TARGET_KEYS = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const [targetKey, setTargetKey] = useState(() => TARGET_KEYS[Math.floor(Math.random() * TARGET_KEYS.length)]);
  const [gameResult, setGameResult] = useState(null); // "win" | "lose" | null
  const [score, setScore] = useState(0);

  function newRound() {
    setTargetKey(TARGET_KEYS[Math.floor(Math.random() * TARGET_KEYS.length)]);
    setGameResult(null);
  }

  function handleGameKey(e) {
    const pressed = e.key.toUpperCase();
    if (TARGET_KEYS.includes(pressed)) {
      if (pressed === targetKey) {
        setGameResult("win");
        setScore((s) => s + 1);
      } else {
        setGameResult("lose");
        setScore(0);
      }
    }
  }

  // Thử thách 2: di chuyển ô vuông
  const BOX_SIZE = 40;
  const AREA = 240;
  const STEP = 20;
  const [pos, setPos] = useState({ x: 100, y: 100 });

  function handleMoveKey(e) {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
    e.preventDefault();
    setPos((prev) => {
      const max = AREA - BOX_SIZE;
      if (e.key === "ArrowUp") return { ...prev, y: Math.max(0, prev.y - STEP) };
      if (e.key === "ArrowDown") return { ...prev, y: Math.min(max, prev.y + STEP) };
      if (e.key === "ArrowLeft") return { ...prev, x: Math.max(0, prev.x - STEP) };
      if (e.key === "ArrowRight") return { ...prev, x: Math.min(max, prev.x + STEP) };
      return prev;
    });
  }

  // Thử thách 3: Ctrl+D đổi màu nền
  const BG_COLORS = ["#eaf4fb", "#fef9e7", "#eafaf1", "#fdf2f8", "#fef5e7"];
  const [bgIndex, setBgIndex] = useState(0);

  function handleGlobalKey(e) {
    setLastKey(e.key);
    setLog((prev) => [...prev.slice(-4), e.key]);

    // Thử thách 3: Ctrl+D
    if (e.ctrlKey && e.key === "d") {
      e.preventDefault();
      setBgIndex((i) => (i + 1) % BG_COLORS.length);
    }
  }

  // Xử lý Enter/Escape trong input
  function handleInputKeyDown(e) {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      alert("Bạn nhập: " + inputValue);
      setInputValue("");
    }
    if (e.key === "Escape") setInputValue("");
  }

  return (
    <div
      onKeyDown={handleGlobalKey}
      tabIndex={0}
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: BG_COLORS[bgIndex],
        outline: "none",
        transition: "background 0.3s",
      }}
    >
      <h2>Keyboard Events</h2>
      <p style={{ color: "#666", fontSize: "13px" }}>💡 Click vào đây rồi nhấn phím bất kỳ</p>
      <p>
        Phím cuối: <strong>{lastKey || "Chưa nhấn"}</strong>
      </p>
      <p style={{ fontSize: "13px", color: "#666" }}>Log: {log.join(" → ")}</p>

      {/* Input Enter/Escape */}
      <div style={{ marginBottom: "20px" }}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Nhập rồi nhấn Enter (Escape để xóa)..."
          style={{ padding: "8px", width: "100%", borderRadius: "4px", border: "1px solid #ddd", boxSizing: "border-box" }}
        />
      </div>

      {/* Thử thách 1: game đoán phím */}
      <div
        onKeyDown={handleGameKey}
        tabIndex={0}
        style={{ marginBottom: "20px", padding: "15px", background: "white", borderRadius: "8px", outline: "none", border: "1px solid #ddd" }}
      >
        <h3 style={{ margin: "0 0 10px" }}>Thử thách 1 — Game đoán phím</h3>
        <p>
          Nhấn phím: <span style={{ fontSize: "36px", fontWeight: "bold", color: "#3498db" }}>{targetKey}</span>
        </p>
        <p style={{ fontSize: "13px", color: "#666" }}>Các phím hợp lệ: {TARGET_KEYS.join(", ")}</p>

        {gameResult === "win" && <p style={{ color: "#27ae60", fontWeight: "bold" }}>🎉 Đúng rồi! Điểm: {score}</p>}
        {gameResult === "lose" && <p style={{ color: "#e74c3c", fontWeight: "bold" }}>❌ Sai rồi! Điểm về 0</p>}
        {gameResult && (
          <button
            onClick={newRound}
            style={{ padding: "6px 16px", background: "#3498db", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Vòng tiếp →
          </button>
        )}
        <p style={{ margin: "8px 0 0", fontSize: "13px" }}>
          Điểm hiện tại: <strong>{score}</strong>
        </p>
      </div>

      {/* Thử thách 2: di chuyển ô vuông */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ margin: "0 0 10px" }}>Thử thách 2 — Di chuyển ô vuông (↑↓←→)</h3>
        <div
          onKeyDown={handleMoveKey}
          tabIndex={0}
          style={{
            width: `${AREA}px`,
            height: `${AREA}px`,
            background: "#ecf0f1",
            borderRadius: "8px",
            position: "relative",
            border: "2px solid #bdc3c7",
            outline: "none",
          }}
        >
          <div
            style={{
              width: `${BOX_SIZE}px`,
              height: `${BOX_SIZE}px`,
              background: "#e74c3c",
              borderRadius: "6px",
              position: "absolute",
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transition: "left 0.1s, top 0.1s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "18px",
            }}
          >
            🚀
          </div>
        </div>
        <p style={{ fontSize: "12px", color: "#666", marginTop: "6px" }}>Click vào ô rồi dùng phím mũi tên để di chuyển</p>
      </div>

      {/* Thử thách 3 */}
      <div style={{ padding: "12px", background: "white", borderRadius: "8px", border: "1px solid #ddd" }}>
        <h3 style={{ margin: "0 0 6px" }}>Thử thách 3 — Ctrl+D đổi màu nền</h3>
        <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
          Nhấn <kbd style={{ background: "#eee", padding: "2px 6px", borderRadius: "3px", border: "1px solid #ccc" }}>Ctrl+D</kbd> để đổi màu nền (màu{" "}
          {bgIndex + 1}/{BG_COLORS.length})
        </p>
      </div>
    </div>
  );
}

export default KeyboardEvents;