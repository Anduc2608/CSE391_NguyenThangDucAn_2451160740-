import "./App.css";

// Tier 0
import UserProfile from "./components/UserProfile";
import ProductInfo from "./components/ProductInfo";

// Tier 2
import SimpleVariables from "../../../solutions/TIER_2_jsx_variables/Simplevariables";
import ConditionalRendering from "../../../solutions/TIER_2_jsx_variables/Conditionalrendering";
import ListRendering from "../../../solutions/TIER_2_jsx_variables/Listrendering";
// Tier 3
import Header from "../../../solutions/TIER_3_component_split/Header";
import Footer from "../../../solutions/TIER_3_component_split/Footer";
import ProductCard from "../../../solutions/TIER_3_component_split/Productcard";
import UserCard from "../../../solutions/TIER_3_component_split/Usercard";
import PriceTag from "../../../solutions/TIER_3_component_split/Pricetag";

// Tier 4
import NumberState from "../../../solutions/TIER_4_useState_basics/Numberstate";
import StringState from "../../../solutions/TIER_4_useState_basics/Stringstate";
import BooleanState from "../../../solutions/TIER_4_useState_basics/Booleanstate";
import MultipleStates from "../../../solutions/TIER_4_useState_basics/Multiplestates";

// Tier 5
import ClickEvents from "../../../solutions/TIER_5_events_basics/Clickevents";
import InputEvents from "../../../solutions/TIER_5_events_basics/Inputevents";
import KeyboardEvents from "../../../solutions/TIER_5_events_basics/Keyboardevents";
import FormEvents from "../../../solutions/TIER_5_events_basics/Formevents";
// Tier 6
import ListBasics from "../../../solutions/TIER_6_lists_crud/Listbasics";
import CreateItem from "../../../solutions/TIER_6_lists_crud/Createitem";
import DeleteItem from "../../../solutions/TIER_6_lists_crud/Deleteitem";
import UpdateItem from "../../../solutions/TIER_6_lists_crud/Updateitem";

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
      <PriceTag originalPrice={25000000} salePrice={19990000} />
      <PriceTag originalPrice={1500000} salePrice={990000} />
      <PriceTag originalPrice={500000} salePrice={350000} />
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

      {/* ===== TIER 5 ===== */}
      <h1 style={{ marginTop: "40px" }}>Tier 5 — Events cơ bản</h1>
      <hr />
      <h2>Bài 5.1 — Click Events</h2>
      <ClickEvents />
      <hr />
      <h2>Bài 5.2 — Input Events</h2>
      <InputEvents />
      <hr />
      <h2>Bài 5.3 — Keyboard Events</h2>
      <KeyboardEvents />
      <hr />
      <h2>Bài 5.4 — Form Events</h2>
      <FormEvents />

      {/* ===== TIER 6 ===== */}
      <h1 style={{ marginTop: "40px" }}>Tier 6 — Lists & CRUD</h1>
      <hr />
      <h2>Bài 6.1 — Render danh sách</h2>
      <ListBasics />
      <hr />
      <h2>Bài 6.2 — Thêm phần tử (CREATE)</h2>
      <CreateItem />
      <hr />
      <h2>Bài 6.3 — Xóa phần tử (DELETE)</h2>
      <DeleteItem />
      <hr />
      <h2>Bài 6.4 — Sửa phần tử (UPDATE)</h2>
      <UpdateItem />
    </div>
  );
}

export default App;