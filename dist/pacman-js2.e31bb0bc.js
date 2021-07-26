// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"Services/CharacterClass.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Character = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var heightFloor = 700;
var wallDistance = 2; // Classes of characters

var Character = function Character(originalX, originalY, wallsInfo) {
  var _this = this;

  _classCallCheck(this, Character);

  _defineProperty(this, "getDirection", function () {
    return _this.direction;
  });

  _defineProperty(this, "setDirection", function (direction) {
    _this.direction = direction;
  });

  _defineProperty(this, "getPosX", function () {
    return _this.posX;
  });

  _defineProperty(this, "getPosY", function () {
    return _this.posY;
  });

  _defineProperty(this, "setPosX", function (posX) {
    _this.posX = posX;
  });

  _defineProperty(this, "setPosY", function (posY) {
    _this.posY = posY;
  });

  _defineProperty(this, "detectLimitVerticalFloor", function (nextVerticalMove) {
    if (nextVerticalMove <= 0 || nextVerticalMove + 50 >= heightFloor) return false;
    return true;
  });

  _defineProperty(this, "detectLimitHorizontalFloor", function (nextHorizontalMove) {
    if (nextHorizontalMove - 25 <= 0 || nextHorizontalMove + 25 >= 700) return false;
    return true;
  });

  _defineProperty(this, "detectVerticalWalls", function (nextVerticalMove, nextHorizontalMove) {
    var ok = true;

    _this.wallsInfo.forEach(function (wall) {
      if (nextVerticalMove <= heightFloor - wall.top + wallDistance && nextVerticalMove >= heightFloor - wall.top || nextVerticalMove + 50 >= heightFloor - wall.top - wall.height - wallDistance && nextVerticalMove + 50 <= heightFloor - wall.top - wall.height) {
        if (nextHorizontalMove + 25 >= wall.left && nextHorizontalMove - 25 <= wall.left + wall.width) {
          ok = false;
        }
      }
    });

    return ok;
  });

  _defineProperty(this, "detectHorizontalWalls", function (nextHorizontalMove, nextVerticalMove) {
    var ok = true;

    _this.wallsInfo.forEach(function (wall) {
      if (nextHorizontalMove + 25 >= wall.left - wallDistance && nextHorizontalMove + 25 <= wall.left || nextHorizontalMove - 25 >= wall.left + wall.width && nextHorizontalMove - 25 <= wall.left + wall.width + wallDistance) {
        if (nextVerticalMove + 25 <= heightFloor - wall.top && nextVerticalMove >= heightFloor - wall.top - wall.height) {
          ok = false;
        }
      }
    });

    return ok;
  });

  _defineProperty(this, "handleMove", function (move, step) {
    switch (move) {
      case 'ArrowUp':
        if (_this.detectLimitVerticalFloor(_this.posY + step) && _this.detectVerticalWalls(_this.posY + step, _this.posX)) {
          _this.posY = _this.posY + step;
          _this.direction = 'ArrowUp';
        }

        break;

      case 'ArrowDown':
        if (_this.detectLimitVerticalFloor(_this.posY - step) && _this.detectVerticalWalls(_this.posY - step, _this.posX)) {
          _this.posY = _this.posY - step;
          _this.direction = 'ArrowDown';
        }

        break;

      case 'ArrowRight':
        if (_this.detectLimitHorizontalFloor(_this.posX + step) && _this.detectHorizontalWalls(_this.posX + step, _this.posY)) {
          _this.posX = _this.posX + step;
          _this.direction = 'ArrowRight';
        }

        break;

      case 'ArrowLeft':
        if (_this.detectLimitHorizontalFloor(_this.posX - step) && _this.detectHorizontalWalls(_this.posX - step, _this.posY)) {
          _this.posX = _this.posX - step;
          _this.direction = 'ArrowLeft';
        }

        break;

      default:
        break;
    }
  });

  this.posX = originalX;
  this.posY = originalY;
  this.direction = 'ArrowRight';
  this.wallsInfo = wallsInfo;
  return this;
};

exports.Character = Character;
},{}],"Services/GameCondition.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameOver = GameOver;
exports.Victory = Victory;
var widthFloor = 700;
var heightFloor = 700;

