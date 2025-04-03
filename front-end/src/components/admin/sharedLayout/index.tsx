import { Outlet } from "react-router";
import Sidebar from "./sidebar";
import Header from "./header";
import DashboardButton from "./dashboardButton";
import { GoPencil, GoPlus } from "react-icons/go";

const DashboardLayout = () => {
  

  return (
    <section className="flex md:bg-gray-100 min-h-screen">
      <Sidebar/>

      <div className="flex-grow text-gray-800">
        <Header />

        <main className="p-4 md:p-2 space-y-6">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between items-center">
            <div className="mr-6">
              <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
              <h2 className="text-gray-600 ml-0.5">Book Store Inventory</h2>
            </div>

            <div className="flex flex-row items-start justify-between md:justify-end px-6 md:px-0">
              <DashboardButton
                to="/dashboard/manage-books"
                label="Manage Books"
                icon={<GoPencil className="h-5 w-5" />}

                variant="outline"
              />
              <DashboardButton
                to="/dashboard/add-book"
                label="Add Book"
                icon={<GoPlus className="h-5 w-5 text-semibolsd"/>}
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
