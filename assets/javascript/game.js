$(document).ready(function () {
    var characters = {
        "rose": {
            name: "rose",
            health: 100,
            attack: 5,
            imageUrl: "assets/images/roses.png",
            enemyAttackBack: 10
        },
        "hydrangeas": {
            name: "hydrangeas",
            health: 100,
            attack: 5,
            imageUrl: "assets/images/hydrangeas.png",
            enemyAttackBack: 10
        },
        "bush": {
            name: "bush",
            health: 100,
            attack: 5,
            imageUrl: "assets/images/bush.png",
            enemyAttackBack: 10
        },
        "sunflower": {
            name: "sunflower",
            health: 100,
            attack: 5,
            imageUrl: "assets/images/sunflower.png",
            enemyAttackBack: 10
        }
    };

    // Will be populated when the player selects a character.
    var attacker = null;
    // Populated with all the characters the player didn't select.
    var combatants = [];
    // Will be populated when the player chooses an opponent.
    var defender = null;
    // Will keep track of turns during combat. Used for calculating player damage.
    var turnCounter = 1;
    // Tracks number of defeated opponents.
    var killCount = 0;
    //

    $("#restart").click(function () {
        location.reload();
    });
    //


    var renderCharacter = function (character, renderArea) {
        // This block of code builds the character card, and renders it to the page.
        var colDiv = $("<div>").attr("class", "col text-center");
        var charDiv = $("<div class='character align-self-center' id='" + character.name + "'>");
        var charText = $("<div class='card-title'>").text(character.name + " | " + character.health);
        var charImage = $("<img class='character-image flower rounded-circle img-fluid'>").attr("alt", character.name).attr("src", character.imageUrl);
        // Attach image and then text to the div
        charDiv.append(charImage).append(charText);
        //attach div to column div
        colDiv.append(charDiv);
        // append assembled div object to defined render area
        $(renderArea).append(colDiv);
    };

    // this function will load all the characters into the character section to be selected
    var initializeGame = function () {
        $("#restart").hide();
        $("#chooseAPlayer").empty();
        // Loop through the characters object and call the renderCharacter function on each character to render their card.
        for (var key in characters) {
            // Generate random health between 100 and 200 pts at the start of each game
            characters[key].health = 100 + Math.floor(Math.random() * 100);
            //Render each characteer in the character object to the chooseAPlayer div
            renderCharacter(characters[key], "#chooseAPlayer");
        }
    };

    // Do as the function is named:
    initializeGame();

    // This function handles updating the selected player or the current defender.
    // If there is no selected player/defender this function will also place the character based on the areaRender chosen 
    var updateCharacter = function (charObj, areaRender) {
        // First we empty the area so that we can re-render the new object
        $(areaRender).empty();
        renderCharacter(charObj, areaRender);
    };

    // This function will render the available-to-attack enemies. This should be run once after a character has been selected
    var renderEnemies = function (enemyArr) {
        $("#chooseAPlayer").empty();
        $("#chooseAnOpponent").empty();
        for (var i = 0; i < enemyArr.length; i++) {
            renderCharacter(enemyArr[i], "#chooseAnOpponent");
        }
    };

    // Function to handle rendering game messages.
    var renderMessage = function (message) {
        // Builds the message and appends it to the page.
        var gameMessageSet = $("#gameMessage");
        var newMessage = $("<div>").text(message);
        gameMessageSet.append(newMessage);
    };

    // Function which handles restarting the game after victory or defeat.
    var restartGame = function (resultMessage) {
        // When the 'Restart' button is clicked, reload the page.
        // var gameState = $("<div>").text(resultMessage);
        $("#grow").hide();
        $("#restart").show();
        renderMessage(resultMessage);
        // Render the restart button and victory/defeat message to the page.
        // $("body").append(gameState);
    };

    // Function to clear the game message section
    var clearMessage = function () {
        var gameMessage = $("#gameMessage");
        gameMessage.text("");
    };

    // ===================================================================

    // On click event for selecting our character.
    $("#chooseAPlayer").on("click", ".character", function () {
        // Saving the clicked character's name.
        // If a player character has not yet been chosen...
        if (!attacker && !defender) {
            var name = $(this).attr("id");
            // We populate attacker with the selected character's information.
            attacker = characters[name];
            // We then loop through the remaining characters and push them to the combatants array.
            for (var key in characters) {
                if (key !== name) {
                    combatants.push(characters[key]);
                }
            }

            // Hide the character select div.
            $("#chooseAPlayer").empty();

            // Then render our selected character and our combatants.
            updateCharacter(attacker, "#attacker");
            renderEnemies(combatants);

        }

    });

    // Creates an on click event for each enemy.
    $("#chooseAnOpponent").on("click", ".character", function () {
        // Saving the opponent's name.
        var name = $(this).attr("id");

        // If there is no defender, the clicked enemy will become the defender.
        if ($("#opponent").children().length === 0) {
            defender = characters[name];
            updateCharacter(defender, "#opponent");

            // remove element as it will now be a new defender
            $(this).remove();
            clearMessage();
        }
    });

    // When you click the attack button, run the following game logic...
    $("#grow").on("click", function () {
        // If there is a defender, combat will occur.
        if ($("#opponent").children().length !== 0) {
            // Creates messages for our attack and our opponents counter attack.
            var attackMessage = "You attacked " + defender.name + " for " + attacker.attack * turnCounter + " damage.";
            var counterAttackMessage = defender.name + " attacked you back for " + defender.enemyAttackBack + " damage.";
            clearMessage();

            // Reduce defender's health by your attack value.
            defender.health -= attacker.attack * turnCounter;

            // If the enemy still has health..
            if (defender.health > 0) {
                // Render the enemy's updated character card.
                updateCharacter(defender, "#opponent");

                // Render the combat messages.
                renderMessage(attackMessage);
                renderMessage(counterAttackMessage);

                // Reduce your health by the opponent's attack value.
                attacker.health -= defender.enemyAttackBack;

                // Render the player's updated character card.
                updateCharacter(attacker, "#selected.row");

                // If you have less than zero health the game ends.
                // We call the restartGame function to allow the user to restart the game and play again.
                if (attacker.health <= 0) {
                    clearMessage();
                    restartGame("You have been outgrown... Round Over!");
                    $("#attack-button").off("click");
                }
            } else {
                // If the enemy has less than zero health they are defeated.
                // Remove your opponent's character card.
                $("#opponent").empty();

                var gameStateMessage = "You have outgrown " + defender.name + ", choose another plant to fight.";
                renderMessage(gameStateMessage);

                // Increment your kill count.
                killCount++;

                // If you have killed all of your opponents you win.
                // Call the restartGame function to allow the user to restart the game and play again.
                if (killCount >= combatants.length) {
                    clearMessage();
                    $("#attack-button").off("click");
                    restartGame("You Won!!!! GAME OVER!!!");
                }
            }
            // Increment turn counter. This is used for determining how much damage the player does.
            turnCounter++;
        } else {
            // If there is no defender, render an error message.
            clearMessage();
            renderMessage("No plant to fight, pick another above!");
        }
    });
});