import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '../src/components/Header';

describe('Header component', () => {
  test('renders header with correct text', () => {
    render(<Header />);
    const headerElement = screen.getByText(/spend smart/i);
    expect(headerElement).toBeInTheDocument();
  });
});