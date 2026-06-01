function SimpleVariables() {
  // Thử thách 1: Thông tin cá nhân
  const ten = "Đặng Nguyên Trường";
  const tuoi = 21;
  const queQuan = "Hà Nội";

  // Thử thách 2: Chào theo buổi
  const gio = new Date().getHours();
  const loi_chao = gio < 12 ? "Chào buổi sáng ☀️" : gio < 18 ? "Chào buổi chiều 🌤️" : "Chào buổi tối 🌙";

  // Thử thách 3: BMI
  const canNang = 65; // kg
  const chieuCao = 1.7; // mét
  const bmi = (canNang / (chieuCao * chieuCao)).toFixed(1);
  const xepLoaiBMI = bmi < 18.5 ? "Thiếu cân" : bmi < 25 ? "Bình thường" : bmi < 30 ? "Thừa cân" : "Béo phì";

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Thử thách 1 */}
      <div style={{ marginBottom: "20px", padding: "15px", background: "#eaf4fb", borderRadius: "8px" }}>
        <h2>Thử thách 1 — Thông tin cá nhân</h2>
        <p>
          Họ tên: <strong>{ten}</strong>
        </p>
        <p>
          Tuổi: <strong>{tuoi}</strong>
        </p>
        <p>
          Năm sinh: <strong>{new Date().getFullYear() - tuoi}</strong>
        </p>
        <p>
          Quê quán: <strong>{queQuan}</strong>
        </p>
      </div>

      {/* Thử thách 2 */}
      <div style={{ marginBottom: "20px", padding: "15px", background: "#fef9e7", borderRadius: "8px" }}>
        <h2>Thử thách 2 — Lời chào theo buổi</h2>
        <p style={{ fontSize: "24px" }}>{loi_chao}</p>
        <p style={{ color: "#666" }}>Giờ hiện tại: {gio}h</p>
      </div>

      {/* Thử thách 3 */}
      <div style={{ padding: "15px", background: "#eafaf1", borderRadius: "8px" }}>
        <h2>Thử thách 3 — Chỉ số BMI</h2>
        <p>
          Cân nặng: <strong>{canNang} kg</strong>
        </p>
        <p>
          Chiều cao: <strong>{chieuCao} m</strong>
        </p>
        <p>
          BMI: <strong style={{ fontSize: "24px" }}>{bmi}</strong>
        </p>
        <p>
          Xếp loại:{" "}
          <strong
            style={{
              color: xepLoaiBMI === "Bình thường" ? "#27ae60" : "#e74c3c",
            }}
          >
            {xepLoaiBMI}
          </strong>
        </p>
      </div>
    </div>
  );
}

export default SimpleVariables;