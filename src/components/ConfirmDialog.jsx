export default function ConfirmDialog({
  open,
  loading,
  title,
  description,
  confirmLabel,
  onCancel,
  onConfirm,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onCancel}>
      <section
        className="confirm-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id="confirm-dialog-title">{title}</h2>
        <p id="confirm-dialog-description">{description}</p>

        <div className="dialog-actions">
          <button className="secondary-button" type="button" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
          <button className="danger-button" type="button" onClick={onConfirm} disabled={loading}>
            {loading ? "Deleting" : confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}
