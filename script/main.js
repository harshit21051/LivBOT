// import functional response module
import * as functional from "./responseList/functional.js";
import * as music from "./responseList/music.js";

// html elements
var messageBox = document.getElementById("messageInput");
var chatContent = document.getElementById("chatContent");
var sendBtn = document.getElementById("sendBtn");
var clearBtn = document.getElementById("clearBtn");

// voice unmuted initially
let isMuted = false;

// disable previous speeches
window.speechSynthesis.cancel();

// Text-to-speech function
function speak(text) {
    if (!isMuted) {
        // Remove emojis, dashes, and commas from the text
        const regex = /[\uD800-\uDFFF].|[\u200D\uFE0F]|\p{Emoji_Presentation}|\p{Emoji}\uFE0F|[-,]/gu;
        const filteredText = text.replace(regex, "");

        // Use text-to-speech functionality here
        // This can vary depending on the platform or library you are using
        // Here's an example using the Web Speech API
        if ("speechSynthesis" in window) {
            var msg = new SpeechSynthesisUtterance(filteredText);
            var voices = window.speechSynthesis.getVoices();
            // use index 2 or 4 only for female voice
            msg.voice = voices[4];
            window.speechSynthesis.speak(msg);
        }
    }
}

// when user sends a message
function getRequest() {
    // Get the message text from the input field
    var message = messageBox.value;

    // Do not proceed if the message is empty or only contains whitespace
    if (message.trim() === "") return;

    // Create a new message element
    var request = document.createElement("div");
    request.className = "msg request";
    request.textContent = message;

    // Append the new message to the content area
    chatContent.appendChild(request);

    // Clear the input field
    messageBox.value = "";

    // go to bottom by default
    chatContent.scrollTop = chatContent.scrollHeight;

    // respond after 700 ms
    setTimeout(() => {
        giveResponse(message);
    }, 700);
}

// Function to handle key press
function handleKeyPress(event) {
    // Function to handle enter key press event for message to send
    if (event.key === 'Enter') {
        event.preventDefault();
        getRequest();
    }

    // Function to respond again using Ctrl + A
    else if (event.key === 'a' && event.ctrlKey) {
        event.preventDefault();
        giveResponse('again');
    }

    // Function to mute voice using Ctrl + Q
    else if (event.key === 'q' && event.ctrlKey) {
        event.preventDefault();
        giveResponse('mute');
    }

    // Function to clear messages using Ctrl + X
    else if (event.key === 'x' && event.ctrlKey) {
        event.preventDefault();
        giveResponse('cls');
    }

    // Check if music mode is enabled
    else if (music.musicMode) {
        // Function to play music using Ctrl + P
        if (event.key === 'p' && event.ctrlKey) {
            event.preventDefault();
            giveResponse('start');
        }

        // Function to pause music using Ctrl + S
        else if (event.key === 's' && event.ctrlKey) {
            event.preventDefault();
            giveResponse('pause');
        }

        // Function to stop music using Ctrl + O
        else if (event.key === 'o' && event.ctrlKey) {
            event.preventDefault();
            giveResponse('stop');
        }

        // Function to play next music using Ctrl + M
        else if (event.key === 'm' && event.ctrlKey) {
            event.preventDefault();
            giveResponse('next');
        }

        // Function to play previous song using Ctrl + R
        else if (event.key === 'r' && event.ctrlKey) {
            event.preventDefault();
            giveResponse('previous');
        }

        // Function to skip forward in music using Ctrl + F
        else if (event.key === 'f' && event.ctrlKey) {
            event.preventDefault();
            giveResponse('forward');
        }

        // Function to skip backward in music using Ctrl + B
        else if (event.key === 'b' && event.ctrlKey) {
            event.preventDefault();
            giveResponse('backward');
        }
    }
}

// Attach the event listener to the input field
document.addEventListener("keydown", handleKeyPress);

// Attach the event listener to the send button
sendBtn.addEventListener("click", getRequest);

// give response to user
function giveResponse(message) {
    // Create a new message element
    var responseBox = document.createElement("div");
    responseBox.className = "msg response";

    // Remove certain characters from the user's input
    const filter = message.toLowerCase().replace(/[?!,]/g, '');

    // clear the screen
    if (filter.includes("cls") || filter.includes("clearscreen"))
        return chatContent.innerHTML = '';

    // ignore user message
    else if (filter.includes("not respond") || filter.includes("okay") || filter.includes("done"))
        return;

    // again respond to prev request or get the last request
    if (filter === "again" || filter === "last") {
        const requestItems = document.querySelectorAll('.request');
        let lastNonFilterItem = null;
    
        // Loop through the request items in reverse order
        for (let i = requestItems.length - 1; i >= 0; i--) {
            const requestItem = requestItems[i];
            const requestContent = requestItem.textContent;
    
            if ((filter === "again" && !requestContent.includes('again')) ||
                (filter === "last" && !/last/.test(requestContent))) {
                lastNonFilterItem = requestItem;
                break;
            }
        }
    
        if (lastNonFilterItem) {
            const lastNonFilterContent = lastNonFilterItem.textContent;
            if (filter === "again") {

                // check if last request is mute
                if (lastNonFilterContent == "mute") {
                    isMuted = !isMuted;
                    if (isMuted) {
                        // Stop the speech if it's currently speaking
                        if ("speechSynthesis" in window) window.speechSynthesis.cancel();
                        responseBox.innerHTML += 'Voice muted';
                    }
                    else responseBox.innerHTML += 'Voice unmuted';
                }

                // else go to next .js file
                else functional.responseList(lastNonFilterContent, responseBox);
            }
            else responseBox.innerHTML += `${lastNonFilterContent}<br>`;
        }
        else responseBox.innerHTML += 'No previous requests found.<br>';
    }

    // mute/unmute voice
    else if (filter == "mute") {
        isMuted = !isMuted;
        if (isMuted) {
            // Stop the speech if it's currently speaking
            if ("speechSynthesis" in window) window.speechSynthesis.cancel();
            responseBox.innerHTML += 'Voice muted';
        }
        else responseBox.innerHTML += 'Voice unmuted';
    }

    // else go to response list
    else functional.responseList(filter, responseBox);
    
    // respond after 700 ms
    setTimeout(() => {
        speak(responseBox.innerHTML);
    }, 700);
    
    // Append the new message to the content area
    chatContent.appendChild(responseBox);
    
    // Go to the bottom by default
    chatContent.scrollTop = chatContent.scrollHeight;
}

// Attach the event listener to the clear button
clearBtn.addEventListener("click", function() {
    giveResponse('cls');
});