const textDisplay = document.getElementById('text-display');
const textInput = document.getElementById('text-input');
const startButton = document.getElementById('start-btn');
const timerDisplay = document.getElementById('timer');
// const textDisplay = document.getElementById('text-display');


let startTime;
let interval;

textInput.addEventListener('input',checkTyping);

startButton.addEventListener('click',()=>{
  textInput.disabled = false;
  textInput.value = '';
  textInput.focus();
  startButton.disabled = true;


startTime = new Date().getTime();
interval = setInterval(updateTimer, 1000);
});



function updateTimer(){
  let currentTime = new Date().getTime();
  let timeElapsed = Math.floor((currentTime - startTime)/ 1000);
  timerDisplay.textContent = timeElapsed;

}

const originalText = textDisplay.textContent;
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');

function checkTyping(){
  const typedText = textInput.value;
  const typedLength = typedText.length;

  textInput.classList.remove('error');
  let isError = false;

  for (let i = 0; i < typedLength; i++) {
    if (typedText[i] !== originalText[i]) {
        isError = true; // Mark error if character doesn't match
        textInput.classList.add('error'); // Highlight input box
        break; // Exit loop on first error
    }
}

  if (typedLength == originalText.length){
    clearInterval(interval);
    calculateResults(typedText);
    startButton.disabled= false;
    textInput.disabled = true;
  }
}

function calculateResults(typedText){
  const timeTaken = parseInt(timerDisplay.textContent);
  const wordCount = originalText.split(' ').length;

  const wpm = Math.round((wordCount / timeTaken)* 60);
  wpmDisplay.textContent = wpm;

  let correctChars = 0;

  for (let i=0; i < typedText.length; i++){
    if(typedText[i] === originalText[i]){
      correctChars++;
    }
  }
  const accuracy = Math.round((correctChars/originalText.length)*100);
  accuracyDisplay.textContent = accuracy;

  const resultText = `You typed at ${wpm} WPM with ${accuracy}% accuracy.`;
    document.getElementById('result-text').textContent = resultText;

    // Show the popup
    document.getElementById('result-popup').style.display = 'block';

}

// Get the modal
const modal = document.getElementById('result-popup');

// Get the close button
const closeButton = document.getElementById('close-popup');

// When the user clicks on the close button, close the modal
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
      modal.style.display = 'none';
  }
});

startButton.addEventListener('click', ()=>{
  textInput.disabled = false;
  textInput.value = '';
  textInput.focus();
  startButton.disabled = true;

  startTime = new Date().getTime();
  interval = setInterval(updateTimer, 1000);

  textInput.addEventListener('input',checkTyping);

  timerDisplay.textContent = '0';
  wpmDisplay.textContent = '0';
  accuracyDisplay.textContent= '0';

})