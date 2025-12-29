import { atom } from 'nanostores'

// 초기값 0 으로 시작하는 원자(atom) 단위의 저장소를 만든다.
export const cartItems = atom(0);

// 숫자를 1 늘려주는 함수도 미리 만든다.
export const addCartItem = () => {
    cartItems.set(cartItems.get() + 1);
}