// ─── Data ────────────────────────────────────────────────────────────────────

const order = [
    { name: "Phở bò",   price: 65000, qty: 2 },
    { name: "Trà đá",   price:  5000, qty: 3 },
    { name: "Bún chả",  price: 55000, qty: 1 },
    { name: "Cơm tấm",  price: 45000, qty: 2 },
    { name: "Nước cam", price: 25000, qty: 2 },
];

const includeTip = true;
const date       = new Date(); // thay bằng new Date("2025-01-22") để test thứ 4

// ─── Logic ───────────────────────────────────────────────────────────────────

function tinhHoaDon(items, withTip, ngay) {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Giảm giá theo tổng
    let discountRate = 0;
    if      (subtotal > 1000000) discountRate = 15;
    else if (subtotal > 500000)  discountRate = 10;

    // Thêm 5% nếu thứ 4 (Wednesday = 3)
    const isWednesday = ngay.getDay() === 3;
    if (isWednesday) discountRate += 5;

    const discountAmt = Math.round(subtotal * discountRate / 100);
    const afterDisc   = subtotal - discountAmt;
    const vatAmt      = Math.round(afterDisc * 8 / 100);
    const tipAmt      = withTip ? Math.round(afterDisc * 5 / 100) : 0;
    const total       = afterDisc + vatAmt + tipAmt;

    return { subtotal, discountRate, discountAmt, vatAmt, tipAmt, total, isWednesday };
}

// ─── Formatting ──────────────────────────────────────────────────────────────

const WIDTH = 44; // inner width (between ║ and ║)

function fmt(n) {
    return n.toLocaleString("vi-VN") + "đ";
}

function fmtK(n) {
    return (n / 1000) + "k";
}

function line(content) {
    // pad content to WIDTH with spaces, then wrap with ║
    const pad = WIDTH - content.length;
    return "║" + content + " ".repeat(Math.max(0, pad)) + "║";
}

function twoCol(label, value) {
    // left-align label, right-align value within WIDTH
    const gap = WIDTH - label.length - value.length;
    return line(label + " ".repeat(Math.max(1, gap)) + value);
}

function divider(left, right, fill) {
    return left + fill.repeat(WIDTH) + right;
}

function printBill(items, withTip, ngay) {
    const { subtotal, discountRate, discountAmt, vatAmt, tipAmt, total, isWednesday }
        = tinhHoaDon(items, withTip, ngay);

    const dayNote = isWednesday ? " (+5% thứ 4)" : "";

    const rows = [];
    rows.push(divider("╔", "╗", "═"));
    rows.push(line("        HÓA ĐƠN NHÀ HÀNG"));
    rows.push(divider("╠", "╣", "═"));

    // Danh sách món
    items.forEach((item, i) => {
        const lineTotal = item.price * item.qty;
        const left  = ` ${i + 1}. ${item.name}  x${item.qty}  @${fmtK(item.price)}`;
        const right = `= ${fmtK(lineTotal)} `;
        const gap   = WIDTH - left.length - right.length;
        rows.push("║" + left + " ".repeat(Math.max(1, gap)) + right + "║");
    });

    rows.push(divider("╠", "╣", "═"));
    rows.push(twoCol(` Tổng cộng:`, fmt(subtotal) + " "));
    rows.push(twoCol(` Giảm giá (${discountRate}%${dayNote}):`, `-${fmt(discountAmt)} `));
    rows.push(twoCol(` VAT (8%):`, `+${fmt(vatAmt)} `));

    if (withTip) {
        rows.push(twoCol(` Tip (5%):`, `+${fmt(tipAmt)} `));
    }

    rows.push(divider("╠", "╣", "═"));
    rows.push(twoCol(` THANH TOÁN:`, fmt(total) + " "));
    rows.push(divider("╚", "╝", "═"));

    rows.forEach(r => console.log(r));
}

// ─── Run ─────────────────────────────────────────────────────────────────────

printBill(order, includeTip, date);

// Test thêm: đơn nhỏ không giảm giá
console.log("\n--- Test: Đơn nhỏ ---\n");
printBill([
    { name: "Phở bò",  price: 65000, qty: 2 },
    { name: "Trà đá",  price:  5000, qty: 3 },
    { name: "Bún chả", price: 55000, qty: 1 },
], false, date);

// Test: Đơn > 1 triệu
console.log("\n--- Test: Đơn > 1 triệu ---\n");
printBill([
    { name: "Bò wagyu",    price: 450000, qty: 2 },
    { name: "Tôm hùm",     price: 350000, qty: 1 },
    { name: "Rượu vang",   price: 200000, qty: 1 },
], true, date);