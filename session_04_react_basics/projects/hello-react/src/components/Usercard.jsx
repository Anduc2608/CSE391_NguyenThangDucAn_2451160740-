function UserCard({ name, email, avatar }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        margin: "10px",
        width: "200px",
        textAlign: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      <img
        src={avatar}
        alt={name}
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "12px",
          border: "3px solid #3498db",
        }}
      />
      <h3 style={{ margin: "0 0 6px", fontSize: "16px" }}>{name}</h3>
      <p style={{ margin: 0, color: "#666", fontSize: "13px" }}>{email}</p>
    </div>
  );
}

export default UserCard;