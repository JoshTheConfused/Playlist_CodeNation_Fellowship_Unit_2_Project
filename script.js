let searchButton = document.getElementById("search-button");
let backButton = document.getElementById("playlist-return");
let searchTitle = document.getElementById("title-search");
let searchArtist = document.getElementById("artist-search");
let searchAlbum = document.getElementById("album-search");

const apiKey = "bebcbbd5039da513cea152937f307d4a"; // Used for all API calls
let token; // One-time use for generating the session
let session; // Used for all API searches

let playlist = []; // Values only placed here manually for testing
let searchResults = []; // Values only placed here manually for testing

document.addEventListener('DOMContentLoaded', function() { // When the page loads, the user is made to log in, creating the necessary session
  const redirectUrl=`http://www.last.fm/api/auth/?api_key=${apiKey}`;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  if (urlParams.has('token')) {
    token = urlParams.get('token');
  }
  else {
    window.location.href = redirectUrl;
  }

  const apiSig = generateApiSig({api_key : apiKey, method : "auth.getSession", token : token});
  const Http = new XMLHttpRequest();
  const AuthUrl=`https://ws.audioscrobbler.com/2.0/?method=auth.getSession&token=${token}&api_key=${apiKey}&api_sig=${apiSig}`;
  Http.open("GET", AuthUrl);
  Http.send();
  
  Http.onreadystatechange = (e) => {
    session = getSessionKey(Http.responseText);
  }
}, false);

displayPlaylist(); // Start by displaying the playlist

backButton.addEventListener("click", function () {
  displayPlaylist();
  searchTitle.value = "";
  searchArtist.value = "";
  searchAlbum.value = "";
});

searchButton.addEventListener("click", function () {
  querySongs();
  showSongList(searchResults);
  addPlusButtons();
  backButton.style.display = "inline";
});

function querySongs() { // TODO: Use last.fm to get results, use coverartarchive.org for album covers
  // TODO: implement other last.fm method calls using session key
  // Links used: https://www.last.fm/api/accounts https://www.last.fm/api/webauth#create_an_authentication_handler https://www.last.fm/api/show/auth.getSession https://www.last.fm/api/rest

  // TODO: unit 2 survey once finished
  
  // Use searchType as the filter for the search query
  // return list of songs
  searchResults = [];
  searchResults.push(new Song("" , searchTitle.value, searchArtist.value, ""));
  searchResults.push(new Song("", searchTitle.value, "Bad cover artist", ""));
  searchResults.push(new Song("", searchTitle.value, "Good cover artist", ""));
  for (let i = 0; i < 10; i++) {
    searchResults.push(new Song("", `${searchAlbum.value} - Track ${i + 1}`, searchArtist.value, ""));
  }
  for (let i = 0; i < 4; i++) {
    searchResults.push(new Song("", `Other song #${i + 1} by ${searchArtist.value}`, searchArtist.value, ""));
  }
}

function getSessionKey(responseText) { // I'm sure there's a better way to do this, but this finds and extracts the session key from the http response
  for (let i = 5; i < responseText.length; i++) {
    if (responseText.substring(i - 5, i) === "<key>") {
      return(responseText.substring(i, i + 32));
    }
  }
  return "THISWILLNOTWORK";
}

function generateApiSig(obj) {
  let bigString = "";
  const secret = "f50177584b8eb5cb42da40cec08ab40f";
  for (const [key, value] of Object.entries(obj)) {
    bigString += `${key}${value}`;
  }
  bigString += secret;
  signature = md5(bigString);
  return signature;
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