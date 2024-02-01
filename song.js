class Song {
  constructor(cover, title, artist, link) {
    this.cover = cover; // Link to an image of the album cover
    this.title = title; // Title of the song
    this.artist = artist; // The artist
    this.link = link; // Spotify play link for the song
  }

  songEquals(song) {
    return this.cover === song.cover && this.title === song.title && this.artist === song.artist && this.link === song.link;
  }
}