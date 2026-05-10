# Phần A

Câu A1:
1. Inline CSS
Inline CSS là viết trực tiếp trong thuộc tính style của thẻ HTML.
Ví dụ
<p style="color: red; font-size: 20px;">
    Xin chào
</p>

- Ưu điểm
+ Nhanh, đơn giản
+ Dễ test giao diện tức thời
+ CSS chỉ tác động đúng 1 phần tử
- Nhược điểm
+ Code HTML bị rối
+ Khó bảo trì khi dự án lớn
+ Không tái sử dụng được
+ Vi phạm nguyên tắc tách giao diện và nội dung
- Khi nên dùng
+ Test nhanh
+ Chỉnh riêng 1 phần tử
+ Email HTML hoặc trường hợp đặc biệt cần ưu tiên cao

2. Internal CSS
Internal CSS được viết trong thẻ <style> bên trong file HTML.
Ví dụ
<!DOCTYPE html>
<html>
<head>
    <style>
        p {
            color: blue;
            font-size: 20px;
        }
    </style>
</head>
<body>
    <p>Xin chào</p>
</body>
</html>

- Ưu điểm
+ Gọn hơn inline
+ Dễ quản lý hơn
+ Áp dụng cho nhiều phần tử trong cùng trang
- Nhược điểm
+ Chỉ dùng được cho 1 file HTML
+ Không tái sử dụng giữa nhiều trang
+ File HTML có thể dài và khó đọc
- Khi nên dùng
+ Website nhỏ
+ Trang đơn lẻ
+ Demo hoặc bài thực hành
3. External CSS
External CSS được đặt trong file .css riêng và liên kết bằng thẻ <link>.
Ví dụ
File HTML
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <p>Xin chào</p>
</body>
</html>
File style.css
p {
    color: green;
    font-size: 20px;
}

- Ưu điểm
+ Chuyên nghiệp nhất
+ Tái sử dụng cho nhiều trang
+ Dễ bảo trì
+ HTML sạch và dễ đọc
+ Trình duyệt có thể cache file CSS → tải nhanh hơn
- Nhược điểm
+ Cần thêm file riêng
+ Nếu file CSS lỗi hoặc không load được thì giao diện mất style
- Khi nên dùng
+ Website thực tế
+ Dự án lớn
+ Hệ thống nhiều trang

- Câu hỏi thêm:
+ Inline CSS được ưu tiên cao hơn vì nó gắn trực tiếp vào phần tử HTML, nên trình duyệt xem đây là kiểu định dạng “cụ thể” nhất cho element đó.
+ Trong CSS, trình duyệt sẽ xét theo cơ chế cascade với thứ tự ưu tiên như sau:
!important
   → Inline CSS
      → Internal / External CSS

- Nếu các rule có cùng mức ưu tiên và cùng specificity thì:
+ rule khai báo phía sau sẽ được áp dụng.
- Inline CSS có specificity rất cao (1,0,0,0), vì vậy nó thường mạnh hơn các selector thông thường như:
+ tag selector (p, div)
+ class selector (.box)
+ id selector (#menu)
- Tuy nhiên, đây không phải ưu tiên tuyệt đối. Nếu một rule trong internal hoặc external CSS được thêm !important, thì rule đó vẫn có thể ghi đè inline CSS thông thường.

Câu A2: 
1. h1                           → Chọn: ShopTLU
2. .price                       → Chọn: 25.990.000đ ,45.990.000đ
3. #app header                  → Chọn: toàn bộ phần header chứa: ShopTLU, Home, Products, About.
4. nav a:first-child             → Chọn: Home (Vì đây là thẻ <a> đầu tiên bên trong <nav>.)
5. .product.featured h2         → Chọn: MacBook Pro(Vì selector yêu cầu: element có cả class product và featured rồi lấy thẻ h2 bên trong.)
6. article > p                  → Chọn: Chọn tất cả thẻ <p> là con trực tiếp của <article>: 25.990.000đ ,Mô tả sản phẩm... ,45.990.000đ, Mô tả sản phẩm...
7. a[href="/"]                  → Chọn: Home (Vì thẻ <a> này có thuộc tính: href="/" )
8. .top-bar.dark h1              → Chọn: ShopTLU (Vì: .top-bar.dark nghĩa là element có đồng thời class top-bar và dark)