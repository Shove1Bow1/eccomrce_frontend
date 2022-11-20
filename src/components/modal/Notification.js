import { notification } from 'antd';

function successNotification(type, message, description) {
    return (
        notification[type]({
            message,
            description
        })
    );
}

export default successNotification;