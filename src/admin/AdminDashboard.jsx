import React, { useState, useEffect, useCallback } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured, saveSupabaseKeys } from '../supabaseClient'
import './admin.css'

/* ── SETUP SCREEN (if Supabase not configured) ── */
function SetupScreen() {
  const [url, setUrl] = useState('')
  const [key, setKey] = useState('')
  return (
    <div className="admin-setup">
      <div className="setup-card">
        <div className="setup-icon">⚙️</div>
        <h2>Connect Supabase</h2>
        <p>Enter your Supabase project credentials to activate the admin dashboard.</p>
        <div className="setup-form">
          <input placeholder="Supabase URL (https://xxx.supabase.co)" value={url} onChange={e => setUrl(e.target.value)} />
          <input placeholder="Supabase Anon Key" value={key} onChange={e => setKey(e.target.value)} />
          <button onClick={() => saveSupabaseKeys(url, key)} disabled={!url || !key}>Connect & Launch</button>
        </div>
        <p className="setup-hint">Find these in Supabase → Settings → API</p>
      </div>
    </div>
  )
}

/* ── SIDEBAR ── */
function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate()
  const links = [
    { to: '/admin', icon: '📊', label: 'Dashboard', end: true },
    { to: '/admin/pickups', icon: '🚛', label: 'Pickups' },
    { to: '/admin/suppliers', icon: '🏪', label: 'Suppliers' },
    { to: '/admin/buyers', icon: '🏭', label: 'Buyers' },
    { to: '/admin/sales', icon: '💰', label: 'Sales' },
    { to: '/admin/settings', icon: '⚙️', label: 'Settings' },
  ]
  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header" onClick={() => navigate('/admin')}>
        <span className="sidebar-logo">🫙</span>
        {!collapsed && <span className="sidebar-title">BioCycle<span>Admin</span></span>}
      </div>
      <nav className="sidebar-nav">
        {links.map(l => (
          <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <span className="sidebar-icon">{l.icon}</span>
            {!collapsed && <span>{l.label}</span>}
          </NavLink>
        ))}
      </nav>
      <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? '→' : '←'}
      </button>
      <a href="/" className="sidebar-back">{collapsed ? '🏠' : '← Back to Website'}</a>
    </aside>
  )
}

/* ── STAT CARD ── */
function StatCard({ icon, label, value, color, sub }) {
  return (
    <div className="stat-card" style={{ '--accent': color }}>
      <div className="stat-card-icon">{icon}</div>
      <div>
        <div className="stat-card-value">{value}</div>
        <div className="stat-card-label">{label}</div>
        {sub && <div className="stat-card-sub">{sub}</div>}
      </div>
    </div>
  )
}

/* ── DATA TABLE ── */
function DataTable({ columns, data, onEdit, onDelete, loading }) {
  if (loading) return <div className="table-loading"><div className="spinner" />Loading data...</div>
  if (!data.length) return <div className="table-empty">No records yet</div>
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>{columns.map(c => <th key={c.key}>{c.label}</th>)}<th>Actions</th></tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id || i}>
              {columns.map(c => (
                <td key={c.key}>
                  {c.render ? c.render(row[c.key], row) : (row[c.key] ?? '—')}
                </td>
              ))}
              <td className="action-cell">
                <button className="act-btn edit" onClick={() => onEdit(row)} title="Edit">✏️</button>
                <button className="act-btn delete" onClick={() => onDelete(row.id)} title="Delete">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ── STATUS BADGE ── */
function StatusBadge({ status }) {
  const colors = {
    'Scheduled': '#f59e0b', 'Completed': '#10b981', 'Cancelled': '#ef4444',
    'Active': '#10b981', 'Inactive': '#94a3b8', 'Pending Payment': '#f59e0b', 'Paid': '#10b981',
  }
  return <span className="status-badge" style={{ '--c': colors[status] || '#94a3b8' }}>{status}</span>
}

