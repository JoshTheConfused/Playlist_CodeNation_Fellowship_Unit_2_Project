let searchButton = document.getElementById("search-button");
let searchTitle = document.getElementById("title-search");
let searchArtist = document.getElementById("artist-search");
let searchAlbum = document.getElementById("album-search");
let searchLink = document.getElementById("link-search");
let playlist = [
  {
    cover: "https://www.w3schools.com/images/colorpicker2000.png",
    title: "Mr.Tambourine Man",
    artist: "Bob Dylan",
    link: "https://classroom.google.com/u/2/h",
  }
]; // Later, make this load playlist from spotify

showPlaylist(); // Start by displaying the playlist

// searchButton.addEventListener("click", function () => {
//   let searchType = "";
//   if (searchTitle.value.length > 0) {
//     searchType = "title";
//   }
//   else if (searchArtist.value.length > 0) {
//     searchType = "artist";
//   }
//   else if (searchAlbum.value.length > 0) {
//     searchType = "album";
//   }
//   else if (searchLink.value.length > 0) {
//     searchType = "link";
//   }
//   else {
//     return;
//   }

//   querySpotify(searchType);
// });

// function querySpotify(searchType) {
//   if (searchType === "link") {
//     // Look for the exact song link
//   }
//   else {
//     // Use searchType as the filter for the search query
//   }
// }

function showPlaylist() { // Fill a table with all of the data from the playlist and display it
  let tableHeaders = ["Album Cover", "Title", "Artist", "Link"];
  let table = document.createElement("table");
  
  let thead = document.createElement('thead');
  table.appendChild(thead);
  for (let i = 0; i < tableHeaders.length; i++) {
    thead.appendChild(document.createElement("th")).
      appendChild(document.createTextNode(tableHeaders[i]));
  }

  for (let i = 0; i < playlist.length; i++) {
    table.insertRow();
    let row = table.rows[i];
    row.appendChild(document.createElement("td")).appendChild(document.createElement("img"));
    row.appendChild(document.createElement("td")).appendChild(document.createTextNode(playlist[i].title));
    row.appendChild(document.createElement("td")).appendChild(document.createTextNode(playlist[i].artist));
    row.appendChild(document.createElement("td")).appendChild(document.createElement("a"));

    let imgCell = row.cells[0].children[0];
    imgCell.src = playlist[i].cover;
    imgCell.alt = "Album Cover";
    
    let linkCell = row.cells[3].children[0];
    linkCell.href = playlist[i].link;
    linkCell.target = "_blank";
    linkCell.innerHTML = "LINK";
  }
  
  let songList = document.getElementById("song-list");
  songList.appendChild(table);
}