import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';
import { Provider } from 'react-redux';
import { store } from '../../../redux/store';

describe('Component LoginForm', () => {
  it('should render without crashing', () => {
    const component = shallow(
      <Provider store={store}>
        <LoginForm />
      </Provider>);
    expect(component).toBeTruthy();
  });
});