function GameOver() {
  var card = document.createElement('div');
  card.style.width = "300px";
  card.style.height = "300px";
  card.style.border = "solid 3px #3F51B5";
  card.style.display = "flex";
  card.style.justifyContent = "center";
  card.style.alignItems = "center";
  card.style.backgroundColor = "black";
  card.style.zIndex = 999;
  card.style.position = "absolute";
  card.style.left = "".concat(widthFloor / 2 - 150, "px");
  card.style.top = "".concat(heightFloor / 2 - 150, "px");
  var text = document.createElement('div');
  text.innerHTML = "Game Over";
  text.style.color = "red";
  text.style.fontWeight = "bold";
  text.style.fontSize = "40px";
  card.appendChild(text);
  gameFloor.appendChild(card);
}

function Victory() {
  var card = document.createElement('div');
  card.style.width = "300px";
  card.style.height = "300px";
  card.style.border = "solid 3px #3F51B5";
  card.style.display = "flex";
  card.style.justifyContent = "center";
  card.style.alignItems = "center";
  card.style.backgroundColor = "black";
  card.style.zIndex = 999;
  card.style.position = "absolute";
  card.style.left = "".concat(widthFloor / 2 - 150, "px");
  card.style.top = "".concat(heightFloor / 2 - 150, "px");
  var text = document.createElement('div');
  text.innerHTML = "You won!!";
  text.style.color = "red";
  text.style.fontWeight = "bold";
  text.style.fontSize = "40px";
  card.appendChild(text);
  gameFloor.appendChild(card);
}
},{}],"UI/Ghost.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ghost = void 0;

var _CharacterClass = require("../Services/CharacterClass.js");

