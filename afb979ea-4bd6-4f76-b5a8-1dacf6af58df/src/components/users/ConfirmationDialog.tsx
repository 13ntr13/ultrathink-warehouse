import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { AlertTriangleIcon } from 'lucide-react';
interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
}
export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Delete'
}: ConfirmationDialogProps) {
  return <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm" footer={<div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>}>
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
          <AlertTriangleIcon className="w-5 h-5 text-red-500" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
      </div>
    </Modal>;
}