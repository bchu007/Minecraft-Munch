var firstCardClicked = null;
var secondCardClicked = null;
var attempts = 0;
var games_played = 0;
var matches = 0;
var flipping = false;
var totalCards = 0;
var max_matches = 18;
var cardsFlipped = 0;

var health = 15;
var hunger = 15;
var maxhealth = 15;
var maxhunger = 15;

$(document).ready( InitalizeApp );

function InitalizeApp() {
    $(".death-modal").addClass("hidden");
    $('.lfz-back').removeClass("hidden");
    setHealth(health, maxhealth);
    setHunger(hunger, maxhunger);
    health = maxhealth;
    hunger = maxhunger;
    shuffleCards();
    // debugger;
    var select = $('.lfz-back').on('click', handlecardclick);
    $('#replay').on('click', replay);
    $('#death').on('click', InitalizeApp);
    
}  

function energyReduction() {
    hunger = Math.max(0, hunger - 1.5);
    setHunger(hunger, maxhunger);
    if(hunger === 0) {
        health = Math.max(0, health - 2.0);
        setHealth(health, maxhealth);
        
    }
}

function death() {
    replay();
    games_played = 0;
}
function healthReturn(fooditem) {
    
    var item = ['apple', 'bakedpotato', 'beetroot', 'bread', 'cake', 'carrot', 
    'cookedcod', 'cookedmutton', 'cookedrabbit', 'cookedsalmon', 
    'cookie', 'driedkelp', 'goldenapple', 'goldencarrot', 'melonslice', 
    'mushroomstew', 'poisonouspotato', 'potato', 'steak', 'suspiciousstew', 
    'sweetberries']
    var value = [2, 4, 1, 4, 7, 1, 2, 3, 2, 3, 4, 1, 15, 15, 1, 3, -10, 4, 0, -10, 2];
    hunger = Math.min(value[item.indexOf(fooditem[0].classList[1])] + hunger + 4, maxhealth);
    setHunger(hunger, maxhunger);

}



function setHealth(health, maxHealth) {
    $('#health-value').empty();
    for(var i = 0; i < Math.floor(health); i++) {
        $('<img/>').attr('src', 'assets/images/minecraft/self_heart.svg').appendTo('#health-value');
    }

    if(health % 1 > 0) {
        $('<img/>').attr('src', 'assets/images/minecraft/self_half_heart.svg').appendTo('#health-value');
    }

    var emptyHearts = Math.max(0, maxHealth - health);
    for(var i = 0;  i < Math.floor(emptyHearts); i++) {
        $('<img/>').attr('src', 'assets/images/minecraft/self_empty_heart.svg').appendTo('#health-value');
    }

}


function setHunger(hunger, maxHunger) {
    console.log('test');
    $('#hunger-value').empty();
    for(var i = 0; i < Math.floor(hunger); i++) {
        $('<img/>').attr('src', 'assets/images/minecraft/self_hunger.svg').appendTo('#hunger-value');
    }

    if(hunger % 1 > 0) {
        $('<img/>').attr('src', 'assets/images/minecraft/self_half_hunger.svg').appendTo('#hunger-value');
    }

    var empty_hunger = Math.max(0, maxHunger - hunger);
    for(var i = 0;  i < Math.floor(empty_hunger); i++) {
        $('<img/>').attr('src', 'assets/images/minecraft/self_empty_hunger.svg').appendTo('#hunger-value');
    }
}

function gameover() {
    console.log("gameover");
    $(".death-modal").removeClass("hidden");
    $('.lfz-back').off('click', handlecardclick)
    $('button#death').on('click', )
}

function handlecardclick() {
    var select = $(event.currentTarget);

    if (flipping) {
        //do nothing
    }
    else if(firstCardClicked === null) {
        $(this).addClass('hidden');
        firstCardClicked = select;
        // console.log("first", firstCardClicked);
        energyReduction();
    }
    else if (secondCardClicked === null){
        $(this).addClass('hidden');
        secondCardClicked = select;
        // console.log("second", secondCardClicked);
        energyReduction();
    
    

        if(secondCardClicked !== null) {
            var firstpath = firstCardClicked.prev().css("background-image");
            var secondpath = secondCardClicked.prev().css("background-image");
            attempts++;
            
            //game logic
            if(firstpath !== secondpath) {
                flipping = true;
                
                setTimeout(hide, 500);
                flipping = false;
            }
            else {
                matches++;

                cardsFlipped += 2;
                healthReturn(firstCardClicked.prev());
                setTimeout(eat, 600, firstCardClicked, secondCardClicked);
                firstCardClicked = null;
                secondCardClicked = null;  
                
                if(max_matches === matches) {
                    $(".modal").removeClass("hidden");
                    $('.lfz-back').off('click', handlecardclick);
                }
            }
            displayStats();
            if(health === 0) {
                gameover();
            }
            else if (hunger === maxhunger) {
                health = Math.min(health + 4, maxhealth);
                setHealth(health, maxhealth);
            }
            
        }
    }
    
}