var _GameCondition = require("../Services/GameCondition.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var widthGhost = 35;
var ghostLimitStraightLine = 100;
var colorsGhost = ['cyan', '#f5b041', '#e74c3c', '#e8daef'];
var directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
var heightGhost = 40;
var stepGhost = 5;
var sizePacman = 50;

var Ghost = /*#__PURE__*/function (_Character) {
  _inherits(Ghost, _Character);

  var _super2 = _createSuper(Ghost);

  function Ghost(originalX, originalY, wallsInfo, pacman) {
    var _temp, _this;

    _classCallCheck(this, Ghost);

    var _super = (_temp = _this = _super2.call(this, originalX, originalY, wallsInfo), _defineProperty(_assertThisInitialized(_this), "initialization", function (_self) {
      _self.intervalId = setInterval(function () {
        function getRandomMove() {
          var randomIndex = Math.floor(Math.random() * 4); // incorporing bias

          var rand1 = Math.floor(Math.random() * 100);
          var rand2 = Math.floor(Math.random() * 100);
          randomIndex = randomIndex === 2 && rand1 % 2 === 0 ? 3 : randomIndex;
          randomIndex = randomIndex === 1 && rand2 % 2 === 0 ? 0 : randomIndex;
          var randomMove = directions[randomIndex];

          if (randomMove === 'ArrowUp' || randomMove === 'ArrowDown') {
            if (_self.countTop < ghostLimitStraightLine && !_self.switchTop) {
              randomMove = _self.biasDirectionY;
              _self.countTop += 1;
            } else if (_self.countTop == ghostLimitStraightLine && !_self.switchTop) {
              _self.countTop = 0;
              _self.switchTop = true;
            }

            if (_self.countTop < ghostLimitStraightLine && _self.switchTop) {
              randomMove = _self.biasDirectionY === 'ArrowDown' ? 'ArrowUp' : 'ArrowDown';
              _self.countTop += 1;
            } else if (_self.countTop == ghostLimitStraightLine && _self.switchTop) {
              _self.countTop = 0;
              _self.switchTop = false;
            }
          }

          if (randomMove === 'ArrowLeft' || randomMove === 'ArrowRight') {
            if (_self.countRight < ghostLimitStraightLine && !_self.switchLeft) {
              randomMove = _self.biasDirectionX;
              _self.countRight += 1;
            } else if (_self.countRight == ghostLimitStraightLine && !_self.switchLeft) {
              _self.countRight = 0;
              _self.switchLeft = true;
            }

            if (_self.countRight < ghostLimitStraightLine && _self.switchLeft) {
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
    }), _defineProperty(_assertThisInitialized(_this), "getGhost", function () {
      return _this.ghost;
    }), _defineProperty(_assertThisInitialized(_this), "updatePosition", function () {
      // We check if the ghost hit pacman vertically
      if (Math.abs(_this.posY - _this.pac.getPosY() - sizePacman) < 15 || Math.abs(_this.pac.getPosY() - _this.posY - sizePacman) < 15) {
        // We check if pacman is align with ghost laterally
        if (Math.abs(_this.posX - _this.pac.getPosX()) < 25) {
          clearInterval(_this.intervalId);
          (0, _GameCondition.GameOver)();
        }
      } // We check if the ghost hit pacman laterally


      if (Math.abs(_this.pac.getPosX() + sizePacman - _this.posX) < 10 || Math.abs(_this.posX + widthGhost - _this.pac.getPosX()) < 10) {
        // We check if pacman is align with ghost vertically
        if (Math.abs(_this.pac.getPosY() - _this.posY) < 25) {
          clearInterval(_this.intervalId);
          (0, _GameCondition.GameOver)();
        }
      }

      _this.ghost.style.left = "".concat(_this.posX - 25, "px");
      _this.ghost.style.bottom = "".concat(_this.posY, "px");
    }), _temp);

    _this._super = _super;
    _this.pac = pacman;
    _this.countTop = 0;
    _this.countRight = 0;
    _this.switchLeft = false;
    _this.switchTop = false;
    _this.intervalId = null;
    _this.biasDirectionX = Math.floor(Math.random() * 100) % 2 == 0 ? "ArrowRight" : "ArrowLeft";
    _this.biasDirectionY = Math.floor(Math.random() * 100) % 2 == 0 ? "ArrowUp" : "ArrowDown"; // Ghost
    // Take random color

    var i = Math.floor(Math.random() * 4);
    var eyes = document.createElement('div');
    eyes.style.height = "20px";
    eyes.style.width = "".concat(widthGhost, "px");
    eyes.style.display = 'flex';
    eyes.style.justifyContent = 'space-around';
    eyes.style.alignItems = 'flex-end';
    var eye = document.createElement('div');
    eye.style.backgroundColor = '#fff';
    eye.style.height = '15px';
    eye.style.width = '15px';
    eye.style.borderRadius = '100%';
    eye.style.display = 'flex';
    eye.style.justifyContent = 'flex-start';
    eye.style.alignItems = 'center';
    var iris = document.createElement('div');
    iris.style.backgroundColor = 'blue';
    iris.style.height = '7px';
    iris.style.width = '7px';
    iris.style.borderRadius = '100%';
    eye.appendChild(iris);
    eyes.appendChild(eye);
    var eye2 = eye.cloneNode();
    var iris2 = iris.cloneNode();
    eye2.appendChild(iris2);
    eyes.appendChild(eye2);
    var tail = document.createElement('div');
    tail.style.backgroundRepeat = 'repeat-x';
    tail.style.bottom = '-10px';
    tail.style.height = '10px';
    tail.style.position = 'absolute';
    tail.style.width = '35px';
    tail.style.background = "linear-gradient(-45deg, transparent 75%, ".concat(colorsGhost[i], " 75%) 0 50%, linear-gradient( 45deg, transparent 75%, ").concat(colorsGhost[i], " 75%) 0 50%");
    tail.style.backgroundSize = "10px 10px, 10px 10px";
    _this.ghost = document.createElement('div');

    _this.ghost.setAttribute('class', 'ghost');

    _this.ghost.style.height = "".concat(heightGhost, "px");
    _this.ghost.style.width = "".concat(widthGhost, "px");
    _this.ghost.style.borderRadius = '30% 30% 0 0';
    _this.ghost.style.backgroundColor = colorsGhost[i];
    _this.ghost.style.position = 'absolute';
    _this.ghost.style.left = "".concat(_this.posX - 25, "px");
    _this.ghost.style.bottom = "".concat(_this.posY, "px");

    _this.ghost.appendChild(eyes);

    _this.ghost.appendChild(tail);

    _this.initialization(_assertThisInitialized(_this));

    return _this;
  }

  return Ghost;
}(_CharacterClass.Character);

exports.Ghost = Ghost;
},{"../Services/CharacterClass.js":"Services/CharacterClass.js","../Services/GameCondition.js":"Services/GameCondition.js"}],"UI/Food.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foodsPosition = exports.foodColor = exports.foodHeight = exports.foodWidth = void 0;
// Food 
var foodWidth = 10;
exports.foodWidth = foodWidth;
var foodHeight = 10;
exports.foodHeight = foodHeight;
var foodColor = "#f3f1d6";
exports.foodColor = foodColor;
var foodsPosition = [{
  top: 70,
  left: 80,
  id: 1
}, {
  top: 110,
  left: 80,
  id: 2
}, {
  top: 150,
  left: 80,
  id: 3
}, {
  top: 190,
  left: 80,
  id: 4
}, {
  top: 230,
  left: 80,
  id: 5
}, {
  top: 270,
  left: 80,
  id: 6
}, {
  top: 310,
  left: 80,
  id: 7
}, {
  top: 350,
  left: 80,
  id: 8
}, {
  top: 390,
  left: 80,
  id: 9
}, {
  top: 430,
  left: 80,
  id: 10
}, {
  top: 470,
  left: 80,
  id: 11
}, {
  top: 510,
  left: 80,
  id: 12
}, {
  top: 550,
  left: 80,
  id: 13
}, {
  top: 590,
  left: 80,
  id: 14
}, {
  top: 615,
  left: 80,
  id: 15
}, {
  top: 615,
  left: 120,
  id: 16
}, {
  top: 615,
  left: 160,
  id: 17
}, {
  top: 615,
  left: 200,
  id: 18
}, {
  top: 615,
  left: 240,
  id: 19
}, {
  top: 615,
  left: 280,
  id: 20
}, {
  top: 615,
  left: 320,
  id: 21
}, {
  top: 615,
  left: 360,
  id: 22
}, {
  top: 615,
  left: 400,
  id: 23
}, {
  top: 615,
  left: 440,
  id: 24
}, {
  top: 615,
  left: 480,
  id: 25
}, {
  top: 615,
  left: 520,
  id: 26
}, {
  top: 615,
  left: 560,
  id: 27
}, {
  top: 615,
  left: 610,
  id: 28
}, {
  top: 590,
  left: 610,
  id: 29
}, {
  top: 550,
  left: 610,
  id: 30
}, {
  top: 510,
  left: 610,
  id: 31
}, {
  top: 470,
  left: 610,
  id: 32
}, {
  top: 430,
  left: 610,
  id: 33
}, {
  top: 390,
  left: 610,
  id: 34
}, {
  top: 350,
  left: 610,
  id: 35
}, {
  top: 310,
  left: 610,
  id: 36
}, {
  top: 270,
  left: 610,
  id: 37
}, {
  top: 230,
  left: 610,
  id: 38
}, {
  top: 190,
  left: 610,
  id: 39
}, {
  top: 150,
  left: 610,
  id: 40
}, {
  top: 110,
  left: 610,
  id: 41
}, {
  top: 70,
  left: 610,
  id: 42
}, {
  top: 70,
  left: 120,
  id: 43
}, {
  top: 70,
  left: 160,
  id: 44
}, {
  top: 70,
  left: 200,
  id: 45
}, {
  top: 70,
  left: 240,
  id: 46
}, {
  top: 70,
  left: 280,
  id: 47
}, {
  top: 70,
  left: 320,
  id: 48
}, {
  top: 70,
  left: 360,
  id: 49
}, {
  top: 70,
  left: 400,
  id: 50
}, {
  top: 70,
  left: 440,
  id: 51
}, {
  top: 70,
  left: 480,
  id: 52
}, {
  top: 70,
  left: 520,
  id: 53
}, {
  top: 70,
  left: 560,
  id: 54
}, {
  top: 215,
  left: 120,
  id: 55
}, {
  top: 215,
  left: 160,
  id: 56
}, {
  top: 215,
  left: 200,
  id: 57
}, {
  top: 215,
  left: 240,
  id: 58
}, {
  top: 215,
  left: 280,
  id: 59
}, {
  top: 215,
  left: 320,
  id: 60
}, {
  top: 215,
  left: 360,
  id: 61
}, {
  top: 215,
  left: 400,
  id: 62
}, {
  top: 215,
  left: 440,
  id: 63
}, {
  top: 215,
  left: 480,
  id: 64
}, {
  top: 215,
  left: 520,
  id: 65
}, {
  top: 215,
  left: 560,
  id: 66
}, {
  top: 475,
  left: 120,
  id: 67
}, {
  top: 475,
  left: 160,
  id: 68
}, {
  top: 475,
  left: 200,
  id: 69
}, {
  top: 475,
  left: 240,
  id: 70
}, {
  top: 475,
  left: 280,
  id: 71
}, {
  top: 475,
  left: 320,
  id: 72
}, {
  top: 475,
  left: 360,
  id: 73
}, {
  top: 475,
  left: 400,
  id: 74
}, {
  top: 475,
  left: 440,
  id: 75
}, {
  top: 475,
  left: 480,
  id: 76
}, {
  top: 475,
  left: 520,
  id: 77
}, {
  top: 475,
  left: 560,
  id: 78
}, {
  top: 430,
  left: 440,
  id: 79
}, {
  top: 390,
  left: 440,
  id: 80
}, {
  top: 350,
  left: 440,
  id: 81
}, {
  top: 310,
  left: 440,
  id: 82
}, {
  top: 270,
  left: 440,
  id: 83
}, {
  top: 430,
  left: 230,
  id: 84
}, {
  top: 390,
  left: 230,
  id: 85
}, {
  top: 350,
  left: 230,
  id: 86
}, {
  top: 310,
  left: 230,
  id: 87
}, {
  top: 270,
  left: 230,
  id: 88
}];
exports.foodsPosition = foodsPosition;
},{}],"UI/PacMan.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PacMan = void 0;

var _CharacterClass = require("../Services/CharacterClass.js");

var _GameCondition = require("../Services/GameCondition.js");

var _Food = require("./Food.js");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var heightFloor = 700;
var step = 5;
var sizePacman = 50;
var maxFood = 88;
var foodAte = [];
var angleDirection = {
  ArrowUp: -90,
  ArrowDown: 90,
  ArrowLeft: 180,
  ArrowRight: 0
};
var directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

var PacMan = /*#__PURE__*/function (_Character) {
  _inherits(PacMan, _Character);

  var _super2 = _createSuper(PacMan);

  function PacMan(originalX, originalY, wallsInfo, foods) {
    var _temp, _this;

    _classCallCheck(this, PacMan);

    var _super = (_temp = _this = _super2.call(this, originalX, originalY, wallsInfo), _defineProperty(_assertThisInitialized(_this), "initialization", function (_self) {
      document.addEventListener('keydown', function (event) {
        if (directions.includes(event.key)) {
          _self._super.handleMove(event.key, step);

          _self.updatePosition();
        }
      });
    }), _defineProperty(_assertThisInitialized(_this), "getPacMan", function () {
      return _this.pac;
    }), _defineProperty(_assertThisInitialized(_this), "getCountFood", function () {
      return _this.countFoods;
    }), _defineProperty(_assertThisInitialized(_this), "eatFood", function () {
      _this.foodsInfo.forEach(function (f, i) {
        // // We check if pac eat food vertically
        if (Math.abs(heightFloor - f.top + _Food.foodHeight - _this.posY) <= 3 || Math.abs(_this.posY + sizePacman - (heightFloor - f.top)) <= 3) {
          // We check if pacman is align with food laterally
          if (Math.abs(_this.posX - f.left) < 10) {
            var foodEl = document.getElementById(f.id);

            if (foodEl) {
              foodEl.style.display = 'none';

              if (!foodAte.includes(f.id)) {
                _this.countFoods += 1;
                foodAte.push(f.id);
              }

              if (_this.countFoods === maxFood) {
                (0, _GameCondition.Victory)();
              }
            }
          }
        } // We check if pac eat food laterally


        if (Math.abs(_this.posX + sizePacman - f.left) <= 3 || Math.abs(f.left + _Food.foodWidth - _this.posX) <= 3) {
          // We check if pacman is align with food vertically
          if (Math.abs(_this.posY - (heightFloor - f.top)) <= 40) {
            var _foodEl = document.getElementById(f.id);

            if (_foodEl) {
              _foodEl.style.display = 'none';

              if (!foodAte.includes(f.id)) {
                _this.countFoods += 1;
                foodAte.push(f.id);
              }

              if (_this.countFoods === maxFood) {
                (0, _GameCondition.Victory)();
              }
            }
          }
        }
      });
    }), _defineProperty(_assertThisInitialized(_this), "updatePosition", function () {
      _this.pac.style.transform = "rotate(".concat(angleDirection[_this.direction], "deg)");
      _this.pac.style.left = "".concat(_this.posX - 25, "px");
      _this.pac.style.bottom = "".concat(_this.posY, "px");

      _this.eatFood();
    }), _temp);

    _this._super = _super;
    _this.foodsInfo = foods;
    _this.countFoods = 0; // Pac Body

    _this.pac = document.createElement('div');

    _this.pac.setAttribute('id', 'pacman');

    _this.pac.style.width = "".concat(sizePacman, "px");
    _this.pac.style.height = "".concat(sizePacman, "px");
    _this.pac.style.borderRadius = '25px';
    _this.pac.style.border = 'solid 2px black';
    _this.pac.style.backgroundColor = 'yellow';
    _this.pac.style.position = 'absolute';
    _this.pac.style.left = "".concat(_this.posX - 25, "px");
    _this.pac.style.bottom = "".concat(_this.posY, "px"); // Pac Mouth

    var mouth = document.createElement('div');
    mouth.style.backgroundColor = "black";
    mouth.style.position = "absolute";
    mouth.style.width = "100%";
    mouth.style.height = "100%";
    mouth.style.clipPath = "polygon(100% 74%, 44% 48%, 100% 21%)";
    mouth.style.animationName = "eat";
    mouth.style.animationDuration = "0.7s";
    mouth.style.animationIterationCount = "infinite";

    _this.pac.appendChild(mouth);

    _this.initialization(_assertThisInitialized(_this));

    return _this;
  }

  return PacMan;
}(_CharacterClass.Character);

exports.PacMan = PacMan;
},{"../Services/CharacterClass.js":"Services/CharacterClass.js","../Services/GameCondition.js":"Services/GameCondition.js","./Food.js":"UI/Food.js"}],"UI/Walls.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wallsInfos = void 0;
// Obstacles
var wallsInfos = [{
  width: 650,
  height: 30,
  left: 15,
  top: 20
}, {
  width: 650,
  height: 30,
  left: 15,
  top: 650
}, {
  width: 30,
  height: 300,
  left: 15,
  top: 20
}, {
  width: 30,
  height: 250,
  left: 15,
  top: 430
}, {
  width: 30,
  height: 300,
  left: 650,
  top: 20
}, {
  width: 30,
  height: 250,
  left: 650,
  top: 430
}, {
  width: 70,
  height: 180,
  left: 130,
  top: 260
}, {
  width: 70,
  height: 180,
  left: 480,
  top: 260
}, {
  width: 100,
  height: 70,
  left: 120,
  top: 520
}, {
  width: 100,
  height: 70,
  left: 460,
  top: 520
}, {
  width: 100,
  height: 20,
  left: 290,
  top: 570
}, {
  width: 100,
  height: 70,
  left: 120,
  top: 110
}, {
  width: 100,
  height: 70,
  left: 460,
  top: 110
}, {
  width: 100,
  height: 20,
  left: 290,
  top: 110
}, {
  width: 10,
  height: 178,
  left: 270,
  top: 260
}, {
  width: 10,
  height: 178,
  left: 400,
  top: 260
}];
exports.wallsInfos = wallsInfos;
},{}],"Services/AniMouth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animMouth = void 0;
var animMouth = " @keyframes eat {\
    0% {\
      clip-path: polygon(100% 74%, 44% 48%, 100% 21%);\
    }\
    25% {\
      clip-path: polygon(100% 60%, 44% 48%, 100% 40%);\
    }\
    50% {\
      clip-path: polygon(100% 50%, 44% 48%, 100% 50%);\
    }\
    75% {\
      clip-path: polygon(100% 59%, 44% 48%, 100% 35%);\
    }\
    100% {\
      clip-path: polygon(100% 74%, 44% 48%, 100% 21%);\
    }\
  }\
  ";
