function start() {
    // Create bear
    bear = new Bear();

     // Add an event listener to the keypress event.
    document.addEventListener("keydown", moveBear, false);

    // Added an event listener for the input of the speed of the bear
    document.getElementById("speedBear").addEventListener("change", setSpeed,false);

    // Create new array for bees
    bees = new Array();
    // Create bees
    makeBees()

    // First call to updateBees to move te bees
    updateBees()

    // Take start time
    lastStingTime = new Date();

    

}
function Bear() {
    this.dBear = 100;
    this.htmlElement = document.getElementById("bear");
    this.id = this.htmlElement.id;
    this.x = this.htmlElement.offsetLeft;
    this.y = this.htmlElement.offsetTop;
    this.move = function(xDir, yDir) {
        this.fitBounds(); // We add this instruction to keep bear within board
        this.x += this.dBear * xDir ;
        this.y += this.dBear * yDir ;
        this.display();
        };
    this.display = function() {
        this.fitBounds();
        this.htmlElement.style.left = this.x + "px";
        this.htmlElement.style.top = this.y + "px";
        this.htmlElement.style.display = "block";
        };
    this.fitBounds = function() {
        let parent = this.htmlElement.parentElement;
        let iw = this.htmlElement.offsetWidth;
        let ih = this.htmlElement.offsetHeight;
        let l = parent.offsetLeft;
        let t = parent.offsetTop;
        let w = parent.offsetWidth;
        let h = parent.offsetHeight;
        if (this.x < 0) this.x = 0;
        if (this.x > w - iw) this.x = w - iw;
        if (this.y < 0) this.y = 0;
        if (this.y > h - ih) this.y = h - ih; 
        };
    
   }

function setSpeed(){
    bear.dBear = document.getElementById("speedBear").value
}
// Handle keyboad events
// To move the bear
function moveBear(e) {
    firstmove = true;
    // Codes of the four keys
    const KEYUP = 38;
    const KEYDOWN = 40;
    const KEYLEFT = 37;
    const KEYRIGHT = 39;
    if (e.keyCode == KEYRIGHT) {
    bear.move(1, 0)
    } // Right key
    if (e.keyCode == KEYLEFT) {
    bear.move(-1, 0)
    } // Left key
    if (e.keyCode == KEYUP) {
    bear.move(0, -1)
    } // Up key
    if (e.keyCode == KEYDOWN) {
    bear.move(0, 1)
    } // Down key
   }
