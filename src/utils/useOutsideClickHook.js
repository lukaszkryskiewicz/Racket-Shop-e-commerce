import { useEffect } from 'react';

const useOutsideClick = (ref, closeModal) => {
  useEffect(() => {
    const handleOutsideClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        closeModal(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [ref, closeModal]);
};

export default useOutsideClick;
