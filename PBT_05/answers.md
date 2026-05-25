# Phần A: Kiểm tra đọc hiểu

## Câu A1 — Viewport & Mobile-First

1. Thẻ `<meta viewport>` chuẩn

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

_Giải thích_

- `name="viewport"`: Báo cho trình duyệt biết đây là cấu hình viewport (khu vực hiển thị).
- `content`: Chứa các giá trị cấu hình, cách nhau bởi dấu phẩy.
- `width=device-width`: Cho viewport rộng bằng chiều rộng màn hình thiết bị (VD iPhone 14 = 390px). Không có thì trình duyệt mặc định ~980px rồi thu nhỏ lại.
- `initial-scale=1.0`: Zoom ban đầu = 100%, không zoom in/out tự động.

2. Nếu THIẾU thẻ này, iPhone sẽ hiển thị trang web như thế nào?

iPhone sẽ coi trang là trang desktop và thu nhỏ lại cho vắt vừa màn hình. Kết quả:

- Chuỗi nhỏ xíu, phải zoom in mới đọc được
- Scroll ngang liên tục vì viewport mặc định (980px) rộng hơn màn hình (375-430px)
- Nút bấm chồng lên nhau, layout dồn nát
- Ảnh thiết kế cho desktop bị tràn ra ngoài

3. Mobile-First và Desktop-First khác nhau thế nào? Viết ví dụ CSS cho mỗi cách với breakpoint 768px. Tại sao Mobile-First được khuyên dùng?

- Mobile-First (khuyên dùng) — dùng `min-width`

```css
/* Mặc định: mobile */
.container {
  display: flex;
  flex-direction: column;
}

.sidebar {
  display: none;
}
.main-content {
  width: 100%;
}

/* Tablet trở lên (>= 768px) */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
    gap: 24px;
  }
  .sidebar {
    display: block;
    width: 200px;
  }
  .main-content {
    width: calc(100% - 200px - 24px);
  }
}
```

Mobile: 1 cột, ẩn sidebar. Tablet trở lên: 2 cột, hiện sidebar.

- Desktop-First (cách cũ) — dùng `max-width`

```css
/* Mặc định: desktop */
.container {
  display: flex;
  flex-direction: row;
  gap: 24px;
}

.sidebar {
  display: block;
  width: 200px;
}
.main-content {
  width: calc(100% - 200px - 24px);
}

/* Mobile (< 768px) */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: 0;
  }
  .sidebar {
    display: none;
  }
  .main-content {
    width: 100%;
  }
}
```

Desktop: 2 cột. Thu nhỏ xuống mobile: chuyển về 1 cột, ẩn sidebar.

- Mobile chỉ tải CSS mặc định (cho mobile), bỏ qua media query `min-width` → tải ít CSS hơn, nhanh hơn.
- Desktop-First ngược lại: mobile phải tải toàn bộ CSS desktop rồi mới ghi đè bằng `max-width` → lãng phí.
- 60% traffic từ mobile, ưu tiên mobile trước = phục vụ đúng phần lớn người dùng.
- Code dễ đọc hơn: thêm styles theo thứ tự từ nhỏ đến lớn, ít xung đột hơn.

## Câu A2 — Breakpoints

| Tên | Kích thước | Thiết bị         | Lưới sản phẩm |
| --- | ---------- | ---------------- | ------------- |
| xs  | < 576px    | Điện thoại dọc   | 1 cột         |
| sm  | ≥ 576px    | Điện thoại ngang | 2 cột         |
| md  | ≥ 768px    | Tablet           | 2 cột         |
| lg  | ≥ 992px    | Desktop nhỏ      | 3-4 cột       |
| xl  | ≥ 1200px   | Desktop lớn      | 4 cột         |

## Câu A3 — Media Queries

| Chiều rộng màn hình | `.container` width |
| ------------------- | ------------------ |
| 375px (iPhone SE)   | 100% (= 375px)     |
| 600px               | 540px              |
| 800px               | 720px              |
| 1000px              | 960px              |
| 1400px              | 1140px             |

## Câu A4 — SCSS Basics

1. Variables (`$primary-color`)

