// 這個模組負責所有與 UI 相關的操作，如渲染卡片、處理搜尋等。

function createPlantCardHTML(plant) {
    const safePlantName = plant.name.replace(/'/g, "\\'");
    const placeholderHTML = `<div class='w-full h-56 image-placeholder'>${safePlantName}</div>`;
    
    return `<div class="plant-card cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col" data-plant-name="${plant.name.toLowerCase()}">
                <a href="${plant.linkUrl}" class="block flex flex-col flex-grow">
                    <div class="card-image-container h-56">
                        <img class="card-image" loading="lazy" src="${plant.imageUrl}" alt="${plant.altText}" onerror="this.onerror=null; this.parentElement.innerHTML = '${placeholderHTML}';">
                    </div>
                    <div class="card-content p-6 bg-slate-800/80 backdrop-blur-sm flex flex-col flex-grow">
                        <h2 class="text-2xl font-bold text-white mb-2">${plant.name}</h2>
                        <p class="text-gray-300 mb-4 text-sm">${plant.description}</p>
                        <span class="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 mt-auto self-start">
                            查看養護紀錄
                        </span>
                    </div>
                </a>
            </div>`;
}

export function renderPlantGrid(gridElement, data) {
    if (gridElement) {
        gridElement.innerHTML = data.map(createPlantCardHTML).join('');
    }
}

export function setupSearch(searchInput, plantGrid, noResultsMessage, searchTermDisplay) {
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase().trim();
        let visibleCount = 0;
        
        const allCards = plantGrid.querySelectorAll('.plant-card');
        allCards.forEach(card => {
            const plantName = card.dataset.plantName;
            const isVisible = searchTerm === "" || plantName.includes(searchTerm);
            card.classList.toggle('hidden', !isVisible);
            if (isVisible) visibleCount++;
        });

        noResultsMessage.classList.toggle('hidden', !(visibleCount === 0 && searchTerm.length > 0));
        if (visibleCount === 0) {
            searchTermDisplay.textContent = event.target.value;
        }
    });
}

