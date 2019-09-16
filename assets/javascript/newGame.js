// Execute this code when the document is laoded
$(document).ready(function () {
    // Create object to hold characters.
    var players = {
        "rose": {
            name: "rose",
            health: 100,
            attack: 5,
            imageUrl: "assets/images/roses.png",
            react: 10
        },
        "hydrangeas": {
            name: "hydrangeas",
            health: 100,
            attack: 5,
            imageUrl: "assets/images/hydrangeas.png",
            react: 10
        },
        "bush": {
            name: "bush",
            health: 100,
            attack: 5,
            imageUrl: "assets/images/bush.png",
            react: 10
        },
        "sunflower": {
            name: "sunflower",
            health: 100,
            attack: 5,
            imageUrl: "assets/images/sunflower.png",
            react: 10
        }
    };


    var startGame = function () {

        //
        $("#players>div>div>.flower").addClass("selectable");
        //
        $("#opponents").hide();

        //
        var selected = false;
        console.log(selected);
        //
        if (selected == false) {
            $("#players>div>div>.flower").click(function () {
                selected = true;
                $(this).addClass("selected");
                $("#players>div>div>.flower").removeClass("selectable");
                $("#opponents").show();
                $("#players").hide();
                $(this).show();
            })
        } else {
            $("#players").show();
        };

    };
    startGame();
});