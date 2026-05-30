// ==========================================
// 1. pipe() — Nối chuỗi functions
// ==========================================
// Nhận vào một mảng các hàm. Trả về một hàm mới.
// Hàm mới này sẽ lấy giá trị đầu vào (x) và dùng reduce để chạy lần lượt qua từng hàm.
// Kết quả của hàm trước sẽ làm đầu vào cho hàm sau.
function pipe(...fns) {
    return function(initialValue) {
        return fns.reduce((currentValue, currentFunction) => {
            return currentFunction(currentValue);
        }, initialValue);
    };
}

// Rút gọn bằng Arrow Function:
// const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const process = pipe(
    x => x * 2,        // 5 → 10
    x => x + 10,       // 10 → 20
    x => x.toString(), // 20 → "20"
    x => "Kết quả: " + x
);
console.log("=== TEST PIPE ===");
console.log(process(5)); // → "Kết quả: 20"


// ==========================================
// 2. memoize() — Cache kết quả
// ==========================================
// Sử dụng Closure để giữ lại một object `cache`.
// Nếu đầu vào đã từng được tính toán, lấy ngay từ cache ra thay vì chạy lại hàm gốc.
function memoize(fn) {
    const cache = {};
    return function(...args) {
        // Biến mảng tham số thành chuỗi để làm key cho object (ví dụ: "[1000000]")
        const key = JSON.stringify(args); 
        
        // Nếu key đã tồn tại trong cache, trả về luôn kết quả lưu trước đó
        if (cache[key] !== undefined) {
            return cache[key];
        }
        
        // Nếu chưa có, chạy hàm gốc để tính toán
        const result = fn(...args);
        
        // Lưu kết quả vào cache cho lần gọi sau
        cache[key] = result;
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log("\n=== TEST MEMOIZE ===");
console.log(expensiveCalc(1000000)); // → In "Đang tính..." rồi ra 499999500000
console.log(expensiveCalc(1000000)); // → (Không in "Đang tính...", lấy cache, ra luôn kết quả)


// ==========================================
// 3. debounce() — Chờ user ngừng thao tác mới chạy
// ==========================================
// Rất hữu ích cho các ô tìm kiếm (Search), resize window, hoặc scroll.
// Nó sẽ hủy bỏ các lệnh gọi liên tục và chỉ thực thi khi đã ngừng gọi một khoảng thời gian `delay`.
function debounce(fn, delay) {
    let timeoutId;
    
    return function(...args) {
        // Hủy bỏ lần hẹn giờ trước đó nếu hàm bị gọi lại quá nhanh
        clearTimeout(timeoutId);
        
        // Đặt lại một lịch hẹn mới
        timeoutId = setTimeout(() => {
            fn.apply(this, args); // Dùng apply để giữ nguyên context (this) và truyền tham số
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching API cho từ khóa:", query);
}, 500);

console.log("\n=== TEST DEBOUNCE ===");
search("A");
search("Ap");
search("App");
search("Appl");
search("Apple"); // Chỉ dòng này được in ra sau 500ms


// ==========================================
// 4. retry() — Thử lại nếu lỗi (Async/Await)
// ==========================================
// Hàm này cực kỳ cần thiết khi gọi API, vì mạng có thể chập chờn.
// Nếu Promise bị reject (lỗi), nó sẽ thử lại vòng lặp cho đến khi hết `maxAttempts`.
async function retry(fn, maxAttempts = 3) {
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        try {
            // Cố gắng chạy hàm async
            return await fn(); 
        } catch (error) {
            attempts++;
            console.log(`Lỗi lần ${attempts}. Đang thử lại...`);
            
            // Nếu đã thử hết số lần cho phép mà vẫn lỗi thì báo lỗi thực sự
            if (attempts >= maxAttempts) {
                throw new Error(`Đã thử ${maxAttempts} lần nhưng vẫn thất bại! Chi tiết: ${error.message}`);
            }
        }
    }
}

console.log("\n=== TEST RETRY ===");
// Giả lập một API gọi bị lỗi 2 lần đầu, lần 3 mới thành công
let callCount = 0;
const unstableApiCall = async () => {
    callCount++;
    if (callCount < 3) {
        throw new Error("Mạng bị lag!");
    }
    return "Lấy dữ liệu thành công!";
};

// Gọi thử hàm retry
retry(unstableApiCall, 3)
    .then(res => console.log("Kết quả cuối cùng:", res))
    .catch(err => console.log(err.message));