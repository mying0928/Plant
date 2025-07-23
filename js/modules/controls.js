// 這個模組負責頁面的控制項功能。

export function initializeMusicPlayer() {
    const YOUTUBE_VIDEO_ID = 'TgOu00Mf3kI';
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    let player;
    let isMuted = true;

    // 將 onYouTubeIframeAPIReady 函式掛載到 window，以便 YouTube API 腳本可以呼叫它
    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('youtube-player-container', {
            height: '315', width: '560', videoId: YOUTUBE_VIDEO_ID,
            playerVars: { 'autoplay': 1, 'controls': 0, 'loop': 1, 'playlist': YOUTUBE_VIDEO_ID, 'mute': 1 },
            events: { 'onReady': onPlayerReady }
        });
    }

    function onPlayerReady(event) {
        event.target.playVideo();
    }

    const toggleMusicBtn = document.getElementById('toggle-music-btn');
    if (toggleMusicBtn) {
        toggleMusicBtn.addEventListener('click', () => {
            if (player && typeof player.unMute === 'function') {
                if (isMuted) {
                    player.unMute();
                    toggleMusicBtn.innerHTML = '<i data-lucide="music-2" class="w-6 h-6"></i>';
                } else {
                    player.mute();
                    toggleMusicBtn.innerHTML = '<i data-lucide="volume-x" class="w-6 h-6"></i>';
                }
                isMuted = !isMuted;
                lucide.createIcons();
            }
        });
    }
}

export function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            const isVisible = window.scrollY > 300;
            scrollToTopBtn.classList.toggle('opacity-0', !isVisible);
            scrollToTopBtn.classList.toggle('invisible', !isVisible);
            scrollToTopBtn.classList.toggle('translate-y-2', !isVisible);
        });
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

