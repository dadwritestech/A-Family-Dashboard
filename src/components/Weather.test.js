import React from 'react';
import { render, screen } from '@testing-library/react';
import Weather from './Weather';

test('renders weather component', () => {
  render(<Weather />);
  const linkElement = screen.getByText(/Current Weather/i);
  expect(linkElement).toBeInTheDocument();
});
