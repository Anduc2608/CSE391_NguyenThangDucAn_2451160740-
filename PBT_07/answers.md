# Phần A: Kiểm tra đọc hiểu
## Câu A1:
- Đoạn 1 – console.log(x) trước khi gán:
undefined — var được hoisted lên đầu scope nhưng chưa có giá trị.
- Đoạn 2 – console.log(y) trước khi khai báo let:
ReferenceError — let cũng được hoisted nhưng nằm trong Temporal Dead Zone (TDZ), không thể truy cập trước dòng khai báo.
- Đoạn 3 – Gán lại const:
TypeError — const không cho phép reassign sau khi đã khai báo.
- Đoạn 4 – arr.push(4) trên const arr:
[1, 2, 3, 4] — const chỉ khóa binding (không cho gán lại biến), không khóa nội dung của object/array.
- Đoạn 5 – Block scope với let:
"Trong block: 2" rồi "Ngoài block: 1" — hai biến a hoàn toàn độc lập nhờ block scope.
## Câu A2:
| Biểu thức          | Dự đoán                    | Thực tế            |
| ------------------ | -------------------------- | ------------------ |
| `typeof null`      | `"object"`                 | `"object"`         |
| `typeof undefined` | `"undefined"`              | `"undefined"`      |
| `typeof NaN`       | `"number"`                 | `"number"`         |
| `"5" + 3`          | `"53"`                     | `"53"`             |
| `"5" - 3`          | `2`                        | `2`                |
| `"5" * "3"`        | `15`                       | `15`               |
| `true + true`      | `2`                        | `2`                |
| `[] + []`          | `""`                       | `""`               |
| `[] + {}`          | `"[object Object]"`        | `"[object Object]"`|
| `{} + []`          | `0 hoặc "[object Object]"` | `"[object Object]"`|

"+" có 2 chế độ (nối chữ / cộng số), thấy string là chọn nối chữ
"-" chỉ có 1 chế độ (trừ số), buộc phải đổi string thành số.

## Câu A3:
| Biểu thức            | Dự đoán | Thực tế|
| -------------------- | ------- | -------|
| `5 == "5"`           | `true`  | `true` |
| `5 === "5"`          | `false` | `false`|
| `null == undefined`  | `true`  | `true` |
| `null === undefined` | `false` | `false`|
| `NaN == NaN`         | `false` | `false`|
| `0 == false`         | `true`  | `true` |
| `0 === false`        | `false` | `false`|
| `"" == false`        | `true`  | `true` |
- Dùng "===" mặc định. Nó so sánh cả giá trị lẫn kiểu, không có bất ngờ. "==" tự ép kiểu trước khi so → kết quả khó đoán, dễ bug

## Câu A4:
| Biểu thức | Dự đoán  | Thực tế |
| --------- | -------- | --------|
| `"0"`     | In "A"   | In "A"  |
| `""`      | Không in | Không in|
| `[]`      | In "C"   | In "C"  |
| `{}`      | In "D"   | In "D"  |
| `null`    | Không in | Không in|
| `0`       | Không in | Không in|
| `-1`      | In "G"   | In "G"  |
| `" "`     | In "H"   | In "H"  |

## Câu A5:
// Cách 1:
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3:
const html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;

# Phần C:
## Câu C1:
| #   | Vị trí                           | Lỗi                                           | Sửa                                    |
| --- | -------------------------------- | --------------------------------------------- | ---------------------------------------|
| 1   | `tinhGiaGiamGia("100000", 20)`   | truyền string thay vì number → tính ra `NaN`  | truyền `100000` hoặc validate trong hàm|
| 2   | `var giamGia`                    | dùng `var`                                    | đổi thành `const`                      |
| 3   | `let giaSauGiam`                 | không cần gán lại                             | đổi thành `const`                      |
| 4   | `if (giaSauGiam = 0)`            | `=` là gán chứ không phải so sánh, luôn falsy | đổi thành `===`                        |
| 5   | thiếu validate `giaBan`          | không kiểm tra input có phải số không         | thêm `typeof giaBan !== "number"`      |
| 6   | `for (var i ...)` + `setTimeout` | lỗi closure ẩn                                | đổi `var` thành `let`                  |

- Code sau khi sửa
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    // Lỗi 4+5: validate kiểu input
    if (typeof giaBan !== "number" || typeof phanTramGiam !== "number") {
        return "Lỗi: Input phải là số";
    }

    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ";
    }

    const giamGia = giaBan * phanTramGiam / 100;      // Lỗi 2: var → const
    const giaSauGiam = giaBan - giamGia;               // Lỗi 3: let → const

    if (giaSauGiam === 0) {                            // Lỗi 1: = → ===
        console.log("Sản phẩm miễn phí!");
    }

    return giaSauGiam;
}

// Test
const gia = tinhGiaGiamGia(100000, 20);               // Lỗi 4: "100000" → 100000
console.log("Giá sau giảm: " + gia + "đ");

const gia2 = tinhGiaGiamGia(50000, 110);
console.log("Giá: " + gia2);

for (let i = 0; i < 5; i++) {                         // Lỗi 6: var → let
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}