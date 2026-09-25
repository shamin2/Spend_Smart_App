import React, { useContext } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { GlobalContext } from '../context/GlobalState';

const COLORS = [
  '#22c55e',
  '#4ade80',
  '#16a34a',
  '#86efac',
  '#15803d',
  '#bbf7d0',
  '#166534',
  '#6ee7b7',
];

export const ExpenseChart = () => {
  const { transactions } = useContext(GlobalContext);

  const expenses = transactions.filter(
    (transaction) => transaction.type === 'expense'
  );

  const categoryTotals = expenses.reduce((totals, transaction) => {
    const category = transaction.category;

    totals[category] =
      (totals[category] || 0) + transaction.amount;

    return totals;
  }, {});

  const data = Object.entries(categoryTotals).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  return (
    <div className="chart-card">
      <div className="section-header">
        <div>
          <p className="section-header__eyebrow">
            SPENDING
          </p>

          <h2>Expense Breakdown</h2>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="chart-empty">
          No expense data yet.
        </div>
      ) : (
        <div className="expense-chart">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [
                  `$${Number(value).toFixed(2)}`,
                  'Spent',
                ]}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="expense-chart__legend">
            {data.map((item, index) => (
              <div
                className="expense-chart__legend-item"
                key={item.name}
              >
                <span
                  className="expense-chart__dot"
                  style={{
                    backgroundColor:
                      COLORS[index % COLORS.length],
                  }}
                />

                <span className="expense-chart__category">
                  {item.name}
                </span>

                <span className="expense-chart__value">
                  ${item.value.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};