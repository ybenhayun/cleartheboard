var letters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];
var letters_used;
var score;

$(document).ready(function(){
    restart();

    $(document).keypress(function(e) {
        if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122)) {
            var letter = String.fromCharCode(e.which).toUpperCase();
            pressedLetter(letter);
        } else if (e.keyCode == 13) {
            hitEnter($("#word").html());
        } else if (e.keyCode == 32) {
            restart();
        }
    });
    
    $(document).on('click', '.key', function() {
        var key = $(this).children().first().attr('id');

        if (key == 'backspace') {
            hitDelete($("#word").html());
        } else if (key == 'enter') {
            hitEnter($("#word").html());
        } else if (key == 'spacebar') {
            restart();  
        } else {
            pressedLetter(key);
        }
    });

    $(document).keyup(function(e) {
        if (e.keyCode == 8) {
            hitDelete($("#word").html());
        }
    });
});

function setFontSize() {
    console.log($("#keyboard").height());
}

function pressedLetter(letter) {
    $("#" + letter).removeClass('pressed-backspace');
    $("#" + letter).addClass('pressed-letter');
            
    if (!letters_used.includes(letter)) $("#word").append(letter);
}

function hitEnter(word) {
    if (!word_list.includes(word) && !word_list.includes(word.toLowerCase())) {
        var is_word = false;
    } else is_word = true;

    $("#word").empty();
    
    for (var i = 0; i <= word.length; i++) {
        var letter = word.charAt(i);
        if (is_word) {
            if (!letters_used.includes(word.charAt(i)) && word.charAt(i) != '') { 
                letters_used.push(word.charAt(i));
            }

            $("#" + word.charAt(i)).removeClass('pressed-letter');
            $("#" + word.charAt(i)).addClass('remove-letter');
        } else {
            $("#" + word.charAt(i)).removeClass('pressed-letter');
            $("#" + word.charAt(i)).addClass('pressed-backspace');
        }
    }
    
    score = 26 - letters_used.length;
    $(".points").html(score + " letters");
}

function hitDelete(word) {
    var letter = word.at(-1);
    $("#word").html(word.slice(0, -1));

    if (!$("#word").html().includes(letter)) {
        $("#" + letter).removeClass('pressed-letter');
        $("#" + letter).addClass('pressed-backspace');
    }
}

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
    $('.keyboard-functions').empty();
    $('.keyboard-functions').append("<div class = 'key'><div id = 'enter'>ENTER</div></div>");
    $('.keyboard-functions').append("<div class = 'key'><div id = 'spacebar'>RESET</div></div>")
    $('.keyboard-functions').append("<div class = 'key'><div id = 'backspace'><i class='material-icons' style='font-size:1rem'>backspace</i></div></div>");

    score = 26;
    letters_used = [];
    $(".points").remove();
    $("#score").append("<div class = 'points'>" + score + " letters</div>")
    $("#word").empty();
}