const map = [
    [" ", " ", "W", "W", "W", "W", "W", " "],
    ["W", "W", "W", " ", " ", " ", "W", " "],
    ["W", "O", "S", "B", " ", " ", "W", " "],
    ["W", "W", "W", " ", "B", "O", "W", " "],
    ["W", "O", "W", "W", "B", " ", "W", " "],
    ["W", " ", "W", " ", "O", " ", "W", "W"],
    ["W", "B", " ", "X", "B", "B", "O", "W"],
    ["W", " ", " ", " ", "O", " ", " ", "W"],
    ["W", "W", "W", "W", "W", "W", "W", "W"]
];


let sokobanDiv = document.getElementById("sokoban")
let playerDiv = document.getElementById("player")

let playerTop = 0;
let playerLeft = 0;
let rowLocation = 2;
let colLocation = 2;

function displayMap() {
    for (let row = 0; row < map.length; row++) {
        for (let column = 0; column < map[row].length; column++) {
            if (map[row][column] === " ") {
                let Path = document.createElement("div")
                Path.id = row + "-" + column
                Path.classList.add("Paths")
                sokobanDiv.appendChild(Path)
            } else if (map[row][column] === "W") {
                let Walls = document.createElement("div")
                Walls.id = row + "-" + column
                Walls.classList.add("Ws")
                sokobanDiv.appendChild(Walls)
            } else if (map[row][column] === "S") {
                let Start = document.createElement("div")
                Start.id = row + "-" + column
                Start.classList.add("sPoint")
                // Start.appendChild(playerDiv)
                sokobanDiv.appendChild(Start)
            } else if (map[row][column] === "O") {
                let objectLocation = document.createElement("div")
                objectLocation.id = row + "-" + column
                let box1Location = document.createElement("div")
                box1Location.classList.add("b1Location")
                objectLocation.classList.add("oLocation")
                objectLocation.appendChild(box1Location)
                sokobanDiv.appendChild(objectLocation)
            } else if (map[row][column] === "B") {
                let boxLocation = document.createElement("div")
                boxLocation.id = row + "-" + column
                boxLocation.classList.add("bLocation")
                sokobanDiv.appendChild(boxLocation)
            } else if (map[row][column] === "X") {
                let transparent = document.createElement("div")
                transparent.id = row + "-" + column
                transparent.classList.add("boxThere")
                sokobanDiv.appendChild(transparent)
            } else if (map[row][column] === "T") {
                let alreadyThere = document.createElement("div")
                alreadyThere.id = row + "-" + column
                alreadyThere.classList.add("transparent")
                sokobanDiv.appendChild(alreadyThere)
            }
        }
    }
    let playerLocation = rowLocation + "-" + colLocation
    document.getElementById(playerLocation).appendChild(playerDiv)
}
displayMap();





document.addEventListener('keydown', mover);

function mover(e) {
    console.log(e.code);
    if (e.code === "ArrowDown") {
        moveDown(rowLocation, colLocation)
    } else if (e.code === "ArrowUp") {
        moveUp(rowLocation, colLocation)
    } else if (e.code === "ArrowLeft") {
        moveLeft(rowLocation, colLocation)
    } else if (e.code === "ArrowRight") {
        moveRight(rowLocation, colLocation)
    }

}

function clearDiv() {
    sokobanDiv.innerHTML = ""
}


function moveRight(row, column) {

    let nextColLocation = column + 1
    let nextnextColLocation = nextColLocation + 1
    let canMove = false


    if (map[rowLocation][nextColLocation] === " " || map[rowLocation][nextColLocation] === "O" || map[rowLocation][nextColLocation] === "S") {

        colLocation += 1;
        playerLeft += 50;
        canMove = true

    } else if (map[rowLocation][nextColLocation] === "B") {

        if (map[rowLocation][nextnextColLocation] === " ") {
            map[rowLocation][nextnextColLocation] = "B"
            map[rowLocation][nextColLocation] = " "
            colLocation += 1;
            playerLeft += 50;
            canMove = true

        } else if (map[rowLocation][nextnextColLocation] === "O") {
            map[rowLocation][nextnextColLocation] = "X"
            map[rowLocation][nextColLocation] = " "
            colLocation += 1;
            playerLeft += 50;
            canMove = true
        }
    } else if (map[rowLocation][nextColLocation] === "X") {

        if (map[rowLocation][nextnextColLocation] === " ") {

            map[rowLocation][nextnextColLocation] = "B"
            map[rowLocation][nextColLocation] = "O"
            colLocation += 1;
            playerLeft += 50;
            canMove = true
        }
    }
    console.log(rowLocation, colLocation)
    console.log(playerTop, playerLeft)
    clearDiv()
    displayMap()
    winCheck()
}


