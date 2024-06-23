// import data and game module
import * as data from '../data.js';
import * as game from './game.js';

export let musicMode = false;
let currentSongIndex = 0; // Track the current index of the song in the array

// Create an audio element
let audio = new Audio(data.songs[currentSongIndex]);

// Function to play the current song
function playMusic() {
    audio.play();
}

// Function to pause the currently playing music
function pauseMusic() {
    audio.pause();
}

// Function to stop the currently playing music
function stopMusic() {
    audio.pause();
    audio.currentTime = 0;
}

// Function to play the next song
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % data.songs.length; // Increment the index cyclically
    audio.src = data.songs[currentSongIndex]; // Update the audio source with the next song
    playMusic();
}

// Function to play the previous song
function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + data.songs.length) % data.songs.length; // Decrement the index cyclically
    audio.src = data.songs[currentSongIndex]; // Update the audio source with the previous song
    playMusic();
}

// Function to skip forward by 10 seconds
function skipForward() {
    audio.currentTime += 10;
}

// Function to skip backward by 10 seconds
function skipBackward() {
    audio.currentTime -= 10;
}

// Listen for the "ended" event on the audio element
audio.addEventListener('ended', playNextSong);

export function responseList(filter, responseBox) {
    if (/music/.test(filter)) {
        if (musicMode) {
            musicMode = false;
            stopMusic();
            responseBox.innerHTML += 'Music mode turned off';
        }
        else {
            musicMode = true;
            responseBox.innerHTML += `Music mode turned on.<br><br>Type 'start' to play music.`;
        }
    }

    else if (musicMode) {
        if (/start/.test(filter)) {
            const match = filter.match(/start\s+(\d+)/);
            if (match) {
                currentSongIndex = (parseInt(match[1]) - 1) % data.songs.length;
                audio.src = data.songs[currentSongIndex];
            }
            playMusic();
            const musicName = data.songs[currentSongIndex].split('/').pop().split('.').slice(0, -1).join('.');
            responseBox.innerHTML += `Playing music:<br>${musicName}`;
        }

        else if (/pause/.test(filter)) {
            pauseMusic();
            responseBox.innerHTML += 'Paused music';
        }

        else if (/stop/.test(filter)) {
            stopMusic();
            responseBox.innerHTML += 'Stopped music';
        }

        else if (/next/.test(filter)) {
            playNextSong();
            const musicName = data.songs[currentSongIndex].split('/').pop().split('.').slice(0, -1).join('.');
            responseBox.innerHTML += `Playing music:<br>${musicName}`;
        }

        else if (/prev/.test(filter)) {
            playPreviousSong();
            const musicName = data.songs[currentSongIndex].split('/').pop().split('.').slice(0, -1).join('.');
            responseBox.innerHTML += `Playing music:<br>${musicName}`;
        }

        else if (/forward/.test(filter)) {
            skipForward();
            responseBox.innerHTML += 'Skipped forward by 10 seconds';
        }

        else if (/backward/.test(filter)) {
            skipBackward();
            responseBox.innerHTML += 'Skipped backward by 10 seconds';
        }

        else if (/list/.test(filter)) {
            responseBox.innerHTML += `List of loaded songs:<br><br>`;
            for (let i = 0; i < data.songs.length; i++) {
                const song = data.songs[i].split('/').pop().split('.').slice(0, -1).join('.');;
                responseBox.innerHTML += `${i + 1}. ${song}<br><br>`;
            }
        }

        else game.responseList(filter, responseBox);
    }

    else game.responseList(filter, responseBox);
}