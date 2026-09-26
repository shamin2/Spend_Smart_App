import React, {
  useContext,
  useState,
} from 'react';

import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTransaction } from './components/AddTransaction';
import { Auth } from './components/Auth';
import { ExpenseChart } from './components/ExpenseChart';
import { IncomeExpenseChart } from './components/IncomeExpenseChart';
import { ConfirmModal } from './components/ConfirmModal';
import { Notification } from './components/Notification';
import { BalanceWarning } from './components/BalanceWarning';
import { SpendingInsights } from './components/SpendingInsights';

import { GlobalProvider } from './context/GlobalState';

import {
  AuthContext,
  AuthProvider,
} from './context/AuthContext';

import './App.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  const handleLogout = () => {
    setShowLogoutModal(false);
    logout();
  };

  return (
    <GlobalProvider>
      <div className="app">
        <Notification />

        <header className="navbar">
          <div className="navbar__content">
            <a className="navbar__brand" href="/">
              <span className="navbar__logo">$</span>

              <span>
                Spend
                <span className="navbar__brand-accent">
                  Smart
                </span>
              </span>
            </a>

            <div className="navbar__actions">
              <span className="navbar__user">
                {user?.name}
              </span>

              <button
                className="navbar__login"
                type="button"
                onClick={() =>
                  setShowLogoutModal(true)
                }
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="dashboard">
          <section className="dashboard__header">
            <div>
              <p className="dashboard__eyebrow">
                FINANCIAL OVERVIEW
              </p>

              <h1>
                Welcome back, {user?.name}.
              </h1>

              <p className="dashboard__description">
                Track your income and expenses in one
                simple dashboard.
              </p>
            </div>
          </section>

          <BalanceWarning />

          <section className="dashboard__summary">
            <Balance />
            <IncomeExpenses />
          </section>

          <section className="dashboard__charts">
            <ExpenseChart />
            <IncomeExpenseChart />
          </section>

          <SpendingInsights />

          <section className="dashboard__content">
            <TransactionList />

            <aside className="dashboard__form">
              <AddTransaction />
            </aside>
          </section>
        </main>

        <footer className="footer">
          <p>
            SpendSmart · Simple personal finance tracking
          </p>
        </footer>

        <ConfirmModal
          isOpen={showLogoutModal}
          title="Log out?"
          message="Are you sure you want to log out of SpendSmart?"
          confirmText="Log Out"
          cancelText="Cancel"
          onConfirm={handleLogout}
          onCancel={() =>
            setShowLogoutModal(false)
          }
        />
      </div>
    </GlobalProvider>
  );
};

const AppContent = () => {
  const { user } = useContext(AuthContext);

  return user ? <Dashboard /> : <Auth />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;