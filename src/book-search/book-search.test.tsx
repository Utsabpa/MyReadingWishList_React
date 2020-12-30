import React from 'react';
import { render } from '@testing-library/react';
import BookSearch from './BookSearch';

test('renders Add To Wishlist', () => {
  const { getAllByText } = render(<BookSearch />);
  const addToWishlist = getAllByText(/Add To Wishlist/i);
  expect(addToWishlist.length).toEqual(10);
});
