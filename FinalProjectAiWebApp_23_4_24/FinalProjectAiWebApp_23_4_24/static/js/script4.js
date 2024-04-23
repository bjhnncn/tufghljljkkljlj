const startBtn = document.getElementById('start-btn');
        const appContainer = document.getElementById('app-container');
        const resetBtn = document.getElementById('reset-btn');
        const video = document.getElementById('video');

        startBtn.addEventListener('click', () => {
            appContainer.style.display = 'flex';
            document.getElementById('initial-container').style.display = 'none';
            video.src = videoFeedUrl + "?" + new Date().getTime();
            //video.src = "{{ url_for('video_feed') }}?" + new Date().getTime(); // Add timestamp to force image reload
        });

        resetBtn.addEventListener('click', () => {
            fetch('/reset', { method: 'POST' })
                .then(response => {
                    if (response.ok) {
                        console.log('Reset successful');
                    } else {
                        console.error('Error resetting');
                    }
                })
                .catch(error => {
                    console.error('Error resetting:', error);
                });
        });