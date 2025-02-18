// IMPORTANT: If the JavaScript is not working it is most probably because it relies on external libraries that are linked in the index.html file - however, if you don't have the permission to access them, it's better not to link them.

// Please keep in mind that JS files might also be obfuscated to prevent people from stealing the code and animations.

// However, all the HTML elements and CSS are there are you just need to access them using JS.

// YouTube Player API integration
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var players = {};

function onYouTubeIframeAPIReady() {
    var containers = document.querySelectorAll('.youtube-container');
    containers.forEach(function(container) {
        var playButton = container.querySelector('.play-button');
        var videoId = container.dataset.videoId;

        playButton.addEventListener('click', function() {
            if (!players[videoId]) {
                var playerDiv = document.createElement('div');
                playerDiv.id = 'youtube-player-' + videoId;
                container.appendChild(playerDiv);

                players[videoId] = new YT.Player(playerDiv.id, {
                    height: '100%',
                    width: '100%',
                    videoId: videoId,
                    events: {
                        'onReady': onPlayerReady,
                        'onError': onPlayerError
                    }
                });
            } else {
                players[videoId].playVideo();
            }

            // Hide thumbnail and play button
            container.querySelector('img').style.display = 'none';
            playButton.style.display = 'none';
        });
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerError(event) {
    console.error('YouTube player error:', event.data);
    var errorMessages = {
        2: 'Invalid parameter',
        5: 'HTML5 player error',
        100: 'Video not found',
        101: 'Embedding not allowed',
        150: 'Embedding not allowed'
    };
    alert('Error loading video: ' + (errorMessages[event.data] || 'Unknown error'));
}