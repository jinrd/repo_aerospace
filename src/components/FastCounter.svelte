<!-- src/components/FastCounter.svelte -->
 <script>
    let count = 0;

    function handleClick() {
        count += 1;
    }
 </script>
 <div class="p-6 bg-orange-50 border border-orange-200 rounded-xl shadow-sm text-center">
    <h3 class="text-lg font-bold text-orange-800 mb-2">⚡ Svelte 아일랜드</h3>
    <p class="text-orange-600 text-sm mb-4">가상 돔 없이 바로 작동합니다!</p>

    <div class="text-4xl font-black text-orange-500 mb-4">{count}</div>

    <button on:click={handleClick}
    class="px-4 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-colors active:scale-95">
        클릭해보세요 (Svelte)
    </button>
</div>