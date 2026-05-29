import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/companies/${id}`)
      .then(res => { setCompany(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, [id]);

  if (loading) return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#94a3b8' }}>Loading...</p>
    </div>
  );

  if (!company) return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#ef4444' }}>Company not found.</p>
    </div>
  );

  const metrics = [
    { label: 'Sector', value: company.sector },
    { label: 'Ticker', value: company.ticker },
    { label: 'Investment Date', value: company.investment_date },
    { label: 'Status', value: company.status },
    { label: 'Invested Price', value: `₹${company.invested_price?.toLocaleString()}` },
    { label: 'Number of Shares', value: company.num_shares?.toLocaleString() },
    { label: 'Invested Amount', value: `₹${(company.invested_amount / 100000)?.toFixed(2)}L` },
    { label: 'Current Market Price', value: `₹${company.current_price?.toLocaleString() || 'N/A'}` },
    { label: 'Current Valuation', value: `₹${(company.current_valuation / 100000)?.toFixed(2)}L` },
    { label: 'MOIC', value: `${company.moic?.toFixed(2)}x`, highlight: company.moic >= 1 ? '#34d399' : '#ef4444' },
    { label: 'Profit / Loss (INR)', value: `₹${(company.profit_loss / 100000)?.toFixed(2)}L`, highlight: company.profit_loss >= 0 ? '#34d399' : '#ef4444' },
    { label: 'Profit / Loss (%)', value: `${company.profit_loss_pct?.toFixed(2)}%`, highlight: company.profit_loss_pct >= 0 ? '#34d399' : '#ef4444' },
  ];

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', padding: '32px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <button onClick={() => navigate('/')} style={{
          backgroundColor: 'transparent', border: '1px solid #334155',
          color: '#94a3b8', padding: '8px 16px', borderRadius: '6px',
          cursor: 'pointer', marginBottom: '24px', fontSize: '14px'
        }}>
          ← Back to Dashboard
        </button>

        <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h2 style={{ color: '#e2e8f0', margin: 0, fontSize: '26px' }}>{company.name}</h2>
              <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '14px' }}>{company.sector} • {company.ticker}</p>
            </div>
            <span style={{
              padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold',
              backgroundColor: company.status === 'Active' ? '#064e3b' : company.status === 'Exited' ? '#1e3a5f' : '#450a0a',
              color: company.status === 'Active' ? '#34d399' : company.status === 'Exited' ? '#38bdf8' : '#ef4444'
            }}>
              {company.status}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {metrics.map((m, i) => (
              <div key={i} style={{
                backgroundColor: '#0f172a', borderRadius: '10px',
                padding: '16px 20px', borderLeft: `3px solid ${m.highlight || '#334155'}`
              }}>
                <p style={{ color: '#64748b', margin: '0 0 6px', fontSize: '12px' }}>{m.label}</p>
                <p style={{ color: m.highlight || '#e2e8f0', margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
            <button onClick={() => navigate(`/edit/${company.id}`)} style={{
              flex: 1, backgroundColor: '#38bdf8', color: '#0f172a',
              border: 'none', padding: '12px', borderRadius: '8px',
              fontSize: '14px', fontWeight: 'bold', cursor: 'pointer'
            }}>
              ✏️ Edit Company
            </button>
            <button onClick={() => navigate('/')} style={{
              flex: 1, backgroundColor: 'transparent',
              border: '1px solid #334155', color: '#94a3b8',
              padding: '12px', borderRadius: '8px',
              fontSize: '14px', cursor: 'pointer'
            }}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;