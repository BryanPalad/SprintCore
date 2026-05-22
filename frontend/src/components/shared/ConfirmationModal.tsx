type ConfirmationModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isConfirming?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmationModal({
  isOpen,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isConfirming = false,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <p className="mt-2 text-sm text-[#464555]">{description}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-[#464555] transition hover:bg-[#f5f2ff]"
            disabled={isConfirming}
            onClick={onCancel}
            type="button"
          >
            {cancelLabel}
          </button>
          <button
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isConfirming}
            onClick={onConfirm}
            type="button"
          >
            {isConfirming ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
