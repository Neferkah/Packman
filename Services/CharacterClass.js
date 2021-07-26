const heightFloor = 700;
const wallDistance = 2;

// Classes of characters
export class Character {
    constructor(originalX, originalY, wallsInfo) {
      this.posX = originalX;
      this.posY = originalY;
      this.direction = 'ArrowRight';
      this.wallsInfo = wallsInfo;
      return this;
    }
  
    getDirection = () => this.direction;
    
    setDirection = direction => {
      this.direction = direction;
    }
    getPosX = () => this.posX;
    getPosY = () => {
      return this.posY;
    };
    setPosX = posX => {
      this.posX = posX;
    }
    setPosY = posY => {
      this.posY = posY;
    }
    detectLimitVerticalFloor = nextVerticalMove => {
      if(nextVerticalMove <= 0 || (nextVerticalMove + 50) >= heightFloor )
        return false;
      return true;
    }
    detectLimitHorizontalFloor = nextHorizontalMove => {
      if((nextHorizontalMove - 25) <= 0 || (nextHorizontalMove + 25) >= 700 )
        return false;
      return true;
    }
    detectVerticalWalls = (nextVerticalMove, nextHorizontalMove) => {
      let ok = true;
      this.wallsInfo.forEach(wall => {
        if(
          (nextVerticalMove <= (heightFloor - wall.top + wallDistance) && nextVerticalMove >= (heightFloor - wall.top)) ||
          ((nextVerticalMove + 50) >= (heightFloor - wall.top - wall.height - wallDistance ) && ((nextVerticalMove + 50) <= ((heightFloor - wall.top - wall.height))))
        ) {
          if(
            ((nextHorizontalMove + 25) >= wall.left && (nextHorizontalMove - 25) <= (wall.left + wall.width))
          ) {
            ok = false;
          }
        }
      })
      return ok;
    }
    detectHorizontalWalls = (nextHorizontalMove, nextVerticalMove) => {
      let ok = true;
      this.wallsInfo.forEach(wall => {
        if(
          (((nextHorizontalMove + 25) >= (wall.left - wallDistance)) && ((nextHorizontalMove + 25) <= wall.left )) ||
          (((nextHorizontalMove - 25) >= (wall.left + wall.width)) && ((nextHorizontalMove - 25) <= (wall.left + wall.width + wallDistance))) 
        ) {
          if(
            ((nextVerticalMove + 25) <= (heightFloor - wall.top)) && (nextVerticalMove >= (heightFloor - wall.top - wall.height))
          ) {
            ok = false;
          }
        }
      })
      return ok;
    }
  
    handleMove = (move, step) => {
      switch (move) {
        case 'ArrowUp':
          if(this.detectLimitVerticalFloor(this.posY + step)  && this.detectVerticalWalls(this.posY + step, this.posX)) {
            this.posY = this.posY + step;
            this.direction = 'ArrowUp';
          }
          break;
        case 'ArrowDown':
          if(this.detectLimitVerticalFloor(this.posY - step)  && this.detectVerticalWalls(this.posY - step, this.posX)) {
            this.posY =  this.posY - step;
            this.direction = 'ArrowDown';
          }
          break;
        case 'ArrowRight':
          if(this.detectLimitHorizontalFloor(this.posX + step) && this.detectHorizontalWalls(this.posX + step, this.posY)) {
            this.posX = this.posX + step;
            this.direction = 'ArrowRight';
          }
          break;
        case 'ArrowLeft':
          if(this.detectLimitHorizontalFloor(this.posX - step) && this.detectHorizontalWalls(this.posX - step, this.posY)) {
            this.posX = this.posX - step;
            this.direction = 'ArrowLeft';
          }
          break;
        default:
          break;
      }
    }
  }