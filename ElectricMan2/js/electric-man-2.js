window.RufflePlayer = {
    config: {
        "autoplay": "on",
        "contextMenu": false,
    }
};

window.addEventListener("DOMContentLoaded", () => {
    let ruffle = window.RufflePlayer.newest();
    let player = ruffle.createPlayer();
    let container = document.getElementById("container");
    container.appendChild(player);
    player.load("data/Electricman_2.swf");
});