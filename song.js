class Song {
  constructor(cover, title, artist, link) {
    this.cover = cover;
    this.title = title;
    this.artist = artist;
    this.link = link;
  }

  songEquals(song) {
    return this.cover === song.cover && this.title === song.title && this.artist === song.artist && this.link === song.link;
  }
}