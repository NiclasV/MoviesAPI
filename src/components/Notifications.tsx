import { useContext, useEffect, useRef, useState } from 'react';
import { NotificationsContext } from '../context/NotificationsContext';
import { styled } from 'styled-components';
import { Button } from './ui/elements/Button';
import SvgIcon from './ui/elements/SvgIcon';

const StyledNotifications = styled.div`
    width: auto;
    max-width: 460px;
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 999;

    div {
        display: flex;
        flex-direction: column;
        padding: 8px 20px;
        border-radius: 10px;
        background-color: ${props => props.theme.primary[500]};
        border: 1px solid ${props => props.theme.primary[600]};
        min-heigth: 100px;
        margin: 5px;
        position: relative;

        p {
            margin: 0;
            color: ${props => props.theme.text[900]};
            font-size: 16px;    
            font-weight: 700;
            text-align: center;
            margin: 10px 0;
        }

        button {
            opacity: 1;
            position: absolute;
            right: -5px;
            top: -5px;
            border-radius: 50%;
            background-color: ${props => props.theme.primary[600]};
            &:hover {
                opacity: 1;
            }
        }
    }

`;
const RemoveIcon = () => {
    return (
       <SvgIcon viewBox="0 0 24 24" strokeWidth="4px"width="14px" height="14px">
            <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>   
       </SvgIcon>
    );
 }

interface NotificationProps {
    message: string;
    removeNotification: (message: string) => void;  
}

function Notification({ message, removeNotification }: NotificationProps) {
    const [timer, setTimer] = useState<number>(3);
    const countRef = useRef<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        if (countRef.current) clearTimeout(countRef.current);
        countRef.current = setInterval(() => {
            setTimer((timer) => timer - 1);
        }, 1000);
    };

    const stopTimer = () => {
        if (countRef.current) clearTimeout(countRef.current);
    };

    const resetTimer = () => {
        setTimer(2);
    };

    useEffect(() => {
        startTimer();
        return () => {
            if (countRef.current) clearTimeout(countRef.current);
        };
    }, []);

    useEffect(() => {
        if (timer === 0) {
            removeNotification(message)
            resetTimer();
        }
    }, [timer]);

    return (
        <div onMouseEnter={() => {
            stopTimer();
            resetTimer();
        }}
            onMouseLeave={() => { startTimer(); }}>
            <p>{message}</p>
            <Button $size="sm" $padding="3px" $color="background" onClick={() => removeNotification(message)}>
                <RemoveIcon />
            </Button>
        </div>
    );
}

export function Notifications() {
    const { notifications, removeNotification } = useContext(NotificationsContext);

    return (
        <StyledNotifications>
            {notifications.map((notification, index) => (
                <Notification key={index} message={notification} removeNotification={removeNotification} />
            ))}
        </StyledNotifications>
    );
}