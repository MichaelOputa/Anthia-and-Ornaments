import { X } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  imageTitle: string;
  onClose: () => void;
}

export default function ImageModal({
  isOpen,
  imageSrc,
  imageAlt,
  imageTitle,
  onClose,
}: ImageModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors z-10"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col h-full">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-auto object-contain max-h-[80vh]"
          />
          <div className="p-6 bg-gray-50 border-t">
            <h2 className="text-xl font-serif font-bold text-gray-900">
              {imageTitle}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
