/* selectors */
export const getAllProducts = ({ products }) => products;
export const getCount = ({ products }) => products.length;
export const getNew = ({ products }) =>
  products.filter(item => item.newProduct === true);
export const getFeaturedProducts = ({ products }) =>
  products.filter(item => item.featured === true);
export const getProductsToCompare = ({ products }) =>
  products.filter(item => item.compare === true);
export const getHotDeals = ({ products }) => products.filter(item => item.oldPrice);
export const getFavouriteProducts = ({ products }) =>
  products.filter(item => item.favourite === true);
export const getSaleOffProducts = ({ products }) =>
  products.filter(item => item.saleOff === true);
export const getTopSellerProducts = ({ products }) =>
  products.filter(item => item.topSeller === true);
export const getTopRatedProducts = ({ products }) =>
  products.slice(0, 15).sort((a, b) => b.stars - a.stars);
export const getProductById = ({ products }, id) => products.find(
  product => product.id === id);

/* actions */
const createActionName = actionName => `app/products/${actionName}`;
const TOGGLE_PRODUCT_FAVOURITE = createActionName('TOGGLE_PRODUCT_FAVOURITE');
const TOGGLE_PRODUCT_COMPARE = createActionName('TOGGLE_PRODUCT_COMPARE');
const ADD_MY_STARS = createActionName('ADD_MY_STARS');
const UPDATE_PRODUCT_QUANTITY = createActionName('UPDATE_PRODUCT_QUANTITY')

/* action creators */
export const toggleProductFavourite = payload => ({
  type: TOGGLE_PRODUCT_FAVOURITE,
  payload,
});

export const toggleProductCompare = payload => ({
  type: TOGGLE_PRODUCT_COMPARE,
  payload,
});

export const addMyStars = payload => ({
  type: ADD_MY_STARS,
  payload,
});

export const updateProductQuantity = payload => ({
  type: UPDATE_PRODUCT_QUANTITY,
  payload,
});


/* reducer */
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    case TOGGLE_PRODUCT_FAVOURITE:
      return statePart.map(product =>
        product.id === action.payload
          ? {
            ...product,
            favourite: !product.favourite,
          }
          : product
      );
    case TOGGLE_PRODUCT_COMPARE:
      return statePart.map(product =>
        product.id === action.payload
          ? { ...product, compare: !product.compare }
          : product
      );
    case ADD_MY_STARS:
      return statePart.map(product =>
        product.id === action.payload.id
          ? { ...product, myStars: action.payload.clickedStars }
          : product
      );
      case UPDATE_PRODUCT_QUANTITY:
        return statePart.map(product => 
          product.id === action.payload.id ?
          action.payload.type === 'minus' ?
          {...product, quantity: product.quantity - action.payload.quantity}
          : action.payload.type === 'plus' ?
          {...product, quantity: product.quantity + action.payload.quantity} 
          :product
          : product
        );
    default:
      return statePart;
  }
}
