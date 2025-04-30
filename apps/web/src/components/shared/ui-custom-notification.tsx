import { ToastContentProps } from "react-toastify";
import cx from "clsx";

type CustomNotificationProps = ToastContentProps<{
  title: string;
  content: string;
}>;

export default function UICustomNotification({
  closeToast,
  data,
  toastProps,
}: CustomNotificationProps) {
  const isColored = toastProps.theme === "colored";

  return (
    <div className="flex flex-col w-full">
      <h3
        className={cx(
          "text-sm font-semibold",
          isColored ? "text-white" : "text-zinc-800",
        )}
      >
        {data.title}
      </h3>
      <div className="flex items-center justify-between w-full">
        <p className="text-sm">{data.content}</p>
      </div>
    </div>
  );
}
