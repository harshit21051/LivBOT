// import data and basic module
import * as data from '../data.js';
import * as basic from './basic.js';

// html elements
var chatContent = document.getElementById("chatContent");
var screen = document.getElementById("screen");
var body = document.body;

// dark mode initially off
let dark = false;

// toggle between dark and light modes
function changeMode() {
    let chatBg, bodyBg, shadow;
    // if currently at light mode enable dark mode
    if (dark == false) {
        chatBg = 'black';
        bodyBg = '-webkit-radial-gradient(black 40%, rgb(0, 53, 97))';
        shadow = '0px 0px 50px rgb(40, 40, 40)';
    }
    // else disable dark mode
    else {
        chatBg = 'white';
        bodyBg = '-webkit-radial-gradient(rgb(0, 183, 255) 40%, rgb(0, 53, 97))';
        shadow = '0px 0px 50px rgb(206, 233, 255)';
    }
    chatContent.style.background = chatBg;
    body.style.background = bodyBg;

    // Set initial box-shadow
    screen.style.boxShadow = shadow;

    // Add event listener for hover
    screen.addEventListener('mouseenter', () => {
        screen.style.boxShadow = '0px 0px 150px rgb(0, 47, 255)';
    });

    // Add event listener for mouse leave
    screen.addEventListener('mouseleave', () => {
        screen.style.boxShadow = shadow;
    });
}

