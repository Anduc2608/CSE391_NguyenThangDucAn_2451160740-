const students = [
    { name: "An",    math: 8,  physics: 7, cs: 9, gender: "M" },
    { name: "Bình",  math: 6,  physics: 9, cs: 7, gender: "F" },
    { name: "Chi",   math: 9,  physics: 6, cs: 8, gender: "F" },
    { name: "Dũng",  math: 5,  physics: 5, cs: 6, gender: "M" },
    { name: "Em",    math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3,  physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7,  physics: 7, cs: 7, gender: "F" },
    { name: "Huy",   math: 4,  physics: 6, cs: 3, gender: "M" },
];

// ─── 1. Tính điểm TB và xếp loại ────────────────────────────────────────────

for (let i = 0; i < students.length; i++) {
    const s = students[i];
    s.avg = Math.round((s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3) * 10) / 10;

    if      (s.avg >= 8.0) s.rank = "Giỏi";
    else if (s.avg >= 6.5) s.rank = "Khá";
    else if (s.avg >= 5.0) s.rank = "Trung bình";
    else                   s.rank = "Yếu";
}

// ─── 2. In bảng kết quả ──────────────────────────────────────────────────────

function pad(str, len) {
    str = String(str);
    while (str.length < len) str += " ";
    return str;
}

console.log("| STT | Tên    | TB   | Xếp loại   |");
console.log("|-----|--------|------|------------|");

for (let i = 0; i < students.length; i++) {
    const s = students[i];
    console.log(`| ${pad(i + 1, 3)} | ${pad(s.name, 6)} | ${pad(s.avg.toFixed(1), 4)} | ${pad(s.rank, 10)} |`);
}

// ─── 3. Đếm số SV mỗi xếp loại ──────────────────────────────────────────────

const count = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };
for (let i = 0; i < students.length; i++) {
    count[students[i].rank]++;
}

console.log("\n── Phân loại ──");
for (const rank in count) {
    console.log(`  ${pad(rank, 10)}: ${count[rank]} SV`);
}

// ─── 4. Cao nhất / thấp nhất ─────────────────────────────────────────────────

let best = students[0];
let worst = students[0];
for (let i = 1; i < students.length; i++) {
    if (students[i].avg > best.avg)  best  = students[i];
    if (students[i].avg < worst.avg) worst = students[i];
}

console.log("\n── Điểm nổi bật ──");
console.log(`  Cao nhất : ${best.name}  (${best.avg.toFixed(1)})`);
console.log(`  Thấp nhất: ${worst.name} (${worst.avg.toFixed(1)})`);

// ─── 5. Điểm TB toàn lớp từng môn ───────────────────────────────────────────

let totalMath = 0, totalPhysics = 0, totalCs = 0;
for (let i = 0; i < students.length; i++) {
    totalMath    += students[i].math;
    totalPhysics += students[i].physics;
    totalCs      += students[i].cs;
}

const n = students.length;
console.log("\n── TB toàn lớp theo môn ──");
console.log(`  Toán  : ${(totalMath    / n).toFixed(2)}`);
console.log(`  Lý    : ${(totalPhysics / n).toFixed(2)}`);
console.log(`  CNTT  : ${(totalCs      / n).toFixed(2)}`);

// ─── 6. Bonus: TB theo giới tính ─────────────────────────────────────────────

let sumM = 0, countM = 0, sumF = 0, countF = 0;
for (let i = 0; i < students.length; i++) {
    if (students[i].gender === "M") { sumM += students[i].avg; countM++; }
    else                            { sumF += students[i].avg; countF++; }
}

console.log("\n── TB theo giới tính ──");
console.log(`  Nam (M): ${(sumM / countM).toFixed(2)}  (${countM} SV)`);
console.log(`  Nữ (F): ${(sumF / countF).toFixed(2)}  (${countF} SV)`);