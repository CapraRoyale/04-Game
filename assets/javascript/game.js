//on page load
$(document).ready(function() {
    // console.log("page loaded");
    var firstPlayer = false;
    var secondPlayer = false;
    var flowers = ["rose", "hydrangea", "bush", "sunflower"];
    // Assign character's HP, Attack, Defense points
    var assignScores = function() {
            for (let i = 0; i < flowers.length; i++) {
                $(".hp").text(Math.floor(Math.random() * 10));
                $(".attack").text(Math.floor(Math.random() * 10));
                $(".defense").text(Math.floor(Math.random() * 10));
            }
        }
        //User clicks character
    if (firstPlayer === false) {
        $(".flower").click(function() {
            //Remaining characters moved to "Defender Zone"
            $(this).detach().appendTo(".colosseum>.arena1").attr("class", "align-items-end");
            console.log("clicked flower1");
            firstPlayer = true;
        });
    }
    if (secondPlayer === ) {
        $(".flower").click(function() {
            //Remaining characters moved to "Defender Zone"
            $(this).detach().appendTo(".colosseum>.arena2").attr("class", "align-items-end");
            console.log("clicked flower2");
            secondPlayer = true;
        });
    }
});
//User clicks 1 of 3 remaining Characters to 'Attack'
//"Attack" button appears
//User Clicks 'Attack' button
//