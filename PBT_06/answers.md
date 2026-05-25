# Phần A: Đọc hiểu

## Câu A1 — Grid System

| Kích thước | < 768px      | 768px – 991px | ≥ 992px    |
| ---------- | ------------ | ------------- | ---------- |
| Class dùng | col-12       | col-md-6      | col-lg-3   |
| Mỗi box    | 12/12 = 100% | 6/12 = 50%    | 3/12 = 25% |
| Box/hàng   | 1            | 2             | 4          |

Mobile (< 768px): 4 box xếp chồng dọc, mỗi box full width.

```
[  Box 1  ]
[  Box 2  ]
[  Box 3  ]
[  Box 4  ]
```

Tablet (768px – 991px): 2 box mỗi hàng, tổng 2 hàng.

```
[ Box 1 ][ Box 2 ]
[ Box 3 ][ Box 4 ]
```

Desktop (≥ 992px): 4 box trên 1 hàng duy nhất.

```
[ Box 1 ][ Box 2 ][ Box 3 ][ Box 4 ]
```

- Câu hỏi thêm: `col-md-6` nghĩa là gì?

`col-md-6` = trên màn hình >= 768px (md trở lên), element chiếm 6/12 cột = 50% chiều ngang. Dưới 768px, Bootstrap bỏ qua class này và element tự động full width (100%).

- Tại sao không cần viết `col-sm-12`?

Dùng `col-12` thay cho `col-sm-12` vì `col-12` áp dụng từ xs (< 576px) trở lên, còn `col-sm-12` chỉ từ 576px.

## Câu A2 — Utilities & Components

1. Giải thích `d-none d-md-block`

- `d-none` áp dụng từ xs (0px) trở lên: `display: none` — ẩn element.
- `d-md-block` áp dụng từ md (>= 768px) trở lên: `display: block` — hiện element.

Kết quả:

| Màn hình | Kích thước | Trạng thái |
| -------- | ---------- | ---------- |
| Mobile   | < 768px    | Ẩn         |
| Tablet   | >= 768px   | Hiện       |
| Desktop  | >= 992px   | Hiện       |

Dùng khi nào: ẩn một element trên mobile (ví dụ sidebar, banner quảng cáo, nav desktop) nhưng hiện lại từ tablet trở lên.

2. Liệt kê 5 spacing utilities (margin/padding)

- `m` = margin, `p` = padding
- Direction: `t` top, `b` bottom, `s` start/left, `e` end/right, `x` trái+phải, `y` trên+dưới, bỏ trống = 4 phía
- Size: 0 / 1 / 2 / 3 / 4 / 5 / auto

| Class     | CSS tương đương              | Giải thích                           |
| --------- | ---------------------------- | ------------------------------------ |
| `mt-3`    | margin-top: 1rem             | Margin trên 1rem (16px)              |
| `px-4`    | padding-left & right: 1.5rem | Padding hai bên trái/phải 1.5rem     |
| `mb-auto` | margin-bottom: auto          | Đẩy element xuống cuối trong flexbox |
| `my-2`    | margin-top & bottom: 0.5rem  | Margin trên và dưới 0.5rem (8px)     |
| `p-0`     | padding: 0                   | Xóa toàn bộ padding                  |

3. Sự khác nhau `.container` vs `.container-fluid` vs `.container-md`

| Class              | Ý nghĩa                                                         |
| ------------------ | --------------------------------------------------------------- |
| `.container`       | Có max-width cố định theo từng breakpoint, tự căn giữa          |
| `.container-fluid` | Luôn full width (100%) ở mọi kích thước màn hình                |
| `.container-md`    | Full width dưới md (< 768px), chuyển sang fixed width từ md lên |

Khi nào nên dùng:

- `.container` — nội dung chính, bài viết, form — cần giới hạn độ rộng để dễ đọc.
- `.container-fluid` — hero banner, navbar full width, background section tràn màn hình.
- `.container-md` — muốn full width trên mobile (tiết kiệm không gian) nhưng có max-width từ tablet lên.

# Phần C: Phân tích

## Câu C1 — Tùy biến Bootstrap

1. Bạn muốn đổi màu `$primary` từ xanh mặc định sang `#E63946`. Giải thích quy trình (cần công cụ gì, modify file nào)

_Cần công cụ gì_

- Node.js + npm
- Package: `sass` (Dart Sass)
- Package: `bootstrap` (cài qua npm, không dùng CDN)

_Cài đặt_

