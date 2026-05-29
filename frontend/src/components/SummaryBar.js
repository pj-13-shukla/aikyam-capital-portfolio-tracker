import React from 'react';

const SummaryBar = ({ companies }) => {
  const totalCompanies = companies.length;
  const totalDeployed = companies.reduce((sum, c) => sum + (c.invested_amount || 0), 0);
  const avgMoic = companies.length > 0
    ? (companies.reduce((sum, c) => sum + (c.moic || 0), 0) / companies.length).toFixed(2)
    : 0;
  const totalCurrentValue = companies.reduce((sum, c) => sum + (c.current_valuation || 0), 0);
  const totalPnL = companies.reduce((sum, c) => sum + (c.profit_loss || 0), 0);

  const cards = [
    { label: 'Total Companies', value: totalCompanies, color: '#38bdf8' },
    { label: 'Capital Deployed', value: `₹${(totalDeployed / 100000).toFixed(2)}L`, color: '#a78bfa' },
    { label: 'Current Value', value: `₹${(totalCurrentValue / 100000).toFixed(2)}L`, color: '#34d399' },
    { label: 'Average MOIC', value: `${avgMoic}x`, color: '#fbbf24' },
    { label: 'Total P&L', value: `₹${(totalPnL / 100000).toFixed(2)}L`, color: totalPnL >= 0 ? '#34d399' : '#ef4444' },
  ];

  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      padding: '24px 32px',
      flexWrap: 'wrap'
    }}>
      {cards.map((card, i) => (
        <div key={i} style={{
          backgroundColor: '#1e293b',
          borderRadius: '12px',
          padding: '20px 24px',
          flex: '1',
          minWidth: '160px',
          borderLeft: `4px solid ${card.color}`
        }}>
          <p style={{ color: '#94a3b8', margin: '0 0 8px 0', fontSize: '13px' }}>{card.label}</p>
          <h2 style={{ color: card.color, margin: 0, fontSize: '22px', fontWeight: 'bold' }}>{card.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default SummaryBar;