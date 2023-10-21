import { PropsWithChildren, createContext, useState } from 'react';

interface NotificationsProps {
    notifications: string[];
    addNotification: (message: string) => void;
    removeNotification: (message: string) => void;
}
export const NotificationsContext = createContext<NotificationsProps>({
    notifications: [],
    addNotification: () => {},
    removeNotification: () => {},
});

export const NotificationsProvider = ({ children }: PropsWithChildren) => {
    const notificationsArr: string[] = [];
    const [notifications, setNotifications] = useState<string[]>(notificationsArr);

    const addNotification = (message: string) => {
        setNotifications(prevNotifications => [...prevNotifications, message]);    };

    const removeNotification = (message: string) => {
        setNotifications(notifications.filter(notification => notification !== message));
    };

    return (
        <NotificationsContext.Provider value={{ notifications, addNotification, removeNotification }}>
            {children}
        </NotificationsContext.Provider>
    );
};