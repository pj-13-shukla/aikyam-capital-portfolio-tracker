import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const CompanyChart = ({ companies }) => {
  const data = companies.map(c => ({
    name: c.name,
    'Invested': parseFloat((c.invested_amount / 100000).toFixed(2)),
    'Current Value': parseFloat((c.current_valuation / 100000).toFixed(2)),
  }));

  return (
    <div style={{
      backgroundColor: '#1e293b',
      borderRadius: '12px',
      padding: '24px',
      margin: '0 32px 32px',
    }}>
      <h3 style={{ color: '#e2e8f0', marginTop: 0, marginBottom: '24px', fontSize: '16px' }}>
        📊 Invested Amount vs Current Valuation (in ₹ Lakhs)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 13 }} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 13 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
            labelStyle={{ color: '#e2e8f0' }}
            formatter={(value) => [`₹${value}L`]}
          />
          <Legend wrapperStyle={{ color: '#94a3b8' }} />
          <Bar dataKey="Invested" fill="#a78bfa" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Current Value" fill="#38bdf8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompanyChart;