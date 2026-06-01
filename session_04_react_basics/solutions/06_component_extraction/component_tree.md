## Sơ đồ cây component

App
├── Navbar { logo: string, links: [{label, href}] }
├── Hero { title: string, subtitle: string, buttonText: string }
├── ProductGrid { title: string, products: [{id, name, price, image}] }
│ └── ProductCard { name: string, price: string, image: string }
└── Footer { text: string }

## Props từng component

| Component   | Props                       | Kiểu          |
| ----------- | --------------------------- | ------------- |
| Navbar      | logo, links                 | string, array |
| Hero        | title, subtitle, buttonText | string        |
| ProductGrid | title, products             | string, array |
| ProductCard | name, price, image          | string        |
| Footer      | text                        | string        |

## Lý do tách

- ProductCard: lặp lại 4 lần → tách ra dùng `.map()`
- Navbar: xuất hiện ở mọi trang → tái sử dụng
- Hero: thay nội dung bằng props → dùng cho nhiều trang
- ProductGrid: tách logic layout khỏi logic hiển thị card
- Footer: xuất hiện ở mọi trang → tái sử dụng