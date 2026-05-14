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
Trường hợp 1 — Flex cơ bản
.container { display: flex; }
.item { flex: 1; }
display: flex → các item nằm trên 1 hàng ngang
flex: 1 → chia đều chiều rộng
4 items
+-------+-------+-------+-------+
| Item1 | Item2 | Item3 | Item4 |
+-------+-------+-------+-------+

→ 1 hàng, 4 cột bằng nhau.

Trường hợp 2 — Flex wrap
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
Mỗi item chiếm:

45%+2.5%+2.5%=50%

→ 1 item thực tế chiếm khoảng 50% chiều ngang.

Vì vậy: mỗi hàng chứa được 2 item
Có 6 items:

2
6
	​

=3

→ 3 hàng × 2 cột

Layout
+---------+---------+
|  Item1  |  Item2  |
+---------+---------+

+---------+---------+
|  Item3  |  Item4  |
+---------+---------+

+---------+---------+
|  Item5  |  Item6  |
+---------+---------+
Trường hợp 3 — Space Between
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
justify-content: space-between
→ item đầu sát trái, item cuối sát phải,
item giữa nằm giữa với khoảng cách đều.
align-items: center
→ canh giữa theo chiều dọc.
3 items
|Item1|                |Item2|                |Item3|

Hoặc:

+--------------------------------------------------+
| Item1               Item2                Item3   |
+--------------------------------------------------+

→ tất cả trên cùng 1 hàng.

Trường hợp 4 — Grid 3 cột
.container {
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    gap: 20px;
}

Ý nghĩa:

Cột 1: rộng cố định 200px
Cột 2: chiếm toàn bộ phần còn lại (1fr)
Cột 3: rộng cố định 200px
Có khoảng cách 20px
3 items
+----------+----------------------+----------+
|  Item1   |        Item2         |  Item3   |
| 200px    |   vùng co giãn       | 200px    |
+----------+----------------------+----------+

→ 1 hàng, 3 cột.

Trường hợp 5 — Grid repeat(3,1fr)
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}
repeat(3, 1fr) → 3 cột bằng nhau
Có 7 items

Tính số hàng:

⌈
3
7
	​

⌉=3

→ cần 3 hàng.

Bố cục
+------+------+------+
| I1   | I2   | I3   |
+------+------+------+

+------+------+------+
| I4   | I5   | I6   |
+------+------+------+

+------+------+------+
| I7   |      |      |
+------+------+------+

→ Item cuối (I7) nằm ở:

hàng 3
cột 1.
