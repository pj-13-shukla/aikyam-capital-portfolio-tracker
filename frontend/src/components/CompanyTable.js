import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const CompanyTable = ({ companies, onRefresh }) => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterSector, setFilterSector] = useState('All');

  const sectors = ['All', ...new Set(companies.map(c => c.sector))];
  const statuses = ['All', 'Active', 'Exited', 'Written Off'];

  const filtered = companies.filter(c => {
    return (filterStatus === 'All' || c.status === filterStatus) &&
           (filterSector === 'All' || c.sector === filterSector);
  });

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await axios.delete(`${API_URL}/api/companies/${id}`);
        toast.success('Company deleted successfully!');
        onRefresh();
      } catch (err) {
        toast.error('Failed to delete company.');
      }
    }
  };

  const exportCSV = () => {
    const csv = Papa.unparse(companies.map(c => ({
      Name: c.name,
      Sector: c.sector,
      Ticker: c.ticker,
      'Investment Date': c.investment_date,
      'Invested Price': c.invested_price,
      'Num Shares': c.num_shares,
      'Invested Amount': c.invested_amount,
      'Current Price': c.current_price,
      'Current Valuation': c.current_valuation,
      'MOIC': c.moic,
      'P&L (INR)': c.profit_loss,
      'P&L (%)': c.profit_loss_pct,
      Status: c.status,
    })));
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.csv';
    a.click();
    toast.success('CSV exported successfully!');
  };

  return (
    <div style={{ padding: '0 32px 32px' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={selectStyle}>
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={filterSector} onChange={e => setFilterSector(e.target.value)} style={selectStyle}>
          {sectors.map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={exportCSV} style={btnStyle('#34d399')}>⬇ Export CSV</button>
        <button onClick={onRefresh} style={btnStyle('#38bdf8')}>🔄 Refresh Prices</button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#1e293b' }}>
              {['Company', 'Sector', 'Status', 'Inv. Price', 'Shares', 'CMP', 'Invested Amt', 'Curr. Value', 'MOIC', 'P&L (INR)', 'P&L (%)', 'Actions'].map(h => (
                <th key={h} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #1e293b' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#1e293b'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                <td style={tdStyle}>
                  <span onClick={() => navigate(`/company/${c.id}`)}
                    style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold' }}>
                    {c.name}
                  </span>
                </td>
                <td style={tdStyle}>{c.sector}</td>
                <td style={tdStyle}>
                  <span style={{
                    padding: '3px 10px', borderRadius: '12px', fontSize: '12px',
                    backgroundColor: c.status === 'Active' ? '#064e3b' : c.status === 'Exited' ? '#1e3a5f' : '#450a0a',
                    color: c.status === 'Active' ? '#34d399' : c.status === 'Exited' ? '#38bdf8' : '#ef4444'
                  }}>{c.status}</span>
                </td>
                <td style={tdStyle}>₹{c.invested_price?.toLocaleString()}</td>
                <td style={tdStyle}>{c.num_shares?.toLocaleString()}</td>
                <td style={tdStyle}>₹{c.current_price?.toLocaleString() || 'N/A'}</td>
                <td style={tdStyle}>₹{(c.invested_amount / 100000)?.toFixed(2)}L</td>
                <td style={tdStyle}>₹{(c.current_valuation / 100000)?.toFixed(2)}L</td>
                <td style={tdStyle}>
                  <span style={{ color: c.moic >= 1 ? '#34d399' : '#ef4444', fontWeight: 'bold' }}>
                    {c.moic?.toFixed(2)}x
                  </span>
                </td>
                <td style={tdStyle}>
                  <span style={{ color: c.profit_loss >= 0 ? '#34d399' : '#ef4444' }}>
                    ₹{(c.profit_loss / 100000)?.toFixed(2)}L
                  </span>
                </td>
                <td style={tdStyle}>
                  <span style={{ color: c.profit_loss_pct >= 0 ? '#34d399' : '#ef4444' }}>
                    {c.profit_loss_pct?.toFixed(2)}%
                  </span>
                </td>
                <td style={tdStyle}>
                  <button onClick={() => navigate(`/edit/${c.id}`)} style={btnStyle('#fbbf24')}>Edit</button>
                  <button onClick={() => handleDelete(c.id)} style={{ ...btnStyle('#ef4444'), marginLeft: '6px' }}>Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const thStyle = { padding: '12px 16px', textAlign: 'left', color: '#94a3b8', fontWeight: '600', whiteSpace: 'nowrap' };
const tdStyle = { padding: '12px 16px', color: '#e2e8f0', whiteSpace: 'nowrap' };
const selectStyle = { backgroundColor: '#1e293b', color: '#e2e8f0', border: '1px solid #334155', padding: '8px 12px', borderRadius: '6px', fontSize: '14px' };
const btnStyle = (color) => ({ backgroundColor: 'transparent', border: `1px solid ${color}`, color: color, padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' });

export default CompanyTable;