import { IconSquareRoundedXFilled } from "@tabler/icons-react";

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  footer?: React.ReactNode;
};

export default function UIModal({
  isOpen,
  children,
  onClose,
  title,
  footer,
}: Props) {
  if (!isOpen) return null;

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500/50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 md:w-1/3">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white cursor-pointer"
          >
            <IconSquareRoundedXFilled />
          </button>
        </div>

        <div className="text-gray-700 dark:text-gray-300 mb-4">{children}</div>

        {footer && (
          <div className="mt-4 flex justify-end border-t pt-3 gap-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
