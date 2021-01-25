//Create instances from classes
// let player = new Player()
// let obstacle = new Obstacle()
// let helpElement = new HelpElement()


//Main colors for the game:
// 0 light light warm "#FFE5DB"
// 1 light blue "#FAAA8C"
// 2 dark warm "#855746"

// dark green="#40AD9B"
//light green = "#ABF5E9"
//light light green "#D1F3EB"

    let player = null;
    let obstacle = null;
    let score = 0;
    let intervalId = 0
    let timer = 120;
    let canvas = null;
    let ctx = null;
    let offset = 50;

    //Background house  + player properties - outer limits to drwawing
    let bgnX = offset;
    let bgnY = offset;
    let bgnWidth = 700;
    let bgnHeight = 700;
    let wallXN = bgnX + 500;
    let playerX = bgnX;
    let playerY = 650;

    //Wall properties
    let wallHeight = 75;
    let wallBottom = bgnY + wallHeight

    //KeyHandler properties
    let isLeftArrow = false;
    let isRightArrow = false;
    let isUpArrow = false;
    let isDownArrow = false;

    //Obstacles
    let enemies = [];
    let eX = null;
    
    document.addEventListener('keydown', (event) => {
        event.preventDefault() // stop the arrow keys scrolling the pag

        if (event.keyCode == 39 || event.key === 'ArrowRight'){
            isLeftArrow = false;
            isRightArrow = true;        
            isUpArrow = false;
            isDownArrow = false;
        } 
        else if(event.keyCode == 37 || event.key === 'ArrowLeft') {
            isLeftArrow = true;
            isRightArrow = false;
            isUpArrow = false;
            isDownArrow = false;
        }
        else if(event.keyCode == 38 || event.key === 'ArrowUp') {
            isLeftArrow = false;
            isRightArrow = false;
            isUpArrow = true;
            isDownArrow = false;
        }
        else if(event.keyCode == 39 || event.key === 'ArrowDown') {
            isLeftArrow = false;
            isRightArrow = false;
            isUpArrow = false;
            isDownArrow = true;
        }
    })

    document.addEventListener("keyup", (event) => {
        isRightArrow = false;
        isLeftArrow = false;
        isUpArrow = false;
        isDownArrow = false;
    })

    function setCanvas() {
        //create canvas
        canvas = document.querySelector("canvas");
        ctx = canvas.getContext("2d");
        
    }

    function drawCanvas() {
        //create canvas 
        canvas.style.backgroundColor="white"
        canvas.setAttribute("width", '800');
        canvas.setAttribute("height", '800') 
           
    }

    function drawLimits() {
        ctx.beginPath()
        ctx.fillStyle = "#FAAA8C"
        ctx.fillRect(bgnX,bgnY,bgnWidth,bgnHeight)
        ctx.closePath()
        
    }

    function drawFloor() {
        ctx.strokeStyle = '#FFE5DB';

        //vertical lines
        for (let i = bgnX + 50; i<canvas.width - 50; i+=50) {
            ctx.moveTo(i, wallBottom);
            ctx.lineTo(i, bgnHeight + offset);
            
            ctx.stroke();
        }
        //horizontal lines
        for (let j = wallBottom + 25; j<canvas.height - 50; j+=25) {
            ctx.moveTo(bgnX, j);
            ctx.lineTo(bgnX + bgnWidth, j);
            ctx.stroke();
        }
    }

    function drawBackWall() {
        //Main wall
        ctx.beginPath()
        ctx.fillStyle = "#D1F3EB"
        ctx.fillRect(bgnX,bgnY,bgnWidth,wallBottom)
        ctx.stroke()
        ctx.closePath()

        //wall stripe
        ctx.beginPath()
        ctx.fillStyle = "#855746"
        ctx.fillRect(bgnX,wallBottom, bgnWidth,10)
        ctx.stroke()
        ctx.closePath()
        ctx.beginPath()
        ctx.fillStyle = "#855746"
        ctx.fillRect(bgnX,wallBottom + 25, bgnWidth,10)
        ctx.stroke()
        ctx.closePath()
    }

    function drawWall() {
        //Wall north horizontal cut
        ctx.beginPath()
        ctx.fillStyle = "white"
        ctx.fillRect(wallXN,bgnY,20,400)
        ctx.closePath()

        //Wall north vertical side
        ctx.beginPath()
        ctx.fillStyle = "#855746"
        ctx.fillRect(wallXN,bgnY + 400,20,wallHeight)
        ctx.closePath()
    }

    function draw() {
        //Methods to draw the inside house basics
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawCanvas()
        drawLimits()
        drawFloor()
        drawBackWall()
        drawWall()

        //Write score
        ctx.font = '30px Allerta Stencil'
        ctx.fillText('Score: ' + score, bgnX, 30)
        ctx.fillText('Time: ' + timer + ' seconds', bgnX + 200, 30)
        
        //create player from Player class
        player = new Player(canvas, playerX, playerY)
        player.draw()

        updateGame()



        if(isLeftArrow && (playerX > bgnX || (playerX > 570 && playerY < 450) )) {
            playerX -= player.xMove
        }
        else if (isRightArrow && playerX + player.width < canvas.width - offset) {
            playerX += player.xMove
        }
        else if (isUpArrow && playerY > wallBottom) {
            playerY -= player.yMove
        }
        else if (isDownArrow && playerY + player.height < canvas.height - offset) {
            playerY += player.yMove
        }
        
    }

    function createObstacles() {
        let enemyFire = new Fire(bgnX + bgnWidth, 600)
        enemies.push(enemyFire)
    }

    function updateGame() {
        //ctx.clearRect(0, 0, canvas.width, canvas.height)
        timer--
        if (timer > 0) {
            createObstacles();
        }

        for (let i = 0; i < enemies.length; i++) {
            let e = enemies[i]

            if (eX < bgnX) {
               enemies.splice(i, 1) 
            }

            e.draw()
        }

        //CHECK COLLISIONS
    }

    function game() { 
        setCanvas()
        intervalID = setInterval(() => {
            requestAnimationFrame(draw)
        }, 100)

        if (timer <=0) {
            clearInterval(intervalId)
        }
       
    }

    window.addEventListener("load", () => {
        canvas.style.display = 'none';
    });

    
    




