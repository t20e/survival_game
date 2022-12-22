import './style.css'
import { collisions } from './assets/map/collision_array.js'
import { Boundary, Sprite, Enemy, Bullet } from './classes.js'
import {
    goblin, flying_bat
} from './createImgs.js'
import * as Utils from './utils/utils'

import base_img from './assets/map/base_map.png'
import foregroundImg from './assets/map/foreground_map.png'
import * as gameInfo from './utils/gameInfo.js'




const menu = document.getElementById('menu')
const survivalScreen = document.querySelector('.roundStart')
const pRound = survivalScreen.children[0]
pRound.style.display = 'none'
const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const context = canvas.getContext('2d')
context.imageSmoothingEnabled = false;
const zoomedOutMap = document.getElementById('zoomedOutMap')

// the animate func to be stopped etc
let reqAnimation;
let allowMoving; //allows things to be moved

const enemies = []
const editEnemies = (index) => {
    enemies.splice(index, 1)
}
// moveables will move other objects when player moves to give the illusion that they are all moving
const moveables = []
const editMoveables = (removeObj) => {
    moveables.forEach((item, index) => {
        if (item.id === removeObj.id) {
            moveables.splice(index, 1)
        }
    })
}


const changeMovement = (boolean) => {
    allowMoving = boolean
}

let allowNextRound = true
const arrOfBullets = []//array of all the bullets player has shot

const collisions_map = []
let colliedDetected = false
// boundaries
const boundaries = []
const collideWarningElem = document.getElementById('colliedAlert');

let background, offset, foreground, testEnemy
const player = new Sprite(
    {
        ...goblin,
        position: {
            // the 12 is to grow because we are scaling
            x: canvas.width / 2 - (192 * 12) / 4 / 2,
            y: canvas.height / 2 - (68 * 12) / 2
        },
        // position: {
        //     x: canvas.width / 2 - 192 / 4 / 2,
        //     y: canvas.height / 2 - 68 / 2
        // },
        speed: 2.5,
        type: 'player',
        frames: { ...goblin.frames, scale: 12 }
    }
)

// const testBoundary = new Boundary({
//     position: {
//         x: 400,
//         y: 300
//     }
// })
background = new Sprite({
    type: 'background',
    position: Utils.spawnEntitiesPos(),
    image: base_img
})
offset = {
    // offset the map
    x: background.position.x,
    y: background.position.y,
}

foreground = new Sprite({
    type: 'background',
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: foregroundImg
})
moveables.push(background, foreground)


const init = () => {
    gameInfo.playBtn.addEventListener('click', gameInfo.playGameStartAudio)
    // testEnemy = new Enemy({
    //     ...flying_bat,
    //     position: {
    //         x: Math.floor(Math.random() * 800) + 100,
    //         y: Math.floor(Math.random() * 800) + 100
    //     }
    // })
    // enemies.push(testEnemy)
    // fill background black
    // context.fillStyle = 'black'
    // context.fillRect(0, 0, canvas.width, canvas.height)
    context.translate(canvas.width / 2, canvas.height / 2);
    // give images opacity has to be done before adding imag to context
    // context.globalAlpha = .6
    context.translate(-canvas.width / 2, -canvas.height / 2)
    animate()
}
const addBoundaries = () => {
    // loop over all in the collisions array to make boundaries, increment by 40 because my tiled map is 80 tiled wide
    for (let i = 0; i < collisions.length; i += 40) {
        // loop through height
        collisions_map.push(collisions.slice(i, 40 + i))
        // console.log(collisions_map)
    }
    // console.log(collisions_map)
    collisions_map.forEach((row, i) => {
        row.forEach((Symbol, j) => {
            // the symbol us equal to the collision red block in the collision array from json which was imported from tiled app
            if (Symbol === 1601) {
                boundaries.push(new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    },
                    color: 'rgba(255,0,0,0.0)'
                }))
            }
        })
    })
    // console.log(boundaries)
    moveables.push(...boundaries)
}
addBoundaries()

