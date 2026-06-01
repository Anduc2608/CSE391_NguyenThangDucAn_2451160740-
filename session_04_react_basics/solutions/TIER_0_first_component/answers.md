1. File `.jsx` khác gì file `.js`?

File `.js` là JavaScript thuần túy — chỉ chứa logic, không hiểu cú pháp HTML bên trong code.

File `.jsx` là JavaScript + JSX — cho phép viết HTML trực tiếp trong JavaScript như thế này:

```jsx
// .jsx — hợp lệ
function App() {
  return <h1>Xin chào!</h1>; // ← HTML bên trong JS, OK!
}

// .js — sẽ báo lỗi nếu viết HTML như vậy
function App() {
  return <h1>Xin chào!</h1>; // ← Lỗi! .js không hiểu cú pháp này
}
```

Vite và các bundler hiện đại nhìn vào đuôi file để biết cách xử lý. Dùng `.jsx` giúp editor highlight đúng màu, báo lỗi cú pháp JSX chính xác hơn.

---

2. Tại sao phải `export default App`?

Vì mỗi file JavaScript là một "module" độc lập — các file khác không tự động biết nội dung bên trong.

`export default App` nghĩa là: _"File này cung cấp `App` ra ngoài để ai cũng có thể import."_

Trong `main.jsx`, React cần dùng:

```jsx
import App from "./App"; // ← Được vì App đã export default
```

Nếu không có `export default`, dòng import trên sẽ báo lỗi và trang trắng hoàn toàn.

---

3. Thử xóa `export default` → chuyện gì xảy ra?

Trình duyệt báo lỗi kiểu:

```
SyntaxError: The requested module '/src/App.jsx'
does not provide an export named 'default'
```

Trang web hiển thị trắng, Console (F12) sẽ thấy lỗi đỏ.

**Lý do:** `main.jsx` dùng `import App from "./App"` — cú pháp này yêu cầu file đích phải có `export default`. Không có → không import được → app không chạy.