import { allProducts } from '../../services/fakerService';
import actionType from '../actionType'

export const fetchProducts = () => {
    return async (dispatch, state) => {
        const data = await allProducts();
        dispatch({
            type: actionType.SET_PRODUCTS,
            payload: data
        })
    }

}

export const addToCart = (data) => {
    // const carts = localStorage.getItem('carts') || [];
    // localStorage.setItem('carts', [...carts, data])
    return {
        type: actionType.SET_CART,
        payload: data
    }
}

export const fetchCarts = () => {
    return {
        type: actionType.FETCH_CARTS,
    }
}
export const removeFromCart = (product_id) => {
    return {
        type: actionType.REMOVE_FROM_CART,
        payload: { id: product_id }
    }
}
