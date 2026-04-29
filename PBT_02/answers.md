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

