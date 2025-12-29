// src/components/AddToCart.jsx
import { addCartItem } from '../stores/cartStore';

export default function AddToCart() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-slate-100 max-w-sm mx-auto mt-20 text-center">
      <h3 className="text-lg font-bold mb-2">멋진 상품</h3>
      <p className="text-slate-500 mb-4">이 상품은 정말 끝내줍니다. 하나 담아보세요!</p>
      
      <button 
        onClick={addCartItem}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-transform active:scale-95"
      >
        장바구니에 담기 +
      </button>
    </div>
  );
}