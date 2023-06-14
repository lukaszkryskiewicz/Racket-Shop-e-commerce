import React, { useState, useEffect } from 'react';
import styles from './Login.module.scss';
import LoginForm from '../../features/LoginForm/LoginForm';
import { useSelector } from 'react-redux';
import { getLoggedUser } from '../../../redux/loggedUserRedux';
const Login = () => {
  const loggedUser = useSelector(getLoggedUser);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (loggedUser) {
      setIsLogged(true);
    }
  }, [loggedUser]);

  return (
    <div className={styles.root}>
      {!isLogged && <LoginForm />}
      {isLogged &&
        <div className={styles.logged}>
          <h2 >You are already logged!</h2>
        </div>}
    </div>
  );
};
export default Login;
