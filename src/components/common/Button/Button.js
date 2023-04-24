import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ children, variant, noHover, link, noLink, className: propClassName, ...props }) => {
  const classes = [];

  if (propClassName) classes.push(propClassName);

  if (variant) classes.push(styles[variant]);
  else classes.push('main');

  if (noHover) {
    classes.push(styles.noHover);
  }

  if (link) {
    return (
      <a href={link} {...props} className={classes.join(' ')}>
        {children}
      </a>
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
  noLink: PropTypes.bool,
  className: PropTypes.string,
  variant: PropTypes.string,
  link: PropTypes.string,
};

export default Button;
