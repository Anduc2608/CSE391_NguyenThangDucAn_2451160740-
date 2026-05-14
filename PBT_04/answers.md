# Phần A
Câu A1:
| Position   | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí                        | Cuộn theo trang?                        | Use case                                  |
| ---------- | ------------------------- | ---------------------------------------- | --------------------------------------- | ----------------------------------------- |
| `static`   | Có                        | Không dùng top/left/bottom/right         | Có                                      | Mặc định, không cần can thiệp             |
| `relative` | Có                        | Vị trí gốc của chính nó                  | Có                                      | Dịch chuyển nhẹ, làm mốc cho absolute con |
| `absolute` | Không                     | Thẻ cha gần nhất có position khác static | Có (cuộn cùng cha)                      | Badge trên icon, dropdown, tooltip        |
| `fixed`    | Không                     | Cửa sổ trình duyệt                       | Không — luôn dính tại chỗ               | Chat button, modal overlay                |
| `sticky`   | Có → Không (khi dính)     | Cửa sổ trình duyệt (sau khi đạt ngưỡng)  | Có → Không (dính khi scroll đến ngưỡng) | Sticky header, sidebar                    |

position: absolute sẽ tự leo lên cây HTML để tìm thẻ cha gần nhất có position khác static. Nếu tìm thấy thì dùng thẻ đó làm gốc tính tọa độ. Nếu leo hết lên mà không thấy thì tính từ body.
Nearest positioned ancestor" là thẻ cha gần nhất có khai báo position khác static.

Câu A2:
1. Trường hợp 1

```css
.container {
  display: flex;
}
.item {
  flex: 1;
}
/* 4 items */
```

```
┌─────────────────────────────────────────────────────┐
│  CONTAINER (100% width)                             │
│ ┌──────────┬──────────┬──────────┬──────────┐       │
│ │  Item 1  │  Item 2  │  Item 3  │  Item 4  │       │
│ │  (25%)   │  (25%)   │  (25%)   │  (25%)   │       │
│ └──────────┴──────────┴──────────┴──────────┘       │
└─────────────────────────────────────────────────────┘
```

Giải thích:

- `display: flex` → các item xếp thành 1 hàng ngang (mặc định `flex-direction: row`)
- `flex: 1` = `flex-grow: 1; flex-shrink: 1; flex-basis: 0%`
- Cả 4 item cùng `flex: 1` → chia đều container theo chiều ngang

2. Trường hợp 2

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 45%;
  margin: 2.5%;
}
/* 6 items */
```

```
┌─────────────────────────────────────────────────────┐
│  CONTAINER                                          │
│  ┌───────────────┐  ┌───────────────┐               │
│  │    Item 1     │  │    Item 2     │               │
│  │  (45% + 5%m)  │  │  (45% + 5%m)  │               │
│  └───────────────┘  └───────────────┘               │
│  ┌───────────────┐  ┌───────────────┐               │
│  │    Item 3     │  │    Item 4     │               │
│  └───────────────┘  └───────────────┘               │
│  ┌───────────────┐  ┌───────────────┐               │
│  │    Item 5     │  │    Item 6     │               │
│  └───────────────┘  └───────────────┘               │
└─────────────────────────────────────────────────────┘
```

Giải thích:

- Mỗi item chiếm: `width 45% + margin-left 2.5% + margin-right 2.5%` = 50% tổng chiều ngang
- `flex-wrap: wrap` → khi không đủ chỗ, item xuống hàng
- 100% ÷ 50% = 2 item mỗi hàng
- 6 items ÷ 2 = 3 hàng

3. Trường hợp 3

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* 3 items */
```

```
┌─────────────────────────────────────────────────────┐
│  CONTAINER                                          │
│                                                     │
│  ┌────────┐          ┌────────┐          ┌────────┐ │
│  │ Item 1 │          │ Item 2 │          │ Item 3 │ │
│  └────────┘          └────────┘          └────────┘ │
│    (trái)             (giữa)               (phải)   │
│                                                     │
└─────────────────────────────────────────────────────┘
     ↑                    ↑                    ↑
  sát trái          căn giữa ngang          sát phải
  (cả 3 đều căn giữa dọc nhờ align-items: center)
```

Giải thích:

- `justify-content: space-between` → item đầu sát trái, item cuối sát phải, item giữa chính giữa, khoảng cách đều nhau giữa các items
- `align-items: center` → tất cả items căn giữa theo chiều dọc

