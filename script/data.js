// Get the current date and time
export const now = new Date();

export function getMonthName(month) {
    let monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month];
}

export function getDayName(day) {
    let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames[day];
}

export function getDate() {
    let day = now.getDate();
    let month = getMonthName(now.getMonth());
    let year = now.getFullYear();
    let dayName = getDayName(now.getDay());

    let output = `${dayName}, ${month} ${day}, ${year}`;
    return output;
}

export function getTime() {
    let hr = now.getHours();
    let min = now.getMinutes();
    let state = 'AM';
    if (hr > 12) {
        hr = hr - 12;
        state = 'PM';
    }
    else if (hr == 0) hr = 12;
    let out = `${hr}:${min} ${state}`;
    return out;
}

export const features = [
    "Crack jokes: Type 'Tell me a joke' or 'Joke'.",
    "Share interesting facts: Type 'Tell me a fact' or 'Fact'.",
    "Solve puzzles: Type 'Give me a puzzle' or 'Puzzle'.",
    "Perform math calculations: Simply enter your math problem.",
    "Convert one unit into another.",
    "Search for anything using google.",
    "Generate images of anything.",
    "Get the word meanings.",
    "Play games like rock paper, die rolling, etc.",
    "Open any links like google, youtube, facebook etc.",
    "Play songs."
];

export const commands = {
    "Clear screen": "Type 'cls' or Ctrl + X.",
    "Dark mode": "Type 'dark' to switch to dark mode.",
    "Light mode": "Type 'light' to switch to light mode.",
    "Spin the screen": "Type 'spin' along with axis.",
    "Enlarge the screen": "Type 'zoom'.",
    "Crack a joke": "Type 'joke'.",
    "Share an interesting fact": "Type 'fact'.",
    "Solve a puzzle": "Type 'puzzle'.",
    "Perform math calculations": "Type 'help math' to know more.",
    "Perform conversions": "Type 'convert {value}{startUnit} into {endUnit}'.",
    "Play rock, paper, scissors": "Type 'play rock'.",
    "Roll a die": "Type 'roll'.",
    "Toss a coin": "Type 'toss'.",
    "Go to any site": "Type 'open' followed by site name.",
    "Generate random images": "Type 'photo' followed by object name.",
    "Word meanings": "Type 'meaning of' followed by word.",
    "Google search": "Type 'search for' followed by object.",
    "Google images": "Type 'search images for' followed by object.",
    "Respond again to prev request": "Type 'again' or Ctrl + C.",
    "Play music": "Type 'help music' to know more."
};

export const mathHelp = {
    "Evaluate expressions": "Type 'eval', 'simplify', or 'calc' followed by a mathematical expression to evaluate it.",
    "Sum of numbers": "Type 'sum' or '+' followed by two or more numbers to get their sum.",
    "Product of numbers": "Type 'prod' or '*' followed by two or more numbers to get their product.",
    "Average of numbers": "Type 'avg' or 'average' followed by two or more numbers to calculate their average.",
    "Sort numbers": "Type 'sort' followed by two or more numbers to sort them in ascending order.",
    "Median of numbers": "Type 'median' followed by two or more numbers to calculate their median.",
    "Minimum/maximum number": "Type 'min'/'max' followed by one or more numbers to find the minimum/maximum.",
    "Random number": "Type 'rand' followed by two numbers to generate a random number between them."
};

export const musicHelp = {
    "Turn on/off music": "Type 'music'",
    "Play music": "Type 'start' or press Ctrl + P to play music",
    "Pause music": "Type 'pause' or press Ctrl + S to pause music",
    "Stop music": "Type 'stop' or press Ctrl + O to stop music",
    "Next song": "Type 'next' or press Ctrl + M to play the next song",
    "Previous song": "Type 'prev' or press Ctrl + R to play the previous song",
    "Skip forward": "Type 'forward' or press Ctrl + F to skip forward by 30 seconds",
    "Skip backward": "Type 'backward' or press Ctrl + B to skip backward by 30 seconds"
};

export const emojis = [
    "😀  smiling face",
    "😊  smiling face with a blush",
    "🎉  party popper",
    "👍  thumbs-up gesture",
    "🌍  globe showing the Earth",
    "🎶  musical note",
    "🐱  cat face",
    "🙈  see-no-evil monkey",
    "😋  face savoring food",
    "😂  face with tears of joy",
    "😅  grinning face with sweat",
    "❤️  red heart",
    "🎁  wrapped gift"
];

