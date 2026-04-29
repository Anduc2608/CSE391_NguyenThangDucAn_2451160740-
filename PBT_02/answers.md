# Phần A: Đọc hiểu
Câu A1:

type="email" → Ô nhập text, tự kiểm tra có ký tự @ và domain hợp lệ → Dùng cho form đăng ký / đăng nhập
type="text" → Ô nhập văn bản 1 dòng → Nhập tên khách hàng, địa chỉ giao hàng
type="password" → Ô nhập nhưng ký tự bị ẩn (••••) → Nhập mật khẩu tài khoản
type="number" → Ô nhập số có nút tăng/giảm, chỉ cho nhập số → Nhập số lượng sản phẩm
type="tel" → Ô nhập giống text, không validate sẵn → Nhập số điện thoại khách hàng
type="date" → Hiển thị lịch chọn ngày → Chọn ngày giao hàng
type="checkbox" → Ô vuông tick chọn được nhiều mục → Chọn nhiều sản phẩm hoặc đồng ý điều khoản
type="radio" → Nút tròn, chỉ chọn 1 trong nhiều lựa chọn → Chọn phương thức thanh toán
type="file" → Nút chọn file từ máy → Upload ảnh đánh giá sản phẩm
type="search" → Ô tìm kiếm có nút xóa nhanh → Tìm kiếm sản phẩm trên website

Câu A2:

TH1: Form không submit vì required bắt buộc phải có dữ liệu. Giá trị rỗng ⇒ vi phạm valueMissing, trình duyệt yêu cầu nhập.
TH2: Form không submit vì type="email" kiểm tra định dạng email. "abc" không hợp lệ ⇒ vi phạm typeMismatch.
TH3: Form không submit vì vượt quá giới hạn max="10". Giá trị 15 ⇒ vi phạm rangeOverflow.
TH4: Form không submit vì không khớp pattern="[0-9]{10}". "abc123" sai định dạng ⇒ vi phạm patternMismatch.
TH5: Form không submit vì không đủ độ dài tối thiểu minlength="8". "123" ⇒ vi phạm tooShort (khi field không rỗng).

- Kết quả validation thực tế:
![alt text](screenshots/Validation.png)

Câu A3:
1. Vì sao <label for="email"> quan trọng với screen reader?
- Tạo “accessible name” chuẩn cho input: screen reader sẽ đọc nhãn + trạng thái (ví dụ: “Email, edit  text, required”). Không có <label> ⇒ người dùng chỉ nghe “edit text” → không biết phải nhập gì.
- Liên kết tường minh qua for ↔ id: đảm bảo mọi AT (assistive tech) nhận diện đúng mối quan hệ, kể cả khi DOM phức tạp.
- Tăng vùng tương tác: click vào chữ “Email” sẽ focus vào ô nhập — hữu ích cho người dùng hạn chế vận động.
- Hoạt động nhất quán hơn so với placeholder (placeholder không thay thế label; nó biến mất khi nhập và không phải là tên truy cập đáng tin cậy).
2. Khi nào dùng <fieldset> + <legend>?
- Dùng khi có nhóm nhiều control liên quan về ngữ nghĩa, để screen reader thông báo ngữ cảnh của cả nhóm trước khi đọc từng phần tử con.
Ví dụ: chọn phương thức thanh toán
<fieldset>
  <legend>Phương thức thanh toán</legend>

  <label>
    <input type="radio" name="payment" value="cod">
    Thanh toán khi nhận hàng
  </label>

  <label>
    <input type="radio" name="payment" value="bank">
    Chuyển khoản ngân hàng
  </label>
</fieldset>

- Screen reader sẽ đọc: “Phương thức thanh toán, group… Thanh toán khi nhận hàng, radio button…”
- Không dùng <fieldset> thì người dùng khó biết các radio này thuộc cùng một câu hỏi.
3. aria-label dùng khi nào? Tại sao không dùng khi đã có <label>?
- aria-label dùng khi không thể thêm <label> vào HTML, ví dụ nút icon không có chữ, ô tìm kiếm trên   
- header không có label hiển thị.
Không nên dùng aria-label khi đã có <label> vì 2 cái sẽ xung đột, aria-label sẽ ghi đè <label> khiến screen reader bỏ qua label thật.
- <label> vừa hỗ trợ screen reader, vừa hiển thị được trên trang, vừa cho phép click vào chữ để focus input → tốt hơn aria-label toàn diện hơn

Câu A4:
1. loading="lazy" trên <img>
- Cơ chế: Trình duyệt trì hoãn tải ảnh cho đến khi ảnh gần vào viewport (hoặc có khả năng sắp hiển thị).
- Lợi ích:
+ Giảm initial page weight → tải trang nhanh hơn.
+ Tiết kiệm băng thông (ảnh dưới màn hình có thể không bao giờ được tải).
+ Cải thiện Core Web Vitals (đặc biệt LCP gián tiếp, TBT/INP do ít tài nguyên cạnh tranh lúc đầu).
- Không nên dùng khi:
+ Ảnh above-the-fold / hero / LCP image → cần tải ngay (loading="eager" hoặc bỏ thuộc tính).
+ Ảnh quan trọng cho UX tức thì (logo chính, ảnh sản phẩm đầu trang).
+ Một số trình duyệt/thiết bị cũ (fallback không ổn định) — khi đó cân nhắc polyfill/JS lazy load có kiểm soát.
2. Vì sao nên có nhiều <source> trong <video>?
- Tương thích trình duyệt: Mỗi browser hỗ trợ codec/container khác nhau; nhiều <source> giúp chọn format phù hợp nhất.
- Fallback tự động: Trình duyệt thử lần lượt cho đến khi phát được → tăng tỷ lệ play thành công.
- Tối ưu hiệu năng: Có thể cung cấp biến thể nhẹ hơn cho thiết bị yếu/băng thông thấp.