function moveLeft(row, column) {

    let nextColLocation = column - 1
    let nextnextColLocation = nextColLocation - 1
    let canMove = false
    console.log(map[rowLocation][nextColLocation])
    console.log(map[rowLocation][nextnextColLocation])
    if (map[rowLocation][nextColLocation] === " " || map[rowLocation][nextColLocation] === "O" || map[rowLocation][nextColLocation] === "S") {

        colLocation -= 1;
        playerLeft -= 50;
        canMove = true

    } else if (map[rowLocation][nextColLocation] === "B") {

        if (map[rowLocation][nextnextColLocation] === " " || map[rowLocation][nextnextColLocation] === "S") {
            map[rowLocation][nextnextColLocation] = "B"
            map[rowLocation][nextColLocation] = " "

            colLocation -= 1;
            playerLeft -= 50;
            canMove = true;
        } else if (map[rowLocation][nextnextColLocation] === "O") {

            map[rowLocation][nextnextColLocation] = "X"
            map[rowLocation][nextColLocation] = " "
            colLocation -= 1;
            playerLeft -= 50;
            canMove = true
        }
    } else if (map[rowLocation][nextColLocation] === "X") {

        if (map[rowLocation][nextnextColLocation] === " ") {

            map[rowLocation][nextnextColLocation] = "B"
            map[rowLocation][nextColLocation] = "O"
            colLocation -= 1;
            playerLeft -= 50;
            canMove = true
        }
    }
    console.log(rowLocation, colLocation)
    console.log(playerTop, playerLeft)
    console.log(map[rowLocation][nextColLocation])
    console.log()
    clearDiv()
    displayMap()
    winCheck()
}


function moveUp(row, column) {

    let nextRowLocation = row - 1
    let nextnextRowLocation = nextRowLocation - 1
    let canMove = false

    if (map[nextRowLocation][colLocation] === " " || map[nextRowLocation][colLocation] === "O" || map[nextRowLocation][colLocation] === "S") {

        rowLocation -= 1;
        playerTop -= 50;
        canMove = true

    } else if (map[nextRowLocation][colLocation] === "B") {

        if (map[nextnextRowLocation][colLocation] === " ") {
            map[nextnextRowLocation][colLocation] = "B"
            map[nextRowLocation][colLocation] = " "

            rowLocation -= 1;
            playerTop -= 50;
            canMove = true;
        } else if (map[nextnextRowLocation][colLocation] === "O") {

            map[nextnextRowLocation][colLocation] = "X"
            map[nextRowLocation][colLocation] = " "
            rowLocation -= 1;
            playerTop -= 50;
            canMove = true
        }
    } else if (map[nextRowLocation][colLocation] === "X") {

        if (map[nextnextRowLocation][colLocation] === " ") {

            map[nextnextRowLocation][colLocation] = "B"
            map[nextRowLocation][colLocation] = "O"
            rowLocation -= 1;
            playerTop -= 50;
            canMove = true
        }
    }
    console.log(rowLocation, colLocation)
    console.log(playerTop, playerLeft)
    clearDiv()
    displayMap()
    winCheck()
}


function moveDown(row, column) {

    let nextRowLocation = row + 1
    let nextnextRowLocation = nextRowLocation + 1
    let canMove = false

    if (map[nextRowLocation][colLocation] === " " || map[nextRowLocation][colLocation] === "O" || map[nextRowLocation][colLocation] === "S") {

        rowLocation += 1;
        playerTop += 50;
        canMove = true

    } else if (map[nextRowLocation][colLocation] === "B") {

        if (map[nextnextRowLocation][colLocation] === " ") {
            map[nextnextRowLocation][colLocation] = "B"
            map[nextRowLocation][colLocation] = " "

            rowLocation += 1;
            playerTop += 50;
            canMove = true;
        } else if (map[nextnextRowLocation][colLocation] === "O") {

            map[nextnextRowLocation][colLocation] = "X"
            map[nextRowLocation][colLocation] = " "
            rowLocation += 1;
            playerTop += 50;
            canMove = true
        }
    } else if (map[nextRowLocation][colLocation] === "X") {

        if (map[nextnextRowLocation][colLocation] === " ") {

            map[nextnextRowLocation][colLocation] = "B"
            map[nextRowLocation][colLocation] = "O"
            rowLocation += 1;
            playerTop += 50;
            canMove = true
        }
    }
    console.log(rowLocation, colLocation)
    console.log(playerTop, playerLeft)
    clearDiv()
    displayMap()
    winCheck()
}




function winCheck() {
    let total = 0
    for (let row = 0; row < map.length; row++) {
        for (let column = 0; column < map[row].length; column++) {
            if (map[row][column] === "X") {
                total = total + 1
            }
        }
    }
    if (total === 7) {
        document.getElementById("winCheck").innerHTML = "Congratulations"
        document.removeEventListener("keydown", mover);
    }
}






document.getElementById("Restart").addEventListener('click', function () {
    location.reload()
})
