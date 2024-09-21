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
  GET_SINGLEPRODUCTFORUPDATE_SUCCESS,
  GET_PRODUCTFORCREATEORDER_BEGIN,
  GET_PRODUCTFORCREATEORDER_ERROR,
  GET_PRODUCTFORCREATEORDER_SUCCESS,
  GET_PRODUCTBYNAMEDROPDOWN_BEGIN,
  GET_PRODUCTBYNAMEDROPDOWN_ERROR,
  GET_PRODUCTBYNAMEDROPDOWN_SUCCESS,
  RESET_NEW_PRODUCT 
} from '../actions';

const product_reducer = (state, action) => {
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, products_error: false, products_loading: true };
  }
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, products_error: true, products_loading: false };
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    return {
      ...state,
      products_loading: false,
      products: action.payload,
    };
  }
  if (action.type === CREATE_NEW_PRODUCT) {
    const { name, value } = action.payload;
    return { ...state, new_product: { ...state.new_product, [name]: value } };
  }
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      single_product_error: false,
      single_product_loading: true,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      single_product_error: true,
      single_product_loading: false,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false,
      single_product: action.payload,
    };
  }
  if (action.type === UPDATE_EXISTING_PRODUCT) {
    const { name, value } = action.payload;
    console.log(name);
    console.log(value);
    return {
      ...state,
      single_productForUpdate: { ...state.single_productForUpdate, [name]: value },
    };
  }

  if(action.type === GET_SINGLEPRODUCTFORUPDATE_BEGIN) {
    return {...state,
      single_productForUpdate_loading: true,
      single_productForUpdate_error: false
    }
  }

  if(action.type === GET_SINGLEPRODUCTFORUPDATE_ERROR) {
    return {
      ...state,
      single_productForUpdate_loading: false,
      single_productForUpdate_error: action.payload
    }
  }

  if(action.type === GET_SINGLEPRODUCTFORUPDATE_SUCCESS) {
    return {
      ...state,
      single_productForUpdate: action.payload,
      single_productForUpdate_loading: false
    }
  }

  if(action.type === GET_PRODUCTFORCREATEORDER_BEGIN) {
    return {
      ...state,
      productForCreateOrder_loading: true,
      productForCreateOrder_error: false
    }
  }

  if(action.type === GET_PRODUCTFORCREATEORDER_ERROR) {
    return {
      ...state,
      productForCreateOrder_loading: false,
      productForCreateOrder_error: true
    }
  }

  if(action.type === GET_PRODUCTFORCREATEORDER_SUCCESS) {
    return {
      ...state,
      productForCreateOrder_loading: false,
      productForCreateOrder: action.payload
    }
  }

  if(action.type === GET_PRODUCTBYNAMEDROPDOWN_BEGIN) {
    return {...state,
      productByName_loading: true,
      productByName_error: false
    }
  }

  if(action.type === GET_PRODUCTBYNAMEDROPDOWN_ERROR) {
    return {...state,
      productByName_loading: false,
      productByName_error: true
    }
  }

  if(action.type ===GET_PRODUCTBYNAMEDROPDOWN_SUCCESS) {
    return {
      ...state,
      productByName_loading: false,
      productByName: action.payload
    }
  }
  if (action.type === RESET_NEW_PRODUCT) {
    return {
      ...state,
      new_product: {
      name: '',
      product_status:'',
      price: '',
      offer_price: '',
      stock: 10,
      images: [],
      information: '',
      description: '',
      category: '',
      add_ons: '',
      search_tags: '',
      selling_method: '',
      sku: '',
      barcode: '',
      stock_notify: '',
      tax: '',
      product_detail_max: '',
      product_detail_min: '',
      increment_value: '',
      shipping: '',
      featured: false,
      variant_type: '',
      variant_value: '',
      purchase_price: '',
      product_weight_type: '',
      product_weight: '',
      imageList:[],
      },
    };
  }
  

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default product_reducer;
