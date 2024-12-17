import React,{useEffect} from 'react';
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
  CategoryPage,
  BannerPage,
  GeoFancing,
  InventoryPage,
  SingleUserPage,
  NotificationPage,
  CreateNewOrderPage,
  DealOfTheDayPage,
  DeliveryPage,
  EditOrderPage,
  BlukImageUploadPage
} from './pages';


function App() {

  useEffect(()=> {
    console.log = function () {};
  },[])

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/'>
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute exact path='/orders'>
          <OrdersPage />
        </PrivateRoute>
        <PrivateRoute exact path='/create-order'>
          <CreateNewOrderPage />
        </PrivateRoute>
        <PrivateRoute exact path='/orders/:id'>
          <SingleOrderPage />
        </PrivateRoute>
        <PrivateRoute exact path='/edit-order/:id'>
          <EditOrderPage />
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
        <PrivateRoute exact path='/users/:id'>
          <SingleUserPage />
        </PrivateRoute>
        <PrivateRoute exact path='/category'>
          <CategoryPage />
        </PrivateRoute>
        <PrivateRoute exact path='/banners'>
          <BannerPage />
        </PrivateRoute>
        <PrivateRoute exact path='/geoFancing'>
          <GeoFancing />
        </PrivateRoute>
        <PrivateRoute exact path='/inventory'>
          <InventoryPage />
        </PrivateRoute>
        <PrivateRoute exact path='/notification'>
          <NotificationPage />
        </PrivateRoute>
        <PrivateRoute exact path='/dealoftheday'>
          <DealOfTheDayPage />
        </PrivateRoute>
        <PrivateRoute exact path='/deliveryinstruction'>
          <DeliveryPage />
        </PrivateRoute>
        <PrivateRoute exact path='/assets'>
          <BlukImageUploadPage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
