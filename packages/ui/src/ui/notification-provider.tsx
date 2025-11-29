"use client";

import { useNotification } from "@/hooks/use-notification";
import * as Notification from "@/ui/notification";

const NotificationProvider = () => {
  const { notifications } = useNotification();

  return (
    <Notification.Provider>
      {notifications.map(({ id, ...rest }) => (
        <Notification.Root key={id} {...rest} />
      ))}
      <Notification.Viewport />
    </Notification.Provider>
  );
};

export { NotificationProvider };
