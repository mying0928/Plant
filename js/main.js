// 【變更】從 data.js 模組直接引入 plantData
import { plantData } from '/Plant/js/modules/data.js';
import { renderPlantGrid, setupSearch } from './modules/ui.js';
import { initializeParticleEffect, initializeHoverEffects } from './modules/effects.js';
import { initializeMusicPlayer, initializeScrollToTop } from './modules/controls.js';

// 當 DOM 載入完成後，執行所有初始化操作
document.addEventListener('DOMContentLoaded', () => {
    // 獲取所有需要的 DOM 元素
    const plantGrid = document.getElementById('plantGrid');
    const searchInput = document.getElementById('searchInput');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const searchTermDisplay = document.getElementById('searchTermDisplay');

    // 1. 處理資料和核心 UI
    // 【變更】由於 plantData 是直接引入的，不再需要 try...catch
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
});

