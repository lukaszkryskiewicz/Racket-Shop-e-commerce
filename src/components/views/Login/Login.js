import React, { useState, useEffect } from 'react';
import styles from './Login.module.scss';
import LoginForm from '../../features/LoginForm/LoginForm';
import { useSelector } from 'react-redux';
import { getLoggedUser } from '../../../redux/loggedUserRedux';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const loggedUser = useSelector(getLoggedUser);
  const [isLogged, setIsLogged] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    if (loginSuccess) {
      setTimeout(() => {
        history.push('/');
      }, 3000);
    }
  }, [history, loginSuccess]);

  useEffect(() => {
    if (loggedUser) {
      setIsLogged(true);
    }
  }, [loggedUser]);

  return (
    <div className={styles.root}>
      {!isLogged && <LoginForm loginSuccess={setLoginSuccess} />}
      {isLogged && (
        <div className={styles.logged}>
          <h2>You are already logged!</h2>
        </div>
      )}
    </div>
  );
};
export default Login;
