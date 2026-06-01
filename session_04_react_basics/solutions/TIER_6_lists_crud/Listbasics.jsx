import { useState } from "react";

function ListBasics() {
  const [students] = useState([
    { id: 1, name: "Nguyễn Văn Minh", age: 20 },
    { id: 2, name: "Trần Thị An", age: 18 },
    { id: 3, name: "Lê Văn Linh", age: 21 },
    { id: 4, name: "Phạm Thị Hoa", age: 19 },
    { id: 5, name: "Hoàng Văn Nam", age: 22 },
  ]);

  // Thử thách 3: tuổi trung bình
  const tuoiTrungBinh = (students.reduce((sum, s) => sum + s.age, 0) / students.length).toFixed(1);

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Danh sách sinh viên</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#3498db", color: "white" }}>
            {/* Thử thách 1: cột STT */}
            <th style={{ padding: "10px", textAlign: "left" }}>STT</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Họ tên</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Tuổi</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id} style={{ background: index % 2 === 0 ? "#fff" : "#f9f9f9" }}>
              {/* Thử thách 1: STT */}
              <td style={{ padding: "10px", border: "1px solid #eee" }}>{index + 1}</td>
              {/* Thử thách 2: màu xanh nếu >= 20 */}
              <td
                style={{
                  padding: "10px",
                  border: "1px solid #eee",
                  color: student.age >= 20 ? "#27ae60" : "#333",
                  fontWeight: student.age >= 20 ? "bold" : "normal",
                }}
              >
                {student.name}
              </td>
              <td style={{ padding: "10px", border: "1px solid #eee", textAlign: "center" }}>{student.age}</td>
              <td style={{ padding: "10px", border: "1px solid #eee", textAlign: "center" }}>
                {student.age >= 20 ? <span style={{ color: "#27ae60" }}>✅ Đủ tuổi</span> : <span style={{ color: "#e67e22" }}>⏳ Chưa đủ</span>}
              </td>
            </tr>
          ))}
        </tbody>
        {/* Thử thách 3: tuổi trung bình */}
        <tfoot>
          <tr style={{ background: "#ecf0f1", fontWeight: "bold" }}>
            <td colSpan={2} style={{ padding: "10px" }}>
              Tuổi trung bình
            </td>
            <td style={{ padding: "10px", textAlign: "center", color: "#3498db" }}>{tuoiTrungBinh}</td>
            <td style={{ padding: "10px" }}></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ListBasics;