import { NavLink } from 'react-router-dom';
import { HomeIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">پنل ادمین</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                isActive ? 'flex items-center p-2 bg-gray-700 rounded' : 'flex items-center p-2 hover:bg-gray-700 rounded'
              }
            >
              <HomeIcon className="w-6 h-6 mr-2" />
              داشبورد
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/pages"
              className={({ isActive }) =>
                isActive ? 'flex items-center p-2 bg-gray-700 rounded' : 'flex items-center p-2 hover:bg-gray-700 rounded'
              }
            >
              <DocumentTextIcon className="w-6 h-6 mr-2" />
              مدیریت صفحات
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;