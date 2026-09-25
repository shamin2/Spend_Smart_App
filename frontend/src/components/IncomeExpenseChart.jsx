import React, { useContext } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

import { GlobalContext } from '../context/GlobalState';

export const IncomeExpenseChart = () => {
  const { transactions } = useContext(GlobalContext);

  const income = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

  const expenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

  const data = [
    {
      name: 'Income',
      amount: income,
    },
    {
      name: 'Expenses',
      amount: expenses,
    },
  ];

  return (
    <div className="chart-card">
      <div className="section-header">
        <div>
          <p className="section-header__eyebrow">
            OVERVIEW
          </p>

          <h2>Income vs Expenses</h2>
        </div>
      </div>

      <div className="income-expense-chart">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.06)"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              stroke="#718078"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#718078"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />

            <Tooltip
              cursor={{
                fill: 'rgba(255,255,255,0.03)',
              }}
              formatter={(value) => [
                `$${Number(value).toFixed(2)}`,
                'Amount',
              ]}
            />

            <Bar
              dataKey="amount"
              fill="#22c55e"
              radius={[8, 8, 0, 0]}
              maxBarSize={80}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};