## Bài 1.1 — Câu hỏi

1. Tại sao component chỉ render 1 lần?

Vì không có gì thay đổi sau lần render đầu tiên. React chỉ gọi lại function component khi có `setState` được gọi. Nếu component chỉ return JSX tĩnh và không có state, React không có lý do gì để render lại — nó giữ nguyên kết quả cũ trên màn hình.

```jsx
function LifecycleDemo() {
  console.log("1️⃣ Component được gọi!"); // Chỉ thấy 1 lần trong Console

  return <h2>Không có state → không bao giờ re-render</h2>;
}
```

---

2. Khi nào component sẽ render lại?

Component render lại khi và chỉ khi `setState` (setter của useState) được gọi với giá trị mới.

```jsx
const [count, setCount] = useState(0);

// Gọi setCount → React biết cần re-render
setCount(count + 1); // ✅ Trigger re-render

// Thay đổi biến thường → KHÔNG re-render
let count = 0;
count = count + 1; // ❌ React không biết, không re-render
```

## Bài 1.2 — Câu hỏi

3. Thấy log "render" mấy lần? (BadCounter vs GoodCounter)

BadCounter (biến thường):

- Log `"Component được gọi!"` chỉ xuất hiện 1 lần khi trang load
- Nhấn nút bao nhiêu lần → Console vẫn chỉ có 1 dòng log
- Số trên màn hình không thay đổi dù `count` trong bộ nhớ đã tăng

GoodCounter (useState):

- Log xuất hiện 1 lần đầu khi mount
- Mỗi lần nhấn nút → log xuất hiện thêm 1 lần nữa
- Nhấn 5 lần → tổng cộng 6 dòng log (1 lần mount + 5 lần re-render)
- Số trên màn hình cập nhật theo mỗi lần nhấn

Kết luận: `setCount` báo cho React biết "có dữ liệu thay đổi, hãy gọi lại function component" → component chạy lại từ đầu → return JSX mới → React cập nhật màn hình.