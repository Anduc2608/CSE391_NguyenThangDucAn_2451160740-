# Phần A:
## Câu A1:
1. Function Declaration (Khai báo hàm truyền thống)
function tinhThueBaoHiem_Declaration(luong) {
    const thue = luong > 11 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
}
2. Function Expression (Biểu thức hàm)
const tinhThueBaoHiem_Expression = function(luong) {
    const thue = luong > 11 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
};
3. Arrow Function (Hàm mũi tên - ES6)
const tinhThueBaoHiem_Arrow = (luong) => {
    const thue = luong > 11 ? luong * 0.1 : 0;
    const thuc_nhan = luong - thue;
    return { thue, thuc_nhan };
};
4. Hoisting — Khác nhau như thế nào?

- FUNCTION DECLARATION: Hoisted toàn bộ
console.log(hamDeclaration(15)); // Chạy ngon lành! Kết quả: { thue: 1.5, thuc_nhan: 13.5 }
function hamDeclaration(luong) {
    return { thue: luong > 11 ? luong * 0.1 : 0 };
}
- FUNCTION EXPRESSION & ARROW FUNCTION: KHÔNG được hoisted toàn bộ
// Trường hợp dùng 'let' hoặc 'const':
console.log(hamExpression(15)); // LỖI: ReferenceError: Cannot access 'hamExpression' before initialization
console.log(hamArrow(15));      // LỖI: ReferenceError: Cannot access 'hamArrow' before initialization
const hamExpression = function(luong) { return luong; };
const hamArrow = (luong) => luong;
// Trường hợp dùng 'var' (Cách viết cũ):
console.log(hamVar(15)); // LỖI: TypeError: hamVar is not a function
var hamVar = function(luong) { return luong; };

## Câu A2:
1. Đoạn 1 (Closure):
JavaScript
console.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2
2. Đoạn 2 (Phạm vi biến và Event Loop):
Plaintext
// Output sau 100ms:
var: 3
var: 3
var: 3

// Output sau 200ms:
let: 0
let: 1
let: 2
Tại sao var và let khác nhau trong setTimeout?
var có function scope — cả 3 lần lặp dùng chung 1 biến i duy nhất. Khi 3 callback chạy sau 100ms, loop đã kết thúc, i = 3 → cả 3 in ra 3.
let có block scope — mỗi lần lặp tạo ra 1 biến j riêng. Mỗi callback nhớ biến j của lần lặp đó → in ra 0, 1, 2.

## Câu A3:
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
nums.filter((n) => n % 2 === 0);

// 2. Nhân mỗi số với 3
nums.map((n) => n * 3);

// 3. Tính tổng tất cả
nums.reduce((sum, n) => sum + n, 0);

// 4. Tìm số đầu tiên > 7
nums.find((n) => n > 7);

// 5. Kiểm tra CÓ số > 10 không
nums.some((n) => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0
nums.every((n) => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
nums.map((n) => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);

// 8. Đảo ngược mảng (không mutate gốc)
[...nums].reverse();

## Câu A4:
1. Destructuring (Phân rã cấu trúc)
JavaScript
console.log(name, price, ram, color);  
// Output: iPhone 16 25990000 8 Titan

console.log(specs);                     
// Output: Lỗi ReferenceError: specs is not defined
Giải thích: Cú pháp specs: { ram, color } có nghĩa là: "Hãy đi vào trong thuộc tính specs, lấy ra ram và color làm các biến độc lập". Cú pháp này không tạo ra một biến tên là specs. Vì vậy, khi bạn cố gắng console.log(specs), chương trình sẽ báo lỗi vì biến này không tồn tại trong bộ nhớ.
2. Spread (Toán tử trải)
JavaScript
console.log(updated.price);            // Output: 23990000 (Đã bị ghi đè bởi giá trị mới đi sau)
console.log(updated.sale);             // Output: true (Thuộc tính mới được thêm vào)
console.log(product.price);            // Output: 25990000 (Mảng/Object gốc KHÔNG bị đổi)
Giải thích:
Khi bạn dùng { ...product }, bạn đang tạo ra một object hoàn toàn mới ở một địa chỉ bộ nhớ mới. Do đó, việc thay đổi các thuộc tính cấp 1 (như price) trên object updated sẽ không ảnh hưởng gì đến product gốc.
3. Spread Gotcha
console.log(product.specs.ram); // 16
Spread chỉ copy shallow (1 tầng). copy.specs và product.specs vẫn trỏ đến cùng 1 object trong bộ nhớ
copy.specs.ram = 16 sửa object gốc → product.specs.ram cũng thành 16.

# Phần C:
## Câu C1:
const processOrders = (orders) => orders
    .filter(({ status, total }) => status === "completed" && total > 100000)
    .map(({ id, customer, total }) => ({
        id, customer, total,
        discount: total * 0.1,
        finalTotal: total * 0.9
    }))
    .sort((a, b) => b.finalTotal - a.finalTotal);

## Câu C2:
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            // fn nhận vào 3 tham số chuẩn: giá trị hiện tại, chỉ số (index), và mảng gốc
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            // Nếu callback trả về true (truthy), đưa phần tử vào mảng kết quả
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;
        let startIndex = 0;

        // Xử lý cẩn thận trường hợp người dùng không truyền initialValue
        if (initialValue === undefined) {
            // Nếu mảng rỗng mà không có giá trị khởi tạo, JS chuẩn sẽ ném lỗi
            if (arr.length === 0) {
                throw new TypeError("Reduce of empty array with no initial value");
            }
            // Lấy phần tử đầu tiên làm giá trị khởi tạo và bắt đầu lặp từ phần tử thứ 2
            accumulator = arr[0];
            startIndex = 1;
        }

        for (let i = startIndex; i < arr.length; i++) {
            // Ghi đè lại accumulator bằng kết quả của lần chạy trước đó
            accumulator = fn(accumulator, arr[i], i, arr);
        }
        return accumulator;
    }
};

// ==========================================
// KẾT QUẢ TEST
// ==========================================
console.log(miniArray.map([1, 2, 3], x => x * 2));          
// → Output: [2, 4, 6]

console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));    
// → Output: [3, 4]

console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); 
// → Output: 10
