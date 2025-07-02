const buttonsAudio = document.querySelectorAll(".button-pushable")
const sound = document.getElementById('clickSound');

function click() {
    sound.currentTime = 0; 
    sound.play();
}

buttonsAudio.forEach(button => {
    button.addEventListener('click', click);
  });