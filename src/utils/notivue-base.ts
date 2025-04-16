import { push, type PushOptions } from "notivue";

// Tipos de notificação disponíveis
type NotificationType = "info" | "success" | "error" | "warning";

export interface MessageNotificationProps {
    name: string;
    lastName?: string;
    isMessageRequest?: boolean;
}

export function pushMessageNotification({
    props = {} as MessageNotificationProps,
    type = "info" as NotificationType,
    title,
    ...options
}: PushOptions<MessageNotificationProps> & {
    type?: NotificationType;
    title?: string;
}) {
    const pushMethod = push[type];

    pushMethod({
        ...(title && { title }),
        ...options,
        props: {
            ...props,
        },
    });
}
