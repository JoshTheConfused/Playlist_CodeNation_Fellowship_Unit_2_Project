let searchButton = document.getElementById("search-button");
let searchTitle = document.getElementById("title-search");
let searchArtist = document.getElementById("artist-search");
let searchAlbum = document.getElementById("album-search");
let searchLink = document.getElementById("link-search");
let playlist = []; // Later, make this load playlist from spotify

searchButton.addEventListener("click", function () => {
  let searchType = "";
  if (searchTitle.value.length > 0) {
    searchType = "title";
  }
  else if (searchArtist.value.length > 0) {
    searchType = "artist";
  }
  else if (searchAlbum.value.length > 0) {
    searchType = "album";
  }
  else if (searchLink.value.length > 0) {
    searchType = "link";
  }
  else {
    return;
  }

  querySpotify(searchType);
});

function querySpotify(searchType) {
  if (searchType === "link") {
    // Look for the exact song link
  }
  else {
    // Use searchType as the filter for the search query
  }
}

function showPlaylist() { // Fill a table with all of the data from the playlist and display it
  let playlistHTMLTable = document.createElement("table");
  let tableRow = document.createElement("tr");

  tableRow.appendChild(makeHeading("Album Cover"));
  tableRow.appendChild(makeHeading("Title"));
  tableRow.appendChild(makeHeading("Artist"));
  tableRow.appendChild(makeHeading("Duration"));
  tableRow.appendChild(makeHeading("Date Added"));
  tableRow.appendChild(makeHeading("Link (Spotify)"));
  playlistHTMLTable.appendChild(tableRow);

  for (let i = 0; i < playlist.length; i++) {
    tableRow = document.createElement("tr");
    tableRow.appendChild(`<img src="${playlist[i].cover}" alt="Album Cover">`);
    tableRow.appendChild(makeCell(playlist[i].title));
    tableRow.appendChild(makeCell(playlist[i].artist));
    tableRow.appendChild(makeCell(playlist[i].duration));
    tableRow.appendChild(makeCell(playlist[i].dateAdded));
    tableRow.appendChild(makeCell(playlist[i].link));
    playlistHTMLTable.appendChild(tableRow);
  }
  
  let songList = document.getElementById("song-list");
  songList.removeChild(songList.firstChild);
  songList.appendChild(playlistHTMLTable);
}

function makeHeading(title) {
  let cell = document.createElement("th");
  cell.innerHTML = title;
  return cell;
}

function makeCell(title) {
  let cell = document.createElement("td");
  cell.innerHTML = title;
  return cell;
}