function randomizeArray(array, len) {
    var tempArr = array;
    var finalArr = [];
    for(var i = 0; i < len; i++) {
        var index = Math.floor(Math.random() * array.length);
        var pick = tempArr.splice(index, 1);
        finalArr.push(pick[0]);
    }
    return finalArr;
}

function randomMatch(items, len) {
    var foods = items;
    var randomfoods = []

    while(foods.length < len/2) {
        foods = foods.concat(items)
    }

    allfoods = randomizeArray(foods, Math.floor(len/2));    
    allfoods = allfoods.concat(allfoods);
    allfoods = randomizeArray(allfoods, allfoods.length)
    return allfoods;
}

function shuffleCards() {
    var item = ['apple', 'bakedpotato', 'beetroot', 'bread', 'cake', 'carrot', 'cookedcod', 'cookedmutton', 'cookedrabbit', 'cookedsalmon', 'cookie', 'driedkelp', 'goldenapple', 'goldencarrot', 'melonslice', 'mushroomstew', 'poisonouspotato', 'potato', 'steak', 'suspiciousstew', 'sweetberries'];
    var randitem = randomMatch(item, $('.lfz-card').length);
    var forest = [
        'driedkelp', 
        'apple', 
        'poisonouspotato', 
        'sweetberries',
        'suspiciousstew',
        'steak'];
        
    var house = [
        'potato', 
        'mushroomstew', 
        'carrot', 
        'beetroot', 
        'melonslice'];
        
    var manor = [
        'cookedcod', 
        'cookedmutton', 
        'cookedrabbit', 
        'cookedsalmon', 
        'bakedpotato', 
        'cookie', 
        'bread', 
        'cake'];
        
    var treasure = [
        'goldenapple', 
        'goldencarrot'];

    cardsFlipped = 0;
    totalCards = $('.lfz-card').length;
    $('.lfz-card').each(function(index) {
        var y = $(this).addClass(randitem[index]);

        if(forest.includes(randitem[index])) {
            $(this).next().addClass('forest')
        }
        else if(house.includes(randitem[index])) {
            $(this).next().addClass('house')
        }
        else if(manor.includes(randitem[index])) {
            $(this).next().addClass('manor')
        } 
        else if(treasure.includes(randitem[index])) {
            $(this).next().addClass('treasure')
        }
        
        // console.log(y, item[i], i);
    });
}

function hide() {
    firstCardClicked.removeClass("hidden");
    secondCardClicked.removeClass("hidden");
    firstCardClicked = null;
    secondCardClicked = null;

}

function calculateAccuracy() {
    return matches / attempts * 100;
}

function displayStats() {
    console.log('stats', attempts, games_played, matches)
    $('#attempt-value').text(attempts);
    $('#games-played-value').text(games_played);
    $('#accuracy-value').text(calculateAccuracy().toFixed(2) + '%');
}

function replay() {

    
    firstCardClicked = null;
    secondCardClicked = null;
    attempts = 0;
    games_played++;
    matches = 0;
    flipping = false;
    totalCards = 0;
    cardsFlipped = 0;
    health = maxhealth;
    hunger = maxhunger;
    setHealth(health, maxhealth);
    setHunger(hunger, maxhunger);
    
    $('.lfz-back').removeClass('hidden');
    $('.modal').addClass('hidden');
    $('.death-modal').addClass('hidden');
    $('.lfz-back').on('click', handlecardclick);
    $('.lfz-card').removeClass('hidden');
    
}


function eat(x, y) {
    var chew = new Audio('http://mattersofgrey.com/audio/Minecraft-eat3.mp3')
    chew.play();
    x.prev().addClass("hidden")
    y.prev().addClass("hidden")
}