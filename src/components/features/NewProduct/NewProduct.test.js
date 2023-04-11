import React from 'react';
import { shallow } from 'enzyme';
import NewProduct from './NewProduct';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

describe('Component NewProduct', () => {
  it('should render without crashing', () => {
    const component = shallow(
      <Provider store={store}>
        <NewProduct />
      </Provider>
    );
    expect(component).toBeTruthy();
  });
});
