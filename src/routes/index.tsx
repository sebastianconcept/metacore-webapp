import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Sales from '../pages/Sales';
import Inventory from '../pages/Inventory';
import Finance from '../pages/Finance';
import Customers from '../pages/Customers';
import Settings from '../pages/Settings';
import NewSale from '../pages/Sales/NewSale';
import Scanner from '../pages/Inventory/Scanner';
import Activity from '../pages/Activity';
import Replenish from '../pages/Inventory/Replenish';
import NewTransaction from '../pages/Finance/NewTransaction';
import Alerts from '../pages/Alerts';
import Notifications from '../pages/Notifications';
import Search from '../pages/Search';
import Purchases from '../pages/Purchases';
import Menu from '../pages/Menu';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/sales/new" element={<NewSale />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/inventory/scanner" element={<Scanner />} />
      <Route path="/inventory/replenishment" element={<Replenish />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/purchases" element={<Purchases />} />
      <Route path="/finance/new" element={<NewTransaction />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/search" element={<Search />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/activity" element={<Activity />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
  );
}