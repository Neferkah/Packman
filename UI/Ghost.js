import {Character} from '../Services/CharacterClass.js';
import {GameOver} from '../Services/GameCondition.js';



const widthGhost = 35;
const ghostLimitStraightLine = 100;
const colorsGhost = ['cyan', '#f5b041', '#e74c3c', '#e8daef'];
const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
const heightGhost = 40;
const stepGhost = 5;
const sizePacman = 50;


export class Ghost extends Character {
    constructor (originalX, originalY, wallsInfo, pacman) {
      const _super = super(originalX, originalY, wallsInfo);
      this._super = _super;
      this.pac = pacman;
      this.countTop = 0;
      this.countRight = 0;
      this.switchLeft = false;
      this.switchTop = false;
      this.intervalId = null;
      this.biasDirectionX = Math.floor(Math.random() * 100) % 2 == 0 ? "ArrowRight" : "ArrowLeft";
      this.biasDirectionY = Math.floor(Math.random() * 100) % 2 == 0 ? "ArrowUp" : "ArrowDown";
      // Ghost
      // Take random color
      const i = Math.floor(Math.random() * 4);
      const eyes = document.createElement('div');
      eyes.style.height = "20px";
      eyes.style.width = `${widthGhost}px`;
      eyes.style.display = 'flex';
      eyes.style.justifyContent = 'space-around';
      eyes.style.alignItems = 'flex-end';
      const eye = document.createElement('div');
      eye.style.backgroundColor = '#fff';
      eye.style.height = '15px';
      eye.style.width = '15px';
      eye.style.borderRadius = '100%';
      eye.style.display = 'flex';
      eye.style.justifyContent = 'flex-start';
      eye.style.alignItems = 'center';
      const iris = document.createElement('div');
      iris.style.backgroundColor = 'blue';
      iris.style.height = '7px';
      iris.style.width = '7px';
      iris.style.borderRadius = '100%';
      eye.appendChild(iris);
      eyes.appendChild(eye);
      const eye2 = eye.cloneNode();
      const iris2 = iris.cloneNode();
      eye2.appendChild(iris2);
      eyes.appendChild(eye2);
      const tail = document.createElement('div');
      tail.style.backgroundRepeat = 'repeat-x';
      tail.style.bottom = '-10px';
      tail.style.height = '10px';
      tail.style.position = 'absolute';
      tail.style.width = '35px';
      tail.style.background = `linear-gradient(-45deg, transparent 75%, ${colorsGhost[i]} 75%) 0 50%, linear-gradient( 45deg, transparent 75%, ${colorsGhost[i]} 75%) 0 50%`;
      tail.style.backgroundSize = "10px 10px, 10px 10px";
      this.ghost = document.createElement('div');
      this.ghost.setAttribute('class', 'ghost');
      this.ghost.style.height = `${heightGhost}px`;
      this.ghost.style.width = `${widthGhost}px`;
      this.ghost.style.borderRadius = '30% 30% 0 0'
      this.ghost.style.backgroundColor = colorsGhost[i];
      this.ghost.style.position = 'absolute';
      this.ghost.style.left = `${this.posX - 25}px`;
      this.ghost.style.bottom = `${this.posY}px`;
      this.ghost.appendChild(eyes);
      this.ghost.appendChild(tail);
      this.initialization(this);
    }
  
    initialization = (_self) => {
      _self.intervalId = setInterval(() => {
        function getRandomMove() {
          let randomIndex = Math.floor(Math.random() * 4);
          // incorporing bias
          const rand1 = Math.floor(Math.random() * 100);
          const rand2 = Math.floor(Math.random() * 100);
          randomIndex = (randomIndex === 2 && rand1 % 2 === 0) ? 3 : randomIndex;
          randomIndex = (randomIndex === 1 && rand2 % 2 === 0) ? 0 : randomIndex;
          let randomMove = directions[randomIndex];
          if(randomMove === 'ArrowUp' || randomMove === 'ArrowDown') {
            if(_self.countTop < ghostLimitStraightLine && !_self.switchTop) {
              randomMove = _self.biasDirectionY;
              _self.countTop += 1;
            } else if (_self.countTop == ghostLimitStraightLine && !_self.switchTop) {
              _self.countTop = 0;
              _self.switchTop = true;
            }
            if(_self.countTop < ghostLimitStraightLine && _self.switchTop) {
              randomMove = _self.biasDirectionY === 'ArrowDown' ? 'ArrowUp' : 'ArrowDown';
              _self.countTop += 1;
            } else if (_self.countTop == ghostLimitStraightLine && _self.switchTop) {
              _self.countTop = 0;
              _self.switchTop = false;
            }
          } 
          if(randomMove === 'ArrowLeft' || randomMove === 'ArrowRight') {
            if(_self.countRight < ghostLimitStraightLine && !_self.switchLeft) {
              randomMove = _self.biasDirectionX;
              _self.countRight += 1;
            } else if (_self.countRight == ghostLimitStraightLine && !_self.switchLeft) {
              _self.countRight = 0;
              _self.switchLeft = true;
            }
            if(_self.countRight < ghostLimitStraightLine && _self.switchLeft) {
              randomMove = _self.biasDirectionX === 'ArrowRight' ? 'ArrowLeft' : 'ArrowRight';
              _self.countRight += 1;
            } else if (_self.countRight == ghostLimitStraightLine && _self.switchLeft) {
              _self.countRight = 0;
              _self.switchLeft = false;
            }
          } 
            _self._super.handleMove(randomMove, stepGhost);
            _self.updatePosition();
          }
        getRandomMove();
      }, 70);
    }
  
    getGhost = () => this.ghost;
  
    updatePosition = () => {
      // We check if the ghost hit pacman vertically
      if (Math.abs(this.posY - this.pac.getPosY() - sizePacman) < 15 ||
          Math.abs(this.pac.getPosY() - this.posY - sizePacman)  < 15 
      ) {
        // We check if pacman is align with ghost laterally
        if(Math.abs(this.posX - this.pac.getPosX()) < 25) {
          clearInterval(this.intervalId);
          GameOver();
        }
      }
      // We check if the ghost hit pacman laterally
      if( Math.abs(this.pac.getPosX() + sizePacman - this.posX) < 10 ||
          Math.abs(this.posX + widthGhost - this.pac.getPosX()) < 10
      ) {
        // We check if pacman is align with ghost vertically
        if(Math.abs(this.pac.getPosY() - this.posY) < 25) {
          clearInterval(this.intervalId);
          GameOver();
        }
      }
      this.ghost.style.left = `${this.posX - 25}px`;
      this.ghost.style.bottom = `${this.posY}px`;
    }
  }
  