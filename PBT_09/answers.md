# Phần A:
## Câu A1:
1. Sơ đồ cây DOM (DOM Tree)
div#app
├── header
│   ├── h1 ("Todo App")
│   └── nav
│       ├── a.active (href="#", "All")
│       ├── a (href="#", "Active")
│       └── a (href="#", "Completed")
└── main
    ├── form#todoForm
    │   ├── input#todoInput (type="text")
    │   └── button (type="submit", "Add")
    └── ul#todoList
        ├── li.todo-item ("Learn HTML")
        └── li.todo-item.completed ("Learn CSS")

2. Các lệnh querySelector
Lưu ý: Đối với các yêu cầu lấy "tất cả", chúng ta sử dụng querySelectorAll để trả về một NodeList, còn lấy một phần tử duy nhất thì dùng querySelector.
- Chọn thẻ <h1>
JavaScript
document.querySelector('h1');
- Chọn input trong form
JavaScript
document.querySelector('#todoForm input'); 
// Hoặc ngắn gọn hơn vì input đã có id: document.querySelector('#todoInput');
- Chọn tất cả .todo-item
JavaScript
document.querySelectorAll('.todo-item');
- Chọn link đang active
JavaScript
document.querySelector('a.active');
- Chọn <li> đầu tiên trong #todoList
JavaScript
document.querySelector('#todoList li'); 
// querySelector mặc định luôn lấy phần tử đầu tiên nó tìm thấy. 
// Bạn cũng có thể dùng CSS pseudo-class cho tường minh: document.querySelector('#todoList li:first-child');
- Chọn tất cả <a> bên trong <nav>
JavaScript
document.querySelectorAll('nav a');

## Câu A2:
1. so sánh
|                 | textContent                 | innerHTML                        |
| --------------- | --------------------------- | ---------------------------------|
| Đọc/ghi         | Text thuần                  | HTML có thể parse                |
| Tốc độ          | Nhanh hơn                   | Chậm hơn                         |
| Bảo mật         | An toàn                     | Nguy hiểm nếu dùng với user input|
| Render tag HTML | Không (hiển thị nguyên văn) | Có                               |
2. ví dụ
- Dùng innerHTML: Khi bạn thực sự muốn tạo ra giao diện, render các thẻ HTML động từ mã JavaScript.
JavaScript
// Bạn muốn hiển thị chữ in đậm và có màu sắc
document.querySelector("#message").innerHTML = "<strong>Thành công!</strong> Bạn đã đăng nhập.";
- Dùng textContent: Khi bạn chỉ muốn hiển thị nội dung văn bản đơn thuần, đặc biệt là dữ liệu do người dùng nhập vào.
JavaScript
// Cập nhật tên người dùng lên màn hình
const userName = "Nguyễn Văn A";
document.querySelector("#profileName").textContent = userName;
3. Tại sao innerHTML gây XSS?
Vì innerHTML buộc trình duyệt phải biên dịch chuỗi thành DOM. Nếu chuỗi chứa mã độc (như <script> hoặc <img onerror="...">), trình duyệt sẽ chạy mã đó ngay lập tức, giúp hacker đánh cắp dữ liệu hoặc phá hoại trang web.
4. Cách sửa code (Fix)
Sử dụng textContent để ép trình duyệt hiểu input chỉ là một đoạn văn bản bình thường, vô hiệu hóa mã độc.
JavaScript
const userInput = document.querySelector("#search").value;
// Sửa innerHTML thành textContent để chống XSS
document.querySelector("#result").textContent = userInput;
## Câu A3:
1. Khi click vào button (Mặc định)
Output:
Plaintext

BUTTON
INNER
OUTER
Giải thích: Theo mặc định, addEventListener sử dụng cơ chế Event Bubbling (Nổi bọt sự kiện). Khi bạn click vào <button>, sự kiện click sẽ kích hoạt tại chính nó trước, sau đó "nổi bọt" ngược lên các phần tử cha theo thứ tự từ trong ra ngoài: #btn $\rightarrow$ #inner $\rightarrow$ #outer.
2. Khi uncomment e.stopPropagation()
Output:
Plaintext

