var kenobi = new Character("kenobi", 6 , 10 );
var luke = new Character("luke", 8 , 15);
var sidious = new Character("sidious",10 , 20);
var maul = new Character("maul",15 , 25);

var game = new Game(kenobi, luke, sidious, maul);

console.log(game);

game.load();


$("#main-container .characters").on("click", function() {
  alert($(this).attr("data-char"));

  for (var i = 0; i < game.characters.length; i++){
    if (game.characters[i].name == $(this).attr("data-char")){
      game.pickMainCharacter(game.characters[i]);
      game.characters.splice(i,0);
    } else {
      game.enemies.push(game.characters[i]);
    }
  }

  for (var i = 0; i < game.enemies.length; i++){
    var charHolder = $("<div>");
    charHolder.addClass("characters");
    charHolder.attr("data-char", game.enemies[i].name);
    charHolder.append("<img src='assets/images/" + game.enemies[i].name + ".jpg' width=150px height=150px />");
    $("#enemies-container").append(charHolder);
  }
  //updates only main character to be reloaded
  $("#main-container").html("<div class='characters'><img src='assets/images/" + game.mainCharacter.name + ".jpg' width=150px height=150px /></div>");

  $(function(){
    $('#enemies-container .characters').on("click", function() {
      alert($(this).attr("data-char"));
      $("#enemies-container").html("");

      for (var i = 0; i < game.enemies.length; i++){
        if (game.enemies[i].name == $(this).attr("data-char")){
          game.pickEnemy(game.enemies[i]);

          $("#arena").html("<div class='characters'><img src='assets/images/" + game.enemies[i].name + ".jpg' width=150px height=150px /></div>");
        } else {

          var charHolder = $("<div>");
          charHolder.addClass("characters");
          charHolder.attr("data-char", game.enemies[i].name);
          charHolder.append("<img src='assets/images/" + game.enemies[i].name + ".jpg' width=150px height=150px />");
          $("#enemies-container").append(charHolder);

        }
      }





    });
  })

});




  function Character (name, attack , counterAttack){
    this.name = name;
    this.HealthPoints = 100;
    this.AttackPower  = attack;
    this.CounterAttackPower = counterAttack;
  }

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
   this.pickEnemy = function (character){
     this.enemy = character;
   };

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
