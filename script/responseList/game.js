// import convert module
import * as convert from './convert.js';

let rockGameOn = false;   // initially rock game is switched off
const rockGameOnOptions = ['rock', 'paper', 'scissors'];

export function responseList(filter, responseBox) {
    // die rolling game
    if (/roll|die/.test(filter)) {
        const min = 1;
        const max = 6;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        if (randomNumber == 6) responseBox.innerHTML += ' Congrats! ';
        responseBox.innerHTML += `You got a ${randomNumber}.`;
        if (randomNumber != 6) responseBox.innerHTML += `<br><br>Better luck next time!`;
    }

    // coin tossing game
    else if (/coin|toss/.test(filter)) {
        const coinSides = ['Heads', 'Tails'];
        const randomIndex = Math.floor(Math.random() * coinSides.length);
        const result = coinSides[randomIndex];
        if (result == 'Heads') responseBox.innerHTML += 'Congrats! ';
        responseBox.innerHTML += `The coin landed on ${result}.`;
        if (result == 'Tails') responseBox.innerHTML += '<br><br>Better luck next time!';
    }

    // switch on rock paper scissors game
    else if (/play rock/.test(filter)) {
        rockGameOn = true;
        responseBox.innerHTML += `Sure, please choose one among rock, paper or scissors.`;
    }

    // switch off rock paper scissors game
    else if (/exit|quit/.test(filter) && /rock|game/.test(filter)) {
        if (rockGameOn == false)
            return responseBox.innerHTML += `Sorry! I didn't get that.`;
        rockGameOn = false;
        responseBox.innerHTML += `Sure, thanks for playing.`;
    }

    // choose rock paper scisssor
    else if (/rock|paper|scissors/i.test(filter)) {
        // if rockGameOn is not switched on
        if (rockGameOn == false)
            return responseBox.innerHTML += "If you want to play rock paper scissors just type in 'play rock'.";

        // if rockGameOn is switched on
        const randomIndex = Math.floor(Math.random() * rockGameOnOptions.length);
        const aiChoice = rockGameOnOptions[randomIndex];
        const userChoice = filter.toLowerCase();

        let result = '';

        if (userChoice === aiChoice)
            result = "It's a tie 🙃!";
        else if (
            (userChoice === 'rock' && aiChoice === 'scissors') ||
            (userChoice === 'paper' && aiChoice === 'rock') ||
            (userChoice === 'scissors' && aiChoice === 'paper')
        )
            result = `You win 😊! ${userChoice.charAt(0).toUpperCase() + userChoice.slice(1)} beats ${aiChoice}.`;
        else
            result = `You lose 😂! ${aiChoice.charAt(0).toUpperCase() + aiChoice.slice(1)} beats ${userChoice}.`;

        responseBox.innerHTML += `You chose ${userChoice}. I chose ${aiChoice}.<br><br>${result}`;
    }

    // display which games can be played here
    else if (/play|game/.test(filter)) {
        responseBox.innerHTML += "Here are some game I can play with you:<br><br>";
        responseBox.innerHTML += "- Play rock paper scissors<br><br>";
        responseBox.innerHTML += "- Roll a die<br><br>";
        responseBox.innerHTML += "- Toss a coin";
    }

    else convert.responseList(filter, responseBox);
}