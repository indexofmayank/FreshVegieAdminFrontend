import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducers/product_reducer';
import {
  products_url,
  update_product_url,
  create_new_product,
  delete_review,
  productsTable_url,
  single_product_url,
  singleProductForUpdate_url
} from '../utils/constants';
import {
  CREATE_NEW_PRODUCT,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_SUCCESS,
  UPDATE_EXISTING_PRODUCT,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_ERROR,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLEPRODUCTFORUPDATE_BEGIN,
  GET_SINGLEPRODUCTFORUPDATE_ERROR,
  GET_SINGLEPRODUCTFORUPDATE_SUCCESS
} from '../actions';

const initialState = {
  products_loading: false,
  products_error: false,
  products: [],
  new_product: {
    name: '',
    price: '',
    stock: 10,
    description: '',
    images: [],
    colors: [],
    sizes: [],
    company: '',
    shipping: true,
    featured: false,
  },
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
  single_productForUpdate: {},
  single_productForUpdate_loading: false,
  single_productForUpdate_error: false,
};

const ProductContext = React.createContext();

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = async (newPage, limit) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(`${productsTable_url}?page=${newPage}?limit=${limit}`);
      const {data} = response;
      console.log(data);
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  const fetchSingleProduct = async (id) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios.get(`${single_product_url}${id}`);
      const { data } = response.data;
      console.log(data);  
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  const fetchSingleProductForUpdate = async (id) => {
    dispatch({type: GET_SINGLEPRODUCTFORUPDATE_BEGIN});
    try {
      const response = await axios.get(`${singleProductForUpdate_url}${id}`);
      const {data} = response.data;
      console.log(data);
      dispatch({type: GET_SINGLEPRODUCTFORUPDATE_SUCCESS, payload: data});
    } catch (error) {
      dispatch({GET_SINGLEPRODUCTFORUPDATE_ERROR});
    }
  }

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${update_product_url}${id}`);
      const { success, message } = response.data;
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateNewProductDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'price' || name === 'stock') {
      value = Number(value);
    }
    if (name === 'colors' || name === 'sizes') {
      value = value.replace(/\s+/g, '');
      if (value === '') {
        value = [];
      } else if (value.indexOf(',') > -1) {
        value = value.split(',');
      } else {
        value = value.split();
      }
  
  
    }
    if (name === 'shipping' || name === 'featured') {
      value = e.target.checked;
    }
    dispatch({ type: CREATE_NEW_PRODUCT, payload: { name, value } });
  };

  const updateExistingProductDetails = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'price' || name === 'stock') {
      value = Number(value);
    }
    if (name === 'colors' || name === 'sizes') {
      value = value.replace(/\s+/g, '');
      if (value === '') {
        value = [];
      } else if (value.indexOf(',') > -1) {
        value = value.split(',');
      } else {
        value = value.split();
      }
    }
    if (name === 'shipping' || name === 'featured') {
      value = e.target.checked;
    }
    dispatch({ type: UPDATE_EXISTING_PRODUCT, payload: { name, value } });
  };

  const createNewProduct = async (product) => {
    try {
      const response = await axios.post(create_new_product, product);
      const { success, data } = response.data;
      fetchProducts();
      return { success, data };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const updateProduct = async (id, product) => {
    try {
      const response = await axios.put(`${update_product_url}${id}`, product);
      const { success, message } = response.data;
      // fetchProducts();
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  const deleteReview = async (productId, reviewId) => {
    try {
      const response = await axios.delete(`${delete_review}${productId}`, {
        data: {
          reviewId,
        },
      });
      const { success, message } = response.data;
      fetchSingleProduct(productId);
      return { success, message };
    } catch (error) {
      const { success, message } = error.response.data;
      return { success, message };
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        ...state,
        deleteProduct,
        updateNewProductDetails,
        updateExistingProductDetails,
        createNewProduct,
        fetchProducts,
        fetchSingleProduct,
        fetchSingleProductForUpdate,
        updateProduct,
        deleteReview,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};
