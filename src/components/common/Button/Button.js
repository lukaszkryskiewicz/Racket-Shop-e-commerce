import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';
import { HashLink as Link } from 'react-router-hash-link';

const Button = ({
  children,
  variant,
  noHover,
  link,
  className: propClassName,
  ...props
}) => {
  const classes = [];

  if (propClassName) classes.push(propClassName);

  if (variant) classes.push(styles[variant]);
  else classes.push('main');

  if (noHover) {
    classes.push(styles.noHover);
  }

  if (link) {
    return (
      <Link to={link + '#top'} {...props} className={classes.join(' ')}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={classes.join(' ')}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  noHover: PropTypes.bool,
  className: PropTypes.string,
  variant: PropTypes.string,
  link: PropTypes.string,
};

export default Button;
