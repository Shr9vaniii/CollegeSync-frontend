import React from 'react';
import './Analytics.css';

function Analytics() {
  const metrics = [
    { id: 1, title: 'Documents Uploaded', value: '428', subtitle: 'Last 30 days' },
    { id: 2, title: 'Storage Used', value: '1.2 GB', subtitle: 'Current total' },
    { id: 3, title: 'Active Users', value: '82', subtitle: 'Weekly active' },
    { id: 4, title: 'Search Queries', value: '3.8K', subtitle: 'New this week' },
  ];

  const trends = [
    { label: 'Week 1', value: 28 },
    { label: 'Week 2', value: 45 },
    { label: 'Week 3', value: 33 },
    { label: 'Week 4', value: 56 },
    { label: 'Week 5', value: 72 },
  ];

  const topUsers = [
    { id: 1, name: 'Riya Sharma', value: '42 uploads' },
    { id: 2, name: 'Amit Patel', value: '29 uploads' },
    { id: 3, name: 'Neha Singh', value: '17 uploads' },
  ];

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <div>
          <span className="page-tag">Analytics</span>
          <h1>Performance & Usage</h1>
          <p>Track document activity, storage consumption, and team adoption from one place.</p>
        </div>
      </div>

      <div className="analytics-summary">
        {metrics.map((metric) => (
          <div key={metric.id} className="analytics-card">
            <p>{metric.title}</p>
            <h2>{metric.value}</h2>
            <span>{metric.subtitle}</span>
          </div>
        ))}
      </div>

      <div className="analytics-grid">
        <section className="analytics-panel chart-panel">
          <div className="panel-header">
            <h2>Upload Trend</h2>
            <p>Recent upload activity by week.</p>
          </div>
          <div className="trend-list">
            {trends.map((item) => (
              <div key={item.label} className="trend-row">
                <span>{item.label}</span>
                <div className="trend-bar-background">
                  <div className="trend-bar-fill" style={{ width: `${item.value}%` }} />
                </div>
                <span>{item.value}%</span>
              </div>
            ))}
          </div>
        </section>

        <section className="analytics-panel user-panel">
          <div className="panel-header">
            <h2>Top contributors</h2>
            <p>Most active uploaders this month.</p>
          </div>
          <div className="top-users">
            {topUsers.map((user) => (
              <div key={user.id} className="top-user-row">
                <span>{user.name}</span>
                <strong>{user.value}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Analytics;