export const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "Why don't skeletons fight each other? They don't have the guts!",
    "Why couldn't the bicycle stand up by itself? It was two-tired!",
    "Why don't eggs tell jokes? Because they might crack up!",
    "Why don't oysters donate to charity? Because they are shellfish!",
    "What do you call a fish wearing a crown? King Neptune!",
    "Why did the golfer bring two pairs of pants? In case he got a hole in one!",
    "Why did the tomato turn red? Because it saw the salad dressing!",
    "Why did the math book look sad? Because it had too many problems!",
    "What do you call a snowman with a six-pack? An abdominal snowman!",
    "Why did the bicycle fall over? It was two-tired!",
    "What do you get if you cross a snowman and a vampire? Frostbite!",
    "What do you call a bear with no teeth? A gummy bear!",
    "Why did the golfer bring two pairs of pants? In case he got a hole in one!"
];

export const facts = [
    "Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!",
    "The world's oldest known creature is a quahog clam named Ming, estimated to be 507 years old.",
    "The shortest war in history lasted only 38 to 45 minutes. It occurred between the countries of Britain and Zanzibar on August 27, 1896.",
    "The average person will spend about six months of their lifetime waiting for red traffic lights to turn green.",
    "The Eiffel Tower can grow by up to 6 inches in summer due to thermal expansion.",
    "The fingerprints of koalas are so indistinguishable from humans that they have been mistaken at crime scenes.",
    "Cows have best friends and can become stressed when separated from them.",
    "The first oranges weren't orange. They were actually green!",
    "Bees can recognize human faces and remember them for their entire lives.",
    "Octopuses have three hearts.",
    "The world's oldest known living tree is a bristlecone pine named Methuselah, estimated to be over 4,800 years old.",
    "A group of flamingos is called a flamboyance."
];

export const puzzlesWithAns = {
    "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?": "Echo",
    "I have cities but no houses, forests but no trees, and rivers but no water. What am I?": "Map",
    "The more you take, the more you leave behind. What am I?": "Footstep",
    "I am taken from a mine and shut in a wooden case, from which I am never released. Yet, I am used by many. What am I?": "Pencil lead",
    "You see me once in a year, twice in a week, and never in a day. What am I?": "Letter E",
    "I can fly without wings, cry without eyes, and see without a head. What am I?": "Cloud",
    "What belongs to you but is used by others more than you?": "Name",
    "I have no legs, but I can travel the world. I have no eyes, but I can see everything. What am I?": "Camera",
    "What has a heart that doesn't beat?": "Artichoke",
    "I have keys but no locks. I have space but no room. You can enter, but you can't go outside. What am I?": "Keyboard",
    "What goes up but never comes down?": "Age",
    "I have a face but no head, hands but no arms. I tell you the time but cannot speak. What am I?": "Clock",
    "I have a thousand needles but I'm not a sewing kit. I can help you stay healthy. What am I?": "Vaccination",
    "I have a ring but no finger. I can answer your questions but ask none. What am I?": "Telephone",
    "I have a bed but never sleep. I have a mouth but never eat. What am I?": "River",
    "I am full of holes, yet I can still hold water. What am I?": "Sponge",
    "I have branches but no leaves, a trunk but no roots. You see me in the summertime, but I'm not alive. What am I?": "Patio umbrella",
    "I have a neck but no head, and I wear a cap. I can stand tall or be knocked over. What am I?": "Bottle"
};

export const songs = [
    '../songs/Darkside (By Alan Walker).mp3',
    '../songs/Far From Love (By Missquerada).mp3',
    '../songs/Fear and Loathing (By The Black Velvets).mp3',
    '../songs/Heard That Sound (By MxPx).mp3',
    '../songs/Hot Blood (By Kaleo).mp3',
    '../songs/Ignite (By Alan Walker).mp3',
    '../songs/Ink (By Finch).mp3',
    '../songs/Into You (By Ariana Grande).mp3',
    '../songs/Life Is A Highway (By Rascal Flats).mp3',
    '../songs/Lights and Sound (By Yellowcard).mp3',
    '../songs/Never Gonna Give You Up (By Richard Marx).mp3',
    '../songs/On My Way (By Alan Walker).mp3',
    '../songs/Shape Of You (By Ed Sheeran).mp3',
    '../songs/Shot Down (By Nine Black Alps).mp3',
    '../songs/Sing Me To Sleep (By Alan Walker).mp3',
    '../songs/Symphony (By Clean Bandit & Ft. Zara Larsson).mp3',
    '../songs/The Great Idea (By We Are Scientists).mp3',
    '../songs/Today (By Junkie XL).mp3'
];