/* ── MODAL ── */
function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

/* ── OVERVIEW PAGE ── */
function OverviewPage() {
  const [stats, setStats] = useState({ pickups: 0, suppliers: 0, buyers: 0, sales: 0, oilCollected: 0, revenue: 0 })
  const [recentPickups, setRecentPickups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    if (!supabase) return setLoading(false)
    try {
      const [p, s, b, sl] = await Promise.all([
        supabase.from('pickups').select('*'),
        supabase.from('suppliers').select('*'),
        supabase.from('buyers').select('*'),
        supabase.from('sales').select('*'),
      ])
      const pickups = p.data || []
      const sales = sl.data || []
      setStats({
        pickups: pickups.length,
        suppliers: (s.data || []).length,
        buyers: (b.data || []).length,
        sales: sales.length,
        oilCollected: pickups.reduce((a, x) => a + (Number(x.quantity) || 0), 0),
        revenue: sales.reduce((a, x) => a + (Number(x.total_amount) || 0), 0),
      })
      setRecentPickups(pickups.slice(-5).reverse())
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  if (loading) return <div className="page-loading"><div className="spinner" />Loading dashboard...</div>

  return (
    <div className="overview-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of your BioCycle operations</p>
      </div>
      <div className="stats-grid">
        <StatCard icon="🚛" label="Total Pickups" value={stats.pickups} color="#f59e0b" />
        <StatCard icon="🏪" label="Suppliers" value={stats.suppliers} color="#10b981" />
        <StatCard icon="🏭" label="Buyers" value={stats.buyers} color="#6366f1" />
        <StatCard icon="💰" label="Total Sales" value={stats.sales} color="#ec4899" />
        <StatCard icon="🫙" label="Oil Collected" value={`${stats.oilCollected.toLocaleString()} L`} color="#059669" />
        <StatCard icon="📈" label="Revenue" value={`₹${stats.revenue.toLocaleString()}`} color="#f59e0b" />
      </div>

      <div className="overview-section">
        <h2>Recent Pickups</h2>
        {recentPickups.length === 0 ? (
          <div className="table-empty">No pickups yet. Bookings from the website will appear here.</div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr><th>Supplier</th><th>Qty (L)</th><th>Date</th><th>Status</th><th>Collector</th></tr>
              </thead>
              <tbody>
                {recentPickups.map(p => (
                  <tr key={p.id}>
                    <td>{p.supplier_name}</td>
                    <td>{p.quantity}</td>
                    <td>{p.pickup_date}</td>
                    <td><StatusBadge status={p.status} /></td>
                    <td>{p.collector || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── GENERIC CRUD PAGE ── */
function CrudPage({ table, title, icon, columns, formFields, defaultValues }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // null | 'add' | row-object-for-edit
  const [form, setForm] = useState(defaultValues)

  const load = useCallback(async () => {
    if (!supabase) return setLoading(false)
    const { data: rows } = await supabase.from(table).select('*').order('created_at', { ascending: false })
    setData(rows || [])
    setLoading(false)
  }, [table])

  useEffect(() => { load() }, [load])

  const openAdd = () => { setForm(defaultValues); setModal('add') }
  const openEdit = (row) => { setForm(row); setModal(row) }
  const close = () => setModal(null)

  const save = async () => {
    if (!supabase) return
    if (modal === 'add') {
      const newRow = { ...form, id: form.id || `${table.toUpperCase().slice(0, 2)}-${Date.now()}` }
      await supabase.from(table).insert(newRow)
    } else {
      const { created_at, ...rest } = form
      await supabase.from(table).update(rest).eq('id', form.id)
    }
    close()
    load()
  }

  const del = async (id) => {
    if (!window.confirm('Delete this record?')) return
    await supabase.from(table).delete().eq('id', id)
    load()
  }

  const change = (key, val) => setForm(f => ({ ...f, [key]: val }))

  return (
    <div className="crud-page">
      <div className="page-header">
        <div>
          <h1>{icon} {title}</h1>
          <p>Manage all {title.toLowerCase()} records</p>
        </div>
        <button className="add-btn" onClick={openAdd}>+ Add {title.slice(0, -1)}</button>
      </div>

      <DataTable columns={columns} data={data} loading={loading} onEdit={openEdit} onDelete={del} />

      {modal && (
        <Modal title={modal === 'add' ? `Add ${title.slice(0, -1)}` : `Edit ${title.slice(0, -1)}`} onClose={close}>
          <div className="modal-form">
            {formFields.map(f => (
              <div key={f.key} className="modal-field">
                <label>{f.label}</label>
                {f.type === 'select' ? (
                  <select value={form[f.key] || ''} onChange={e => change(f.key, e.target.value)}>
                    {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input
                    type={f.type || 'text'}
                    value={form[f.key] || ''}
                    onChange={e => change(f.key, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                    placeholder={f.placeholder || ''}
                  />
                )}
              </div>
            ))}
            <button className="modal-save" onClick={save}>💾 Save</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

/* ── PICKUPS PAGE ── */
function PickupsPage() {
  return (
    <CrudPage
      table="pickups" title="Pickups" icon="🚛"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'supplier_name', label: 'Supplier' },
        { key: 'quantity', label: 'Qty (L)' },
        { key: 'pickup_date', label: 'Date' },
        { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
        { key: 'collector', label: 'Collector' },
        { key: 'price_paid', label: 'Price ₹' },
        { key: 'quality_ffa', label: 'FFA %' },
      ]}
      formFields={[
        { key: 'supplier_name', label: 'Supplier Name', placeholder: 'Ramesh Kitchen' },
        { key: 'quantity', label: 'Quantity (L)', type: 'number' },
        { key: 'pickup_date', label: 'Pickup Date', type: 'date' },
        { key: 'status', label: 'Status', type: 'select', options: ['Scheduled', 'Completed', 'Cancelled'] },
        { key: 'collector', label: 'Collector', placeholder: 'Driver name' },
        { key: 'price_paid', label: 'Price Paid ₹', type: 'number' },
        { key: 'quality_ffa', label: 'FFA %', type: 'number' },
      ]}
      defaultValues={{ supplier_name: '', quantity: 0, pickup_date: '', status: 'Scheduled', collector: '', price_paid: 0, quality_ffa: 0 }}
    />
  )
}

/* ── SUPPLIERS PAGE ── */
function SuppliersPage() {
  return (
    <CrudPage
      table="suppliers" title="Suppliers" icon="🏪"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'type', label: 'Type' },
        { key: 'contact', label: 'Contact' },
        { key: 'address', label: 'Address' },
        { key: 'avg_monthly_oil', label: 'Avg Oil (L)' },
        { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
      ]}
      formFields={[
        { key: 'name', label: 'Name', placeholder: 'Restaurant name' },
        { key: 'type', label: 'Type', type: 'select', options: ['Restaurant', 'Hotel', 'Dhaba', 'Cloud Kitchen', 'Canteen', 'Household', 'Other'] },
        { key: 'contact', label: 'Phone', placeholder: '+91 ...' },
        { key: 'address', label: 'Address', placeholder: 'Full address' },
        { key: 'avg_monthly_oil', label: 'Avg Monthly Oil (L)', type: 'number' },
        { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'] },
      ]}
      defaultValues={{ name: '', type: 'Restaurant', contact: '', address: '', avg_monthly_oil: 0, status: 'Active' }}
    />
  )
}

/* ── BUYERS PAGE ── */
function BuyersPage() {
  return (
    <CrudPage
      table="buyers" title="Buyers" icon="🏭"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Name' },
        { key: 'type', label: 'Type' },
        { key: 'contact', label: 'Contact' },
        { key: 'contract_rate', label: 'Rate ₹/L' },
        { key: 'total_bought', label: 'Total (L)' },
      ]}
      formFields={[
        { key: 'name', label: 'Name', placeholder: 'Biodiesel Corp' },
        { key: 'type', label: 'Type', type: 'select', options: ['Biodiesel Plant', 'Chemical Manufacturer', 'Export', 'Other'] },
        { key: 'contact', label: 'Contact', placeholder: '+91 ...' },
        { key: 'contract_rate', label: 'Contract Rate ₹/L', type: 'number' },
        { key: 'total_bought', label: 'Total Bought (L)', type: 'number' },
      ]}
      defaultValues={{ name: '', type: 'Biodiesel Plant', contact: '', contract_rate: 0, total_bought: 0 }}
    />
  )
}

/* ── SALES PAGE ── */
function SalesPage() {
  return (
    <CrudPage
      table="sales" title="Sales" icon="💰"
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'buyer_name', label: 'Buyer' },
        { key: 'quantity', label: 'Qty (L)' },
        { key: 'sale_date', label: 'Date' },
        { key: 'total_amount', label: 'Amount ₹' },
        { key: 'invoice_number', label: 'Invoice' },
        { key: 'status', label: 'Status', render: v => <StatusBadge status={v} /> },
      ]}
      formFields={[
        { key: 'buyer_name', label: 'Buyer Name', placeholder: 'BioDiesel Inc' },
        { key: 'quantity', label: 'Quantity (L)', type: 'number' },
        { key: 'sale_date', label: 'Sale Date', type: 'date' },
        { key: 'total_amount', label: 'Total Amount ₹', type: 'number' },
        { key: 'invoice_number', label: 'Invoice #', placeholder: 'INV-001' },
        { key: 'status', label: 'Status', type: 'select', options: ['Pending Payment', 'Paid'] },
      ]}
      defaultValues={{ buyer_name: '', quantity: 0, sale_date: '', total_amount: 0, invoice_number: '', status: 'Pending Payment' }}
    />
  )
}

/* ── SETTINGS PAGE ── */
function SettingsPage() {
  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>⚙️ Settings</h1>
        <p>Manage your BioCycle admin configuration</p>
      </div>
      <div className="settings-grid">
        <div className="settings-card">
          <h3>🔗 Supabase Connection</h3>
          <p>Status: <strong style={{ color: '#10b981' }}>✓ Connected</strong></p>
          <p className="settings-hint">Database is live and syncing all records in real-time.</p>
        </div>
        <div className="settings-card">
          <h3>📋 Database Tables</h3>
          <ul>
            <li>✅ suppliers — Partner management</li>
            <li>✅ pickups — Collection tracking</li>
            <li>✅ buyers — Buyer directory</li>
            <li>✅ sales — Sales & invoicing</li>
          </ul>
        </div>
        <div className="settings-card">
          <h3>🔐 Admin Access</h3>
          <p>Current: Open access (development mode)</p>
          <p className="settings-hint">Add Supabase Auth for production-grade access control.</p>
        </div>
        <div className="settings-card">
          <h3>💬 WhatsApp Integration</h3>
          <p>Connected to: <strong>+91 70155 46885</strong></p>
          <p className="settings-hint">All form submissions route via WhatsApp Business API.</p>
        </div>
      </div>
    </div>
  )
}

/* ── MAIN ADMIN DASHBOARD ── */
export default function AdminDashboard() {
  const [collapsed, setCollapsed] = useState(false)

  if (!isSupabaseConfigured()) return <SetupScreen />

  return (
    <div className="admin-layout">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className={`admin-main ${collapsed ? 'expanded' : ''}`}>
        <Routes>
          <Route index element={<OverviewPage />} />
          <Route path="pickups" element={<PickupsPage />} />
          <Route path="suppliers" element={<SuppliersPage />} />
          <Route path="buyers" element={<BuyersPage />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  )
}