const setColliedDetected = (boolean) => {
    colliedDetected = boolean
}
const colliding = () => {
    op = 1
    if (!colliedDetected) {
        console.log('colliding')
        collideWarningElem.style.display = 'flex'
        setTimeout(() => {
            fadeOutElem()
        }, 2000)
    }
}
let op = 1
const fadeOutElem = () => {
    colliedDetected = false

    let timer = setInterval(() => {
        if (op <= .01) {
            clearInterval(timer)
            collideWarningElem.style.display = 'none'
            collideWarningElem.style.opacity = 1
            op = 1
        }
        collideWarningElem.style.opacity = op
        collideWarningElem.style.filter = 'alpha(opacity' + op * 100 + ')';
        op -= op * .1
    }, 100)
}
// 
const transitionToPLay = () => {
    zoomedOutMap.style.display = 'none'
    menu.style.display = 'none'
    window.cancelAnimationFrame(reqAnimation)
    gameInfo.changeGameStats('gameStarted', true)
    player.stats.health = 100
    player.frames.scale = 3
    player.position = {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    }
    play()
}


const play = () => {
    setTimeout(() => {
        // context.globalAlpha = 1
        context.clearRect(0, 0, canvas.width, canvas.height);
        // makes pixel images smoother
        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case 'w':
                case 'W':
                    Utils.keys.w.pressed = true;
                    break;
                case 'a':
                case 'A':
                    Utils.keys.a.pressed = true;
                    break;
                case 's':
                case 'S':
                    Utils.keys.s.pressed = true;
                    break;
                case 'd':
                case 'D':
                    Utils.keys.d.pressed = true;
                    break;
            }
        })
        window.addEventListener("keyup", (e) => {
            switch (e.key) {
                case 'w':
                case 'W':
                    Utils.keys.w.pressed = false;
                    break;
                case 'a':
                case 'A':
                    Utils.keys.a.pressed = false;
                    break;
                case 's':
                case 'S':
                    Utils.keys.s.pressed = false;
                    break;
                case 'd':
                case 'D':
                    Utils.keys.d.pressed = false;
                    break;
            }
        })
        window.addEventListener('click', Utils.createBullet)
    }, 1000)
    Utils.startGame()
    animate()
}

const nextRound = () => {
    // go to next round
    Utils.changeRoundText()
    // console.log('before round',moveables)
    moveables.forEach((item, index) => {
        if (item instanceof Enemy) {
            // console.log('index', index)
            moveables.splice(index, 1)
            // console.log('removed enemy from moveables', item)
        }
    })
    // console.log('after round', moveables)
    enemies.length = 0
    const newEnemies = Utils.generateEnemies()
    moveables.push(...newEnemies)
    enemies.push(...newEnemies)
}
const animate = () => {
    if (gameInfo.gameStats.isGameOver) return
    reqAnimation = window.requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    if (!gameInfo.gameStats.gameStarted) {
        player.draw()
        return
    }
    if (player.stats.health <= 0) {
        player.changeSprite('special', 'death', 'deathFrames')
        enemies.length = 0
        // console.log(enemies)
        arrOfBullets.length = 0
        // console.log('before death',moveables)
        moveables.forEach((item, index) => {
            if (item.isDefault !== true) {
                moveables.splice(index, 1)
            }
        })
        // console.log('after death',moveables)
        window.cancelAnimationFrame(reqAnimation);
        setTimeout(() => {
            allowNextRound = true
            gameInfo.gameOver()
        }, 1000)
    }
    if (allowNextRound && enemies.length === 0) {
        nextRound()
        allowNextRound = false
    } else if (!allowNextRound && enemies.length === 0) {
        allowNextRound = true
    }
    player.moving = true
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    player.draw()
    foreground.draw()
    enemies.forEach(enemy => {
        enemy.moveToPlayer({ 'canvas': canvas, 'player': player })
    })
    allowMoving = true
    if (player.currAction === undefined) {
        Utils.checkKeyPress(player)
    }
    if (arrOfBullets.length > 0) {
        Utils.moveBullets()
    }
}

init()

export {
    context, init, canvas, offset, moveables, player, changeMovement,
    colliding, pRound, setColliedDetected, allowMoving, boundaries,
    arrOfBullets, menu, transitionToPLay, enemies, reqAnimation, editEnemies, editMoveables
}