import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryBar from '../components/SummaryBar';
import CompanyTable from '../components/CompanyTable';
import CompanyChart from '../components/CompanyChart';

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8000/api/companies');
      setCompanies(res.data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Error fetching companies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
    // Auto refresh every 60 seconds
    const interval = setInterval(fetchCompanies, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh' }}>
      <div style={{
        padding: '24px 32px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h2 style={{ color: '#e2e8f0', margin: 0, fontSize: '22px' }}>Portfolio Dashboard</h2>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '13px' }}>
            Live prices auto-refresh every 60 seconds
          </p>
        </div>
        {lastUpdated && (
          <span style={{ color: '#64748b', fontSize: '13px' }}>
            Last updated: {lastUpdated}
          </span>
        )}
      </div>

      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#38bdf8', fontSize: '48px', marginBottom: '16px' }}>📈</div>
            <p style={{ color: '#94a3b8', fontSize: '16px' }}>Fetching live prices...</p>
          </div>
        </div>
      ) : (
        <>
          <SummaryBar companies={companies} />
          <CompanyChart companies={companies} />
          <CompanyTable companies={companies} onRefresh={fetchCompanies} />
        </>
      )}
    </div>
  );
};

export default Dashboard;