export default function Layout({ children }) {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      {children}
    </div>
  );
}
