import { NotificationTypes } from "../enums/notifications";

type NotificationInfo = {
  title: string;
  message?: string;
  type?: NotificationTypes;
};

export type {
  NotificationInfo
};