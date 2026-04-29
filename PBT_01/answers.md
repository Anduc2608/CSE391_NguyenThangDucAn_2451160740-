# Phần A: Đọc hiểu
Câu A1:
- khi gõ "shopee.vn" rồi nhấn enter:
1. Trình duyệt phải hỏi DNS địa chỉ IP của "shopee.vn" 
2. Gửi request từ laptop -> router Wifi -> qua nhà mạng VNPT -> chạy xuyên cáp quang biển
3. đến Data Center của shopee
4. sever xử lý "An muốn xem trang chủ "
5. response chạy ngược lại: cáp quang -> VNPT -> router -> laptop
6. chrome nhận file HTML,CSS,JS -> render giao diện -> An thấy trang chủ shopee
- nguồn tham chiếu: 01_introduction_html_universe.md + Cuộc Hành Trình 0.3 Giây Xuyên Đại Dương
- Tab Network cho thấy toàn bộ các request mà trình duyệt gửi đi khi tải trang
![alt text](screenshots/CauA1-1.png)

Câu A2:
- Lỗi 1: sử dụng thẻ <div> thay cho các thành phần định danh (header , main , footer)
Đang dùng <div class="header">, <div class="main">... Những thẻ này bot không hiểu
- Lỗi 2: Thiếu các thẻ tiêu đề (h1-h6)
Tên sản phẩm "iPhone 16 Pro" đang nằm trong thẻ <div class="title">. Google không biết đây là tên của nội dung chính trên trang
- Lỗi 3: Menu không chuẩn 
các liên kết menu nằm rời rạc trong các thẻ <div>
- Lỗi 4: Thẻ hình ảnh thiếu thuộc tính alt
Thẻ <img> không có mô tả. Google không thể "nhìn" thấy ảnh, nó chỉ đọc được văn bản

# sửa lại
<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
</header>

<main>
    <article class="product">
        <h1 class="title">iPhone 16 Pro</h1>
        <p class="price">25.990.000đ</p>
        <figure class="image">
            <img src="iphone.jpg" alt="iPhone 16 Pro chính hãng">
        </figure>
    </article>
</main>

<footer>
    <p>© 2026 ShopTLU</p>
</footer>

Câu A3:
─────────────
    Hộp 1       ← div: chiếm cả hàng
─────────────
Text A Text B     ← span: nằm cùng hàng nhau
─────────────
    Hộp 2       ← div: xuống hàng mới
─────────────
Text C **Text D**  ← span + strong: cùng hàng, Text D in đậm
─────────────
    Hộp 3       ← div: xuống hàng mới
─────────────

Câu A4:
- <thead> là phần đầu bảng 
Mục đích: Chứa các tiêu đề của cột
- <tbody> là phần thân bảng 
Mục đích: chứa toàn bộ các dòng dữ liệu thực tế
<tfoot> là phần chân bảng 
Mục đích: Chứa thông tin tổng kết

- Lý do khồn nên dùng table để tạo layout trang web
Lý do 1: thẻ <table> được sinh ra để hiển thị dữ liệu dạng bảng, google sẽ nhầm trang web của bạn sang 1 mảng dữ liệu khổng lồ -> SEO kém
Lý do 2: Khi xem trên màn hình điện thoại nhỏ, các cột trong <table> rất khó để tự động co giãn hoặc xếp chồng lên nhau -> gây khó chịu
Lý do 3: Trình duyệt thường có xu hướng đợi tải xong toàn bộ nội dung bên trong thẻ <table> rồi mới bắt đầu hiển thị nó ra màn hình -> tốc độ tải trang chậm

