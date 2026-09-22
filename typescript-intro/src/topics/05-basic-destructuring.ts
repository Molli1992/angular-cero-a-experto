/*
interface Details {
  author: string;
  year: number;
}

interface AudioPlayer {
  audioVolume: number;
  songDuration: number;
  song: string;
  details: Details;
}

const audioPlayer: AudioPlayer = {
  audioVolume: 90,
  songDuration: 36,
  song: "Mess",
  details: { author: "Ed Sheeran", year: 2015 },
};

const song = "New Song";

const { song: anotherSong, songDuration: duration, details } = audioPlayer;
const { author } = details;

console.log(`Song: ${song}`);
console.log(`Anoher Song: ${anotherSong}`);
console.log(`Duration: ${duration}`);
console.log(`Author: ${author}`);
*/

const [, , trunks = "Not found"]: string[] = ["Goku", "Vegeta"];

console.log(`Character 3: ${trunks}`);
