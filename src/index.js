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

ReactDOM.render(
  <UserProvider>
    <AdminProvider>
      <OrderProvider>
        <ProductProvider>
          <CustomerProvider>
            <CategoryProvider>
              <BannerProvider>
                <ChakraProvider theme={theme}>
                  <App />
                </ChakraProvider>
              </BannerProvider>
            </CategoryProvider>
          </CustomerProvider>
        </ProductProvider>
      </OrderProvider>
    </AdminProvider>
  </UserProvider>,
  document.getElementById('root')
);
