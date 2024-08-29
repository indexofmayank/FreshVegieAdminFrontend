import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './config/ThemeConfig';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from './context/user_context';
import { OrderProvider } from './context/order_context';
import { ProductProvider } from './context/product_context';
import { AdminProvider } from './context/admin_context';
import { CustomerProvider } from './context/customer_context';
import { CategoryProvider } from '../src/context/category_context';
import { BannerProvider } from './context/banner_context';
import { GeoFancingProvider } from './context/geoFancing_context';
import { InventoryProvider } from './context/inventory_context';
import { UserDetailProvider } from './context/user_detail_context';
import { NotificationProvider } from './context/notification_context';


ReactDOM.render(
  <UserProvider>
    <AdminProvider>
      <OrderProvider>
        <ProductProvider>
          <CustomerProvider>
            <CategoryProvider>
              <BannerProvider>
                <GeoFancingProvider>
                  <UserDetailProvider>
                    <NotificationProvider>
                      <InventoryProvider>
                        <ChakraProvider theme={theme}>
                          <App />
                        </ChakraProvider>
                      </InventoryProvider>
                    </NotificationProvider>
                  </UserDetailProvider>
                </GeoFancingProvider>
              </BannerProvider>
            </CategoryProvider>
          </CustomerProvider>
        </ProductProvider>
      </OrderProvider>
    </AdminProvider>
  </UserProvider >,
  document.getElementById('root')
);
