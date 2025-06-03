// client/src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import './index.css';  
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateCampaign from './pages/CreateCampaign';
import CampaignHistory from './pages/CampaignHistory';
import PrivateRoute from './components/PrivateRoute';
import CampaignDeliveryLogs from "./pages/CampaignDeliveryLogs";
import AddCustomers from "./pages/AddCustomers";
import Navbar from "./components/Navbar";


function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/"]; // Add more if needed

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-campaign"
          element={
            <PrivateRoute>
              <CreateCampaign />
            </PrivateRoute>
          }
        />
        <Route
          path="/campaigns"
          element={
            <PrivateRoute>
              <CampaignHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/CampaignDeliveryLogs"
          element={
            <PrivateRoute>
              <CampaignDeliveryLogs />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-customers"
          element={
            <PrivateRoute>
              <AddCustomers />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
