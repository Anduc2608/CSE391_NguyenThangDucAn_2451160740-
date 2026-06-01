import { useState } from "react";

function NumberState() {
  const [count, setCount] = useState(0);

  // Thử thách 3: màu theo giá trị
  const mauSo = count > 0 ? "#27ae60" : count < 0 ? "#e74c3c" : "#333";

  // Thử thách 2: nhãn dương/âm/0
  const nhanSo = count > 0 ? "Số dương +" : count < 0 ? "Số âm" : "Số không";

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Bộ đếm</h2>

      {/* Thử thách 3: màu thay đổi */}
      <p style={{ fontSize: "48px", fontWeight: "bold", color: mauSo, margin: "10px 0" }}>{count}</p>

      {/* Thử thách 2: nhãn */}
      <p style={{ color: mauSo, marginBottom: "15px" }}>{nhanSo}</p>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button
          onClick={() => setCount(count + 1)}
          style={{ padding: "8px 16px", background: "#27ae60", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Tăng (+1)
        </button>

        {/* Thử thách 1: Tăng 5 */}
        <button
          onClick={() => setCount(count + 5)}
          style={{ padding: "8px 16px", background: "#2ecc71", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Tăng (+5)
        </button>

        <button
          onClick={() => setCount(count - 1)}
          style={{ padding: "8px 16px", background: "#e74c3c", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Giảm (-1)
        </button>

        <button
          onClick={() => setCount(count * 2)}
          style={{ padding: "8px 16px", background: "#9b59b6", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Nhân đôi
        </button>

        <button
          onClick={() => setCount(0)}
          style={{ padding: "8px 16px", background: "#95a5a6", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default NumberState;