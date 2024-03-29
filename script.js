let searchButton = document.getElementById("search-button");
let backButton = document.getElementById("playlist-return");
let searchTitle = document.getElementById("title-search");
let searchArtist = document.getElementById("artist-search");
let searchAlbum = document.getElementById("album-search");

const apiKey = "bebcbbd5039da513cea152937f307d4a"; // Used for all API calls

let playlist = []; // Values only placed here manually for testing
let searchResults = []; // Values only placed here manually for testing

displayPlaylist(); // Start by displaying the playlist

backButton.addEventListener("click", function () {
  displayPlaylist();
  searchTitle.value = "";
  searchArtist.value = "";
  searchAlbum.value = "";
});

searchButton.addEventListener("click", function () {
  querySongs(searchTitle.value, searchArtist.value, searchAlbum.value);
  backButton.style.display = "inline";
});

function querySongs(title, artist, album) {
  searchResults = [];
  
  let searchUrl
  if (title.length > 0) {
    if (artist.length > 0) {
      searchUrl=`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${title}&artist=${artist}&api_key=${apiKey}&format=json`;
    }
    else {
      searchUrl=`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${title}&api_key=${apiKey}&format=json`;
    }
  }
  else if (artist.length > 0) {
    if (album.length > 0) {
      searchUrl = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${artist}&album=${album}&format=json`;
    }
    else {
      searchUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist}&api_key=${apiKey}&format=json`;
    }
  }
  else if (album.length > 0) {
    searchUrl = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${album}&api_key=${apiKey}&format=json`;
  }
  else {
    searchResults.push(new Song("https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Red_x.svg/600px-Red_x.svg.png", "Try Searching Something", "You have to put something in the search bar", ""));
    showSongList(searchResults);
    return;
  }
  
  const Http = new XMLHttpRequest();
  Http.open("GET", searchUrl);
  Http.send();

  Http.onreadystatechange = (e) => {
    let results;
    let mbid;
    if (title.length > 0) {
      results = JSON.parse(Http.responseText).results.trackmatches.track;
    }
    else if (artist.length > 0) {
      if (album.length > 0) {
        results = JSON.parse(Http.responseText).album.tracks.track;
      }
      else {
        results = JSON.parse(Http.responseText).toptracks.track;
      }
    }
    else if (album.length > 0) {
      results = JSON.parse(Http.responseText).results.albummatches.album[0];
      querySongs("", results.artist, results.name); // If only the album name is given, find track names using artist name from the top album and album.getinfo
      mbid = results.mbid;
      return;
    }
    
    for (let i = 0 ; i < Math.min(30, results.length) ; i ++) {
      if (album.length === 0) {
        mbid = results[i].mbid;
      }
      
      let resultTitle = results[i].name;
      
      let resultArtist;
      if (title.length > 0) {
        resultArtist = results[i].artist;
      }
      else if (artist.length > 0) {
        resultArtist = results[i].artist.name;
      }
      
      let resultLink = results[i].url;
      
      searchResults.push(new Song(mbid, resultTitle, resultArtist, resultLink)); // Stores mbid in img slot to later be processed into final image link
      
    }
    loadAlbumCovers();
    showSongList(searchResults);
    addPlusButtons();
  }
}

function loadAlbumCovers() {
  for (let i = 0 ; i < searchResults.length ; i++) {
    const url = `https://coverartarchive.org/release/${searchResults[i].cover}`;
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
      console.log(i + ": response: " + Http.responseText);
      if (Http.status == 400 || Http.status == 404) {
        searchResults[i].cover = "https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg";
      }
      else { // This is terrible and I hate it, but technically it does work
        let id;
        for (let k = 4 ; k < Http.responseText.length ; k++) {
          if (Http.responseText.substring(k - 4, k) == "\"id\"") {
            let j = k + 1;
            while (!isNaN(Http.responseText.charAt(j))) {
              j++;
            }
            id = Http.responseText.substring(k + 1, j);
            break;
          }
        }
        searchResults[i].cover = `https://ia601604.us.archive.org/28/items/mbid-${searchResults[i].cover}/mbid-${searchResults[i].cover}-${id}_thumb500.jpg`;
      }
      showSongList(searchResults);
      addPlusButtons();
    }
  }
}

function playlistContains(song) {
  for (let i = 0; i < playlist.length; i++) {
    if (playlist[i].songEquals(song)) {
      return true;
    }
  }
  return false
}

function addPlusButtons() { // Puts a button next to every search result to add it to the playlist
  for (let i = 0; i < searchResults.length; i++) {
    let button = document.getElementById("song-list").children[0].rows[i].insertCell().appendChild(document.createElement("input"));
    button.type = "button";
    button.value = "+";
    button.classList.add("plus-minus-buttons");
    let song = searchResults[i];
    if (!playlistContains(song)) {
      button.addEventListener("click", function () {
        if (!playlistContains(song)) {
          playlist.push(song);
          button.value = "✓";
        }
      });
    }
    else {
      button.value = "✓";
    }
  }
}

function addMinusButtons() { // Puts a button next to every song in the playlist to allow the user to remove it
  let rows = document.getElementById("song-list").children[0].rows;
  for (let i = 0; i < rows.length; i++) {
    let button = rows[i].insertCell().appendChild(document.createElement("input"));
    button.type = "button";
    button.value = "–";
    button.classList.add("plus-minus-buttons");
    button.addEventListener("click", function () {
      playlist.splice(i, 1);
      displayPlaylist();
    });
  }
}

function showSongList(songList) { // Fill a table with all of the data from the playlist and display it
  let tableHeaders = ["Album Cover", "Title", "Artist", "Link", ""];
  let table = document.createElement("table");
  
  let thead = document.createElement('thead');
  table.appendChild(thead);
  for (let i = 0; i < tableHeaders.length; i++) {
    thead.appendChild(document.createElement("th")).
      appendChild(document.createTextNode(tableHeaders[i]));
  }

  for (let i = 0; i < songList.length; i++) {
    table.insertRow();
    let row = table.rows[i];
    row.appendChild(document.createElement("td")).appendChild(document.createElement("img"));
    row.cells[0].classList.add("album-cover-cell");
    row.appendChild(document.createElement("td")).appendChild(document.createTextNode(songList[i].title));
    row.appendChild(document.createElement("td")).appendChild(document.createTextNode(songList[i].artist));
    row.appendChild(document.createElement("td")).appendChild(document.createElement("a"));

    let imgCell = row.cells[0].children[0];
    imgCell.src = songList[i].cover;
    imgCell.alt = "Album Cover";
    imgCell.classList.add("album-cover-images");
    
    let linkCell = row.cells[3].children[0];
    linkCell.href = songList[i].link;
    linkCell.target = "_blank";
    linkCell.innerHTML = "LINK";
  }
  
  let HTMLParent = document.getElementById("song-list");
  for (let i = HTMLParent.children.length - 1; i >= 0; i--) {
    HTMLParent.removeChild(HTMLParent.children[i])
  }
  HTMLParent.appendChild(table);
}

function displayPlaylist() { // All the function calls to display the playlist
  showSongList(playlist);
  addMinusButtons();
  backButton.style.display = "none";
}