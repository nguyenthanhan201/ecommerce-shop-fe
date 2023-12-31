import { put, takeEvery } from 'redux-saga/effects';

import { CartServices } from '@/lib/repo/cart.repo';

import { setCartItemsSlice } from '../slices/cartItems';
import { GET_CART_ITEMS } from '../types';

export function* getCartItemsSaga(action: any): any {
  const cartItems = yield CartServices.getCartItemsByIdAuth(action.payload);
  // console.log("👌 ~ cartItems", cartItems)
  yield put(setCartItemsSlice(cartItems === 'undefined' ? null : cartItems));
}

export function* watchCartItemsAsync() {
  yield takeEvery(GET_CART_ITEMS, getCartItemsSaga);
}
