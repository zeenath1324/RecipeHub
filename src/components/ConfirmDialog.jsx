import React, { useEffect } from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

export default function ConfirmDialog({
  isOpen,
  title = 'Delete Recipe',
  message = 'Are you sure you want to delete this recipe? This action cannot be undone.',
  confirmText = 'Delete Recipe',
  cancelText = 'Cancel',
  isDeleting = false,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-black/10 scale-100 transition-all">
        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-serif font-bold text-center text-[#142A20] mb-2">
          {title}
        </h3>

        <p className="text-sm text-center text-[#777A70] leading-relaxed mb-6">
          {message}
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-[#252922] hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={onConfirm}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 shadow-sm"
          >
            {isDeleting ? (
              <span>Deleting...</span>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>{confirmText}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
