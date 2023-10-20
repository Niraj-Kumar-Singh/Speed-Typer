
const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');


quoteInputElement.addEventListener('input', () => {

    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');

    let correct = true;

    arrayQuote.forEach((charSpan, index) => {
        const char = arrayValue[index];
        if(char == null)
        {
            charSpan.classList.remove('correct');
            charSpan.classList.remove('incorrect');
            correct = false;
        }
        else if(char === charSpan.innerText)
        {
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');

        }
        else
        {
            
            charSpan.classList.remove('correct');
            charSpan.classList.add('incorrect');
            correct = false;
        }
    });

    if(correct) renderNewQuote();
})


function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL).then(res=>res.json()).then(data => data.content);
}

async function renderNewQuote(){
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = '';
    quote.split('').forEach(character => {
        const charSpan = document.createElement('span');
        
        charSpan.innerText = character;
        quoteDisplayElement.appendChild(charSpan);
    });

    quoteInputElement.value = null;
    startTimer();
    
}

let startTime;
function startTimer() {
    timerElement.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000);
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000);
}

renderNewQuote();



const textArray = ["Speed Typer", "Type Fast", "Type Precise"];
let textIndex = 0;
let charIndex = 0;
const textElement = document.getElementById('text');

function type() {
    if (charIndex < textArray[textIndex].length) {
        textElement.innerHTML += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100); // Adjust typing speed (milliseconds)
    } else {
        setTimeout(erase, 1000); // Pause before erasing text
    }
}

function erase() {
    if (charIndex > 0) {
        textElement.innerHTML = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 100); // Adjust erasing speed (milliseconds)
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 1000); // Pause before typing the next message
    }
}

// Start the typewriter effect
type();





