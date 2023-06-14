import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';

describe('Login', () => {
  it('renders without crashing', () => {
    shallow(<Provider store={store}>
      <Login />
    </Provider>);
  });
});


