
# 🚀 Spend Smart

This Spend Smart web app is designed to help first-year university students manage their finances effectively. Entering university often brings new financial challenges, and many students find themselves struggling to budget their expenses properly. This can lead to maxed-out credit cards and significant debt, creating financial stress that impacts their academic and personal lives.

**Our app aims to address these issues by providing a user-friendly platform that helps students track their expenses and budget accordingly. By using this app, students can gain better control over their finances, avoid unnecessary debt, and develop healthy financial habits for the future.**

## ✨ Features

- **Track Expenses**: Easily add, view, and delete your daily expenses.
- **Budget Management**: Monitor your income and expenses to ensure you stay within your budget.
- **Responsive Design**: Accessible on both desktop and mobile devices.
- **User-Friendly Interface**: Intuitive and simple design for a seamless user experience.

## 🛠 Tech Stack

- **Frontend**: React with Vite
- **Styling**: CSS with custom styles
- **State Management**: React hooks

## 📂 Project Structure

\`\`\`
- src
  - components
    - AddTransaction.jsx: Component for adding new transactions.
    - Balance.jsx: Component displaying the current balance.
    - Header.jsx: Component for the app header.
    - IncomeExpenses.jsx: Component displaying income and expenses.
    - Transaction.jsx: Component for individual transaction item.
    - TransactionList.jsx: Component for listing all transactions.
  - App.jsx: Main app component.
  - main.jsx: Entry point of the app.

- public
  - Static assets

- index.html
  - Main HTML file
\`\`\`

## 🧪 Unit Testing
The app includes unit tests for key components to ensure that each function works as expected and provides a reliable experience. Using Jest and React Testing Library, we've tested the following components:

- **AddTransaction**: Verifies that new transactions are added correctly and prevents invalid data submission.
- **Balance**: Confirms the balance display based on user transactions.
- **IncomeExpenses**: Checks that income and expense totals are calculated and displayed accurately.
- **Transaction**: Ensures each transaction displays correctly and can be deleted.
- **TransactionList**: Validates that all transactions are rendered as expected.
- **Header**: Simple check to ensure the app header displays as intended.

## 🎨 Styling

The app is styled using a custom CSS file located at \`src/App.css\`. Key styles include:

- **Container**: Centered container with a fixed width.
- **Buttons**: Styled buttons for adding transactions and deleting items.
- **Lists**: Styled lists for displaying income and expenses.

## 🚀 Future Improvements

We have several ideas for future improvements to make this app even better:

- **User Authentication**: Allow users to create accounts and securely log in to access their personal expense data.
- **Data Visualization**: Implement charts and graphs to provide visual insights into spending habits and trends.
- **Recurring Transactions**: Enable users to set up recurring transactions for regular expenses like rent, subscriptions, etc.
- **Mobile App**: Develop a mobile version of the app for both iOS and Android platforms.
- **Expense Categories**: Allow users to categorize their expenses for better organization and analysis.
- **Budget Alerts**: Send notifications or alerts when users are close to exceeding their budget limits.

## Contact

For any questions or suggestions, please contact:

- **Name:** Shamin Yasar
- **Email:** shaminyasar2001@gmail.com
- **Portfolio:** [here](https://shamin-portfolio.netlify.app/)

**Check out the project live** [here](https://spend-smart-app.netlify.app/)
