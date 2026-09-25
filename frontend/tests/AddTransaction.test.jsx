import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GlobalContext } from '../src/context/GlobalState'; // Ensure this path is correct
import { AddTransaction } from '../src/components/AddTransaction'; // Ensure this path is correct

// Custom mock provider for GlobalContext
const MockGlobalProvider = ({ addTransaction, children }) => (
  <GlobalContext.Provider value={{ addTransaction }}>
    {children}
  </GlobalContext.Provider>
);

describe('AddTransaction component', () => {
  test('renders AddTransaction form inputs and button', () => {
    render(
      <MockGlobalProvider addTransaction={() => {}}>
        <AddTransaction />
      </MockGlobalProvider>
    );

    const textInput = screen.getByPlaceholderText(/enter text/i);
    const amountInput = screen.getByPlaceholderText(/enter your amount/i);
    const button = screen.getByRole('button', { name: /add transaction/i });

    expect(textInput).toBeInTheDocument();
    expect(amountInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('calls addTransaction on form submission', () => {
    const addTransactionMock = jest.fn();

    render(
      <MockGlobalProvider addTransaction={addTransactionMock}>
        <AddTransaction />
      </MockGlobalProvider>
    );

    const textInput = screen.getByPlaceholderText(/enter text/i);
    const amountInput = screen.getByPlaceholderText(/enter your amount/i);
    const button = screen.getByRole('button', { name: /add transaction/i });

    fireEvent.change(textInput, { target: { value: 'Book' } });
    fireEvent.change(amountInput, { target: { value: '10' } });
    fireEvent.click(button);

    expect(addTransactionMock).toHaveBeenCalledWith({
      id: expect.any(Number),
      text: 'Book',
      amount: 10,
    });
  });

  test('does not add transaction with invalid data', () => {
    const addTransactionMock = jest.fn();

    render(
      <MockGlobalProvider addTransaction={addTransactionMock}>
        <AddTransaction />
      </MockGlobalProvider>
    );

    const button = screen.getByRole('button', { name: /add transaction/i });
    fireEvent.click(button);

    expect(addTransactionMock).not.toHaveBeenCalled();
    const errorMessage = screen.queryByText(/please enter valid data/i);
    expect(errorMessage).not.toBeInTheDocument(); // Adjust based on actual validation behavior
  });
});
