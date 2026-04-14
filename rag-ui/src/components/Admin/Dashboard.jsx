import React, { useState } from "react";
import './DashBoard.css';
import Analytics from './Analytics';
import Upload from './Upload';
import { useNavigate } from "react-router-dom";


function Dashboard() {
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const [activeContent, setActiveContent] = useState('dashboard');

    const handleMenuClick = (event, section) => {
        event.preventDefault();
        setActiveContent(section);
        if (!isDashboardOpen) {
            setIsDashboardOpen(true);
        }
    };
    const navigate = useNavigate();

    return(
        <div className="dashboard">
            <div className="sidebar-parent">
                <div className="sidebar">
                <div className="sidebar-brand">
                    <h2>CollegeSync</h2>
                </div>

                <nav className="sidebar-nav">
                    <div className="menu-header" onClick={() => setIsDashboardOpen(!isDashboardOpen)}>
                        <span>DashBoard</span>
                        <span className={`arrow ${isDashboardOpen ? 'open':''}` }>^</span>
                    </div>
                    <ul className={`sub-menu ${isDashboardOpen ? 'open' : ''}`}>
                        <li>
                            <a href="#" onClick={(e) => handleMenuClick(e, 'upload')}>Upload</a>
                        </li>
                        <li>
                            <a href="#" onClick={(e) => handleMenuClick(e, 'analytics')}>Analytics</a>
                        </li>
                    </ul>
                </nav>
                <button className="logout-button" onClick={() => navigate('/')}>Logout</button>
            </div>
            </div>
            

            <div className="main-content">
                {activeContent === 'dashboard' && (
    <div className="dashboard-content">
        <header className="dashboard-header">
            <div className="welcome-text">
                <h1>Welcome back, Admin</h1>
                <p>Here's what's happening with your system today.</p>
            </div>
            <div className="current-date">
                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
        </header>

        <div className="quick-actions-grid">
            <div className="action-card">
                <div className="action-icon">📤</div>
                <h3>Knowledge Base</h3>
                <p>Upload new documents or sync your external data sources.</p>
                <button className="action-btn">New Upload</button>
            </div>

            <div className="action-card">
                <div className="action-icon">📈</div>
                <h3>Usage Metrics</h3>
                <p>Review API consumption and user engagement trends.</p>
                <button className="action-btn">View Analytics</button>
            </div>

            <div className="action-card">
                <div className="action-icon">⚙️</div>
                <h3>System Status</h3>
                <p>All systems are operational. No pending updates found.</p>
                <button className="action-btn secondary">Check Logs</button>
            </div>
        </div>

        <div className="recent-activity-panel">
            <h2>Recent Activity</h2>
            <div className="activity-item">
                <span className="dot"></span>
                <p>Document <strong>"Q4_Report.pdf"</strong> processed successfully.</p>
                <span className="time">2 mins ago</span>
            </div>
            <div className="activity-item">
                <span className="dot blue"></span>
                <p>Analytics export generated for <strong>Marketing Team</strong>.</p>
                <span className="time">1 hour ago</span>
            </div>
        </div>
    </div>
)}

                {activeContent === 'upload' && <Upload />}

                {activeContent === 'analytics' && <Analytics />}
            </div>
        </div>
    )
}

export default Dashboard;