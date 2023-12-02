import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {AuthProvider}  from './contexts/AuthContext';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
//Page Imports
import App from './App';
import Dashboard from './pages/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter>
    <AuthProvider>
        <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/dashboard/*" element={<Dashboard/>} />
        </Routes>    
    </AuthProvider>
    </BrowserRouter>
);
