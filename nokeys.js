var letters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];
var used;
var score;

$(document).ready(function(){
    restart();

    $(document).keypress(function(e) {
        if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122)) {
            var letter = String.fromCharCode(e.which).toUpperCase();
            $("#" + letter).removeClass('backspace');
            $("#" + letter).addClass('keypress');

            if (!used.includes(letter)) $("#word").append(letter);
        } else if (e.keyCode == 32 || e.keyCode == 13) {
            if (!word_list.includes($("#word").html()) && !word_list.includes($("#word").html().toLowerCase())) {
                var is_word = false;
            } else is_word = true;
            $("#word").empty();

            for (var i = 65; i <= 90; i++) {
                var letter = String.fromCharCode(i).toUpperCase();

                if ($("#" + letter).css("background-color") != "rgb(43, 43, 43)") {
                    if (is_word) {
                        if (!used.includes(letter)) used.push(letter);
                        $("#" + letter).remove();
                    } else {
                        $("#" + letter).removeClass('keypress');
                    }
                }
            }

            score = 26 - used.length;
            $(".points").html(score + " letters");
        }
    });
    
    $(".key").click(function() {
        var key = $(this).children().first().attr('id');
        console.log(key);

        if (key == 'clear') {
            var word = $("#word").html();
            var letter = word.at(-1);
            $("#word").html(word.slice(0, -1));

            if (!$("#word").html().includes(letter)) {
                $("#" + letter).removeClass('keypress');
                $("#" + letter).addClass('backspace');
            }
        } else if (key == 'enter') {
            if (!word_list.includes($("#word").html()) && !word_list.includes($("#word").html().toLowerCase())) {
                var is_word = false;
            } else is_word = true;
            $("#word").empty();

            for (var i = 65; i <= 90; i++) {
                var letter = String.fromCharCode(i).toUpperCase();

                if ($("#" + letter).css("background-color") != "rgb(43, 43, 43)") {
                    if (is_word) {
                        if (!used.includes(letter)) used.push(letter);
                        $("#" + letter).remove();
                    } else {
                        $("#" + letter).removeClass('keypress');
                    }
                }
            }

            score = 26 - used.length;
            $(".points").html(score + " letters");
        } else {
            $("#" + key).removeClass('backspace');
            $("#" + key).addClass('keypress');
            
            if (!used.includes(key)) $("#word").append(key);
        }
    });



    $(document).keyup(function(e) {
        if (e.keyCode == 8) {
            var word = $("#word").html();
            var letter = word.at(-1);
            $("#word").html(word.slice(0, -1));

            if (!$("#word").html().includes(letter)) {
                $("#" + letter).removeClass('keypress');
                $("#" + letter).addClass('backspace');
            }
        }
    });

    $("button").click(function(e) {
        if (e.keyCode != 13 || e.keyCode != 32) restart();
    });
});

function restart() {

    var row = ".top";
    $(row).empty();

    for (let i = 0; i < 26; i++) {
        if (i == 10 || i == 19) {
            if (i == 10) row = ".middle";
            else row = ".bottom";
            
            $(row).empty();
        }
        $(row).append("<div class = 'key'><div id = " + letters[i] + " class = 'letter'> " + letters[i] + " </div></div>");
    }

    $('.bottom').append("<div class = 'key'><div id = 'clear'><i class='material-icons' style='font-size:1rem'>backspace</i></div></div>");
    $('.bottom').prepend("<div class = 'key'><div id = 'enter'> ENTER</div></div>")

    score = 26;
    used = [];
    $(".points").remove();
    $("#score").append("<div class = 'points'>" + score + " letters</div>")
}