import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// دیباگ برای چک کردن importها
console.log('AdminPanel.jsx: Imported components', {
  Sidebar: !!Sidebar,
  Navbar: !!Navbar,
});

const AdminPanel = () => {
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  console.log('AdminPanel: isLoggedIn=', isLoggedIn);

  if (!isLoggedIn) {
    console.log('AdminPanel: Redirecting to /admin/login');
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;