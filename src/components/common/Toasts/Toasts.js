import React from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getViewportMode } from '../../../redux/viewportModeRedux';

const Toasts = () => {
  const viewportMode = useSelector(getViewportMode);

  return (
    <div>
      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme='colored'
        limit={viewportMode === 'mobile' || viewportMode === 'tablet' ? 3 : 10}
      />
    </div>
  );
};

export default Toasts;
