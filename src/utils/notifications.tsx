import { BasicNotification } from "@/components/ui/BasicNotification";
import { NotificationTypes } from "@/types/enums/notifications";
import { NotificationInfo } from "@/types/types/notifications";
import { toast } from "react-toastify";

export function notify(notificationInfo: NotificationInfo | string) {
  if(typeof notificationInfo === "string") {
    toast((props) => (
      <BasicNotification 
        title={notificationInfo}
        type={NotificationTypes.INFO} 
        {...props}
      />
    ));
  } else {
    const { title, message, type } = notificationInfo;

    toast((props) => (
      <BasicNotification 
        title={title}
        message={message}
        type={type || NotificationTypes.INFO} 
        {...props}
      />
    ));
  }
}