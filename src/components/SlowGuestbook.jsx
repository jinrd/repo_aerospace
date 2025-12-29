import { useEffect, useState } from "react";


// 일부러 3초 기다리는 함수
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default function SlowGuestbook() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // 컴포넌트가 마운트되면 데이터 가져오기 시작
        wait(3000).then(() => {
            setData("🐢 3초 뒤에 도착한 느린 거북이 데이터입니다!");
        });
    }, []);

    if(!data) {
        return (
            <div className="p-10 text-center animate-pulse bg-slate-100 rounded-xl">
                <span className="text-4xl">⏳</span>
                <p className="mt-4 text-slate-500">열심히 로딩 중입니다...</p>
            </div>
        );
    }

    return (
        <div className="p-10 bg-green-50 border border-green-200 rounded-xl text-center">
            <span className="text-4xl">🐢</span>
            <p className="mt-4 text-green-700 font-bold text-xl">{data}</p>
        </div>
    );
}
