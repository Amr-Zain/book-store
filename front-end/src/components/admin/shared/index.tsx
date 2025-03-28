import { Outlet, useNavigate } from 'react-router';
import Sidebar from './sidebar';
import Header from './header';
import DashboardButton from './dashboardButton';

const DashboardLayout = () => {
  const navigate = useNavigate();



  const handleLogout = () => {
    navigate("/");
  };

  return (
    <section className="flex md:bg-gray-100 min-h-screen overflow-hidden">
      <Sidebar onLogout={handleLogout} />
      
      <div className="flex-grow text-gray-800">
        <Header />
        
        <main className="p-6 sm:p-10 space-y-6">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <div className="mr-6">
              <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
              <h2 className="text-gray-600 ml-0.5">Book Store Inventory</h2>
            </div>
            
            <div className="flex flex-col md:flex-row items-start justify-end -mb-3">
              <DashboardButton 
                to="/dashboard/manage-books"
                label="Manage Books"
                icon={<svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>}
                variant="outline"
              />
              <DashboardButton 
                to="/dashboard/add-new-book"
                label="Add New Book"
                icon={<svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>}
                variant="solid"
              />
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;