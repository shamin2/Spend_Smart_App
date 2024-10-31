import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { IncomeExpenses } from '../src/components/IncomeExpenses';
import { GlobalContext } from '../src/context/GlobalState';

// Mock transactions data
const mockTransactions = [
  { id: 1, text: 'Salary', amount: 500 },
  { id: 2, text: 'Groceries', amount: -50 },
  { id: 3, text: 'Bonus', amount: 200 },
  { id: 4, text: 'Rent', amount: -300 },
];

describe('IncomeExpenses component', () => {
  test('renders Income and Expense headings', () => {
    render(
      <GlobalContext.Provider value={{ transactions: mockTransactions }}>
        <IncomeExpenses />
      </GlobalContext.Provider>
    );

    // Check for the presence of Income and Expense headings
    expect(screen.getByText(/Income/i)).toBeInTheDocument();
    expect(screen.getByText(/Expense/i)).toBeInTheDocument();
  });

  test('displays correct income and expense values', () => {
    render(
      <GlobalContext.Provider value={{ transactions: mockTransactions }}>
        <IncomeExpenses />
      </GlobalContext.Provider>
    );

    // Expected income and expense values based on mockTransactions
    const income = 700; // 500 + 200
    const expense = 350; // -50 + -300

    // Check displayed income and expense values
    expect(screen.getByText(`$ ${income.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`$ ${expense.toFixed(2)}`)).toBeInTheDocument();
  });
});