# Phần B
Câu B3:
Lỗi 1: Dòng 1 — <!DOCTYPE> thiếu html — Sửa: Thay bằng <!DOCTYPE html>
Lỗi 2: Dòng 1 — Thẻ <html> thiếu thuộc tính ngôn ngữ — Sửa: Thêm lang="vi"
Lỗi 3: Dòng 2 — Thẻ <title> chưa đóng — Sửa: Thêm </title>
Lỗi 4: Dòng 3 — Sai giá trị charset — Sửa: Thay utf8 bằng UTF-8
Lỗi 5: Dòng 5 — Sai thẻ đóng <h1> (đang ghi là <h1>) — Sửa: Thay bằng </h1>
Lỗi 6: Dòng 9 — Thẻ đóng <a> bị viết sai (<a>) — Sửa: Thay bằng </a>
Lỗi 7: Dòng 17 — Thuộc tính src thiếu dấu ngoặc kép và ảnh thiếu thẻ alt — Sửa: src="iphone.jpg" alt="iPhone 16 Pro"
Lỗi 8: Dòng 19 — Sai thứ tự đóng thẻ (Bọc <b> ngoài <p> nhưng đóng ngược) — Sửa: <b>Giá: 25.990.000đ</b>
Lỗi 9: Dòng 23 — Dùng <td> cho tiêu đề bảng — Sửa: Thay bằng <th> nằm trong <thead>
Lỗi 10: Dòng 34 — Dùng thẻ <main> lần thứ hai (Mỗi trang chỉ được có duy nhất một thẻ <main>) — Sửa: Thay bằng thẻ <aside>
Lỗi 11: Dòng 38 — Thẻ <p> ở footer chưa đóng — Sửa: Thêm </p>
Câu B4:
 1. 3 thẻ semantic HTML5 mà trang đó sử dụng
 - Thẻ <header>:
![Thẻ header](screenshots/CauB4_Header.png)
 - Thẻ <footer>:
 ![Thẻ footer](screenshots/CauB4_Footer.png)
 - Thẻ <body>:
 ![Thẻ body](screenshots/CauB4_Body.png)
 2. 
 - Thẻ <table>:
 ![Thẻ table](screenshots/CauB4_Table.png)
- Bảng đang hiển thị so sánh các phiên bản iPhone (Pro Max) theo 3 cột:
Các phiên bản
Giá bán thị trường quốc tế 
Giá bán tại Thế Giới Di Động
- Có <tbody> và không có <thead>
3. 
![thẻ form](screenshots/CauB4_Form.png)
Form có action là <action="/tim-kiem">
Không có method
Input có 2 loại là text để nhập và button để click
# Phần C: Suy Luận
Câu C1:
<!DOCTYPE html> <!-- Khai báo HTML5 -->
<html lang="vi"> <!-- Xác định ngôn ngữ trang -->
<head>
    <meta charset="UTF-8"> <!-- Hỗ trợ Unicode -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Responsive -->
    <title>Chi tiết sản phẩm</title>
