import React from 'react';
import PropTypes from 'prop-types';
import styles from './UserAlert.module.scss';
import Button from '../Button/Button';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

const UserAlert = ({ type, closeAlert }) => {
  const alertInfo = alertType => {
    switch (alertType) {
      case 'register':
        return {
          title: 'Registration completed',
          text: 'You can now log in',
        };
      case 'registerError':
        return {
          title: 'Register Error',
          text: 'it seems that you already have the account',
        };
      case 'login':
        return {
          title: 'You are now logged in!',
          text: 'Enjoy!',
        };
      default:
        return null;
    }
  };

  const handleClick = e => {
    e.preventDefault();
    closeAlert(false);
  };

  const alertMessage = alertInfo(type);

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className={styles.alertContainer}>
          <div className={styles.closeButton}>
            <Button onClick={handleClick}>
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </div>
          <div className={styles.alertContent}>
            <h3 className={styles.alertHeader}>{alertMessage.title}</h3>
            <div className={clsx('row', styles.alertInfoContainer)}>
              <div className={clsx('col-12', styles.content)}>
                <div className={styles.textContainer}>
                  <ul className={clsx('m-3', styles.info)}>{alertMessage.text}</ul>
                  <div className={clsx('row', styles.buttonsContainer)}>
                    <div className={clsx('col-12', styles.buttons)}>
                      {type === 'register' && (
                        <Button link='/login' variant='small' className={styles.button}>
                          log in
                        </Button>
                      )}
                      {type === 'login' && (
                        <Button link='/' variant='small' className={styles.button}>
                          go to main page
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAlert;

UserAlert.propTypes = {
  type: PropTypes.string,
  closeAlert: PropTypes.func,
};
