export default function Loader({ variant = "spinner" }) {
  if (variant === "skeleton") {
    return (
      <div className="skeleton-card" aria-hidden="true">
        <span />
      </div>
    );
  }

  return <span className="spinner" aria-label="Loading" role="status" />;
}
