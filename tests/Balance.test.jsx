import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GlobalContext } from '../src/context/GlobalState';
import { Balance } from '../src/components/Balance';

describe('Balance component', () => {
  test('renders balance with formatted total', () => {
    // Set up a mock transactions array
    const transactions = [
      { id: 1, text: 'Salary', amount: 1000 },
      { id: 2, text: 'Groceries', amount: -200 },
      { id: 3, text: 'Rent', amount: -500 },
    ];

    // Render Balance with the mocked GlobalContext provider
    render(
      <GlobalContext.Provider value={{ transactions }}>
        <Balance />
      </GlobalContext.Provider>
    );

    // Verify the balance title and formatted total amount
    expect(screen.getByText(/your balance/i)).toBeInTheDocument();
    expect(screen.getByText('$ 300.00')).toBeInTheDocument();
  });
});