exports.animMouth = animMouth;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _Ghost = require("./UI/Ghost.js");

var _PacMan = require("./UI/PacMan.js");

var _Food = require("./UI/Food.js");

var _Walls = require("./UI/Walls.js");

var _AniMouth = require("./Services/AniMouth.js");

var root = document.getElementById('root'); // General constants

var widthFloor = 700;
var heightFloor = 700;
var intervalGhostId = null;
var s = document.createElement('style');
s.innerHTML = _AniMouth.animMouth;
root.appendChild(s); // create elements

var screen = document.createElement('div');
screen.setAttribute('id', 'screen');
screen.style.display = 'flex';
screen.style.justifyContent = 'center';
screen.style.alignItems = 'center';
screen.style.width = '100%';
screen.style.height = '95vh';
var gameFloor = document.createElement('div');
gameFloor.setAttribute('id', 'gameFloor');
gameFloor.style.width = "".concat(widthFloor, "px");
gameFloor.style.height = "".concat(heightFloor, "px");
gameFloor.style.border = 'blue 1px solid';
gameFloor.style.position = 'relative';
gameFloor.style.backgroundColor = "black"; // initializing game elements

var pacMan = new _PacMan.PacMan(350, 50, _Walls.wallsInfos, _Food.foodsPosition); // Create Ghost

