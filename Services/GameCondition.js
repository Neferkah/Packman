const widthFloor = 700;
const heightFloor = 700;

export function GameOver() {
    const card = document.createElement('div');
    card.style.width = "300px";
    card.style.height = "300px";
    card.style.border = "solid 3px #3F51B5";
    card.style.display = "flex";
    card.style.justifyContent = "center";
    card.style.alignItems = "center";
    card.style.backgroundColor = "black";
    card.style.zIndex= 999;
    card.style.position = "absolute";
    card.style.left = `${widthFloor/2 - 150}px`;
    card.style.top = `${heightFloor/2 - 150}px`;
    const text = document.createElement('div');
    text.innerHTML = "Game Over";
    text.style.color = "red";
    text.style.fontWeight = "bold";
    text.style.fontSize = "40px";
    card.appendChild(text);
    gameFloor.appendChild(card);
  }
  
  export function Victory() {
    const card = document.createElement('div');
    card.style.width = "300px";
    card.style.height = "300px";
    card.style.border = "solid 3px #3F51B5";
    card.style.display = "flex";
    card.style.justifyContent = "center";
    card.style.alignItems = "center";
    card.style.backgroundColor = "black";
    card.style.zIndex= 999;
    card.style.position = "absolute";
    card.style.left = `${widthFloor/2 - 150}px`;
    card.style.top = `${heightFloor/2 - 150}px`;
    const text = document.createElement('div');
    text.innerHTML = "You won!!";
    text.style.color = "red";
    text.style.fontWeight = "bold";
    text.style.fontSize = "40px";
    card.appendChild(text);
    gameFloor.appendChild(card);
  }