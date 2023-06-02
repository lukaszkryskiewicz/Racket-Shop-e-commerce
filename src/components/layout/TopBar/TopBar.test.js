import React from 'react';
import { shallow } from 'enzyme';
import TopBar from './TopBar';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';

describe('TopBar', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <TopBar />
      </Provider>);
  });
});
