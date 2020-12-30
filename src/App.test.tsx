import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders My Reading Wishlist', () => {
  const { getAllByText } = render(<App />);
  const linkElement = getAllByText(/My Reading Wishlist/i);
  expect(linkElement.length).toEqual(2);
});
