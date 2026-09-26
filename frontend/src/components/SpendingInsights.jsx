import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

export const SpendingInsights = () => {
  const { token } = useContext(AuthContext);

  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateInsights = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(
        `${API_URL}/api/insights`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to generate AI insights.'
        );
      }

      setInsights(data.insights);
    } catch (error) {
      console.error('Failed to generate insights:', error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="insights-panel">
      <div className="section-header">
        <div>
          <p className="section-header__eyebrow">
            AI ANALYSIS
          </p>

          <h2>AI Spending Insights ✨</h2>
        </div>

        <button
          className="insights-generate"
          type="button"
          onClick={generateInsights}
          disabled={loading}
        >
          {loading
            ? 'Analyzing...'
            : insights.length > 0
              ? 'Regenerate'
              : 'Generate Insights'}
        </button>
      </div>

      {loading && (
        <div className="insights-loading">
          <div className="loading-spinner"></div>

          <div>
            <h3>Analyzing your spending</h3>
            <p>
              SpendSmart AI is looking for useful patterns
              in your finances.
            </p>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="insights-error">
          <span>!</span>

          <div>
            <h3>Couldn't generate insights</h3>
            <p>{error}</p>
          </div>
        </div>
      )}

      {!loading &&
        !error &&
        insights.length === 0 && (
          <div className="insights-empty">
            <div className="insights-empty__icon">
              ✨
            </div>

            <h3>Discover your spending patterns</h3>

            <p>
              Generate personalized AI insights based on
              your income, expenses, and spending categories.
            </p>
          </div>
        )}

      {!loading && insights.length > 0 && (
        <div className="insights-grid">
          {insights.map((insight, index) => (
            <article
              className="insight-card"
              key={`${insight.title}-${index}`}
            >
              <div className="insight-card__number">
                {index + 1}
              </div>

              <div>
                <h3>{insight.title}</h3>
                <p>{insight.message}</p>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="insights-disclaimer">
        AI-generated observations are based on your recorded
        transactions and may not reflect your complete financial
        situation.
      </p>
    </section>
  );
};