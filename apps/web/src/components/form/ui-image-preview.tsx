import { isValidUrl } from "@/utils/helper";
import Image from "next/image";

interface UIImagePreviewProps {
  imageUrl?: string;
  width?: number;
  height?: number;
}

export default function UIImagePreview({
  imageUrl = "",
  width = 500,
  height = 500,
}: UIImagePreviewProps) {
  if (!imageUrl || !isValidUrl(imageUrl)) {
    return null;
  }

  return (
    <div className="overflow-hidden flex items-center justify-center bg-gray-100 rounded-lg">
      <Image
        src={imageUrl}
        alt="Vista previa"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  );
}
