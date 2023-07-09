// import data and gk module
import * as data from '../data.js';
import * as math from './math.js';

// test() function checks whether a given string matches a pattern or not

export function responseList(filter, responseBox) {
    if (/hello/.test(filter))
        responseBox.innerHTML += "Hi there! \uD83D\uDE42";

    else if (/hi/.test(filter) || /hey/.test(filter))
        responseBox.innerHTML += "Hello! \uD83D\uDE42";

    else if (/how are you/.test(filter))
        responseBox.innerHTML += "I'm doing well, thank you! \uD83D\uDE42";

    else if ((/your/.test(filter) && /name/.test(filter)) || (/who/.test(filter) && /are/.test(filter) && /you/.test(filter)))
        responseBox.innerHTML += "Hey, I'm an AI assistant named 'LivBOT'. You can also call me as Chatbot.";

    else if ((/livbot/.test(filter)))
        responseBox.innerHTML += "Welcome to LivBot.<br><br>Go ahead and ask what you want.";

    else if (/what/.test(filter) && /up/.test(filter))
        responseBox.innerHTML += "Yeah I am doing well!";

    else if (/love you/.test(filter))
        responseBox.innerHTML += "Aw, I appreciate your kind words! If I weren't an AI, I would definitely reciprocate your feelings. 💖";

    else if (/thank/.test(filter) && /you/.test(filter))
        responseBox.innerHTML += "You're welcome! I'm here to help.";

    else if (/bye/.test(filter))
        responseBox.innerHTML += "Goodbye👋! Take care and have a great day!";

    else if (/good night|goodnight|gn/.test(filter))
        responseBox.innerHTML += "Goodnight! Take care and have a sweet dreams!";

    else if (/kiss/.test(filter))
        responseBox.innerHTML += "💋";

    else if (/feel/.test(filter)) {
        if (/you/.test(filter))
            responseBox.innerHTML += "Since I am an AI model, I can't feel anything.";

        else if (/i/.test(filter)) {
            if (/sad/.test(filter))
                responseBox.innerHTML += "I'm sorry to hear that you're feeling sad. Is there something specific you'd like to talk about?";

            else if (/happy/.test(filter))
                responseBox.innerHTML += "I'm glad to hear that you're feeling happy! What's making you feel this way?";

            else if (/angry/.test(filter))
                responseBox.innerHTML += "Anger is a natural emotion that can arise from various situations. If you're feeling angry, it can help to take a deep breath and try to understand the cause of your anger.";

            else if (/tired/.test(filter))
                responseBox.innerHTML += "If you're feeling tired, it might be a good idea to take a break, get some rest, or engage in activities that help you relax and recharge.";

            else math.responseList(filter, responseBox);
        }

        else math.responseList(filter, responseBox);
    }

    else if (/your/.test(filter)) {
        if (/father|parent|brother|sister|wife|child|uncle|aunt|mother/.test(filter))
            responseBox.innerHTML += "As an artificial intelligence language model, I don't have a physical form or a family in the traditional sense.<br><br>My purpose is to assist and provide information to the best of my abilities.";

        else if (/birthday/.test(filter))
            responseBox.innerHTML += "I'm an AI assistant, so I don't have a specific birthday.";

        else if (/gender/.test(filter) || /sex/.test(filter))
            responseBox.innerHTML += "As an AI, I don't have a gender. I'm here to assist you with information and tasks.";

        else if (/height/.test(filter) || /weight/.test(filter))
            responseBox.innerHTML += "As an AI, I don't possess a physical form, so attributes like height and weight don't apply to me.";

        else if (/owner|founder|developer/.test(filter))
            responseBox.innerHTML += "I am created and developed by Mr. Harshit Raj.<br><br>He is currently doing B.Tech in CSE at IIIT Delhi.";

        else math.responseList(filter, responseBox);
    }

    else if (/you/.test(filter) && /own|found|develop/.test(filter))
        responseBox.innerHTML += "I am created and developed by Mr. Harshit Raj.<br><br>He is currently doing B.Tech in CSE at IIIT Delhi.";

    else if (/date/.test(filter) && /time/.test(filter))
        responseBox.innerHTML += `Today is ${data.getDate()}<br>It's ${data.getTime()}`;

    else if (/date/.test(filter) || /today/.test(filter))
        responseBox.innerHTML = `Today is ${data.getDate()}<br>`;

    else if (/year/.test(filter))
        responseBox.innerHTML += `It's ${data.now.getFullYear()}`;

    else if (/month/.test(filter))
        responseBox.innerHTML += `It's ${data.getMonthName(data.now.getMonth())}`;

    else if (/time/.test(filter))
        responseBox.innerHTML += `It's ${data.getTime()}`;

    else if (/weather/.test(filter))
        responseBox.innerHTML += "I'm sorry, I don't have the capability to provide weather information at the moment.";

    else if (/news/.test(filter))
        responseBox.innerHTML += "I'm sorry, I don't have the capability to provide news information at the moment.";

    else if (/joke/.test(filter)) {
        const randomJoke = data.jokes[Math.floor(Math.random() * data.jokes.length)];
        responseBox.innerHTML += `A joke for you:<br><br>${randomJoke}<br>`;
    }

    else if (/fact/.test(filter)) {
        const randomFact = data.facts[Math.floor(Math.random() * data.facts.length)];
        responseBox.innerHTML += `Did you know?<br><br>${randomFact}<br>`;
    }

    else math.responseList(filter, responseBox);
}