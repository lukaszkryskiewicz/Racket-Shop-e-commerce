import React, { useState, useEffect } from 'react';
import styles from './RegisterForm.module.scss';
import Button from '../../common/Button/Button';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Alert from '../../common/Alert/Alert';

const RegisterForm = () => {
  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();
  const [checkAllConsents, setCheckAllConsents] = useState(false);
  const [checkTermConditions, setCheckTermConditions] = useState(false);
  const [checkNewsletter, setCheckNewsletter] = useState(false);
  const [inputType, setInputType] = useState('password');
  const [infoAlert, setInfoAlert] = useState(false);
  const [alertType, setAlertType] = useState('');

  useEffect(() => {
    if (checkNewsletter && checkTermConditions) {
      setCheckAllConsents(true);
    }
    if (checkAllConsents) {
      setCheckTermConditions(true);
      setCheckNewsletter(true);
    }
  }, [checkAllConsents, checkNewsletter, checkTermConditions]);

  const handleTermConditions = () => {
    setCheckAllConsents(false);
    setCheckTermConditions(checkTermConditions => !checkTermConditions);
  };
  const handleNewsletter = () => {
    setCheckAllConsents(false);
    setCheckNewsletter(checkNewsletter => !checkNewsletter);
  };

  const handleAllConsents = () => {
    setCheckAllConsents(!checkAllConsents);
    setCheckTermConditions(checkAllConsents => !checkAllConsents);
    setCheckNewsletter(checkAllConsents => !checkAllConsents);
  };
  const handleShowPassword = checked => {
    checked ? setInputType('text') : setInputType('password');
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const handleSubmit = () => {
    const data = {
      userEmail: email,
      userPassword: password,
    };

    let currentData = JSON.parse(localStorage.getItem('userData')) || [];
    if (currentData && !currentData.some(user => user.userEmail === data.userEmail)) {
      currentData.push(data);
      localStorage.setItem('userData', JSON.stringify(currentData));
      setAlertType('register');
    } else {
      setAlertType('registerError');
    }
    setInfoAlert(true);
  };

  return (
    <>
      <div className={styles.root}>
        {infoAlert && <Alert closeAlert={setInfoAlert} type={alertType} />}
        <div className='container'>
          <div className='row justify-content-center my-5'>
            <form
              className='col-12 col-md-8 col-lg-4'
              onSubmit={validate(handleSubmit)}
            >
              <h3 className='text-center'>Create an account</h3>
              <input
                {...register('email', {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
                autoComplete='username'
                value={email}
                type='email'
                className='form-control my-3'
                placeholder='Email*'
                onChange={e => setEmail(e.target.value)}
              ></input>
              {errors.email && <span>This is not a valid email</span>}
              <input
                {...register('password', {
                  required: true,
                  minLength: 3,
                })}
                autoComplete='new-password'
                value={password}
                type={inputType}
                className='form-control my-3'
                placeholder='Password*'
                onChange={e => setPassword(e.target.value)}
              ></input>
              {errors.password && <span>Password is to short</span>}
              <input
                {...register('repeatPassword', {
                  required: true,
                  minLength: 3,
                  validate: value => value === password,
                })}
                autoComplete='new-password'
                value={repeatPassword}
                type={inputType}
                className='form-control my-3'
                placeholder='Repeat password*'
                onChange={e => setRepeatPassword(e.target.value)}
              ></input>
              {errors.repeatPassword && (
                <span>Repeated password is to short or does not match password</span>
              )}
              <div className='form-check form-switch my-3'>
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
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={checkAllConsents}
                  onChange={handleAllConsents}
                ></input>
                <label className='form-check-label'>Select all consents</label>
              </div>
              <div className='form-check'>
                <input
                  required={true}
                  className='form-check-input'
                  type='checkbox'
                  checked={checkTermConditions}
                  onChange={handleTermConditions}
                ></input>
                <label className='form-check-label'>
                  I accept the <a href='#'>Terms & Conditions</a>*
                </label>
              </div>
              <div className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  checked={checkNewsletter}
                  onChange={handleNewsletter}
                ></input>
                <label className='form-check-label'>I want to receive newsletter</label>
              </div>
              <div className='row my-4 align-items-center'>
                <div className='col text-start'>
                  <Link to='/'>&lt;Back</Link>
                </div>
                <div className='col text-end'>
                  <Button variant='main' type='submit'>
                    Sign up
                  </Button>
                </div>
              </div>
              <div className='mt-5 text-center'>
                <Link to='/login'>Already have an account? Sign in&gt;</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default RegisterForm;
