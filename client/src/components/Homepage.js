import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/homepage.css";
import API from '../api'; // adjust the path if needed

const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User loaded:", user);
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoggedIn(false);
    alert("Logged out successfully!");
    navigate("/");
  };

  const handleNavigation = (path) => {
    alert(`Navigating to: ${path}`);
    navigate(`${path}`);
  };

  const primaryNavItems = [
    { icon: "📋", label: "Dashboard", path: "/dashboard", size: "large" },
    { icon: "📊", label: "Clients", path: "/clients", size: "medium" },
    { icon: "👥", label: "Team Management", path: "/team", size: "large" },
    { icon: "💼", label: "Projects", path: "/projects", size: "small" },
  ];

  const secondaryNavItems = [
    { icon: "⚙️", label: "Settings", path: "/settings" },
    { icon: "📚", label: "Documentation", path: "/docs" },
    { icon: "📞", label: "Support", path: "/contact" },
    { icon: "❓", label: "Help Center", path: "/help" },
    { icon: "🔔", label: "Notifications", path: "/notifications" },
    { icon: "📈", label: "Reports", path: "/reports" },
  ];

  return (
    <div className="homepage-container">
      {/* Animated Background Elements */}
      <div className="bg-animations">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>

      {/* Header with Modern Design */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-container">
              <div className="logo">
                <div className="logo-inner">
                  <span className="logo-text">MS</span>
                </div>
              </div>
              <div className="brand-info">
                <h1 className="brand-title">MultiSaaS Portal</h1>
                <span className="brand-subtitle">Enterprise Edition</span>
              </div>
            </div>
          </div>

          <div className="header-actions">
            <div className="user-profile">
              <div className="user-avatar">👤</div>
              <div className="user-info">
                <span>Hello, {user?.name || "Admin"} 👋</span>
                <span className="user-role">Administrator</span>
              </div>
            </div>
            <button onClick={handleLogout} className="logout-button">
              <span className="logout-icon">🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Asymmetrical Layout */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="badge-icon">✨</span>
              <span>Welcome Back</span>
            </div>
            <h1 className="hero-title">
              Your Complete
              <span className="hero-title-accent"> Business Hub</span>
            </h1>
            <p className="hero-description">
              Orchestrate your entire digital ecosystem from one intelligent
              platform. Monitor performance, manage teams, and drive growth with
              unprecedented clarity.
            </p>
            <div className="hero-metrics">
              <div className="metric">
                <span className="metric-value">99.9%</span>
                <span className="metric-label">Uptime</span>
              </div>
              <div className="metric">
                <span className="metric-value">500+</span>
                <span className="metric-label">Integrations</span>
              </div>
              <div className="metric">
                <span className="metric-value">24/7</span>
                <span className="metric-label">Support</span>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-visual">
              <div className="visual-card card-1">
                <div className="card-header">
                  <span className="card-icon">📈</span>
                  <span className="card-title">Revenue Growth</span>
                </div>
                <div className="card-content">
                  <span className="card-value">+127%</span>
                  <div className="card-chart">
                    <div className="chart-bar" style={{ height: "20%" }}></div>
                    <div className="chart-bar" style={{ height: "45%" }}></div>
                    <div className="chart-bar" style={{ height: "80%" }}></div>
                    <div className="chart-bar" style={{ height: "100%" }}></div>
                    <div className="chart-bar" style={{ height: "65%" }}></div>
                  </div>
                </div>
              </div>

              <div className="visual-card card-2">
                <div className="card-header">
                  <span className="card-icon">👥</span>
                  <span className="card-title">Active Users</span>
                </div>
                <div className="card-content">
                  <span className="card-value">2,847</span>
                  <span className="card-trend">+23% this week</span>
                </div>
              </div>

              <div className="visual-card card-3">
                <div className="card-header">
                  <span className="card-icon">⚡</span>
                  <span className="card-title">System Status</span>
                </div>
                <div className="card-content">
                  <div className="status-indicators">
                    <div className="status-item">
                      <div className="status-dot status-green"></div>
                      <span>API Gateway</span>
                    </div>
                    <div className="status-item">
                      <div className="status-dot status-green"></div>
                      <span>Database</span>
                    </div>
                    <div className="status-item">
                      <div className="status-dot status-yellow"></div>
                      <span>CDN</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetrical Navigation Grid */}
      <section className="navigation-section">
        <div className="nav-container">
          <div className="nav-left">
            <h2 className="section-title">Quick Access</h2>
            <div className="primary-nav-grid">
              {primaryNavItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className={`primary-nav-card size-${item.size}`}
                >
                  <div className="nav-card-background"></div>
                  <div className="nav-card-content">
                    <div className="nav-card-icon">{item.icon}</div>
                    <h3 className="nav-card-title">{item.label}</h3>
                    <div className="nav-card-arrow">→</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="nav-right">
            <h2 className="section-title">Tools & Resources</h2>
            <div className="secondary-nav-grid">
              {secondaryNavItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className="secondary-nav-card"
                >
                  <div className="secondary-card-icon">{item.icon}</div>
                  <span className="secondary-card-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="dashboard-preview">
        <div className="preview-container">
          <div className="preview-header">
            <h2 className="preview-title">Real-time Insights</h2>
            <p className="preview-subtitle">
              Monitor your business performance at a glance
            </p>
          </div>

          <div className="preview-grid">
            <div className="preview-card large-card">
              <div className="card-header">
                <h3>Performance Overview</h3>
                <span className="time-filter">Last 30 days</span>
              </div>
              <div className="performance-metrics">
                <div className="metric-item">
                  <div className="metric-icon">💰</div>
                  <div className="metric-details">
                    <span className="metric-value">$847,293</span>
                    <span className="metric-label">Total Revenue</span>
                    <span className="metric-change positive">+12.5%</span>
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-icon">📊</div>
                  <div className="metric-details">
                    <span className="metric-value">34,592</span>
                    <span className="metric-label">Active Sessions</span>
                    <span className="metric-change positive">+8.2%</span>
                  </div>
                </div>
                <div className="metric-item">
                  <div className="metric-icon">🎯</div>
                  <div className="metric-details">
                    <span className="metric-value">87.3%</span>
                    <span className="metric-label">Goal Completion</span>
                    <span className="metric-change negative">-2.1%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="preview-card">
              <h3>Recent Activity</h3>
              <div className="activity-feed">
                <div className="activity-item">
                  <div className="activity-dot"></div>
                  <div className="activity-content">
                    <span className="activity-text">
                      New project "Alpha Launch" created
                    </span>
                    <span className="activity-time">2 min ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-dot"></div>
                  <div className="activity-content">
                    <span className="activity-text">
                      Team member Sarah joined
                    </span>
                    <span className="activity-time">1 hour ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-dot"></div>
                  <div className="activity-content">
                    <span className="activity-text">
                      Monthly report generated
                    </span>
                    <span className="activity-time">3 hours ago</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="preview-card">
              <h3>System Health</h3>
              <div className="health-indicators">
                <div className="health-item">
                  <div className="health-label">CPU Usage</div>
                  <div className="health-bar">
                    <div className="health-fill" style={{ width: "45%" }}></div>
                  </div>
                  <span className="health-value"></span>
                </div>
                <div className="health-item">
                  <div className="health-label">Memory</div>
                  <div className="health-bar">
                    <div className="health-fill" style={{ width: "67%" }}></div>
                  </div>
                  <span className="health-value"></span>
                </div>
                <div className="health-item">
                  <div className="health-label">Storage</div>
                  <div className="health-bar">
                    <div className="health-fill" style={{ width: "23%" }}></div>
                  </div>
                  <span className="health-value"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">
              <span className="footer-logo-text">MultiSaaS</span>
            </div>
            <p className="footer-description">
              Empowering businesses with intelligent automation and seamless
              integration.
            </p>
          </div>
          <div className="footer-right">
            <p className="footer-copyright">
              © 2025 MultiSaaS Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
