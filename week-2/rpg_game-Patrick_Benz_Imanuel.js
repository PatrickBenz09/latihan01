// http://jsfiddle.net/PatrickBenz09/rdnpyfk8/70/


var obj = function(name, status) {
  this.name = name;
  this.status = status;
  this.health = 100;
  var log = "";

  this.attack = function(objOpp) {
    var damage = this.status.atk - objOpp.status.def;
    objOpp.health -= damage;
    log += this.name + " deal " + damage + " damage" + "\n";
    console.log(this.name + " deal " + damage + " damage");
    if (objOpp.health >= 0) {
      log += objOpp.name + " health: " + objOpp.health + "\n";
      console.log(objOpp.name + " health: " + objOpp.health);
    } else {
      log += objOpp.name + " health: " + 0 + "\n";
      console.log(objOpp.name + " health: " + 0);
    }
    alert(log); log = "";
  }
  this.heal = function() {
    if (this.status.holy) {
      this.health += this.status.holy;
      log += this.name + " health increased " + this.status.holy + "\n";
      console.log(this.name + " health increased " + this.status.holy);
      log += this.name + " current health: " + this.health + "\n";
      console.log(this.name + " current health: " + this.health);
    } else {
      log += this.name + " can't heal! \n";
      console.log(this.name + " can't heal!");
    }
    alert(log); log = "";
  }
  this.magic = function(objOpp) {
    if (this.status.cast) {
      if (this.status.cast == 1) {
        damage = this.status.mgc;
        objOpp.health -= damage;
        log += this.name + " deal " + damage + " magic damage" + "\n";
        console.log(this.name + " deal " + damage + " magic damage");
        if (objOpp.health >= 0) {
          log += objOpp.name + " health: " + objOpp.health + "\n";
          console.log(objOpp.name + " health: " + objOpp.health);
        } else {
          log += objOpp.name + " health: " + 0 + "\n";
          console.log(objOpp.name + " health: " + 0);
        }
        this.status.cast = 2;
      } else {
        log += "Casting the magic spell..." + "\n";
        console.log("Casting the magic spell...")
        this.status.cast = 1;
      }
    } else {
      log += this.name + " can't cast magic!" + "\n";
      console.log(this.name + " can't cast magic!");
    }
    alert(log); log = "";
  }
}

function attacks(saya,musuh) {
  saya.attack(musuh);
  musuh.attack(saya);
}

function heals(saya,musuh) {
    saya.heal();
    musuh.attack(saya);
}

function magics(saya,musuh) {
    saya.magic(musuh);
    musuh.attack(saya);
}

var mage = {atk:20, def:5, mgc:40, cast:2};
var priest = {atk:15, def:5, holy:15};
var knight = {atk:30, def:8};
var kacung = {atk:10, def:1, mgc:99999, cast:2};
var role = [mage, priest, knight, kacung];

var enemyEasy = {atk:10, def:5};
var enemyMedium = {atk:15, def:5};
var enemyHard = {atk:25, def:10};
var enemyDifficulty = [enemyEasy, enemyMedium, enemyHard];

var name = prompt("What is your name: ");
name? name = name : name = "Fadil Akbar";

var playerRole = prompt("Pick your role: \n" +
                        "--------------------------\n\n" +
                        "mage : Can use 'magic' that deal Huge damage but consumes 2 Turn\n\n" +
                        "priest : Can use 'heal' that will heal 15 lifepoint\n\n" +
                        "knight : Balanced hero with high attack and high defense, but can't do any magic/healing\n\n");
switch (playerRole) {
  case "mage": playerRole = role[0];break;
  case "priest": playerRole = role[1];break;
  case "knight": playerRole = role[2];break;
  default: playerRole = role[3];break;
}

var difficulty = prompt("Pick the difficulty: easy/medium/hard");
switch (difficulty) {
  case "easy": difficulty = enemyDifficulty[0];break;
  case "medium": difficulty = enemyDifficulty[1];break;
  case "hard": difficulty = enemyDifficulty[2];break;
  default: difficulty = enemyDifficulty[0];break;
}

var status = playerRole;
var enName = "Ryan Hakim";
var enStatus = difficulty;

var saya = new obj(name, status);
var musuh = new obj(enName, enStatus);

var input = "";
while (input !== "exit" && saya.health > 0 && musuh.health > 0) {
  if (!saya.status.cast || saya.status.cast == 2) {
    input = prompt("What is your next move: \n" +
                   "--------------------------------\n" +
                   "> attack\n" +
                   "> heal\n" +
                   "> magic\n" +
                   "--------------------------------\n" +
                   "> exit [to EXIT]");
  } else {
    input = prompt("What is your next move: \n" +
                   "--------------------------------\n" +
                   "> attack\n" +
                   "> heal\n" +
                   "> magic   " + "[Magic Ready!]" + "\n" +
                   "--------------------------------\n" +
                   "> exit [to EXIT]");
  }
  switch (input) {
    case "attack": attacks(saya,musuh);break;
    case "heal": heals(saya,musuh);break;
    case "magic": magics(saya,musuh);break;
    default: console.log("...");break;
  }
}

if (saya.health <= 0 && musuh.health <= 0) {
  alert("Draw!");
  console.log("Draw!");
} else if(saya.health <= 0 && musuh.health > 0) {
  alert("You Lose!");
  console.log("You Lose!");
} else if (saya.health > 0 && musuh.health <= 0){
  alert("You Win!");
  console.log("You Win!");
} else {
  alert("...");
  console.log("...");
}