- Cho phép lưu giá trị dùng chung (màu, font, kích thước) vào một biến, cần đổi thì chỉ sửa 1 chỗ.

```scss
$primary: #805ad5;
$danger: #e53e3e;
$font-body: "Inter", sans-serif;
$radius: 8px;

.btn-primary {
  background: $primary;
  border-radius: $radius;
}

.header {
  background: $primary; // Đổi $primary = 2 chỗ tự đổi
}
```

- Lợi ích: Đổi màu chủ đạo từ xanh sang tím, chỉ cần sửa biến thay vì sửa nhiều chỗ.

2. Nesting (viết CSS lồng nhau)

- Cho phép viết CSS theo cấu trúc lồng nhau giống HTML, code gọn và dễ đọc hơn.

```scss
.navbar {
  background: #1a202c;
  padding: 16px;

  ul {
    list-style: none;
    display: flex;

    li {
      margin-right: 24px;

      a {
        color: white;

        &:hover {
          // & = chính thẻ a
          color: $primary;
        }
      }
    }
  }
}
```

- Biểu tượng `&` đại diện cho thẻ cha (ở đây là `a`), nên `&:hover` sẽ ra `.navbar ul li a:hover`.
- Quy tắc: Không lồng quá 3 cấp, sâu hơn thì selector dài, khó maintain.

3. Mixins (`@mixin`, `@include`)

- Mixin là đoạn CSS có thể tái sử dụng nhiều nơi. Dùng `@mixin` để khai báo, `@include` để gọi.

```scss
// Khai báo mixin
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// Sử dụng
.hero {
  @include flex-center;
  height: 100vh;
}
```

- Lợi ích: Không phải viết lặp đi lặp lại đoạn CSS giống nhau.

4. `@extend` / Inheritance

- Cho phép một selector kế thừa toàn bộ CSS từ selector khác, tránh lặp code.

```scss
// Base (cha)
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: $radius;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

// Kế thừa + thêm style riêng
.btn-primary {
  @extend .btn;
  background: $primary;
  color: white;
}

.btn-danger {
  @extend .btn;
  background: $danger;
  color: white;
}
```

- Khác với mixin: `@extend` tạo ra một nhóm selector chung trong CSS đầu ra (nhẹ hơn). Mixin thì sao chép đoạn CSS vào mỗi nơi gọi (dễ hơn nhưng có thể tạo code trùng lặp).

Tại sao trình duyệt KHÔNG đọc được file `.scss`? Cần bước gì để chuyển SCSS → CSS?

- SCSS (Sassy CSS) là CSS preprocessor — tức là CSS có thêm tính năng lập trình (biến, hàm, lồng nhau, điều kiện). Đây là cú pháp mở rộng, trình duyệt chỉ hiểu CSS thuần, nên không thể đọc trực tiếp file `.scss`.

- Quá trình chuyển đổi: SCSS (code viết) → Compiler (dịch) → CSS (trình duyệt đọc)

# Phần B: Thực hành code

## Bài B3 — SCSS Refactor

- Lệnh compile SCSS → CSS

```bash
# Cài sass (chưa có)
npm install -g sass

# Compile file style.scss ra style-compiled.css
sass scss/style.scss style-compiled.css

# Hoặc watch (tự compile khi lưu)
sass --watch scss/style.scss style-compiled.css

# Với VS Code: cài extension "Live Sass Compiler" → click "Watch Sass"
```

# Phần C: Phân tích

## Câu C1 — Phân tích trang web thực

### Mobile (375px)

![ảnh mobile](screenshots/cauC1-mobile.png)

1. Navigation thay đổi thế nào?

- Icon hamburger + kính lúp xuất hiện ở góc trái thay thế menu ngang
- Logo giữ nguyên ở giữa
- Góc phải chỉ còn icon user + bell
- Category bar (Mới nhất, VnE-GO, Thời sự...) chuyển sang dạng scroll ngang, không wrap xuống dòng

2. Lưới content thay đổi mấy cột?

- Chuyển về 1 cột duy nhất
- Ảnh bài viết chiếm 100% chiều rộng container

3. Elements nào bị ẩn trên mobile?

