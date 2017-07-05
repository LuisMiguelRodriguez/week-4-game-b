var kenobi = new Character("kenobi", 6 , 10 );
var luke = new Character("luke", 8 , 15);
var sidious = new Character("sidious",10 , 20);
var maul = new Character("maul",15 , 25);

var game = new Game(kenobi, luke, sidious, maul);

console.log(game);

game.load();



function Character (name, attack , counterAttack){
  this.name = name;
  this.HealthPoints = 100;
  this.AttackPower  = attack;
  this.CounterAttackPower = counterAttack;
}

 var kenobi = new Character( 6 , 10 );
 var luke = new Character(8 , 15);
 var sidious = new Character(10 , 20);
 var maul = new Character(15 , 25);



 function Game (char1, char2, char3, char4) {
   this.load = function() {
    for (var i = 0; i < this.characters.length; i++){
      var charHolder = $("<div>");
      charHolder.addClass("characters");
      charHolder.attr("data-char", this.characters[i].name);
      charHolder.append("<img src='assets/images/" + this.characters[i].name + ".jpg' width=150px height=150px />");
      $("#main-container").append(charHolder);
    }

   };
   this.pickMainCharacter = function (character){
     this.mainCharacter = character;
   };
   this.characters = [char1, char2, char3, char4];
   this.enemies = [];

 }

// game starts when character is chosen
//
// when character is picked it gets moved under character label
// and all other characters go under the enemies label or inside of arena
//
//
// when attack button is pressed characters life is subtracted by enemies attach
// strength and enemies life gets subtracted by character attack points
//
