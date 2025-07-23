// 【修正】從同層級的 modules 資料夾引入模組
import { renderPlantGrid, setupSearch } from './modules/ui.js';
import { initializeParticleEffect, initializeHoverEffects } from './modules/effects.js';
import { initializeMusicPlayer, initializeScrollToTop } from './modules/controls.js';

// 主應用程式函式，設為 async 以便使用 await
async function main() {
    // 獲取所有需要的 DOM 元素
    const plantGrid = document.getElementById('plantGrid');
    const searchInput = document.getElementById('searchInput');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const searchTermDisplay = document.getElementById('searchTermDisplay');

    try {
        // 【關鍵修正】使用 fetch 來讀取 data.json 檔案
        // 使用根相對路徑來確保在 GitHub Pages 上能正確找到檔案
        const response = await fetch('/Plant/js/modules/data.json');
        if (!response.ok) {
            throw new Error(`無法載入 data.json: ${response.statusText}`);
        }
        const plantData = await response.json();

        // 1. 處理資料和核心 UI
        const sortedData = [...plantData].sort((a, b) => a.name.localeCompare(b.name, 'zh-Hant'));
        renderPlantGrid(plantGrid, sortedData);
        setupSearch(searchInput, plantGrid, noResultsMessage, searchTermDisplay);
        document.getElementById('year').textContent = new Date().getFullYear();

        // 2. 初始化視覺效果
        initializeParticleEffect();
        initializeHoverEffects();

        // 3. 初始化頁面控制項
        initializeMusicPlayer();
        initializeScrollToTop();

        // 4. 最後，重新渲染所有 lucide 圖標
        lucide.createIcons();

    } catch (error) {
        console.error("應用程式初始化失敗:", error);
        // 在畫面上顯示錯誤訊息，方便除錯
        if(plantGrid) {
            plantGrid.innerHTML = `<p class="text-red-400 text-center col-span-full">載入資料時發生錯誤，請檢查主控台(F12)以獲取更多資訊。</p>`;
        }
    }
}

// 當 DOM 載入完成後，執行主函式
document.addEventListener('DOMContentLoaded', main);