- Sidebar phải (`.col-right-top`) — ẩn qua `display: none`
- Menu ngang desktop (thay bằng hamburger)

4. Font size có thay đổi không?

- Có — tiêu đề category nhỏ hơn so với desktop
- Thanh thời tiết (Hà Nội 30°) và navigation text dùng font size vừa phải, vẫn readable

### Tablet (768px)

![ảnh tablet](screenshots/cauC1-tablet.png)

1. Navigation thay đổi thế nào?

- Vẫn giữ hamburger + kính lúp ở góc trái (giống mobile)
- Logo giữ nguyên ở giữa, to hơn so với 375px
- Category bar hiển thị nhiều mục hơn (Mới nhất, VnE-GO, Thời sự, Thế giới, Kinh doanh, Khoa học...)
- Vẫn scroll ngang, chưa phải full menu ngang như desktop

2. Lưới content thay đổi mấy cột?

- Vẫn 1 cột chính — chưa có sidebar
- Ảnh hero chiếm toàn bộ chiều rộng

3. Elements nào bị ẩn/hiện so với mobile?

- Ngày âm lịch xuất hiện (ẩn ở 375px, hiện ở 768px)
- Category bar hiện nhiều mục hơn do có thêm không gian

4. Font size có thay đổi không?

- Có tăng nhẹ — tiêu đề category và text rõ ràng hơn
- Ảnh hero lớn hơn đáng kể (600px vs ~460px ở mobile)
- Tổng thể scale theo chiều rộng, không có breakpoint riêng cho tablet

### Desktop (1440px)

![ảnh desktop](screenshots/cauC1-desktop.png)

1. Navigation thay đổi thế nào?

- Hamburger biến mất → menu ngang đầy đủ hiển thị
- Header có thêm: Địa điểm, thời tiết
- Góc phải: nút Đăng nhập, icon search, bell — rõ ràng hơn hẳn
- Category bar hiện toàn bộ danh mục

2. Lưới content thay đổi mấy cột?

- Chuyển sang 2 cột: ảnh trái + tiêu đề/tóm tắt bài viết bên phải
- `.col-right-top` xuất hiện trở lại (width: 320px, padding-left: 20px)
- Layout dùng Flexbox (`container flexbox`)

3. Elements xuất hiện lại ở Desktop

- Sidebar phải (`.col-right-top`) — width: 320px
- Thông tin địa điểm + thời tiết trên header
- Nút Đăng nhập text (mobile chỉ có icon)
- Toàn bộ category không cần scroll ngang

4. Font size có thay đổi không?

- Tăng rõ rệt — tiêu đề bài viết to và đậm hơn hẳn

![ảnh media](screenshots/cauC1-media.png)

## Câu C2 — Thiết kế Responsive Strategy

## MOBILE (375px)

```
+-----------------------------+
| ☰  LOGO              [📞]  |
+-----------------------------+
|                             |
|         HERO IMAGE          |
|                             |
+-----------------------------+
|   [Anh 1]   |   [Anh 2]    |
+-------------+---------------+
|   [Anh 3]   |   [Anh 4]    |
+-------------+---------------+
|   [Anh 5]   |   [Anh 6]    |
+-----------------------------+
|                             |
|  FORM DAT BAN               |
|  +------------------------+ |
|  | Ngay                   | |
|  +------------------------+ |
|  | Gio                    | |
|  +------------------------+ |
|  | So nguoi               | |
|  +------------------------+ |
|  | Ghi chu                | |
|  |                        | |
|  +------------------------+ |
|                             |
|   [    DAT BAN NGAY    ]    |
|                             |
+-----------------------------+
|                             |
|       GOOGLE MAPS           |
|                             |
+-----------------------------+
|           FOOTER            |
+-----------------------------+
```

Ẩn trên mobile:

- Nav links (thay bằng ☰ hamburger)
- Sidebar thông tin
- Số điện thoại dạng text (chỉ icon 📞)

## TABLET (768px)