class Bee {
    constructor(beeNumber) {
        // The HTML element corresponding to the IMG of the bee
        this.htmlElement = createBeeImg(beeNumber);
        //iits HTML ID
        this.id = this.htmlElement.id;
        // The left position (x)
        this.x = this.htmlElement.offsetLeft;
        // The top position (y)
        this.y = this.htmlElement.offsetTop;
        this.move = function(dx, dy) {
            // Move the bees by dx, dy
            this.x += dx;
            this.y += dy;
            this.display();
        };
        this.display = function() {
            // Adjust position of bee and display it
            this.fitBounds();//add this to adjust to bounds
            this.htmlElement.style.left = this.x + "px";
            this.htmlElement.style.top = this.y + "px";
            this.htmlElement.style.display = "block";
        };
        this.fitBounds = function() {
            // Check and make sure the bees stays in the board space
            let parent = this.htmlElement.parentElement;
            let iw = this.htmlElement.offsetWidth;
            let ih = this.htmlElement.offsetHeight;
            let l = parent.offsetLeft;
            let t = parent.offsetTop;
            let w = parent.offsetWidth;
            let h = parent.offsetHeight;
            if (this.x < 0)
            this.x = 0;
            if (this.x > w - iw)
            this.x = w - iw;
            if (this.y < 0)
            this.y = 0;
            if (this.y > h - ih)
            this.y = h - ih;
        };
    }
}
function createBeeImg(wNum) {
    // Get dimension and position of board div
    let boardDiv = document.getElementById("board");
    let boardDivW = boardDiv.offsetWidth;
    let boardDivH = boardDiv.offsetHeight;
    let boardDivX = boardDiv.offsetLeft;
    let boardDivY = boardDiv.offsetTop;
    // Create the IMG element
    let img = document.createElement("img");
    img.setAttribute("src", "https://raw.githubusercontent.com/hbatatia/lab02-dom-resources/main/images/bee.gif");
    img.setAttribute("width", "100");
    img.setAttribute("alt", "A bee!");
    img.setAttribute("id", "bee" + wNum);
    img.setAttribute("class", "bee"); //set class of html tag img
    //add the IMG element to the DOM as a child of the board div
    img.style.position = "absolute";
    boardDiv.appendChild(img);
    //set initial position
    let x = getRandomInt(boardDivW);
    let y = getRandomInt(boardDivH);
    img.style.left = (boardDivX + x) + "px";
    img.style.top = (y) + "px";
    // Return the img object
    return img;
}
// Wrote a function to generate a random number from 0 to max
function getRandomInt(max){
    randomNumber = Math.floor(Math.random()*max);
    return randomNumber;
}
function makeBees() {
    // Get number of bees specified by the user
    let nbBees = document.getElementById("nbBees").value;
    nbBees = Number(nbBees); // Try converting the content of the input to a number
    if (isNaN(nbBees)) { // Check that the input field contains a valid number
    window.alert("Invalid number of bees");
    return;
    }
    //create bees
    let i = 1;
    while (i <= nbBees) {
    var num = i;
    var bee = new Bee(num); // Create object and its IMG element
    bee.display(); // Display the bee
    bees.push(bee); // Add the bee object to the bees array
    i++;
    }

}
function moveBees() {
    // Get speed input field value
    let speed = document.getElementById("speedBees").value;
    // Move each bee to a random location
    for (let i = 0; i < bees.length; i++) {
        let dx = getRandomInt(2 * speed) - speed;
        let dy = getRandomInt(2 * speed) - speed;
        bees[i].move(dx, dy);
        isHit(bees[i], bear); // We add this to count stings
    }
}
function updateBees() { // Update loop for game
    // Move the bees randomly
    moveBees();
    // Use a fixed update period
    let period = document.getElementById("periodTimer").value; // Modified so that timer is decided by the user
    // Update the timer for the next move
    if (hits.innerHTML>=1000){  // Checks for number of hits and if it has reached 1000 stings yet
        alert("GAME OVER!");    // If it has then it alerts the user and stops the game
    }
    else{
        updateTimer = setTimeout('updateBees()', period); // This changes the position based on the amount of hits
    }
    
}
function isHit(defender, offender) {
    if (overlap(defender, offender)) { // Check if the two image overlap
        let score = hits.innerHTML;
        score = Number(score) + 1; // Increment the score
        hits.innerHTML = score; // Display the new score
        // Calculate longest duration once bear moves
        if (firstmove == true){
            let newStingTime = new Date();
            let thisDuration = newStingTime - lastStingTime;
            lastStingTime = newStingTime;
            let longestDuration = Number(duration.innerHTML);
            if (longestDuration === 0) {
                longestDuration = thisDuration;
            }
            else {
                if (longestDuration < thisDuration) longestDuration = thisDuration;
            }
            document.getElementById("duration").innerHTML = longestDuration;
        }
        
    }
}
function overlap(element1, element2) {
    // Consider the two rectangles wrapping the two elements
    // Rectangle of the first element
    left1 = element1.htmlElement.offsetLeft;
    top1 = element1.htmlElement.offsetTop;
    right1 = element1.htmlElement.offsetLeft + element1.htmlElement.offsetWidth;
    bottom1 = element1.htmlElement.offsetTop + element1.htmlElement.offsetHeight;
    // Rectangle of the second element
    left2 = element2.htmlElement.offsetLeft; // e2x
    top2 = element2.htmlElement.offsetTop; // e2y
    right2 = element2.htmlElement.offsetLeft + element2.htmlElement.offsetWidth;
    bottom2 = element2.htmlElement.offsetTop + element2.htmlElement.offsetHeight;
    // Calculate the intersection of the two rectangles
    x_intersect = Math.max(0, Math.min(right1, right2) - Math.max(left1, left2));
    y_intersect = Math.max(0, Math.min(bottom1, bottom2) - Math.max(top1, top2));
    intersectArea = x_intersect * y_intersect;
    // If intersection is nil no hit
    if (intersectArea == 0 || isNaN(intersectArea)) {
        return false;
    }
    return true;
}

// Function to restart the game
function restart(){
    location.reload();
}