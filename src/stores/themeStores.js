import { atom } from "nanostores";

// 초기값은 light
export const theme = atom('light');

// 토글 함수
export const toggleTheme = () => {
    const current = theme.get();
    const next = current === 'light' ? 'dark' : 'light';
    theme.set(next);

    // HTML 태그에 class="dark" 를 붙였다 땠다 합니다.(Tailwind 방식)
    if(next === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme','dark') // 새로고침 해도 기억하기
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme','light');
    }

    if(typeof window !== 'undefined') {
        const saved = localStorage.getItem('theme');
        if(saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            theme.set('dark');
            document.documentElement.classList.add('dark');
        }
    }
}