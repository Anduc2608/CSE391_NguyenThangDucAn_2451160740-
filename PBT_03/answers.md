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

Câu A3:
1. Trường hợp 1: content-box (mặc định)
.box-1 {
  width: 400px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
- Chiều rộng hiển thị = width + padding×2 + border×2 = 400 + (20×2) + (5×2) = 450px
- Không gian chiếm trên trang = chiều rộng hiển thị + margin×2 = 450 + (10×2) = 470px
2. Trường hợp 2 — border-box
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
- Chiều rộng hiển thị = 400px
- Kích thước content thực tế = width - padding×2 - border×2 = 400 - (20x2) - (5x2) = 350px
- Không gian chiếm trên trang = 400 + (10x2) = 420px
3. Trường hợp 3 — Margin Collapse
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
- Khoảng cách giữa box-a và box-b = 40px
- Không phải 65px vì đây là hiện tượng margin collapse: khi hai block element nằm chồng dọc, margin của chúng không cộng dồn mà gộp làm một, lấy giá trị lớn hơn. CSS - lấy max(25, 40) = 40px.
4. Nâng cao — Margin âm
- Khoảng cách = 30px
- Khi có negative margin, quy tắc collapse vẫn áp dụng nhưng theo cách: lấy giá trị dương lớn nhất (40px) rồi cộng với giá trị âm lớn nhất (-10px) = 40 + (-10) = 30px

Câu A4:
p → tag = 1 → (0, 0, 1)
.price → class = 1 → (0, 1, 0)
#main-price → ID = 1 → (1, 0, 0)
p.price → tag(1) + class(1) → (0, 1, 1)
- Element có màu gì?
→ Màu đỏ, vì #main-price có specificity cao nhất
- Nếu có inline CSS:
style="color: orange;"
→ Màu cam, vì inline CSS ưu tiên cao hơn rule thường.
- Nếu Rule A có !important:
p { color: black !important; }
→ Màu đen, vì !important mạnh hơn specificity thông thường.

# Phần B
Câu B1:
Các selector đã sử dụng
1. Element selector
- body
- table
- footer
2. Class selector
- .profile
- .active
3. ID selector
- #main-header
4. Descendant selector
- nav a
- .profile p
5. Pseudo-class selector
- nav a:hover
- tr:nth-child(even)
- tr:hover


Câu B2:
1. Phần 1 — Box Model
- Hộp 1 (content-box)
Chiều rộng thực tế = 350px
Tính:
300 + (20×2) + (5×2)
= 350px
- Hộp 2 (border-box)
Chiều rộng thực tế = 300px
Padding và border đã nằm bên trong width.
- Giải thích sự khác biệt
+ content-box: width chỉ tính phần content.
+ border-box: width bao gồm content + padding + border.
2. Phần 2 — Layout 3 cột
- Nếu KHÔNG dùng border-box
Tổng chiều rộng sẽ lớn hơn 1000px vì:
+ padding bị cộng thêm vào width thực tế.
Ví dụ:
250 + 30
500 + 40
250 + 30
= 1100px
Layout sẽ bị tràn.
- Nếu dùng border-box
Padding được tính bên trong width nên:
250 + 500 + 250
= đúng 1000px
Layout hiển thị chính xác.
 

Câu B3:
1. Liệt kê 10 rules + specificity score
- p { color: gray; } - Specificity: (0, 0, 1)
- html p { color: sienna; } - Specificity: (0, 0, 2)
- .text { color: blue; } - Specificity: (0, 1, 0)
- p.text { color: green; } - Specificity: (0, 1, 1)
- .text.highlight { color: orange; } - Specificity: (0, 2, 0)
- p.text.highlight { color: purple; } - Specificity: (0, 2, 1)
- #demo { color: crimson; } - Specificity: (1, 0, 0)
- p#demo { color: deeppink; } - Specificity: (1, 0, 1)
- #demo.text { color: darkorange; } - Specificity: (1, 1, 0)
- p#demo.text.highlight { color: red; } - Specificity: (1, 2, 1) ← THẮNG!
2. Element cuối cùng hiển thị màu gì? Tại sao?
Màu: red — do Rule 10 có selector p#demo.text.highlight với specificity cao nhất.
Tính theo hệ 3 cột (ID, Class, Tag):
- p → tag → cột Tag +1 → (0, 0, 1)
- #demo → ID → cột ID +1 → (1, 0, 0)
- .text → class → cột Class +1 → (0, 1, 0)
- .highlight → class → cột Class +1 → (0, 1, 0)
- Tổng: (1, 2, 1)
So sánh với tất cả rules còn lại từ cột trái sang phải — Rule 10 có cột ID = 1, trong khi Rules 1–6 có cột ID = 0 nên thua ngay. Rules 7–9 tuy cùng cột ID = 1 nhưng cột Class thấp hơn (tối đa 1, trong khi Rule 10 có 2) → Rule 10 thắng tất cả.
3. Thay đổi thứ tự rules trong CSS — Kết quả có đổi không?
- Không đổi.
- Khi các rules có specificity khác nhau, thứ tự viết trong file CSS không ảnh hưởng. Rule có specificity cao hơn luôn thắng dù viết trước hay sau.
- Thứ tự chỉ quan trọng khi 2 rules có specificity bằng nhau — lúc đó rule viết sau thắng (cascade). Ví dụ nếu có 2 rule cùng specificity 121, rule nào đứng sau trong file CSS sẽ được áp dụng.

# Phần C

Câu C1:
1. Tính chiều rộng thực tế
- Sidebar
300 + 20×2 + 1×2
= 342px
- Content
660 + 30×2 + 1×2
= 722px
- Tổng
342 + 722
= 1064px
2. Vì sao layout bị vỡ?
- Container chỉ rộng: 960px
- Nhưng tổng chiều rộng thực tế: 1064px
→ vượt quá container nên .content bị đẩy xuống dòng mới.
3. Cách sửa 1 — Dùng border-box
* {
    box-sizing: border-box;
}
- Khi đó:
+ width đã bao gồm padding + border
+ sidebar vẫn đúng 300px
+ content vẫn đúng 660px
+ tổng = 960px
4. Cách sửa 2 — Không dùng border-box
Giảm width thực tế:
.sidebar {
    width: 258px;
}
.content {
    width: 598px;
}
Vì:
258 + 40 + 2 = 300
598 + 60 + 2 = 660
→ tổng cuối cùng = 960px.

Câu C2:
1. “Sản phẩm A” (h2.title.highlight)
- font-size = 20px
- color = green
Giải thích:
- .card .title → font-size: 20px
- #featured .title → color: red
- .highlight → color: green !important
!important thắng nên màu cuối là xanh lá.
2. “Mô tả sản phẩm” (p trong featured card)
- color = blue
 Giải thích:
- .card có color: blue
- p { color: inherit; } → kế thừa màu từ .card
Nên <p> nhận màu xanh dương.
3. “Sản phẩm B” (h2.title)
- font-size = 20px
- color = blue
Giải thích:
- .card .title → font-size: 20px
- Không có rule riêng cho màu của h2
- nên kế thừa color: blue từ .card
4. “Mô tả sản phẩm B” (p.highlight)
- color = green
Giải thích:
- .card p → color: inherit → nhận blue
- nhưng .highlight { color: green !important; }
- !important ghi đè màu xanh dương
