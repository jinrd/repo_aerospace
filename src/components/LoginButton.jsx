// src/components/LoginButton.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function LoginButton() {
  const [user, setUser] = useState(null);

  // 페이지 로드 시 로그인 상태 확인
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 로그인 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    // 깃허브 로그인은 설정이 필요하니, 가장 쉬운 'OAuth' 말고 '소셜' 흉내만 냅시다.
    // 여기서는 간단하게 Github 로그인을 시도하는 코드를 넣겠습니다.
    // (Supabase 대시보드에서 Github 설정을 안 했다면 에러가 날 수 있습니다.)
    
    // 👇 가장 쉬운 테스트: "이메일 없이 익명 로그인" (Supabase Auth -> Settings -> Enable Anonymous Sign-ins 켜야 함)
    // 혹은 'Github' (설정 필요)
    
    await supabase.auth.signInWithOAuth({
      provider: 'github', // 혹은 'google'
      options: {
        redirectTo: 'window.location.origin '// 로그인 후 돌아올 주소
      }
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (user) {
    return (
        <div className='flex items-center gap-3'>
            <span className='text-sm font-bold text-slate-700 dark:text-slate-300'>
                {user.email || '사용자'}님
            </span>
            <button
                onClick={handleLogout}
                className='px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition'>
                로그아웃
            </button>
        </div>
    )
  }

    return (
        <button 
        onClick={handleLogin}
        className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold hover:opacity-90 transition flex items-center gap-2"
        >
        <span className="text-xl">🐙</span> GitHub 로그인
        </button>
    );
}