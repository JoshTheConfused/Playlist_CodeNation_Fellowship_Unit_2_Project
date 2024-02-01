let searchButton = document.getElementById("search-button");
let backButton = document.getElementById("playlist-return");
let searchTitle = document.getElementById("title-search");
let searchArtist = document.getElementById("artist-search");
let searchAlbum = document.getElementById("album-search");

/** Every playlist element should be an object with the following fields:
1. cover -- a link to a picture of the cover
2. title -- the song title
3. artist -- the artist of the song
4. link -- the link to the song on spotify
*/
let playlist = [
  new Song("https://www.w3schools.com/images/colorpicker2000.png", "Mr.Tambourine Man", "Bob Dylan", "https://classroom.google.com/u/2/h")
];

displayPlaylist(); // Start by displaying the playlist
backButton.style.display = "none"; // Start with this button hidden

backButton.addEventListener("click", function () {
  displayPlaylist();
});

searchButton.addEventListener("click", function () {
  // let searchType = "";
  // if (searchTitle.value.length > 0) {
  //   searchType = "title";
  // }
  // else if (searchArtist.value.length > 0) {
  //   searchType = "artist";
  // }
  // else if (searchAlbum.value.length > 0) {
  //   searchType = "album";
  // }
  // else {
  //   return;
  // }
  let searchResults;
  searchResults = [
    new Song("https://www.w3schools.com/images/colorpicker2000.png", "Mr.Tambourine Man", "Bob Dylan", "https://classroom.google.com/u/2/h"),
    new Song("https://www.w3schools.com/images/colorpicker2000.png", "Mr.Tambourine Man", "Bob Dylan", "https://classroom.google.com/u/2/h"),
    new Song("https://www.w3schools.com/images/colorpicker2000.png", "Mr.Tambourine Man", "Bob Dylan", "https://classroom.google.com/u/2/h")
  ]; // For testing only
  // searchResults = querySpotify(searchType);
  showSongList(searchResults);
  addPlusButtons();
  backButton.style.display = "block";
});

// function querySpotify(searchType) {
//   // Use searchType as the filter for the search query
//   // return list of songs
// }

function playlistContains(song) {
  for (let i = 0; i < playlist.length; i++) {
    if (playlist[i].songEquals(song)) {
      return true;
    }
  }
  return false
}

function addPlusButtons() { // Puts a button next to every search result to add it to the playlist
  let rows = document.getElementById("song-list").children[0].rows;
  for (let i = 0; i < rows.length; i++) {
    let button = rows[i].insertCell().appendChild(document.createElement("input"));
    button.type = "button";
    button.value = "+";
    let song = new Song(rows[i].cells[0].children[0].src, rows[i].cells[1].innerHTML, rows[i].cells[2].innerHTML, rows[i].cells[3].children[0].href); // Creates a song object with the data in the HTML table
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
    button.value = "-";
    button.addEventListener("click", function () {
      playlist.splice(i, 1);
      displayPlaylist();
    });
  }
}

function showSongList(songList) { // Fill a table with all of the data from the playlist and display it
  let tableHeaders = ["Album Cover", "Title", "Artist", "Link"];
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
    row.appendChild(document.createElement("td")).appendChild(document.createTextNode(songList[i].title));
    row.appendChild(document.createElement("td")).appendChild(document.createTextNode(songList[i].artist));
    row.appendChild(document.createElement("td")).appendChild(document.createElement("a"));

    let imgCell = row.cells[0].children[0];
    imgCell.src = songList[i].cover;
    imgCell.alt = "Album Cover";
    
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