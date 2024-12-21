import { NotificationTypes } from "@/types/enums/notifications";
import { NotificationInfo } from "@/types/types/components/notifications";
import { FC } from "react";
import { ToastContentProps } from "react-toastify";

type BasicNotificationProps = NotificationInfo & ToastContentProps;

export const BasicNotification:FC<BasicNotificationProps> = ({ title, message, type = NotificationTypes.INFO }) => {
  const textColors = {
    [NotificationTypes.INFO]: "text-gray-800",
    [NotificationTypes.WARNING]: "text-yellow-800",
    [NotificationTypes.ERROR]: "text-red-800",
    [NotificationTypes.SUCCESS]: "text-blue-800"
  };
  const borderColors = {
    [NotificationTypes.INFO]: "border-gray-300",
    [NotificationTypes.WARNING]: "border-yellow-300",
    [NotificationTypes.ERROR]: "border-red-300",
    [NotificationTypes.SUCCESS]: "border-blue-300"
  };

  return (
    <div className={`border rounded-lg ${borderColors[type]} text-sm w-full flex p-4`}>
      <div className={textColors[type]}>
        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
      </div>
      <div className={`mr-3`}>
        <p className={`font-semibold ${textColors[type]}`}>{title}</p>
        <p className="text-gray-500">{message}</p>
      </div>
    </div>
  );
}
