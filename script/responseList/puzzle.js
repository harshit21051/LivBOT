// import data and game module
import * as data from '../data.js';
import * as music from './music.js';

let idx = -1;

function generateSpinKeyframes(axis) {
    const keyframes = `
        @keyframes spin${axis} {
            0% { transform: perspective(2000px) rotate${axis}(0deg); }
            100% { transform: perspective(2000px) rotate${axis}(-360deg); }
        }
    `;
    return keyframes;
}

const enlargeKeyframes = `
    @keyframes enlarge {
        0% { transform: scale3D(1, 1, 1); }
        33% { transform: scale3D(1.1, 1.1, 1.1); }
        67% { transform: scale3D(0.9, 0.9, 0.9); }
        100% { transform: scale3D(1, 1, 1); }
    }
`;

const styleElement = document.createElement('style');
styleElement.textContent = generateSpinKeyframes('X') + generateSpinKeyframes('Y') + generateSpinKeyframes('Z') + enlargeKeyframes;
document.head.appendChild(styleElement);

export function responseList(filter, responseBox) {
    if (/puzzle/.test(filter)) {
        const keys = Object.keys(data.puzzlesWithAns);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        idx = randomKey;
        const puzzle = randomKey;
        responseBox.innerHTML = `Here's a puzzle for you:<br><br>${puzzle}<br>Think you know the answer? Type it in!<br><br>Format of answer should be 'answer {youranswer}'`;
    }

    else if (/answer/.test(filter)) {
        if (idx == -1)
            return responseBox.textContent = "Sorry, I didn't ask for any answer!";
        let correctAns = data.puzzlesWithAns[idx];
        // correct answer
        if (filter.includes(correctAns.toLowerCase().replace(/[.?!,]/g, '')))
            responseBox.textContent = "Correct answer!! \uD83D\uDE42";
        // wrong answer
        else responseBox.textContent = `Wrong! Correct answer is ${correctAns}`;
        idx = -1;
    }

    // some animations as well
    else if (/spin/.test(filter)) {
        const screenElement = document.querySelector('.screen');
        const axis = /x/.test(filter) ? 'X' : /y/.test(filter) ? 'Y' : /z/.test(filter) ? 'Z' : '';
    
        if (axis) {
            screenElement.style.animationName = `spin${axis}`;
            screenElement.style.animationDuration = '1s';
            screenElement.style.animationFillMode = 'both';
            screenElement.classList.add('animated');
    
            screenElement.addEventListener('animationend', () => {
                screenElement.classList.remove('animated');
                screenElement.style.animationName = '';
                screenElement.style.animationDuration = '';
                screenElement.style.animationFillMode = '';
            });
    
            responseBox.innerHTML += `Sure, spinning around ${axis} axis`;
        }
        else responseBox.innerHTML += `Please mention the correct axis like x, y or z as well!`;
    }

    else if (/enlarge|zoom/.test(filter)) {
        const screenElement = document.querySelector('.screen');
    
        screenElement.style.animationName = 'enlarge';
        screenElement.style.animationDuration = '2s';
        screenElement.style.animationFillMode = 'both';
        screenElement.classList.add('animated');
    
        screenElement.addEventListener('animationend', () => {
            screenElement.classList.remove('animated');
            screenElement.style.animationName = '';
            screenElement.style.animationDuration = '';
            screenElement.style.animationFillMode = '';
        });
    
        responseBox.innerHTML += `Sure, enlarging the screen.`;
    }

    else music.responseList(filter, responseBox);
}