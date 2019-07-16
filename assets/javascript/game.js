//on page load
$(document).ready(function() {
    // console.log("page loaded");
    var firstPlayer = false;
    var secondPlayer = false;
    // Assign character's HP, Attack, Defense points

    $(".hp").text(Math.floor(Math.random() * 10));
    $(".attack").text(Math.floor(Math.random() * 10));
    $(".defense").text(Math.floor(Math.random() * 10));
    //User clicks character
    if (firstPlayer === true || secondPlayer === true) {
        null;
    } else if (firstPlayer === false) {
        $(".flower").click(function() {
            //Remaining characters moved to "Defender Zone"
            $(this).detach().appendTo(".colosseum>.arena1").attr("class", "align-items-end");
            console.log("clicked flower1");
            firstPlayer = true;
        });
    } else {
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