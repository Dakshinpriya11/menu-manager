import { useState } from 'react';
import LandingPage from './components/LandingPage';
import OrderTypePage from './components/OrderTypePage';
import CustomerMenu from './components/CustomerMenu';
import { LoginPage } from './components/LoginPage';
import OwnerDashboard from './dashboards/OwnerDashboard';
import StaffDashboard from './dashboards/StaffDashboard';
import type { User, OrderType } from './types';

type Page =
  | 'landing'
  | 'order-type'
  | 'customer-menu'
  | 'login'
  | 'owner'
  | 'staff';

export default function App() {
  const [page, setPage] = useState<Page>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [orderType, setOrderType] = useState<OrderType | null>(null);

  const handleLogin = (loggedInUser: User, jwtToken: string) => {
    setUser(loggedInUser);
    setToken(jwtToken);
    setPage(loggedInUser.role === 'OWNER' ? 'owner' : 'staff');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setOrderType(null);
    setPage('landing');
  };

  const handleSelectOrderType = (type: OrderType) => {
    setOrderType(type);
    setPage('customer-menu');
  };

  return (
    <div className="font-sans">
      {page === 'landing' && <LandingPage onNavigate={setPage} />}

      {page === 'order-type' && (
        <OrderTypePage onSelectOrderType={handleSelectOrderType} />
      )}

      {page === 'customer-menu' && orderType  && (
        <CustomerMenu
          orderType={orderType.name} 
          token={token ?? ''} // safe fallback
          onBack={() => setPage('order-type')}
        />
      )}

      {page === 'login' && (
        <LoginPage onLogin={handleLogin} onBack={() => setPage('landing')} />
      )}

      {page === 'owner' && user && token && (
        <OwnerDashboard
          user={user}
          token={token}
          onLogout={handleLogout}
        />
      )}

      {page === 'staff' && user && token && (
        <StaffDashboard
          user={user}
          token={token}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
