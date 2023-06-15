import React, { useState } from 'react';
import LoginPage from './LoginPage';
import CustomerManagementPage from './CustomerManagementPage';
import MapPage from './MapPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customers, setCustomers] = useState([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleAddCustomer = (customer) => {
    setCustomers([...customers, customer]);
  };

  return (
    <div>
      {!isLoggedIn && <LoginPage onLogin={handleLogin} />}
      {isLoggedIn && (
        <div>
          <CustomerManagementPage onAddCustomer={handleAddCustomer} />
          <MapPage customers={customers} />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
  
};

export default App;
