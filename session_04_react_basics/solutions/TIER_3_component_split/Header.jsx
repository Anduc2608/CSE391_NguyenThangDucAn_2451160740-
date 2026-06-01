function Header() {
  return (
    <header
      style={{
        background: "#3498db",
        color: "white",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "20px" }}>🛒 Cửa hàng điện thoại</h1>
      <nav style={{ display: "flex", gap: "15px" }}>
        <a href="/" style={{ color: "white", textDecoration: "none" }}>
          Trang chủ
        </a>
        <a href="/about" style={{ color: "white", textDecoration: "none" }}>
          Giới thiệu
        </a>
        <a href="/contact" style={{ color: "white", textDecoration: "none" }}>
          Liên hệ
        </a>
      </nav>
    </header>
  );
}

export default Header;