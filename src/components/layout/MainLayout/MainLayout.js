import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ChatBotComponent from '../../features/ChatBotComponent/ChatBotComponent';
import { useEffect } from 'react';
import { toggleViewportMode } from '../../../redux/viewportModeRedux';
import { useDispatch } from 'react-redux';
import Toasts from '../../common/Toasts/Toasts';

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const setViewportMode = () => {
      const { innerWidth: width } = window;
      return dispatch(toggleViewportMode(width));
    };
    setViewportMode();
    window.addEventListener('resize', setViewportMode);
    return () => window.removeEventListener('resize', setViewportMode);
  }, [dispatch]);

  return (
    <div>
      <Header />
      {children}
      <ChatBotComponent />
      <Toasts />
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
