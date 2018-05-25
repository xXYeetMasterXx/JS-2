// A Side-Scrolling "Space invader type game"
window.onload = function(){
	canvas = document.createElement("canvas");
	canvas.width = 640;
	canvas.height = 480;
	// Add the canvas to the html document
	document.body.appendChild(canvas);
	// Create drawing element 
	pen = canvas.getContext('2d');
	// Scanning for keyboard input
	//document.addEventListener('keydown', keyPush);

	// Variables for score and lives
	lives = 3
	score = 0

	// Set the FPS
	var fps = 30;
	setInterval(update, 1000/fps)
  // Create random enemies
	setInterval(spawn, 100);

	// Mouse Listener
	document.addEventListener("mousemove", mouseMoveHandler, false);
	document.addEventListener("mousedown", mouseClickHandler,false);


}

// Player Stats
player_x = 100;
player_y = 100;
player_speed = 15;
player_dim = 30;
spaceship = new Image();
spaceship.src = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkFBQoFBQUFDQ8ICQUKFBEWFhQRExMYHCggGBolGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKCwUFDgUFEisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAWAAEBAQAAAAAAAAAAAAAAAAAABgH/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAEHBf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJ8BxWpAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAIAAAAAAAAAAAAAAAAAAAAAAAAAAACgAgAAAAAAAAAAAAAAAAAAAAAAAAAAAKACAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAIAAAAAAAAAAAAAAAAAAAAAAAAAAACgAgAAAAAAAAAAAAAAAAAAAAAAAAAAAKACAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAIAAAAAAAAAAAAAAAAAAAAAAAAAAACgAgAAAAAAAAAAAAAAAAAAAAAAAAAAAKACAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAIAAAAAAAAAAAAAAAAAAAAAAAAAAACgAgAAAAAAAAAAAAAAAAAAAAAAAAAAAKACAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAIAAAAAAAAAAAAAAAAAAAAAAAAAAACgAgAAAAAAAAAAAAAAAAAAAAAAAAADQAf/Z"


// Enemy Stats
enemy_list = [];
enemy_dim = 25;
enemy_speed = 5;

// Child Stats
shots_list = [];
shot_dim = 4;
shot_speed = 7;

// Create Enemy Spawn
function spawn() {
	enemy_list.push({x:canvas.width, y:Math.random()*canvas.height})
}

// Update each frame
function update() {
	// Create background
	pen.fillStyle = "black";
	pen.fillRect(0, 0, canvas.width, canvas.height)
	// Create player
	pen.drawImage(spaceship,
	player_x - player_dim / 2,
	player_y - player_dim / 2,
	player_dim,
	player_dim);
	// Drawing the shots list
	pen.fillStyle = "lime";
	for(var s = 0; s < shots_list.length; s++) {
		shots_list[s].x += shot_speed;
		pen.fillRect(
			shots_list[s].x - shot_dim / 2,
			shots_list[s].y - shot_dim / 2,
			shot_dim,
			shot_dim
		);
			

		for(var e = enemy_list.length - 1; e >= 0; e--) {
			// Calculate the distance between the shots and enemies
			var diff_x = Math.abs(enemy_list[e].x - shots_list[s].x);
			var diff_y = Math.abs(enemy_list[e].y - shots_list[s].y);
			var dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);
			// detects if a shot hits the enemy
			if (dist < (shot_dim + enemy_dim) / 2) {
        enemy_list.splice(e, 1);
				score++
			}
		}
	}
	
	//Drawing enemy list
	pen.fillStyle = "red"
	for(var e = 0; e < enemy_list.length; e++) {
		enemy_list[e].x -= enemy_speed;
		pen.fillRect(
					enemy_list[e].x - enemy_dim / 2,
					enemy_list[e].y - enemy_dim / 2,
					enemy_dim,
					enemy_dim
				);
		var diff_x = Math.abs(enemy_list[e].x - player_x);
			var diff_y = Math.abs(enemy_list[e].y - player_y);
			var dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);
		// Detect if enemy hits the hero
		if(dist < (player_dim + enemy_dim) /2) {
			// Clear the stats and reset the player if he gets hit
			shots_list = [];
			enemy_list = [];
			player_x = player_y = 100;
			lives --
			break;
		}
		
	}

	pen.fillStyle = "white";
	pen.font = "15px Courier";
	pen.fillText("Lives: " + lives, 10, 15);
	pen.fillText("Score: " + score, 10, 30);

	// Game over screen
	if(lives < 1) {
		pen.fillStyle = "red"
		pen.fillRect(0,0,1000,1000);
		pen.font = "60px Comic Sans MS"
		pen.textAlign = "center"
		pen.fillStyle = "black"
		pen.fillText("Game Over", 320,240)
		pen.font = "20px Comic Sans MS"
		pen.fillText("You Scored: " + score, 320, 300)
		pen.textAlign = "center"
	}
	if(player_y > 480 || player_y < 0 + player_dim/2) {
		player_x = player_y = 100
		lives--
		}
}

function mouseMoveHandler(e) {
	player_y = e.clientY
}

function mouseClickHandler(e) {
	// This checks for the left button
	if(e.button == 0) {
		shots_list.push({ x: player_x, y: player_y});
	}
}