function generateGhosts() {
  var ghost1 = new _Ghost.Ghost(350, 350, _Walls.wallsInfos, pacMan);
  gameFloor.appendChild(ghost1.getGhost());
  intervalGhostId = setInterval(function () {
    gameFloor.appendChild(new _Ghost.Ghost(350, 350, _Walls.wallsInfos, pacMan).getGhost());
  }, 10000);
} // Create walls


var walls = _Walls.wallsInfos.map(function (wall, i) {
  var w = document.createElement('div');
  w.setAttribute('id', "wall-".concat(i));
  w.style.width = "".concat(wall.width, "px");
  w.style.height = "".concat(wall.height, "px");
  w.style.border = '#3F51B5 7px double';
  w.style.boxSizing = 'border-box';
  w.style.borderRadius = '2px';
  w.style.backgroundColor = 'black';
  w.style.position = 'absolute';
  w.style.top = "".concat(wall.top, "px");
  w.style.left = "".concat(wall.left, "px");
  return w;
}); // Create Food


var foods = _Food.foodsPosition.map(function (p, i) {
  var f = document.createElement('div');
  f.setAttribute('id', p.id);
  f.style.width = "".concat(_Food.foodWidth, "px");
  f.style.height = "".concat(_Food.foodHeight, "px");
  f.style.backgroundColor = _Food.foodColor;
  f.style.position = "absolute";
  f.style.top = "".concat(p.top, "px");
  f.style.left = "".concat(p.left, "px");
  return f;
}); // we inject the element on root


walls.forEach(function (wall) {
  return gameFloor.appendChild(wall);
});
foods.forEach(function (food) {
  return gameFloor.appendChild(food);
});
gameFloor.appendChild(pacMan.getPacMan());
screen.appendChild(gameFloor);
root.appendChild(screen); // We create the ghosts

generateGhosts();
},{"./UI/Ghost.js":"UI/Ghost.js","./UI/PacMan.js":"UI/PacMan.js","./UI/Food.js":"UI/Food.js","./UI/Walls.js":"UI/Walls.js","./Services/AniMouth.js":"Services/AniMouth.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44577" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/pacman-js2.e31bb0bc.js.map