import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import {
  AdminsPage,
  Dashboard,
  LoginPage,
  OrdersPage,
  PrivateRoute,
  ProductsPage,
  SingleOrderPage,
  SingleProductPage,
  UsersPage,
  CategoryPage
} from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/'>
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute exact path='/orders'>
          <OrdersPage />
        </PrivateRoute>
        <PrivateRoute exact path='/orders/:id'>
          <SingleOrderPage />
        </PrivateRoute>
        <PrivateRoute exact path='/products'>
          <ProductsPage />
        </PrivateRoute>
        <PrivateRoute exact path='/products/:id'>
          <SingleProductPage />
        </PrivateRoute>
        <PrivateRoute exact path='/admins'>
          <AdminsPage />
        </PrivateRoute>
        <PrivateRoute exact path='/login'>
          <LoginPage />
        </PrivateRoute>
        <PrivateRoute exact path='/users'>
          <UsersPage />
        </PrivateRoute>
        <PrivateRoute exact path='/category'>
          <CategoryPage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