```
+---------------------------------------------+
| ☰  LOGO                   📞 0901 234 567  |
+---------------------------------------------+
|                                             |
|                HERO IMAGE                   |
|                                             |
+---------------+---------------+-------------+
|   [Anh 1]     |   [Anh 2]     |   [Anh 3]  |
+---------------+---------------+-------------+
|   [Anh 4]     |   [Anh 5]     |   [Anh 6]  |
+---------------------+-----------------------+
|  FORM DAT BAN       |                       |
|  +-----------------+|   GOOGLE MAPS         |
|  | Ngay            ||                       |
|  +-----------------+|                       |
|  | Gio             ||                       |
|  +-----------------+|                       |
|  | So nguoi        ||                       |
|  +-----------------+|                       |
|  | Ghi chu         ||                       |
|  |                 ||                       |
|  +-----------------+|                       |
|  [ DAT BAN NGAY ]   |                       |
+---------------------+-----------------------+
|                   FOOTER                    |
+---------------------------------------------+
```

- Grid ảnh: 2 cột → 3 cột
- Form + Bản đồ: dọc → nằm cạnh nhau (2 cột)
- Bản đồ: nằm bên phải form, cùng chiều cao
- Số điện thoại hiện text đầy đủ

## DESKTOP (1440px)

```
+----------------------------------------------------------------+
| LOGO    Trang chu   Menu   Lien he         📞 0901 234 567     |
+----------------------------------------------------------------+
|                                                                |
|                        HERO IMAGE                              |
|                                                                |
+------------------------------------------------+---------------+
|                                                |               |
|  +------------+ +------------+ +------------+  |  SIDEBAR      |
|  |  [Anh 1]   | |  [Anh 2]   | |  [Anh 3]   |  |               |
|  +------------+ +------------+ +------------+  |  Gio mo cua:  |
|  +------------+ +------------+ +------------+  |  T2-T6: 10-22h|
|  |  [Anh 4]   | |  [Anh 5]   | |  [Anh 6]   |  |  T7-CN: 9-23h |
|  +------------+ +------------+ +------------+  |               |
|                                                |  Dia chi:     |
|  +--------------------+  +------------------+  |  236 Tay Son  |
|  | FORM DAT BAN       |  |                  |  |               |
|  | +--------+-------+ |  |                  |  |  Danh gia:    |
|  | | Ngay   | Gio   | |  |  GOOGLE MAPS     |  |  4.8/5 (320)  |
|  | +--------+-------+ |  |                  |  |               |
|  | | So nguoi       | |  |                  |  +---------------+
|  | +-----------------+|  |                  |
|  | | Ghi chu        | |  |                  |
|  | |                | |  +------------------+
|  | +-----------------+|
|  | [ DAT BAN NGAY ]   |
|  +--------------------+
+------------------------------------------------+
|  Logo | Lien he | Chinh sach | MXH | © 2025   |
+----------------------------------------------------------------+
```

- Nav links: hiện đầy đủ (bỏ hamburger)
- Sidebar: xuất hiện bên phải (giờ mở cửa, địa chỉ, đánh giá)
- Form: Ngày + Giờ nằm cùng 1 hàng (2 input inline)
- Footer: đa cột thay vì 1 cột

# CSS skeleton

```css
/* ======================
   MOBILE FIRST
====================== */

body {
  margin: 0;
}

.container {
  display: grid;
  gap: 20px;
  padding: 20px;
}

/* Header */
.header {
  display: grid;
  grid-template-columns: 1fr auto;
}

/* Hero */
.hero {
  min-height: 300px;
}

/* Food grid */
.food-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}

/* Booking form */
.booking-form {
  display: grid;
  gap: 10px;
}

/* Google map */
.map iframe {
  width: 100%;
  height: 300px;
}

/* Footer */
.footer {
  text-align: center;
}

/* ======================
   TABLET
====================== */

@media (min-width: 768px) {
  .food-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero {
    min-height: 400px;
  }
}

/* ======================
   DESKTOP
====================== */

@media (min-width: 1024px) {
  .content-layout {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
  }

  .food-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .hero {
    min-height: 500px;
  }
}
```

# PHẦN D — VIDEO THỰC HÀNH OBS

- Link video PBT_05: https://youtu.be/Eu6gEjms_2c