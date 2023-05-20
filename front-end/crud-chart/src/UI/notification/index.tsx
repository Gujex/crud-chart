import React from 'react';
import {Button, notification, Space} from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

    const [api, contextHolder] = notification.useNotification();
    export const showToast = (type: NotificationType) => {
        api[type]({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
    }


