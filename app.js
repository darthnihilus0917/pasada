document.addEventListener('DOMContentLoaded', () => {

    const jeep = document.querySelector('.jeep');
    const grid = document.querySelector('.grid');
    const alert = document.getElementById('alert');
    const scoreBoard = document.querySelector('.score');
    const fuelMonitor = document.querySelector('.fuel');

    let isJumping = false;
    let gravity = 0.9;
    let isGameOver = false;
    let fuel = 1000;

    function control(e) {
        if (e.keyCode === 32) {
            if (!isJumping) {
                isJumping = true;
                jump();
            }
        }
    }

    let currentScore = 0;
    function score() {

        let timerId = setInterval(function() {
            if (!isGameOver) {
                currentScore++;
                scoreBoard.innerHTML = "Your Score: " + currentScore;
                fuelMonitor.innerHTML = "Fuel: " + parseFloat(fuel).toFixed(2);

                let fuelReducer = currentScore / 100;
                if (fuelReducer > 0) fuel = fuel - fuelReducer;                
                if (fuel <= 0) { 
                    clearInterval(timerId);
                    alert.innerHTML = "Fuel tank empty!!! <br/>GAME OVER <br/> Press F5 to try again..";
                    alert.style.color = "red";
                    isGameOver = true;
                }
            } 
        }, 200)
    }
    score();

    document.addEventListener('keydown', control)

    let position = 0;
    // let passengerPosition = 0;
    function jump() {     
        
        let count = 0;
        let timerId = setInterval(function() {

            if (count === 15) {
                clearInterval(timerId)
                let downTimerId = setInterval(function() {
                    if (count === 0) {
                        clearInterval(downTimerId)
                        isJumping = false;
                    }
                    position -= 3
                    count--
                    position = position * gravity;
                    jeep.style.bottom = position + "px"
                }, 20)                
            }

            count++
            position += 20;
            position = position * gravity;
            jeep.style.bottom = position + "px"
        }, 20);
    }

    function generateRoadDivider() {

        let roadDividerPosition = 0;
        
        const roadDivider = document.createElement('div');
        if (!isGameOver) {
            roadDivider.classList.add('road-divider'); 
            grid.appendChild(roadDivider);
        }        
        roadDivider.style.right = roadDividerPosition + 'px';

        let timerId = setInterval(function() {
            roadDividerPosition += 20;
            roadDivider.style.right = roadDividerPosition + 'px';

        }, 20);

        if (!isGameOver) setTimeout(generateRoadDivider, 50);
    }
    generateRoadDivider();


    function generatePassengers() {

        let randomTime = Math.random() * 10000;
        let passengerPosition = 900;
        
        const passenger = document.createElement('div');
        if (!isGameOver) {
            if (currentScore > 100) {
                passenger.classList.add('passenger'); 
                grid.appendChild(passenger);
            }
        }        
        passenger.style.left = passengerPosition + 'px';

        let timerId = setInterval(function() {
            if (!isGameOver) {
                console.log(position)
                if (passengerPosition > 0 && passengerPosition < 50 && position < 50) {
                    console.log("picked up passenger")
                }
                passengerPosition -= 10;
                passenger.style.left = passengerPosition + 'px';
            } else {
                clearInterval(timerId);
            }
            

        }, 20);

        if (!isGameOver) setTimeout(generatePassengers, randomTime);
    }
    generatePassengers();

    function generateObstacle() {

        let randomTime = Math.random() * 5000;
        let obstaclePosition = 1000;
        let obstacleInterval = 20;
        let obstacleIntervalReducer = currentScore / 500;
        
        const obstacle = document.createElement('div');
        if (!isGameOver) obstacle.classList.add('obstacle'); 
        grid.appendChild(obstacle);
        
        obstacle.style.left = obstaclePosition + 'px';

        let timerId = setInterval(function() {
            if (obstaclePosition > 0 && obstaclePosition < 80 && position < 80) {
                clearInterval(timerId)
                alert.innerHTML = "SHIT HAPPEN!!! <br/>GAME OVER <br/> Press F5 to try again..";
                alert.style.color = "red";
                isGameOver = true;
                
                while (grid.firstChild) grid.removeChild(grid.lastChild)
            }
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + 'px';
            if (obstacleIntervalReducer > 0) obstacleInterval = obstacleInterval - obstacleIntervalReducer;

        }, obstacleInterval);

        if (!isGameOver) {
            setTimeout(generateObstacle, randomTime);
        }
    }
    generateObstacle()    

});