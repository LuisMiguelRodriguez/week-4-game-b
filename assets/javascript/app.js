var kenobi = new Character("kenobi", 8, 120);
var luke = new Character("luke",5, 100);
var sidious = new Character("sidious",20, 150);
var maul = new Character("maul",25, 180);

var game = new Game(kenobi, luke, sidious, maul);

console.log(game);

game.load();


$("#main-container .characters").on("click", function() {
  game.characterChosen = true;
  //Modal Popup showing which character was chosen
  var character = $(this).attr("data-char");
  $("#modalBody").html("You have Chosen " + character);
  $('#modal').modal('show');
   //declaring a variable before loop to hold index of character to
   //remove and also placing the splice method outside of the loop
   //to not change the size of the array while looping
  var spliceHolder;

  // Puts chosen Character as the main character and puts the rest of the
  // characters into the an enemies array
  for (var i = 0; i < game.characters.length; i++){
   if (game.characters[i].name == $(this).attr("data-char")){
     game.pickMainCharacter(game.characters[i]);
     //remove main character from the array
     spliceHolder = i;
     console.log(game.characters);
   } else {
     game.enemies.push(game.characters[i]);
   }

  }
  //Remove chosen character out of the characters array
  game.characters.splice(spliceHolder,1);

  game.loadEnemies();

 //updates only main character to be reloaded
 game.loadMainCharacter();

 $('#enemies-container .characters').on("click", function() {

   game.enemyChosen = true;
   //Modal Popup showing which character was chosen
   var character = $(this).attr("data-char");
   $("#modalBody").html("You have chosen to fight " + character);
   $("#modal .modal-title").html("Chosen Enemy");
   $('#modal').modal('show');

   $("#enemies-container").html("");

   var spliceHolder;

   for (var i = 0; i < game.enemies.length; i++){
     if (game.enemies[i].name == $(this).attr("data-char")){
       game.pickEnemy(game.enemies[i]);
       game.loadEnemy();
       spliceHolder = i;

     } else {

       var charHolder = $("<div>");
       charHolder.addClass("characters");
       charHolder.attr("data-char", game.enemies[i].name);
       charHolder.attr("data-hp", game.enemies[i].HealthPoints);
       charHolder.append("<div class='ap'><h4>Health: "+ game.enemies[i].HealthPoints +"</h4></div>");
       charHolder.append("<img src='assets/images/" + game.enemies[i].name + ".jpg' width=150px height=150px />");
       $("#enemies-container").append(charHolder);

     }
   }

   //remove from the enemies array
   game.enemies.splice(spliceHolder, 1);
 });


});

//******************************************************************************
//************************* Attack ON CLICK ************************************
//******************************************************************************

$("#attack").on("click", function () {

  if(game.characterChosen && game.enemyChosen){
    // Shows Flashing of enemy box
    $('#arena').toggleClass('animated flash');
    // Removes flashing class as to be able re add it when clicked again
    setTimeout(function(){ $('#arena').removeClass('animated flash'); },500);

    var attack = game.mainCharacter.AttackPower;
    game.mainCharacter.totalAttackPower += attack;

    var totalAttack = game.mainCharacter.totalAttackPower;
    game.enemy.HealthPoints -= totalAttack;

    game.loadEnemy();
    game.loadFightStats();


    console.log("this is current attack level " + attack);
    console.log("this is current total attack point " + totalAttack);

    var enemyLife = game.enemy.HealthPoints;
    game.mainCharacter.HealthPoints -= game.enemy.AttackPower;

    game.loadMainCharacter();

    if(game.enemy.HealthPoints <= 0 && game.enemies.length > 0 && game.mainCharacter.HealthPoints > 0){
     // clear the arena

      $('#arena').html("<div class='text-center'><h2>Please Choose Another Opponent</h2></div>");

      //
      $(function(){
        $('#enemies-container .characters').on("click", function() {

          //Modal Popup showing which character was chosen
          var character = $(this).attr("data-char");
          $("#modalBody").html("You have chosen " + character + " for you next opponent");
          $("#modal .modal-title").html("Next Enemy");
          $('#modal').modal('show');
          $("#enemies-container").html("");

          var indexPlaceholder ;

          for (var i = 0; i < game.enemies.length; i++){
            if (game.enemies[i].name == $(this).attr("data-char")){
              game.pickEnemy(game.enemies[i]);
              var indexPlaceholder = i;

              game.loadEnemy();
            } else {

              var charHolder = $("<div>");
              charHolder.addClass("characters");
              charHolder.attr("data-char", game.enemies[i].name);
              charHolder.append("<img src='assets/images/" + game.enemies[i].name + ".jpg' width=150px height=150px />");
              $("#enemies-container").append(charHolder);

            }
          }

          //removes newest enemy chosen from enemies array
          //needed to place this outside the loop
          //also needed to declare a variable to hold the index before the
          //array and then added a value to it in the loop
          game.enemies.splice(indexPlaceholder, 1);
        });
      })

    } else if (game.enemies.length == 0 && game.mainCharacter.HealthPoints > 0){
      game.mainCharacter.totalAttackPower = 0;
      alert("You WIN");
      $("#arena").html("<button onclick='location.reload()' class='btn btn-primary btn-lg'>Restart Game</button>");
      $('#main-container').html("");
    } else if (game.mainCharacter.HealthPoints <= 0){
      alert("You Loose");
      $("#arena").html("<button onclick='location.reload()' class='btn btn-primary btn-lg'>Restart Game</button>");
      $('#main-container').html("");
    }

    console.log(enemyLife);
    console.log(game.enemy.HealthPoints);
  } else {
    alert("Please Choose A Player first ");
  }

});

