import { notificationTypes } from "../enums/notifications";

type NotificationInfo = {
  title: string;
  message?: string;
  type?: notificationTypes;
};

export type {
  NotificationInfo
};