BUTTON
Giải thích: Hàm e.stopPropagation() có nhiệm vụ ngăn chặn sự lan truyền của sự kiện. Ngay sau khi hàm này được gọi trong sự kiện của #btn, vòng đời của sự kiện click sẽ dừng lại lập tức. Sự kiện không thể tiếp tục nổi bọt lên #inner và #outer được nữa, do đó hai hàm kia không được kích hoạt.
## Phần C:
## Câu C1:
 // App: Counter with history
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");
let count = 0;

// FIX LỖI 7: Dùng Event Delegation trên thẻ cha để quản lý sự kiện xóa li (kể cả li cũ được load lại)
historyList.addEventListener("click", function(e) {
    if (e.target && e.target.tagName === "LI") {
        deleteHistory(e.target);
    }
});

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.textContent = count; // Dùng textContent an toàn hơn innerHTML
    
    // Lưu history
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    // Không cần gán trực tiếp event li.addEventListener ở đây nữa nhờ Event Delegation phía trên
    historyList.append(li);
});

// FIX LỖI 1: Đổi "onclick" thành "click"
document.querySelector("#decrementBtn").addEventListener("click", function() {
    count--;
    countDisplay.textContent = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    // FIX LỖI 2: Đổi gán đè biến const thành cập nhật textContent
    countDisplay.textContent = count;
    // FIX LỖI 3: Đổi null thành chuỗi rỗng ""
    historyList.innerHTML = "";
});

function deleteHistory(element) {
    element.remove(); // Dùng thẳng hàm remove() ngắn gọn và hiện đại hơn
}

// Clear all history
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        // FIX LỖI 4: Thêm dấu () để thực thi hàm remove()
        item.remove();
    });
});

// Save to localStorage
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

// Load from localStorage
window.addEventListener("load", () => {
    // FIX LỖI 5: Ép kiểu dữ liệu về Number và bọc giá trị mặc định phòng khi lần đầu chạy app
    count = Number(localStorage.getItem("count")) || 0;
    countDisplay.textContent = count;
    
    // FIX LỖI 6: Khôi phục lại HTML của danh sách lịch sử cũ
    historyList.innerHTML = localStorage.getItem("history") || "";
});

## Câu C2:
1. Tại sao gắn 1000 sự kiện riêng lẻ là BAD PRACTICE?
- Tốn bộ nhớ (RAM): Tạo ra 1000 hàm xử lý chạy ngầm, dễ gây lag, đặc biệt trên mobile.
- Tải chậm: Trình duyệt mất thời gian duyệt và đăng ký 1000 sự kiện lúc khởi tạo.
- Khó quản lý: Khi thêm/xóa phần tử động (ví dụ: phần tử thứ 1001), lại phải mất công gán hoặc gỡ event.
2. Event Delegation giải quyết thế nào?
- Thay vì gắn 1000 nơi, ta chỉ gắn 1 sự kiện duy nhất vào phần tử CHA.
- Nhờ cơ chế Event Bubbling (Nổi bọt), khi bạn click vào phần tử con, sự kiện sẽ tự động bay ngược lên cha. Tại cha, chỉ cần dùng e.target để kiểm tra chính xác thẻ con nào vừa được click.
3. Code Refactor với DocumentFragment
JavaScript
// 1. Tạo mảnh đệm trong bộ nhớ (ẩn, không nằm trên DOM thật)
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    
    // 2. Thêm vào fragment (chỉ tốn RAM, không gây Reflow giao diện)
    fragment.appendChild(div); 
}

// 3. Đẩy 1 lần duy nhất vào DOM thật → Chỉ Reflow đúng 1 lần!
document.body.appendChild(fragment);
4. Tại sao DocumentFragment nhanh hơn?
- Mã gốc: Duyệt 1000 lần, bắt trình duyệt phải tính toán lại kích thước, vị trí giao diện (Reflow) và vẽ lại màn hình (Repaint) đúng 1000 lần $\rightarrow$ Gây thắt nút cổ chai hiệu năng.
- Dùng Fragment: Biến 1000 lần thao tác nặng nề trên màn hình thành các thao tác xử lý dữ liệu thuần túy trong RAM. Kết quả là gom gọn lại thành đúng 1 lần Reflow duy nhất, giúp ứng dụng mượt mà hơn gấp nhiều lần.