//*******************************************************************
//*********************  FUNCTION    ********************************
//*******************************************************************


function Character (name, attack , health){
  this.name = name;
  this.HealthPoints = health;
  this.AttackPower  = attack;
  this.totalAttackPower = 0;
}

function Game (char1, char2, char3, char4) {
 this.loadEnemies = function (){
   for (var i = 0; i < this.enemies.length; i++){
     var charHolder = $("<div>");
     charHolder.addClass("characters");
     charHolder.attr("data-char", this.enemies[i].name);
     charHolder.attr("data-hp", this.characters[i].HealthPoints);
     charHolder.append("<div class='ap'><h4>Health: "+ this.characters[i].HealthPoints +"</h4></div>");
     charHolder.append("<img src='assets/images/" + this.enemies[i].name + ".jpg' width=150px height=150px />");
     $("#enemies-container").append(charHolder);
   }
 };
 this.pickMainCharacter = function(){};
 this.clickMainContainer = function (){};
 this.load = function() {
   // Loops thru characters array and creates a div with a class to give it its shape
   // and a data attr thats the characters name as well as an image
   for (var i = 0; i < this.characters.length; i++){

     var charHolder = $("<div>");
     charHolder.addClass("characters");
     charHolder.attr("data-char", this.characters[i].name);
     charHolder.attr("data-ap", this.characters[i].HealthPoints);
     charHolder.append("<img src='assets/images/" + this.characters[i].name + ".jpg' width=150px height=150px />");
     charHolder.append("<div class='ap'><h4>Health: "+ this.characters[i].HealthPoints +"</h4></div>");
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
 this.loadMainCharacter = function() {
   var charHolder = $("<div>");
   charHolder.addClass("characters");
   charHolder.attr("data-char", this.mainCharacter.name);
   charHolder.attr("data-hp", this.mainCharacter.HealthPoints);
   charHolder.append("<div class='ap'><h4>Health: "+ this.mainCharacter.HealthPoints +"</h4></div>");
   charHolder.append("<img src='assets/images/" + this.mainCharacter.name + ".jpg' width=150px height=150px />");

   $("#main-container").html(charHolder);

 };
 this.loadEnemy = function () {
   var charHolder = $("<div>");
   charHolder.addClass("characters");
   charHolder.attr("data-char", game.enemy.name);
   charHolder.attr("data-hp", game.enemy.HealthPoints);
   charHolder.append("<div class='ap'><h4>Health: "+ game.enemy.HealthPoints +"</h4></div>");
   charHolder.append("<img src='assets/images/" + game.enemy.name + ".jpg' width=150px height=150px />");
   $("#arena").html(charHolder);
 };
 this.loadFightStats = function () {
   $("#arenaFooter").html("<h2 id='arenaFooter'class='shadow text-center'>Arena</h2>");
   $("#arenaFooter").append("<h3>You have attacked "+ game.enemy.name + " for "+ game.mainCharacter.totalAttackPower +" Points </h3>");
   $("#arenaFooter").append("<h3>You have been attacked by "+ game.enemy.name + " for "+ game.enemy.AttackPower +" Points </h3>");
 };
 this.characterChosen = false;
 this.enemyChosen = false;

}
