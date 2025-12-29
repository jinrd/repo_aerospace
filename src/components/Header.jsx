import { useStore } from "@nanostores/react";
import { cartItems } from "../stores/cartStore";
import ThemeToggle from "./ThemeToggle";
import LoginButton from "./LoginButton";
import ImageUploader from "./ImageUploader";


export default function Header() {
    // store 값이 바뀌면 자동으로 컴포넌트를 다시 그린다
    const count = useStore(cartItems);

    return (
    <header className="bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 fixed top-0 left-0 w-full p-4 bg-white/80 backdrop-blur-md border-b border-slate-200 flex justify-between items-center z-50">
      <h1 className="font-bold text-xl text-slate-800 dark:text-white text-slate-800">Aerospace 🚀</h1>
      
      <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
        <ThemeToggle/>
        <span>🛒 장바구니</span>
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {count}
        </span>
        <LoginButton/>

      </div>
    </header>
  );
}