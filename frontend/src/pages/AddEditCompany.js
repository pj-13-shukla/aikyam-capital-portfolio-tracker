import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const AddEditCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    name: '', sector: '', ticker: '',
    investment_date: '', invested_price: '',
    num_shares: '', status: 'Active'
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      axios.get(`${API_URL}/api/companies/${id}`)
        .then(res => setForm(res.data))
        .catch(err => console.error(err));
    }
  }, [id, isEdit]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Company name is required';
    if (!form.sector.trim()) newErrors.sector = 'Sector is required';
    if (!form.ticker.trim()) newErrors.ticker = 'Ticker is required';
    if (!form.investment_date) newErrors.investment_date = 'Investment date is required';
    if (!form.invested_price || form.invested_price <= 0) newErrors.invested_price = 'Invested price must be greater than 0';
    if (!form.num_shares || form.num_shares <= 0) newErrors.num_shares = 'Number of shares must be greater than 0';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      if (isEdit) {
        await axios.put(`${API_URL}/api/companies/${id}`, form);
      } else {
        await axios.post(`${API_URL}/api/companies`, form);
      }
      toast.success(isEdit ? 'Company updated successfully!' : 'Company added successfully!');
      navigate('/');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const fields = [
    { label: 'Company Name', key: 'name', type: 'text', placeholder: 'e.g. Zomato' },
    { label: 'Sector', key: 'sector', type: 'text', placeholder: 'e.g. Fintech' },
    { label: 'Ticker Symbol', key: 'ticker', type: 'text', placeholder: 'e.g. ZOMATO.NS' },
    { label: 'Investment Date', key: 'investment_date', type: 'date', placeholder: '' },
    { label: 'Invested Price (INR/share)', key: 'invested_price', type: 'number', placeholder: 'e.g. 125' },
    { label: 'Number of Shares', key: 'num_shares', type: 'number', placeholder: 'e.g. 10000' },
  ];

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', padding: '32px' }}>
      <div style={{
        maxWidth: '600px', margin: '0 auto',
        backgroundColor: '#1e293b',
        borderRadius: '16px', padding: '40px'
      }}>
        <h2 style={{ color: '#e2e8f0', marginTop: 0, fontSize: '22px' }}>
          {isEdit ? '✏️ Edit Company' : '➕ Add New Company'}
        </h2>
        <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '32px' }}>
          {isEdit ? 'Update company details below' : 'Fill in the details to add a new portfolio company'}
        </p>

        {fields.map(f => (
          <div key={f.key} style={{ marginBottom: '20px' }}>
            <label style={{ color: '#94a3b8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
              {f.label}
            </label>
            <input
              type={f.type}
              value={form[f.key] || ''}
              onChange={e => handleChange(f.key, e.target.value)}
              placeholder={f.placeholder}
              style={{
                ...inputStyle,
                border: `1px solid ${errors[f.key] ? '#ef4444' : '#334155'}`
              }}
            />
            {errors[f.key] && (
              <p style={{ color: '#ef4444', fontSize: '12px', margin: '4px 0 0' }}>
                {errors[f.key]}
              </p>
            )}
          </div>
        ))}

        <div style={{ marginBottom: '32px' }}>
          <label style={{ color: '#94a3b8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
            Status
          </label>
          <select
            value={form.status}
            onChange={e => handleChange('status', e.target.value)}
            style={{ ...inputStyle, border: '1px solid #334155' }}
          >
            <option value="Active">Active</option>
            <option value="Exited">Exited</option>
            <option value="Written Off">Written Off</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleSubmit} disabled={loading} style={{
            flex: 1, backgroundColor: '#38bdf8', color: '#0f172a',
            border: 'none', padding: '14px', borderRadius: '8px',
            fontSize: '15px', fontWeight: 'bold', cursor: 'pointer'
          }}>
            {loading ? 'Saving...' : isEdit ? 'Update Company' : 'Add Company'}
          </button>
          <button onClick={() => navigate('/')} style={{
            flex: 1, backgroundColor: 'transparent',
            border: '1px solid #334155', color: '#94a3b8',
            padding: '14px', borderRadius: '8px',
            fontSize: '15px', cursor: 'pointer'
          }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%', backgroundColor: '#0f172a',
  borderRadius: '8px', padding: '12px',
  color: '#e2e8f0', fontSize: '14px',
  boxSizing: 'border-box',
};

export default AddEditCompany;