- Ít nhất 3 format phổ biến:
+ video/mp4 (H.264/AAC) — phổ biến nhất, hỗ trợ rộng
+ video/webm (VP8/VP9/Opus) — tốt cho web, thường nhẹ hơn
+ video/ogg (Theora/Vorbis) — hỗ trợ hạn chế hơn nhưng vẫn là chuẩn mở
ví dụ: 
<video controls>
  <source src="video.webm" type="video/webm">
  <source src="video.mp4" type="video/mp4">
  <source src="video.ogv" type="video/ogg">
  Trình duyệt của bạn không hỗ trợ video.
</video>

3. Thuộc tính alt trên <img>
- Hiển thị văn bản thay thế khi ảnh không tải được.
- Screen reader đọc alt để mô tả ảnh cho người khiếm thị.
- Công cụ tìm kiếm dùng alt để hiểu nội dung ảnh → tốt cho SEO.
- Ảnh sản phẩm iPhone 16 → alt="iPhone 16 màu đen titan, mặt trước và mặt sau"
- Ảnh trang trí (decorative) → alt="" — để rỗng, screen reader sẽ bỏ qua, tránh đọc những thứ không có nghĩa.
- Ảnh biểu đồ doanh thu Q1/2026 → alt="Biểu đồ cột doanh thu Q1/2026, tháng 3 đạt cao nhất với 4.2 tỷ đồng"

Câu A5:
Cách 1: (<img>) → Dùng khi ảnh đơn giản, không cần chú thích (ảnh thumbnail sản phẩm, icon minh họa)

Cách 2: (<figure> + <figcaption>) → Dùng khi ảnh quan trọng, cần mô tả hiển thị (ảnh sản phẩm kèm giá, ảnh blog có chú thích)
# Phần C: Suy luận
Câu C1:
Lỗi 1: Dòng 2 — Input "Tên" không có <label for="...">, vi phạm accessibility
Sửa: <label for="name">Tên:</label> <input type="text" id="name" name="name" required>
Lỗi 2: Dòng 4 — Input email không có <label> và thiếu required
Sửa: <label for="email">Email:</label> <input type="email" id="email" name="email" placeholder="Email của bạn" required>
Lỗi 3: Dòng 6 — Input password không có <label> và thiếu validation (minlength)
Sửa: <label for="password">Mật khẩu:</label> <input type="password" id="password" name="password" minlength="8" required>
Lỗi 4: Dòng 7 — Input confirm password không có <label> và thiếu required
Sửa: <label for="confirm">Nhập lại mật khẩu:</label> <input type="password" id="confirm" name="confirm" required>
Lỗi 5: Dòng 9 — Phone dùng type="text" thay vì type="tel"
Sửa: <label for="phone">Số điện thoại:</label> <input type="tel" id="phone" name="phone" placeholder="0901234567" pattern="[0-9]{10}">
Lỗi 6: Dòng 9 — Phone dùng value làm dữ liệu mặc định (bad practice)
Sửa: <input type="tel" id="phone" name="phone" placeholder="0901234567">
Lỗi 7: Dòng 11 — <select> không có <label>
Sửa: <label for="city">Thành phố:</label> <select id="city" name="city">
Lỗi 8: Dòng 16 — Checkbox không có <input> đi kèm và không required
Sửa: <input type="checkbox" id="agree" name="agree" required> <label for="agree">Tôi đồng ý điều khoản</label>

Câu C2:
1. Regex pattern
CMND/CCCD (12 chữ số): pattern="[0-9]{12}"
Số tài khoản (10–15 chữ số): pattern="[0-9]{10,15}"

2. HTML5 validation có đủ an toàn cho ngân hàng không?
- Không.
+ HTML5 validation chỉ là client-side → chạy trên trình duyệt người dùng
+ Người dùng có thể:
Tắt validation (novalidate)
Sửa request bằng DevTools/Postman
+ Không có kiểm soát logic nghiệp vụ hoặc bảo mật
3. 3 loại validation HTML5 KHÔNG làm được
- So sánh giữa các field
Ví dụ: xác nhận PIN = PIN nhập lại
- Kiểm tra dữ liệu với server/database
Ví dụ: số tài khoản đã tồn tại chưa
- Logic nghiệp vụ phức tạp
Ví dụ: kiểm tra CMND hợp lệ theo thuật toán (checksum, vùng cấp…)
4. 2 rủi ro nếu chỉ validate Frontend
- Bypass validation → gửi dữ liệu sai/độc hại
+ Hacker có thể gửi request trực tiếp (không qua form)
- Injection / tấn công bảo mật
+ Nếu backend không kiểm tra → dễ bị SQL Injection, XSS, data corruption
