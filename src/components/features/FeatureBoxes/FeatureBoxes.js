import React from 'react';
import PropTypes from 'prop-types';

import {
  faTruck,
  faHeadphones,
  faReplyAll,
  faBullhorn,
} from '@fortawesome/free-solid-svg-icons';

import styles from './FeatureBoxes.module.scss';
import FeatureBox from '../../common/FeatureBox/FeatureBox';

const FeatureBoxes = () => {
  const boxes = [
    { id: 1, icon: faTruck, title: 'Free shipping', text: 'All orders' },
    { id: 2, icon: faHeadphones, title: '24/7 customer', text: 'support' },
    { id: 3, icon: faReplyAll, title: 'money back', text: 'guarantee' },
    { id: 4, icon: faBullhorn, title: 'member discount', text: 'first order' },
  ];

  return (
    <div className={styles.root}>
      <div className='container'>
        <div className='row'>
          {boxes.map(box => (
            <div key={box.id} className='col-6 col-lg-3'>
              <FeatureBox icon={box.icon}>
                <h5>{box.title}</h5>
                <p>{box.text}</p>
              </FeatureBox>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

FeatureBoxes.propTypes = {
  children: PropTypes.node,
};

export default FeatureBoxes;
