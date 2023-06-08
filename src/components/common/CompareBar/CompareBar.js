import React, { useState } from 'react';
import styles from './CompareBar.module.scss';
import Button from '../../common/Button/Button';
import { useSelector } from 'react-redux';
import { getProductsToCompare } from '../../../redux/productsRedux';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleProductCompare } from '../../../redux/productsRedux';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import CompareModalBase from '../CompareModalBase/CompareModalBase';

const CompareBar = () => {
  const dispatch = useDispatch();
  const compare = useSelector(state => getProductsToCompare(state));
  const [compareModal, setCompareModal] = useState(false);

  const handleClick = id => {
    dispatch(toggleProductCompare(id));
  };

  const handleCompareClick = e => {
    e.preventDefault();
    setCompareModal(true);
  };

  if (!compare.length) return null;

  return (
    <div className={styles.root}>
      {compareModal && <CompareModalBase closeModal={setCompareModal} />}
      <div className='container'>
        <div className={styles.compareBar}>
          <p className={styles.title}>Products to compare:</p>
          {compare.map(item => (
            <div key={item.name} className={clsx('col-1')}>
              <div className={styles.comparedItem} onClick={() => handleClick(item.id)}>
                <img alt={item.name} src={item.source} />
                <FontAwesomeIcon className={styles.closeIcon} icon={faWindowClose}>
                  Add to compare
                </FontAwesomeIcon>
              </div>
            </div>
          ))}
          <Button
            variant='small'
            className={styles.button}
            onClick={handleCompareClick}
          >
            Compare
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
