function script(){
	var canvas = document.getElementById("CanvasGame");
	window.addEventListener( "keydown", doKeyDown, true);
	window.addEventListener( "keyup", doKeyUp, true);
	var ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	var ground = new Image()
	ground.src = "assets/Ground.png"

	var hero = {x:canvas.width/2-10,y:canvas.height/2 - 8};
	heroSprites = new Array();

	var bullet = new Array()
	var bullet = [{x:2,y:0,exists:false,direction:"right"},
				 				{x:0,y:0,exists:false,direction:"left"},
				 				{x:0,y:0,exists:false,direction:"right"}];

	var enemies = new Array()
	enemies = [{x:canvas.width - 50,y:220,alive:true,direction:"left"},
						 {x:50,y:canvas.height/2 - 50,alive:true,direction:"right"},
					 	 {x:canvas.width - 60,y:canvas.height/2 - 50,alive:true,direction:"left"},
					 	 {x:50,y:canvas.height/2 + 20,alive:true,direction:"right"},
					 	 {x:0,y:canvas.height/2,alive:false,direction:"right"},
						 {x:20,y:canvas.height/2 + 20,alive:false,direction:"right"},
			 		 	 {x:20,y:canvas.height/2 + 20,alive:false,direction:"right"},
		 			 	 {x:20,y:canvas.height/2 + 20,alive:false,direction:"right"},
	 				 	 {x:20,y:canvas.height/2 + 20,alive:false,direction:"right"},
 					 	 {x:20,y:canvas.height/2 + 20,alive:false,direction:"right"}]
	enemySprites = new Array();

	shellSprites = new Array();

	var nest = new Image()
	nest.src = "assets/nest.png"

	images = new Array()

	images[0]="assets/walk/Koopa_walk_1_left.png"
	images[1]="assets/walk/Koopa_walk_2_left.png"
	images[2]="assets/walk/Koopa_walk_3_left.png"
	images[3]="assets/walk/Koopa_walk_1.png"
	images[4]="assets/walk/Koopa_walk_2.png"
	images[5]="assets/walk/Koopa_walk_3.png"

	images[6]="assets/fly/Koopa_fly_1_left.png"
	images[7]="assets/fly/Koopa_fly_2_left.png"
	images[8]="assets/fly/Koopa_fly_3_left.png"
	images[9]="assets/fly/Koopa_fly_4_left.png"
	images[10]="assets/fly/Koopa_fly_5_left.png"
	images[11]="assets/fly/Koopa_fly_1.png"
	images[12]="assets/fly/Koopa_fly_2.png"
	images[13]="assets/fly/Koopa_fly_3.png"
	images[14]="assets/fly/Koopa_fly_4.png"
	images[15]="assets/fly/Koopa_fly_5.png"

	images[16] = "assets/shell/shell_1.png"
	images[17] = "assets/shell/shell_2.png"
	images[18] = "assets/shell/shell_3.png"
	images[19] = "assets/shell/shell_4.png"

	for(i=0; i<=15; i++){
      heroSprites[i] = new Image();
      heroSprites[i].src=images[i];
	}
	for (i=0; i<=15; i++){
		enemySprites[i] = new Image();
		enemySprites[i].src=images[i];
	}

	for (i=16; i<=19; i++){
		shellSprites[i] = new Image();
		shellSprites[i].src=images[i];
	}


	var dx = 0
	var dy = 0

	var bx = -4
	var by = 0

	var ex = -0.5
	var ex_right = 0.5
	var ey = 0;

	var index = 0
	var index_1 = 0
	var index_12 = 0
	var index_15 = 3
	var index_152 = 3
	var index_152 = 3
	var index_2 = 0

	var counter_1 = 1
	var counter_2 = 1
	var counter_3 = 1
	var counter_4 = 1
	var counter_5 = 0
	var counter_55 = 1
	var counter_6 = 1
	var counter_7 = 1

	var jumper = false
	var jumping = false

	var direction = "left"
	var move = false
	var shoot = 0
	var dead = false
	var score = 0
	var wave = 0
	var wave_total = 0
	var wave_number = 0
	var life = 50

	console.log("loaded")

	function drawRect() {
		ctx.beginPath();
		ctx.drawImage(ground, 0, 250);
		ctx.fillStyle = "#000";
		ctx.fill();
		ctx.closePath();
	}
	
	function drawLife() {

		ctx.beginPath();
		ctx.globalAlpha = 0.6;
		ctx.rect(375,175,life,7);
		ctx.fillStyle = "black";
		ctx.fill();
		ctx.closePath();
		ctx.beginPath();
		ctx.rect(375,175,50,7);
		ctx.fillStyle = "red";
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.closePath();
	}

	function draw_text(){
		ctx.fillStyle = "black"
		ctx.textAlign = "center"
		ctx.font = "40px Abel"
		ctx.fillText("Score : " + score, canvas.width/2, canvas.height-80)
		ctx.fillText("Wave : " + wave_number, canvas.width/2, canvas.height-30)
	}

	function doKeyDown(e) {

		//console.log(e.keyCode)

		if (e.keyCode == 37){
			dx = -1.5
			direction = "left";
			move = true
		}
		if (e.keyCode == 38){
			jumper = true;
		}
		if (e.keyCode == 39){
			dx = 1.5
			direction = "right";
			move = true
		}
		if (e.keyCode == 83){
			for (shell in bullet){
				if (bullet[shell].exists == false){
					bullet[shell].exists = true
					break;
				}
			}
		}
	}

	function doKeyUp(e) {

		if (e.keyCode == 37 && direction != "right"){
			dx = 0
			move = false;
		}
		if (e.keyCode == 38){
			jumper = false;
		}
		if (e.keyCode == 39 && direction != "left"){
			dx = 0
			move = false;
		}
	}

	function new_wave(){
		counter_4 = 0
		counter_5 = 0
		counter_55 = 0
		wave_number += 1
		wave = Math.floor((Math.random() * 9));
		console.log(wave)
		enemies = [{x:canvas.width + 50,y:220,alive:false,direction:"left"},
						 {x:-50,y:canvas.height/2 + 20,alive:false,direction:"right"},
					 	 {x:canvas.width + 50,y:canvas.height/2 - 50,alive:false,direction:"left"},
					 	 {x:canvas.width + 20,y:canvas.height/2 + 20,alive:false,direction:"left"},
					 	 {x:canvas.width + 40,y:canvas.height/2 - 100,alive:false,direction:"left"},
						 {x:-50,y:canvas.height/2 - 10,alive:false,direction:"right"},
			 		 	 {x:-20,y:canvas.height/2 + 20,alive:false,direction:"right"},
		 			 	 {x:-10,y:canvas.height/2 + 20,alive:false,direction:"right"},
	 				 	 {x:20,y:canvas.height/2 + 20,alive:false,direction:"right"},
 					 	 {x:20,y:canvas.height/2 + 20,alive:false,direction:"right"}]
		for (i = 1;i<=wave;i++){
			enemies[i].alive = true;
		}
		wave_total += wave;
	}

	function animate_enemy(){
		counter_4 += 1;
		if (counter_4 == 12){
			counter_5 += 1;
			counter_55 += 1;
			for (enemy in enemies){
				if (enemies[enemy].alive == true){
					if (enemies[enemy].direction == "left"){

						if (enemies[enemy].y == 220){
							if (counter_5 == 0){
								index_1 = 1;
							}
							if (counter_5 == 1){
								index_1 = 2;
							}
						}
						if (enemies[enemy].y < 220){
							if (counter_55 == 2){
								index_12 = 6;
							}
							if (counter_55 == 3){
								index_12 = 7;
							}
							if (counter_55 == 4){
								index_12 = 8;
							}
							if (counter_55 == 5){
								index_12 = 9;
							}
							if (counter_55 == 6){
								index_12 = 10;
							}
						}
					}

					if (enemies[enemy].direction == "right"){

						if (enemies[enemy].y == 220){
							if (counter_5 == 0){
								index_15 = 4;
							}
							if (counter_5 == 1){
								index_15 = 5
							}
						}

						if (enemies[enemy].y < 220){
							if (counter_55 == 2){
								index_152 = 11;
							}
							if (counter_55 == 3){
								index_152 = 12;
							}
							if (counter_55 == 4){
								index_152 = 13;
							}
							if (counter_55 == 5){
								index_152 = 14;
							}
							if (counter_55 == 6){
								index_152 = 15;
							}
						}
					}
					counter_4 = 1;
					console.log(counter_55)
				}
				if (counter_55 == 7){
					counter_55 = 2;
				}
				if (counter_5 == 2){
						counter_5 = 0
				}
			}
		}
	}

	function animate_shell(){
		counter_6 += 1;
		if (counter_6 == 8){

			counter_7 += 1;

			if (counter_7 == 2){
				index_2 = 16;
			}
			if (counter_7 == 3){
				index_2 = 17
			}
			if (counter_7 == 4){
				index_2 = 18
			}
			if (counter_7 == 5){
				index_2 = 19
				counter_7 = 1;
			}
			counter_6 = 1;
		}
	}

	function hitbox(){
		for (enemy in enemies){

			for (shell in bullet){
				if (bullet[shell].exists == true){

					if (enemies[enemy].alive == true){
						if (bullet[shell].x > enemies[enemy].x && bullet[shell].x < enemies[enemy].x + 20 &&
							bullet[shell].y+5 > enemies[enemy].y && bullet[shell].y+5 < enemies[enemy].y + 30){
								console.log("hit")
								enemies[enemy].alive = false;
								bullet[shell].exists = false
								shoot -= 1
								score = score + 1
						}
					}
				}
			}
		}
	}

	function animate(){
		counter_1 += 1;

		if (counter_1 == 10){

			if (move == false && jumping == false){
				if (direction == "left"){
					index = 0
				}
				if (direction == "right"){
					index = 3
				}
			}

			if (move == true && jumping == false){
				counter_2 += 1;
				if (direction == "left"){
					if (counter_2 == 2){
						index = 1
					}
					if (counter_2 == 3){
						index = 2
						counter_2 = 1;
					}
				}
				if (direction == "right"){
					if (counter_2 == 2){
						index = 4
					}
					if (counter_2 == 3){
						index = 5
						counter_2 = 1;
					}
				}
			}

			if (jumping == true){
				counter_3 += 1
				if (direction == "left"){
					if (counter_3 == 2){
						index = 6
					}
					if (counter_3 == 3){
						index = 7
					}
					if (counter_3 == 4){
						index = 8
					}
					if (counter_3 == 5){
						index = 9
					}
					if (counter_3 == 6){
						index = 10
						counter_3 = 1;
					}
				}
				if (direction == "right"){
					if (counter_3 == 2){
						index = 11
					}
					if (counter_3 == 3){
						index = 12
					}
					if (counter_3 == 4){
						index = 13
					}
					if (counter_3 == 5){
						index = 14
					}
					if (counter_3 == 6){
						index = 15
						counter_3 = 1;
					}
				}
			}
			counter_1 = 1;
		}
	}


	function draw() {

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		drawRect();
		drawLife()
		draw_text()

		animate()
		animate_enemy()
		animate_shell()
		if (dead == false){
			ctx.drawImage(heroSprites[index],hero.x,hero.y);
		}
		
		for (enemy in enemies){
			if (enemies[enemy].alive == true){
				if (enemies[enemy].direction == "left"){
					if (enemies[enemy].y < 220){
						ctx.drawImage(enemySprites[index_12],enemies[enemy].x,enemies[enemy].y);
					}
					if (enemies[enemy].y == 220){
						ctx.drawImage(enemySprites[index_1],enemies[enemy].x,enemies[enemy].y);
					}
				}
				if (enemies[enemy].direction == "right"){
					if (enemies[enemy].y < 220){
						ctx.drawImage(enemySprites[index_152],enemies[enemy].x,enemies[enemy].y);
					}
					if (enemies[enemy].y == 220){
						ctx.drawImage(enemySprites[index_15],enemies[enemy].x,enemies[enemy].y);
					}
				}
			}
		}

		for (shelly in bullet){
			if (bullet[shelly].exists == false){
				bullet[shelly].x = hero.x
				bullet[shelly].y = hero.y+10
				bullet[shelly].direction = direction;
			}

			if (bullet[shelly].exists == true){
				if (shelly == 0){
				}
				hitbox()
				if (bullet[shelly].direction == "left"){
					bullet[shelly].x += -5
				}
				if (bullet[shelly].direction == "right"){
					bullet[shelly].x += 5
				}
				ctx.drawImage(shellSprites[index_2],bullet[shelly].x,bullet[shelly].y);
					if (bullet[shelly].x < 0 || bullet[shelly].x > canvas.width){
					bullet[shelly].exists = false;
					shoot -= 1;
				}
			}
		}

		ctx.drawImage(nest,canvas.width/2-nest.width/2,canvas.height/2-50);

		if (hero.y < 220){
			jumping = true;
		}
		if (jumper == true){
			dy = dy - 0.04
			if (dy < -2){
				dy = -2
			}
		}
		if (jumper == false){
			dy = dy + 0.04
			if (dy > 4){
				dy = 4
			}
		}

		if (enemy.x < 0){
			ex = 0.5
			enemy.x = 0
		}

		hero.x += dx;
		hero.y += dy;

		if (hero.y > 220){
			dy = 0;
			hero.y = 220;
			jumping = false
		}

		if (hero.y > canvas.height/2 - 8 && hero.x > canvas.width/2-70 && hero.x < canvas.width/2+45){
			dy = 0;
			hero.y = canvas.height/2- 8;
			jumping = false
		}

		if (hero.y < 0){
			hero.y = 0
			dy = 0
		}
		if (hero.x < 0){
			hero.x = 0
		}
		if (hero.x > 765){
			hero.x = 765
		}
		
		for (enemy in enemies){
			if (enemies[enemy].alive == true){
				if (enemies[enemy].x >= hero.x && enemies[enemy].x <= hero.x+20 
					&& enemies[enemy].y+20 >= hero.y && enemies[enemy].y <= hero.y+20){
					life -= 1
					if (life == 0){
						life = 0
					}
				}
			}
		}

		for (enemy in enemies){
			if (enemies[enemy].alive == true){
				if (enemies[enemy].direction == "left"){
					enemies[enemy].x += ex
				}
				if (enemies[enemy].direction == "right"){
					enemies[enemy].x += ex_right
				}
			}
		}
		if (score == wave_total){
			new_wave()
		}
	}
	setInterval(draw, 17);

}