</head>
<body>
    <header> <!-- header dùng cho phần đầu trang -->
        <div class="logo">Logo</div> <!-- div chứa logo, không có ý nghĩa semantic đặc biệt -->  
        <nav> <!-- nav vì đây là khu vực điều hướng chính -->
            <ul> <!-- ul vì menu không cần thứ tự -->
                <li><a href="#">Trang chủ</a></li> <!-- a để điều hướng -->
                <li><a href="#">Danh mục</a></li>
                <li><a href="#">Liên hệ</a></li>
            </ul>
        </nav>
    </header>
    <nav aria-label="breadcrumb"> <!-- nav vì đây là điều hướng phụ -->
        <ol> <!-- ol vì breadcrumb có thứ tự phân cấp -->
            <li><a href="#">Trang chủ</a></li>
            <li><a href="#">Điện thoại</a></li>
            <li>iPhone 16</li> <!-- phần cuối không cần link -->
        </ol>
    </nav>
    <main> <!-- main chứa nội dung chính của trang -->
        <section class="product-detail"> <!-- section vì đây là một khối nội dung độc lập -->
            <div class="product-gallery"> <!-- div nhóm ảnh, không cần semantic riêng -->
                <figure> <!-- figure dùng cho nội dung media -->
                    <img src="#" alt="Ảnh sản phẩm"> <!-- img hiển thị ảnh -->
                    <figcaption>Ảnh 1</figcaption> <!-- mô tả ảnh -->
                </figure>
                <!-- Lặp lại 5 ảnh -->
                <figure><img src="#" alt=""><figcaption>Ảnh 2</figcaption></figure>
                <figure><img src="#" alt=""><figcaption>Ảnh 3</figcaption></figure>
                <figure><img src="#" alt=""><figcaption>Ảnh 4</figcaption></figure>
                <figure><img src="#" alt=""><figcaption>Ảnh 5</figcaption></figure>
            </div>
            <article class="product-info"> <!-- article vì đây là nội dung độc lập về sản phẩm -->
                <h1>Tên sản phẩm</h1> <!-- h1 là tiêu đề chính -->
                <p class="price">Giá</p> <!-- p cho đoạn văn bản đơn giản -->
                <div class="rating"> <!-- div nhóm thông tin đánh giá -->
                    <span>★★★★★</span> <!-- span cho nội dung inline -->
                    <span>(100 đánh giá)</span>
                </div>
                <section class="description"> <!-- section vì mô tả là 1 phần con có tiêu đề -->
                    <h2>Mô tả sản phẩm</h2>
                    <p>Nội dung mô tả...</p>
                </section>
            </article>
        </section>
        <section class="specifications"> <!-- section cho bảng thông số -->
            <h2>Thông số kỹ thuật</h2>
            <table> <!-- table vì dữ liệu dạng bảng -->
                <thead> <!-- thead chứa tiêu đề -->
                    <tr>
                        <th>Thuộc tính</th> <!-- th là header cell -->
                        <th>Giá trị</th>
                    </tr>
                </thead>
                <tbody> <!-- tbody chứa dữ liệu -->
                    <tr>
                        <td>Màn hình</td> <!-- td là dữ liệu -->
                        <td>...</td>
                    </tr>
                </tbody>
            </table>
        </section>
        <section class="reviews"> <!-- section cho đánh giá -->
            <h2>Đánh giá & Bình luận</h2>
            <article class="review-item"> <!-- article vì mỗi review là nội dung độc lập -->
                <h3>Tên người dùng</h3>
                <p>Nội dung đánh giá...</p>
            </article>
        </section>
        <aside class="sidebar"> <!-- aside vì là nội dung phụ (sản phẩm tương tự) -->
            <h2>Sản phẩm tương tự</h2>
            <ul> <!-- ul vì danh sách sản phẩm -->
                <li>
                    <article> <!-- article cho từng sản phẩm -->
                        <h3>Tên sản phẩm</h3>
                        <p>Giá</p>
                    </article>
                </li>
            </ul>
        </aside>
    </main>
    <footer> <!-- footer cho phần cuối trang -->
        <p>Thông tin công ty</p>
        <nav> <!-- nav trong footer cho link phụ -->
            <ul>
                <li><a href="#">Chính sách</a></li>
                <li><a href="#">Điều khoản</a></li>
            </ul>
        </nav>
    </footer>
</body>
</html>


Câu C2:
Lập luận “chỉ cần <div> + class” tưởng đơn giản nhưng thực tế bỏ qua nhiều yếu tố kỹ thuật quan trọng trong phát triển web hiện đại. Trước hết là SEO: các công cụ tìm kiếm như Google không chỉ đọc nội dung mà còn phân tích cấu trúc HTML để hiểu ý nghĩa trang. Các thẻ semantic như <main>, <article>, <nav> giúp xác định rõ đâu là nội dung chính, đâu là điều hướng. Nếu mọi thứ đều là <div>, cấu trúc bị mơ hồ, làm giảm hiệu quả index và ảnh hưởng tiêu cực đến khả năng xếp hạng.Thứ hai là Accessibility. Các screen reader như NVDA dựa vào semantic HTML để hỗ trợ người dùng khiếm thị điều hướng nhanh giữa các khu vực. Ví dụ, họ có thể nhảy trực tiếp tới <main> hoặc <nav> mà không cần đọc toàn bộ trang. Nếu chỉ dùng <div>, bạn sẽ phải bổ sung ARIA phức tạp, dễ sai và khó bảo trì lâu dài. Ví dụ cụ thể: một trang blog sử dụng <article> cho mỗi bài viết giúp cả search engine và screen reader nhận diện từng nội dung độc lập rõ ràng, từ đó cải thiện cả SEO lẫn trải nghiệm người dùng. Tuy nhiên, <div> vẫn phù hợp khi dùng cho layout thuần túy hoặc grouping không mang ý nghĩa, như container cho flexbox hoặc wrapper giao diện

Link video: https://drive.google.com/file/d/17nCncew2DIt2rqHfCz5EnnzilSD_bz9j/view?usp=sharing
