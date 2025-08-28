import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('handleLogin called', { username, password });
    try {
      if (username === 'admin' && password === 'password') {
        localStorage.setItem('isAdminLoggedIn', 'true');
        console.log('Login successful, navigating to /admin/dashboard');
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError('نام کاربری یا رمز عبور اشتباه است. از "admin" و "password" استفاده کنید.');
        console.log('Login failed: Invalid credentials');
      }
    } catch (err) {
      console.error('Error in handleLogin:', err);
      setError('خطایی رخ داد. لطفاً دوباره تلاش کنید.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">ورود به پنل ادمین</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <input
          type="text"
          placeholder="نام کاربری (admin)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="رمز عبور (password)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300">
          ورود
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;