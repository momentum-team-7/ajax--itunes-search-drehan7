const url = 'https://itunes.apple.com/search?term=';
let resultContainer = document.querySelector(".all-results");
let audioPlayer = document.querySelector('audio')

let form = document.querySelector("form");


form.addEventListener('submit', e => {

    e.preventDefault();
    clearSongs();
    getSongs();

})


function clearSongs() {
    let songs = document.querySelectorAll('.song-container')
    for (let song of songs) {
        song.remove();

    }
}

document.addEventListener('click', e => {
    if (e.target.className === "song-container" || e.target.className === "album-image") {
        console.log("preview url " +e.target.parentElement.id)
        audioPlayer.src = e.target.parentElement.id;
    }
})




function getSongs() {
    let tempURL = 'https://proxy-itunes-api.glitch.me/search?term='
    // let userInput = formatSearchString(document.querySelector(".user-input").value);
    let userInput = document.querySelector(".user-input").value

    // Hard code a limit for now
    fetch (url + userInput + "&limit=15&media=music")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            console.log(data.results[0].artistViewURL)
            for (let song of data.results) {
                if (song.trackName !== undefined) {
                    renderSong(song);
                }
            }
            // for (let song of data.results) {
            //     renderSong(song);
            // }
        })
}


function renderSong(song) {

    let songContainer = document.createElement('div');
    songContainer.className = "song-container";
    songContainer.id = song.previewUrl;
    
    let songTrackName = document.createElement('div');
    songTrackName.className = 'song-trackName';
    songTrackName.innerHTML = song.trackName;

    let artistName = document.createElement('p');
    artistName.className = 'artist-name';
    artistName.innerHTML = song.artistName;

    let albumTitle = document.createElement('p');
    albumTitle.className = 'album-title';
    albumTitle.innerHTML = song.collectionName;

    let albumImg = document.createElement('img');
    albumImg.className = 'album-image';
    albumImg.src = song.artworkUrl100;


    let releaseDate = document.createElement('p');
    releaseDate.className = 'release-date';
    let newDate = new Date(song.releaseDate)
    releaseDate.innerHTML = "Released: "+newDate.toLocaleDateString();


    songContainer.appendChild(albumImg);
    songContainer.appendChild(songTrackName);
    songContainer.appendChild(albumTitle);
    songContainer.appendChild(artistName);
    songContainer.appendChild(releaseDate);


    resultContainer.appendChild(songContainer);


}