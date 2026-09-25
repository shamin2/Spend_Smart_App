import React, {
  useContext,
  useEffect,
} from 'react';

import { GlobalContext } from '../context/GlobalState';

export const Notification = () => {
  const {
    notification,
    clearNotification,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (!notification) {
      return;
    }

    const timer = setTimeout(() => {
      clearNotification();
    }, 3500);

    return () => clearTimeout(timer);
  }, [notification, clearNotification]);

  if (!notification) {
    return null;
  }

  return (
    <div
      className={`notification notification--${notification.type}`}
    >
      <div className="notification__icon">
        {notification.type === 'success' ? '✓' : '!'}
      </div>

      <div className="notification__content">
        <strong>
          {notification.type === 'success'
            ? 'Success'
            : 'Something went wrong'}
        </strong>

        <span>{notification.message}</span>
      </div>

      <button
        className="notification__close"
        type="button"
        onClick={clearNotification}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};