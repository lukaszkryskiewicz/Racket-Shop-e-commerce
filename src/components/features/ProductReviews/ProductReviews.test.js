import React from 'react';
import { shallow } from 'enzyme';
import ProductReviews from './ProductReviews';

describe('Component ProductReview', () => {
  it('should render without crashing', () => {
    const component = shallow(<ProductReviews />);
    expect(component).toBeTruthy();
  });
});