```bash
npm install bootstrap sass
```

_Modify file nào_

- Chỉ cần chỉnh 1 file: `src/custom.scss`

2. Tại sao không nên override trực tiếp bằng CSS?

- Bootstrap dùng `$primary` ở rất nhiều nơi: button, badge, alert, border, link, progress bar
  Override CSS chỉ fix được `.btn-primary`, còn `bg-primary`, `alert-primary`, `border-primary`
  vẫn giữ màu xanh cũ → website bị loang lổ màu sắc.

## Câu C2 — So sánh

1. Navbar Responsive

_CSS thuần_

```html
<nav class="navbar">
  <div class="logo">ShopBS</div>
  <button class="hamburger">☰</button>
  <ul class="nav-menu" id="menu">
    <li><a href="#">Trang chủ</a></li>
    <li><a href="#">Sản phẩm</a></li>
    <li><a href="#">Liên hệ</a></li>
  </ul>
</nav>
```

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #212529;
  padding: 0.75rem 1.5rem;
}

.logo {
  color: #fff;
  font-weight: bold;
  font-size: 1.25rem;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 1.5rem;
}

.nav-menu a {
  color: #adb5bd;
  text-decoration: none;
}
.nav-menu a:hover {
  color: #fff;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
  }
  .nav-menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 56px;
    left: 0;
    right: 0;
    background: #212529;
    padding: 1rem;
    gap: 0.75rem;
  }
  .nav-menu.open {
    display: flex;
  }
}
```

_Bootstrap_

```html
<!-- ~10 dòng HTML, 0 dòng CSS, 0 dòng JS -->
<nav class="navbar navbar-expand-md navbar-dark bg-dark px-3">
  <a class="navbar-brand" href="#">ShopBS</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="menu">
    <ul class="navbar-nav">
      <li class="nav-item"><a class="nav-link" href="#">Trang chủ</a></li>
      <li class="nav-item"><a class="nav-link" href="#">Sản phẩm</a></li>
      <li class="nav-item"><a class="nav-link" href="#">Liên hệ</a></li>
    </ul>
  </div>
</nav>
```

2. Product Card

_CSS thuần_

```html
<div class="card">
  <img src="product.jpg" alt="product" />
  <div class="card-body">
    <h5>Áo thun basic</h5>
    <p>Chất cotton thoáng mát.</p>
    <span class="price">150.000đ</span>
    <button>Thêm giỏ</button>
  </div>
</div>
```

```css
.card {
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-body {
  padding: 1rem;
}

.card-body h5 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

.card-body p {
  color: #6c757d;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.price {
  color: #dc3545;
  font-weight: bold;
  display: block;
  margin-bottom: 0.75rem;
}

button {
  background: #212529;
  color: #fff;
  border: none;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
}

button:hover {
  background: #343a40;
}
```

_Bootstrap_

```html
<!-- 0 dòng CSS -->
<div class="card">
  <img src="product.jpg" class="card-img-top" alt="product" />
  <div class="card-body">
    <h5 class="card-title">Áo thun basic</h5>
    <p class="card-text text-muted small">Chất cotton thoáng mát.</p>
    <p class="text-danger fw-bold">150.000đ</p>
    <button class="btn btn-dark btn-sm">Thêm giỏ</button>
  </div>
</div>
```

3. So sánh

| Tiêu chí          | CSS thuần                  | Bootstrap                     |
| ----------------- | -------------------------- | ----------------------------- |
| Số dòng CSS       | ~75 dòng (navbar + card)   | 0 dòng                        |
| Thời gian viết    | 30–60 phút                 | 5–10 phút                     |
| Cross-browser     | Tự xử lý                   | Bootstrap lo sẵn              |
| Khả năng tùy biến | Toàn quyền, không giới hạn | Dễ với SASS, khó nếu dùng CDN |

4. Khi nào NÊN dùng Bootstrap?

- Cần prototype hoặc MVP nhanh
- Team không có designer, cần UI nhất quán
- Cần components phức tạp sẵn: Modal, Carousel, Accordion, Dropdown
- Deadline ngắn

5. Khi nào KHÔNG NÊN dùng Bootstrap?

- Cần thiết kế độc đáo, khác biệt theo brand
- Dự án nhỏ, chỉ cần 2–3 components đơn giản
- Cần performance cao, bundle size tối thiểu
- Đang học CSS — nên viết tay trước để hiểu bản chất

# PHẦN D — VIDEO THỰC HÀNH OBS

