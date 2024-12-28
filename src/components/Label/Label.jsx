export default function Label({ children, style, ...args }) {
  return (
    <div style={{ color: "var(--label)", ...style }} {...args}>
      {children}
    </div>
  );
}
