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
  querySongs();
  backButton.style.display = "inline";
});

function querySongs() {
  searchResults = [];
  
  let searchUrl
  if (searchTitle.value.length > 0) {
    if (searchArtist.value.length > 0) {
      searchUrl=`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchTitle.value}&artist=${searchArtist.value}&api_key=${apiKey}&format=json`;
    }
    else {
      searchUrl=`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchTitle.value}&api_key=${apiKey}&format=json`;
    }
  }
  else if (searchArtist.value.length > 0) {
    searchUrl = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${searchArtist.value}&api_key=${apiKey}&format=json`;
  }
  else if (searchAlbum.value.length > 0) {
    searchUrl = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchAlbum.value}&api_key=${apiKey}&format=json`;
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
    if (searchTitle.value.length > 0) {
      results = JSON.parse(Http.responseText).results.trackmatches.track;
      console.log(results);
    }
    else if (searchArtist.value.length > 0) {
      results = JSON.parse(Http.responseText).toptracks.track;
      console.log(results);
    }

    for (let i = 0 ; i < Math.min(30, results.length) ; i ++) {
      let img = results[i].image[1]; // TODO: Actually get the album cover out
      console.log("img #" + i + ": " + img);
      
      let title = results[i].name;
      console.log("title #" + i + ": " + title);
      
      let artist;
      if (searchTitle.value.length > 0) {
        artist = results[i].artist;
      }
      else if (searchArtist.value.length > 0) {
        artist = results[i].artist.name;
      }
      console.log("artist #" + i + ": " + artist);
      
      let link = results[i].url;
      console.log("link #" + i + ": " + link);
      
      searchResults.push(new Song(img, title, artist, link));
    }
    showSongList(searchResults);
    addPlusButtons();
  }

  // TODO: unit 2 survey once finished
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