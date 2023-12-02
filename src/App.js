
import './App.css';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { currentUser, signin, logout } = useAuth();
  return (
    <div className='container'>
    </div>
  );
}

export default App;
