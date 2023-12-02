
import './App.css';
import { useAuth } from './contexts/AuthContext';
import React from 'react';

function App() {
  const { currentUser, signin, logout } = useAuth();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  return (
    <div className='container'>
      <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
        <div className='w-100' style={{ maxWidth: '400px' }}>
          <div className='card'>
            <div className='card-body'>
              <h2 className='text-center mb-4'>Login</h2>
              <form>
                <div className='form-group'>
                  <label>Email</label>
                  <input type='email' className='form-control' ref={emailRef} required />
                </div>
                <div className='form-group'>
                  <label>Password</label>
                  <input type='password' className='form-control' ref={passwordRef} required />
                </div>
                <button type='submit' className='btn btn-primary w-100'>Login</button>
              </form>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
}

export default App;
