import React from 'react';
import { shallow } from 'enzyme';
import ProductList from './ProductList';

describe('ProductList', () => {
  it('renders without crashing', () => {
    const productsToRender = [
      { name: 'Product 1', price: 10 },
      { name: 'Product 2', price: 20 },
    ];
    shallow(<ProductList productsToRender={productsToRender} />);
  });
});
