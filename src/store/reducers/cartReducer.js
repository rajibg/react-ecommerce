import actionType from "../actionType";

const CartReducer = (state = { loading: false, cart: [], totalItem: 0, totalPrice: 0 }, action) => {
    let totalPrice = 0;
    switch (action.type) {
        case actionType.SET_CART:
            const cartData = state.cart;
            const hasItemInCartData = cartData.filter(item => item.id === action.payload.id);
            if (hasItemInCartData.length > 0) {
                hasItemInCartData[0].quantity = hasItemInCartData[0].quantity + action.payload.quantity;
                const otherItems = cartData.filter(item => item.id !== action.payload.id);
                let totalPrice = state.totalPrice + (action.payload.quantity * action.payload.price)
                return { ...state, cart: [...otherItems, ...hasItemInCartData], loading: false, totalPrice }
            }
            const mergeCartData = [...state.cart, action.payload];
            totalPrice = calculateTotalPrice(mergeCartData)
            return { ...state, totalPrice, cart: mergeCartData, totalItem: state.totalItem + 1, loading: false }
            break;
        case actionType.ADD_TO_CART_LOADING:
            return { ...state, loading: true }
            break;
        case actionType.FETCH_CARTS:
            if (state.cart.length === 0 && localStorage.getItem('cartData')) {
                const localCartData = JSON.parse(localStorage.getItem('cartData'));
                totalPrice = calculateTotalPrice(localCartData)
                return { ...state, cart: localCartData, totalItem: localCartData.length }
            }
            totalPrice = calculateTotalPrice(state.cart)
            return { ...state, totalPrice }
            break;
        case actionType.REMOVE_FROM_CART:
            const notIncartData = state.cart.filter(item => item.id !== action.payload.id);
            localStorage.setItem('cartData', JSON.stringify(notIncartData))
            totalPrice = calculateTotalPrice(notIncartData)
            return { ...state, totalPrice, cart: notIncartData, totalItem: notIncartData.length, loading: true }
            break;
        default:
            return state
    }

}


const calculateTotalPrice = (cartData) => {
    return cartData.reduce((accumulator, item) => accumulator + (item.quantity * item.price), 0)
}


export default CartReducer;