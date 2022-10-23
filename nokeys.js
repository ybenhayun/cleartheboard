var letters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M"];
var letters_used;
var score;

$(document).ready(function(){
    restart();
    angleKeyboard();
    
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
        } else {
            pressedLetter(key);
        }
    });

    $(document).keyup(function(e) {
        if (e.keyCode == 8) {
            hitDelete($("#word").html());
        }
    });

    $(window).resize(function() {
		angleKeyboard();
	});
});

function angleKeyboard() {
    // 1110 --> 20deg
    // 425 --> 0deg 
    let keyboard = document.getElementById('keyboard');
    let width = screen.width;
    let degree = Math.min(20, width/45-10);

    keyboard.style.transform = 'perspective(500px) rotateX('+ degree+ 'deg)';

}

function pressedLetter(letter) {
    $("#" + letter).removeClass('pressed-backspace');
    $("#" + letter).addClass('pressed-letter');
            
    if (!letters_used.includes(letter)) $("#word").append(letter);
}

function hitEnter(word) {
    let is_word = (words.includes(word))
    
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
    if (score == 0) {
        $(".points").html("nice");
    } else {
        $(".points").html(score + " letters"); 
    }
}

function hitDelete(word) {
    let letter = word.at(-1);
    $("#word").html(word.slice(0, -1));

    if (!$("#word").html().includes(letter)) {
        $("#" + letter).removeClass('pressed-letter');
        $("#" + letter).addClass('pressed-backspace');
    }
}

function restart() {
    let row = ".top";
    $(row).empty();

    for (let i = 0; i < 26; i++) {
        if (i == 10 || i == 19) {
            if (i == 10) row = ".middle";
            else row = ".bottom";
            
            $(row).empty();
        }
        $(row).append("<div class = 'key'><div id = " + letters[i] + " class = 'letter'> " + letters[i] + " </div></div>");
    }
    $(row).prepend("<div class = 'key'><div id = 'enter'>ENTER</div></div>");
    $(row).append("<div class = 'key'><div id = 'backspace'><i class='material-icons'>backspace</i></div></div>");

    // $('.keyboard-functions').empty();
    // $('.keyboard-functions').append("<div class = 'key'><div id = 'enter'>ENTER</div></div>");
    // $('.keyboard-functions').append("<div class = 'key'><div id = 'spacebar'>RESET</div></div>")
    // $('.keyboard-functions').append("<div class = 'key'><div id = 'backspace'><i class='material-icons' style='font-size:1rem'>backspace</i></div></div>");

    score = 26;
    letters_used = [];
    words = word_list.slice();

    $(".points").remove();
    $("#score").append("<div class = 'points'>" + score + " letters</div>")
    $("#word").empty();
}