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
  {
    cover: "https://www.w3schools.com/images/colorpicker2000.png",
    title: "Mr.Tambourine Man",
    artist: "Bob Dylan",
    link: "https://classroom.google.com/u/2/h",
  }
];

showSongList(playlist); // Start by displaying the playlist
backButton.style.display = "none"; // Start with this button hidden

backButton.addEventListener("click", function () {
  showSongList(playlist);
  backButton.style.display = "none";
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
    {
      cover: "https://www.w3schools.com/images/colorpicker2000.png",
      title: "Mr.Tambourine Man",
      artist: "Bob Dylan",
      link: "https://classroom.google.com/u/2/h",
    },
    {
      cover: "https://www.w3schools.com/images/colorpicker2000.png",
      title: "Mr.Tambourine Man",
      artist: "Bob Dylan",
      link: "https://classroom.google.com/u/2/h",
    },
    {
      cover: "https://www.w3schools.com/images/colorpicker2000.png",
      title: "Mr.Tambourine Man",
      artist: "Bob Dylan",
      link: "https://classroom.google.com/u/2/h",
    }
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

function addPlusButtons() {
  let rows = document.getElementById("song-list").children[0].rows;
  for (let i = 0; i < rows.length; i++) {
      let button = rows[i].insertCell().appendChild(document.createElement("input"));
      button.type = "button";
      button.value = "+";
      button.addEventListener("click", function () {
        if (button.value === "+") {
          let cover = rows[i].cells[0].children[0].src;
          let title = rows[i].cells[1].innerHTML;
          let artist = rows[i].cells[2].innerHTML;
          let link = rows[i].cells[3].children[0].href;
          playlist.push({
            cover: cover,
            title: title,
            artist: artist,
            link: link,
          });
          button.value = "✓";
        }
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