// search the desired response in the list
export function responseList(filter, responseBox) {
    // echo something
    if (/echo/.test(filter)) {
        const echoText = filter.replace(/echo/, "").trim();
        if (echoText) responseBox.innerHTML += `${echoText}`;
        else responseBox.innerHTML += "Please provide text to echo.";
    }

    // dictionary
    else if (/meaning/.test(filter)) {
        let word = '';

        if (/meaning of/i.test(filter))
            word = filter.match(/meaning of (.+)/i)[1];

        else if (/(\w+) meaning/i.test(filter))
            word = filter.match(/(\w+) meaning/i)[1];
    
        if (word !== '') {
            const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const meanings = data[0].meanings;
    
                    let meaningsText = `Meanings of ${word}:<br><br>`;
    
                    meanings.forEach((meaning) => {
                        const definitions = meaning.definitions;
                        definitions.forEach((definition) => {
                            meaningsText += `-> ${definition.definition}<br><br>`;
                        });
                    });
    
                    responseBox.innerHTML = meaningsText;
                })
                .catch(error => {
                    responseBox.innerHTML = `Please enter a valid word!`;
                });
        }

        else responseBox.innerHTML = `Please enter a word to get the meaning!`;
    }

    // get help
    else if (/help/.test(filter) || (/can/.test(filter) && /do/.test(filter))) {
        // general help
        if ((/what|how/.test(filter) && /can/.test(filter)) || /list/.test(filter)) {
            responseBox.innerHTML = "Here are some things I can do:<br><br>";
            for (let i = 0; i < data.features.length; i++)
                responseBox.innerHTML += `${i + 1}. ${data.features[i]}<br><br>`;
            responseBox.innerHTML += "Feel free to ask anything and I'll do my best to assist you!";
        }

        // math help
        else if (/math/.test(filter)) {
            responseBox.innerHTML = "Here are some math operations that I can do:<br><br>";
            let i = 1;
            for (const command in data.mathHelp) {
                responseBox.innerHTML += `${i}. ${command}:<br>${data.mathHelp[command]}<br><br>`;
                i++;
            }
            responseBox.innerHTML += "Feel free to ask anything, and I'll do my best to assist you!";
        }

        // music help
        else if (/music/.test(filter)) {
            responseBox.innerHTML = "Here are some music operations that I can do:<br><br>";
            let i = 1;
            for (const command in data.musicHelp) {
                responseBox.innerHTML += `${i}. ${command}:<br>${data.musicHelp[command]}<br><br>`;
                i++;
            }
            responseBox.innerHTML += "Feel free to ask anything, and I'll do my best to assist you!";
        }

        else responseBox.innerHTML = "Sure! Ask what you want.";
    }

    // asks for list of commands
    else if (/command|cmd/.test(filter)) {
        responseBox.innerHTML = "Here are some commands you can use:<br><br>";
        for (const command in data.commands) {
            responseBox.innerHTML += `${command}:<br>${data.commands[command]}<br><br>`;
        }
        responseBox.innerHTML += "Use this command palette to interact with me!";
    }

    // get emojis
    else if (/emoji/.test(filter)) {
        responseBox.innerHTML = "Here are some emojis you can use:<br><br>";
        for (let i = 0; i < data.emojis.length; i++)
            responseBox.innerHTML += `${data.emojis[i]}<br><br>`;
        responseBox.innerHTML += "Feel free to use these emojis in your messages!";
    }

    // search google for images
    else if (/search images for (.+)/.test(filter)) {
        const matches = filter.match(/search images for (.+)/);
        const query = matches[1].trim();

        if (query !== '') {
            const siteUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
            window.open(siteUrl, '_blank');
            responseBox.textContent = 'Searching Google Images.';
        }

        else responseBox.textContent = 'Please provide a query.';
    }

    // generate images
    else if (/photo/.test(filter) || /image/.test(filter)) {
        const query = filter.toLowerCase().replace(/photo|of/g, '').trim();
        const clientId = 'LUjvPWMHw0irAHbA7vt_zwJeJAZr6vSxNwj5gRZadDc';
        const apiUrl = `https://api.unsplash.com/photos/random?query=${query}&client_id=${clientId}`;

        // Create the <div> element and <img> tag
        const imageDiv = document.createElement('div');
        const imageElement = document.createElement('img');
        imageDiv.appendChild(imageElement);
        responseBox.innerHTML += `See the image below<br><br>`;
        responseBox.appendChild(imageDiv);

        // Fetch the image
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const imageUrl = data.urls.regular;
                imageElement.src = imageUrl; // Set the image source
            })
            .catch(error => {
                console.error(error);
                responseBox.innerHTML += 'Failed to fetch image';
            });
    }

    // turn off dark mode
    else if (/light|exit dark/.test(filter)) {
        if (dark == false)
            return responseBox.innerHTML += "I'm already in light mode.";
        responseBox.innerHTML += "Dark mode turned off.";
        changeMode();
        dark = false;
    }

    // turn on dark mode
    else if (/dark/.test(filter)) {
        if (dark == true)
            return responseBox.innerHTML += "I'm already in dark mode.";
        responseBox.innerHTML += "Dark mode turned on.";
        changeMode();
        dark = true;
    }

    // open external links
    else if (/open(?:\s+([A-Za-z0-9]+))?$/.test(filter)) {
        const matches = filter.match(/^open(?:\s+([A-Za-z0-9]+))?$/);
        let siteName = matches[1] || ''; // If no site name is provided, set it as an empty string

        // check for abbreviations
        if (siteName == 'yt') siteName = 'youtube';
        else if (siteName == 'fb') siteName = 'facebook';
        else if (siteName == 'ig' || siteName == 'insta') siteName = 'instagram';
        else if (siteName == 'ht') siteName = 'hindustantimes';

        if (siteName !== '') {
            const siteUrl = `https://www.${siteName}.com`;
            window.open(siteUrl, '_blank');
            responseBox.textContent = `Opening ${siteName} in a new window.`;
        }

        else responseBox.textContent = 'Please provide a site name to open.';
    }

    // search for anything
    else if (/search for (.+)/.test(filter)) {
        const matches = filter.match(/search for (.+)/);
        const query = matches[1].trim();

        if (query !== '') {
            const siteUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.open(siteUrl, '_blank');
            responseBox.textContent = 'Searching on Google.';
        }
        else responseBox.textContent = 'Please provide a query.';
    }

    else basic.responseList(filter, responseBox);
}