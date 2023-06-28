import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './LoginForm.module.scss';
import Button from '../../common/Button/Button';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/loggedUserRedux';
import Alert from '../../common/Alert/Alert';

const LoginForm = ({ loginSuccess }) => {
  const dispatch = useDispatch();
  const [inputType, setInputType] = useState('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [infoAlert, setInfoAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [passwordSendInfo, setPasswordSendInfo] = useState(false);
  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();
  const handleShowPassword = checked => {
    checked ? setInputType('text') : setInputType('password');
  };

  const handleForgottenPassword = e => {
    e.preventDefault();
    setForgotPasswordModal(true);
  };

  const handleSubmit = () => {
    const usersDB = JSON.parse(localStorage.getItem('userData'));
    const userIndex = usersDB?.findIndex(user => user.userEmail === email);

    if (userIndex !== -1 && usersDB[userIndex].userPassword === password) {
      setAlertType('login');
      dispatch(logIn({ userName: usersDB[userIndex].userEmail }));
      loginSuccess(true);
    } else {
      setAlertType('loginError');
    }
    setInfoAlert(true);
  };

  return (
    <div className={styles.root}>
      {infoAlert && <Alert type={alertType} closeAlert={setInfoAlert} />}
      <div className='container'>
        <div className='row justify-content-center my-5'>
          <form className='col-12 col-md-8 col-lg-4' onSubmit={validate(handleSubmit)}>
            <h3 className='text-center'>Sign in to RacketShop</h3>
            <input
              {...register('email', {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              autoComplete='username'
              type='email'
              className='form-control my-3'
              placeholder='Email*'
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></input>
            <input
              {...register('password', { required: true })}
              autoComplete='current-password'
              type={inputType}
              className='form-control my-3'
              placeholder='Password*'
              value={password}
              onChange={e => setPassword(e.target.value)}
            ></input>
            {errors.email && <p className='text-danger'>Incorrect email!</p>}
            <div className='row my-3'>
              <div className='col text-start'>
                <div className='form-check form-switch '>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    role='switch'
                    id='switchShowPassword'
                    onChange={e => handleShowPassword(e.target.checked)}
                  ></input>
                  <label className='form-check-label' htmlFor='switchShowPassword'>
                    Show password
                  </label>
                </div>
              </div>
              <div className='col text-end'>
                <Button variant='main' type='submit'>
                  Sign in
                </Button>
              </div>
            </div>
          </form>
          <div className='mt-2 text-center' onClick={handleForgottenPassword}>
            <Button variant='outline'>Forgot password?</Button>
          </div>
          {forgotPasswordModal && (
            <Modal
              centered
              show={forgotPasswordModal}
              onHide={() => setForgotPasswordModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Please enter your email</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {!passwordSendInfo && (
                  <Form>
                    <Form.Group className='mb-3'>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type='email'
                        placeholder='name@example.com'
                        autoFocus
                      />
                    </Form.Group>
                    <button
                      type='button'
                      className='btn btn-primary'
                      onClick={() => setPasswordSendInfo(true)}
                    >
                      Send
                    </button>
                  </Form>
                )}
                {passwordSendInfo && (
                  <p>
                    If there is an account connected with provided mail we will send you
                    info how to reset password
                  </p>
                )}
              </Modal.Body>
            </Modal>
          )}
          <div className='mt-4 text-center'>
            <Link to='/register'>New to RacketShop? Create an account&gt;</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;

LoginForm.propTypes = {
  loginSuccess: PropTypes.func,
};
