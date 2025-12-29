import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div className="p-6 bg-slate-100 rounded-xl shadow-lg border border-slate-200 text-center">
      <h2 className="text-xl font-bold text-slate-800 mb-4">React 아일랜드 🏝️</h2>
      <p className="text-slate-600 mb-4">현재 카운트: <span className="font-mono font-bold text-blue-600 text-2xl">{count}</span></p>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold"
      >
        +1 증가 (React 작동 중)
      </button>
    </div>
    );
}