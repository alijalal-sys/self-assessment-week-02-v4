// We've provided `makeHorse` and `makeFlyingHorse` for you, written using the
// functional pattern. Your task is to rewrite these classes to use the
// pseudoclassical pattern. They should have all the same methods as the
// objects returned from the maker functions except in pseudo classical style.
// You must be able to use your new functions to create new horse instances,
// just like this:
//
//   var myHorse = new Horse();
//   var myFlyingHorse = new FlyingHorse();
//

// DO NOT MODIFY FUNCTIONS 'makeHorse' AND 'makeFlyingHorse'
// USE THE CONSTRUCTOR FUNCTIONS LOCATED AT THE END OF THIS FILE

var makeHorse = function(name) {
  var result = {};
  result.name = name;
  result.goSomewhere = function(destination) {
    return name + ' is galloping to ' + destination + '!';
  };
  return result;
};

var makeFlyingHorse = function(name, color) {
  var result = makeHorse(name);
  result.color = color;
  var oldGoSomewhere = result.goSomewhere; // Here They saved the old go somewhere function 
  result.goSomewhere = function(destination, milesToDestination) {
    if (milesToDestination < 10) {
      return oldGoSomewhere(destination);
    } else {
      return name + ' is flying to ' + destination + '!';
    }
  };
  return result;
};

// YOUR WORK GOES BELOW
// Here's some starter code to get you going!
// Do not use the ES6 `class` keyword; use ES5 to create your classes.

var Horse = function(name) {
  this.name = name;
};

Horse.prototype.goSomewhere = function(destination) {
  return `${this.name} is galloping to ${destination} !`;
};



var FlyingHorse = function(name, color) {
  Horse.call(this, name, color);
  this.color = color;
};

FlyingHorse.prototype = Object.create(Horse.prototype);
FlyingHorse.prototype.constructor = FlyingHorse;

FlyingHorse.prototype.goSomewhere = function(destination, milesToDestination) {
  if (milesToDestination < 10) {
    // But here we don't have to save it, we can call it it's inside the prototype of Horse
    return Horse.prototype.goSomewhere.call(this, destination);
  } else {
    return `${this.name} is flying to ${destination} !`;
  }
};


var myHorse = new Horse('Hobb');
var myFlyingHorse = new FlyingHorse('Betty', 'black');

myHorse.goSomewhere('Nowhere') //"Hobb is galloping to Nowhere !"
myFlyingHorse.goSomewhere('nowhere', 1); // "Betty is galloping to nowhere !"
myFlyingHorse.goSomewhere('nowhere', 11); // "Betty is flying to nowhere !"