4. Trường hợp 4

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  gap: 20px;
}
/* 3 items */
```

```
┌─────────────────────────────────────────────────────┐
│  CONTAINER (ví dụ 1000px)                           │
│                                                     │
│ ┌──────────┐ ┌──────────────────────┐ ┌──────────┐  │
│ │          │ │                      │ │          │  │
│ │  Item 1  │ │       Item 2         │ │  Item 3  │  │
│ │  200px   │ │   1fr (linh động)    │ │  200px   │  │
│ │          │ │                      │ │          │  │
│ └──────────┘ └──────────────────────┘ └──────────┘  │
│   ← 200px →  ←────── ~560px ────────→  ← 200px →    │
│              (gap 20px giữa mỗi cột)                │
└─────────────────────────────────────────────────────┘
```

Giải thích:

- Cột 1: cố định 200px
- Cột 2: `1fr` = chiếm toàn bộ phần còn lại sau khi trừ 200px + 200px + 2 khoảng gap
- Cột 3: cố định 200px
- Tính width cột giữa (giả sử container = 1000px):`1fr = 1000px - 200px - 200px - (20px × 2) = 560px`

5. Trường hợp 5

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
/* 7 items */
```

```
┌─────────────────────────────────────────────────────┐
│  CONTAINER                                          │
│                                                     │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     │
│ │   Item 1    │ │   Item 2    │ │   Item 3    │     │
│ └─────────────┘ └─────────────┘ └─────────────┘     │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     │
│ │   Item 4    │ │   Item 5    │ │   Item 6    │     │
│ └─────────────┘ └─────────────┘ └─────────────┘     │
│ ┌─────────────┐                                     │
│ │   Item 7    │   (trống)          (trống)          │
│ └─────────────┘                                     │
│   ← 1fr →       ← 1fr →           ← 1fr →           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

Giải thích:

- `repeat(3, 1fr)` → 3 cột đều nhau
- 7 items ÷ 3 cột = 2 hàng đầy + 1 hàng thiếu
- Hàng 1: Item 1, 2, 3
- Hàng 2: Item 4, 5, 6
- Hàng 3: Item 7 — chỉ có 1 item, nằm ở cột đầu tiên (trái)
- Item 7 không tự kéo rộng ra để lấp đầy — nó giữ nguyên kích thước `1fr` của cột

# Phần C
Câu C1:
1. Navigation bar ngang (logo + menu + buttons)
Nên dùng: Flexbox
Giải thích: Navbar là layout 1 chiều (horizontal). Flexbox rất phù hợp để căn trái/phải, spacing và vertical centering bằng justify-content + align-items
2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)
Nên dùng: Grid
Giải thích: Đây là layout 2 chiều (rows + columns). Grid giúp tạo các cột đều nhau rất dễ bằng grid-template-columns: repeat(3, 1fr). Ảnh tự xuống hàng khi số lượng thay đổi.
3. Layout blog: main content + sidebar
Nên dùng: Grid
Giải thích: Blog layout thường chia vùng rõ ràng: content lớn + sidebar nhỏ. Grid kiểm soát cột tốt hơn, ví dụ grid-template-columns: 1fr 300px
4. Footer với 4 cột thông tin
Nên dùng: Grid hoặc Flexbox
Giải thích: Nếu chỉ cần 4 cột ngang đơn giản → Flexbox đủ dùng. Nếu muốn căn đều, responsive mạnh hơn → Grid tốt hơn. Thực tế thường dùng Grid cho footer nhiều cột.
5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)
Nên dùng: Flexbox
Giải thích: Card là layout 1 chiều theo cột. Dùng flex-direction: column và margin-top: auto để đẩy nút xuống đáy rất hiệu quả.

Câu C2:
1. Lỗi 1 — Cards không đều chiều cao
Nguyên nhân
Các card có lượng nội dung khác nhau:
card có title dài → card cao hơn
card có title ngắn → card thấp hơn
Nút .btn nằm ngay sau nội dung nên vị trí nút bị lệch lên/xuống.
Hiện tại .card chưa dùng Flexbox theo chiều dọc.
Sửa: 
.card-container {
    display: flex;
    flex-wrap: wrap;
}

.card {
    width: 30%;
    margin: 1.5%;

    display: flex;
    flex-direction: column;
}

.card img {
    width: 100%;
}

.card h3 {
    font-size: 18px;
}

.card .btn {
    padding: 10px;

    margin-top: auto;
}

2. Lỗi 2 — Không căn giữa hero
Nguyên nhân
.hero có display: flex
nhưng chưa có:
justify-content
align-items
Mặc định Flexbox:
justify-content: flex-start;
align-items: stretch;
→ item dính góc trái trên.
Sửa: 
.hero {
    height: 100vh;

    display: flex;

    justify-content: center;

    align-items: center;
}

.hero-content {
    text-align: center;
}
3. Lỗi 3 — Sidebar bị co lại
Nguyên nhân
Trong Flexbox:
flex-shrink: 1;
là mặc định.
Nghĩa là sidebar được phép co nhỏ khi content quá lớn.
Vì vậy:
.sidebar { width: 250px; }
không đảm bảo sidebar luôn giữ 250px.
Sửa:
.layout {
    display: flex;
}

.sidebar {
    width: 250px;

    flex-shrink: 0;
}

.content {
    flex: 1;
}







