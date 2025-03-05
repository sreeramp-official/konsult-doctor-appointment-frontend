import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; // ✅ Authentication context
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router> {/* ✅ Router must be outside AuthProvider */}
    <AuthProvider> {/* ✅ Now inside Router */}
      <App />
    </AuthProvider>
  </Router>
);

reportWebVitals();
