
import './App.css';
import { useAuth } from './contexts/AuthContext';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function App() {
  const { currentUser, signin, logout } = useAuth();
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signin(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }
  React.useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }else{
      navigate("/");
    } 
  }
  , [currentUser]);

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
                <Button onClick={handleSubmit} type='submit' className='btn btn-primary w-100 mt-1'>Login</Button>
              </form>
              {error && <div className='alert alert-danger mt-3' role='alert'>{error}</div>}
            </div>
          </div>
        </div>
        </div>
    </div>
  );
}

export default App;
