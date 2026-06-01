import "./App.css";

// Tier 0
import UserProfile from "./components/UserProfile";
import ProductInfo from "./components/ProductInfo";

// Tier 2
import SimpleVariables from "./components/SimpleVariables";
import ConditionalRendering from "./components/ConditionalRendering";
import ListRendering from "./components/ListRendering";
// Tier 3
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import UserCard from "./components/UserCard";
import PriceTag from "./components/PriceTag";

// Tier 4
import NumberState from "./components/NumberState";
import StringState from "./components/StringState";
import BooleanState from "./components/BooleanState";
import MultipleStates from "./components/MultipleStates";

const products = [
  { id: 1, name: "iPhone 15", price: "25.000.000", image: "https://placehold.co/200x150" },
  { id: 2, name: "Samsung S24", price: "22.000.000", image: "https://placehold.co/200x150" },
  { id: 3, name: "Xiaomi 14", price: "15.000.000", image: "https://placehold.co/200x150" },
];

const users = [
  { id: 1, name: "Nguyễn Văn Minh", email: "minh@example.com", avatar: "https://placehold.co/80" },
  { id: 2, name: "Trần Thị An", email: "an@example.com", avatar: "https://placehold.co/80" },
  { id: 3, name: "Lê Văn Linh", email: "linh@example.com", avatar: "https://placehold.co/80" },
];

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* ===== TIER 0 ===== */}
      <h1>Tier 0 — Demo các component</h1>

      <hr />
      <h2>Bài 1: UserProfile</h2>
      <UserProfile />

      <hr />
      <h2>Bài 2: ProductInfo</h2>
      <ProductInfo />

      {/* ===== TIER 2 ===== */}
      <h1 style={{ marginTop: "40px" }}>Tier 2 — Biến trong JSX</h1>

      <hr />
      <h2>Bài 2.1 — Hiển thị biến đơn giản</h2>
      <SimpleVariables />

      <hr />
      <h2>Bài 2.2 — Conditional Rendering</h2>
      <ConditionalRendering />

      <hr />
      <h2>Bài 2.3 — Render danh sách</h2>
      <ListRendering />

      {/* ===== TIER 3 ===== */}
      <h1 style={{ marginTop: "40px" }}>Tier 3 — Chia Component</h1>
      <Header />
      <hr />
      <h2>Bài 3.2 — ProductCard</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <ProductCard key={product.id} name={product.name} price={product.price} image={product.image} />
        ))}
      </div>
      <hr />
      <h2>Bài 3.3 — UserCard</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {users.map((user) => (
          <UserCard key={user.id} name={user.name} email={user.email} avatar={user.avatar} />
        ))}
      </div>
      <hr />
      <h2>Bài 3.3 — PriceTag</h2>
      <div>
        <PriceTag originalPrice={25000000} salePrice={19990000} />
        <PriceTag originalPrice={1500000} salePrice={990000} />
        <PriceTag originalPrice={500000} salePrice={350000} />
      </div>
      <Footer />

      {/* ===== TIER 4 ===== */}
      <h1 style={{ marginTop: "40px" }}>Tier 4 — useState cơ bản</h1>
      <hr />
      <h2>Bài 4.1 — useState với số</h2>
      <NumberState />
      <hr />
      <h2>Bài 4.2 — useState với chuỗi</h2>
      <StringState />
      <hr />
      <h2>Bài 4.3 — useState với boolean</h2>
      <BooleanState />
      <hr />
      <h2>Bài 4.4 — Nhiều useState</h2>
      <MultipleStates />
    </div>
  );
}

export default App;