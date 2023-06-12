import React, { useEffect, useState } from 'react';
import styles from './PromoTimer.module.scss';

const PromoTimer = () => {
  const [countdown, setCountdown] = useState(0);

  const promoDetails = {
    title: '20% off till 3 P.M',
  };

  const formatTime = value => {
    if (typeof value === 'number' && value > 0 && !isNaN(value)) {
      let output = 0;
      let s = value % 60;
      let m = Math.floor((value / 60) % 60);
      let h = Math.floor((value / 3600) % 60);

      if (s < 10) {
        output = ':0' + s;
      } else {
        output = ':' + s;
      }
      if (m < 10) {
        output = ':0' + m + output;
      } else {
        output = ':' + m + output;
      }
      if (h < 10) {
        output = '0' + h + output;
        return output;
      } else {
        output = h + output;
        return output;
      }
    } else {
      return null;
    }
  };

  useEffect(() => {
    const countDownTime = () => {
      const currentTime = new Date();
      const nextDeadline = new Date(
        Date.UTC(
          currentTime.getUTCFullYear(),
          currentTime.getUTCMonth(),
          currentTime.getUTCDate(),
          15,
          0,
          0,
          0
        )
      );
      if (currentTime.getUTCHours() >= 15) {
        nextDeadline.setUTCDate(currentTime.getUTCDate() + 1);
      }
      return Math.round((nextDeadline.getTime() - currentTime.getTime()) / 1000);
    };
    const interval = setInterval(() => {
      const timeLeft = countDownTime();
      setCountdown(formatTime(timeLeft));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.promoTimer}>
      <div className={styles.timerContainer}>
        <h3 className={styles.promoTitle}>{promoDetails.title}</h3>
        <div className={styles.timer}>{countdown}</div>
      </div>
    </div>
  );
};

export default PromoTimer;
