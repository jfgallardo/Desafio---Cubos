import Image from "next/image";

type AvatarProps = {
  imageUrl?: string;
  username: string;
  size?: "small" | "medium" | "large"; // Tamaños opcionales para el avatar
};

export default function UIAvatar({
  imageUrl,
  username,
  size = "medium",
}: AvatarProps) {
  const sizeClasses = {
    small: "w-8 h-8 text-sm",
    medium: "w-12 h-12 text-base",
    large: "w-16 h-16 text-lg",
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full overflow-hidden ${sizeClasses[size]}`}
    >
      {imageUrl ? (
        <Image
          width={size === "small" ? 32 : size === "medium" ? 48 : 64}
          height={size === "small" ? 32 : size === "medium" ? 48 : 64}
          src={imageUrl}
          alt={username}
        />
      ) : (
        <span className="text-white bg-gray-500 flex items-center justify-center w-full h-full">
          {username.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}
