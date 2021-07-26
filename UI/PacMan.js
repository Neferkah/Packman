import {Character} from '../Services/CharacterClass.js';
import {Victory} from '../Services/GameCondition.js';
import {foodWidth} from './Food.js';
import {foodHeight} from './Food.js';



const heightFloor = 700;
const step = 5;
const sizePacman = 50;
const maxFood = 88;
const foodAte = [];
const angleDirection = {
  ArrowUp: -90,
  ArrowDown: 90,
  ArrowLeft: 180,
  ArrowRight: 0,
};
const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

export class PacMan extends Character {
    constructor (originalX, originalY, wallsInfo, foods) {
      const _super = super(originalX, originalY, wallsInfo);
      this._super = _super;
      this.foodsInfo = foods;
      this.countFoods = 0;
      // Pac Body
      this.pac = document.createElement('div');
      this.pac.setAttribute('id', 'pacman');
      this.pac.style.width = `${sizePacman}px`;
      this.pac.style.height = `${sizePacman}px`;
      this.pac.style.borderRadius = '25px';
      this.pac.style.border = 'solid 2px black';
      this.pac.style.backgroundColor = 'yellow';
      this.pac.style.position = 'absolute';
      this.pac.style.left = `${this.posX - 25}px`;
      this.pac.style.bottom = `${this.posY}px`;
      // Pac Mouth
      const mouth = document.createElement('div');
      mouth.style.backgroundColor = "black";
      mouth.style.position = "absolute";
      mouth.style.width = "100%";
      mouth.style.height = "100%";
      mouth.style.clipPath = "polygon(100% 74%, 44% 48%, 100% 21%)";
      mouth.style.animationName = "eat";
      mouth.style.animationDuration = "0.7s";
      mouth.style.animationIterationCount = "infinite";
      this.pac.appendChild(mouth);
      this.initialization(this);
    }
  
    initialization = (_self) => {
      document.addEventListener('keydown', function(event) {
        if (directions.includes(event.key)){
          _self._super.handleMove(event.key, step)
          _self.updatePosition();
        }
      });
    }
  
    getPacMan = () => this.pac;
  
    getCountFood = () => this.countFoods;
  
    eatFood = () => {
      this.foodsInfo.forEach((f, i) => {
        // // We check if pac eat food vertically
        if (Math.abs((heightFloor - f.top + foodHeight) - this.posY) <= 3 ||
            Math.abs(this.posY + sizePacman - (heightFloor - f.top)) <= 3) {
          // We check if pacman is align with food laterally
          if(Math.abs(this.posX - f.left) < 10) {
            const foodEl = document.getElementById(f.id);
            if (foodEl) {
              foodEl.style.display = 'none';
              if (!foodAte.includes(f.id)) {
                this.countFoods += 1;
                foodAte.push(f.id);
              }
              if (this.countFoods === maxFood) {
                Victory();
              }
            }
          }
        }
  
        // We check if pac eat food laterally
        if (Math.abs(this.posX + sizePacman - f.left) <= 3 ||
            Math.abs(f.left + foodWidth - this.posX) <= 3) {
          // We check if pacman is align with food vertically
          if(Math.abs(this.posY - (heightFloor - f.top)) <= 40) {
            const foodEl = document.getElementById(f.id);
            if (foodEl) {
              foodEl.style.display = 'none';
              if (!foodAte.includes(f.id)) {
                this.countFoods += 1;
                foodAte.push(f.id);
              }
              if (this.countFoods === maxFood) {
                Victory();
              }
            }
          }
        }
  
      });
    }
  
    updatePosition = () => {
      this.pac.style.transform = `rotate(${angleDirection[this.direction]}deg)`;
      this.pac.style.left = `${this.posX - 25}px`;
      this.pac.style.bottom = `${this.posY}px`;
      this.eatFood();
    }
  }