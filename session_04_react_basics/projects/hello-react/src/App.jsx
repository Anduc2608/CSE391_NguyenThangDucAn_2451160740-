import "./App.css";

// Tier 0
import UserProfile from "./components/UserProfile";
import ProductInfo from "./components/ProductInfo";

// Tier 2
import SimpleVariables from "./components/SimpleVariables";
import ConditionalRendering from "./components/ConditionalRendering";
import ListRendering from "./components/ListRendering";

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
    </div>
  );
}

export default App;