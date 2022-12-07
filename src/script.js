import './style.css'
import { collisions } from './assets/map/collision_array.js'
import zoomedOutMapPng from './assets/map/base_map_zoomed_out.png'
import { Boundary, Sprite, Enemy } from './classes.js'
import {
    playerImgDown, playerImgUp, playerImgRight,
    playerImgLeft, goblin, flying_bat
} from './createImgs.js'
import * as utils from './utils'

import startAudio from './assets/audio/game_start.mp3'
import gameOverAudio from './assets/audio/death_sound.mp3'
import base_img from './assets/map/base_map.png'
import foregroundImg from './assets/map/foreground_map.png'

const menu = document.getElementById('menu')
const survivalScreen = document.querySelector('.surviveScreen')
const p = survivalScreen.children[0]
p.style.display = 'none'
// TODO make box around player and it enemy attacks that then that deals damage to player
// TODO i can also probably use that box to keep enemy away from player
//
const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const context = canvas.getContext('2d')
context.imageSmoothingEnabled = false;
let reqAnim;

let allowMoving;

const enemies = []
// moveables will move other objects when player moves to give the illusion that they are all moving
const moveables = []

let gameStarted = false
const zoomedOutMap = document.getElementById('zoomedOutMap')
zoomedOutMap.src = zoomedOutMapPng
let roundCount = 1

const collisions_map = []
let colliedDetected = false
// boundaries
const boundaries = []
const collideWarningElem = document.getElementById('colliedAlert');

document.querySelector('.playBtn').addEventListener('click', () => {
    new Audio(startAudio).play();
    transitionToPLay();
})
// map location
const spawnAblePositions = [[-1650, -1500]]

const offset = {
    // offset the map
    x: -1250,
    y: -1500
}
const background = new Sprite({
    type: 'background',
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: base_img
})

const foreground = new Sprite({
    type: 'background',
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: foregroundImg
})
const testEnemy = new Enemy({ ...flying_bat })

const player = new Sprite(
    //     {
    //     // type: 'player',
    //     // image: playerImgDown,
    //     // frames: { max: 4, scale: 6, offset: { y: 0, x: 0 } },
    //     // position: {
    //     //     x: canvas.width / 2 - 1200 / 4 / 2,
    //     //     y: canvas.height / 2 - 550 / 2
    //     // },
    //     // speed: 3,
    //     // sprites: {
    //     //     up: playerImgUp,
    //     //     left: playerImgLeft,
    //     //     right: playerImgRight,
    //     //     down: playerImgDown,
    //     // },
    //     // stats: {
    //     //     health: 100,
    //     //     attackDamage: 35
    //     // },
    //     // moving: true
    // }
    // goblin
    {
        ...goblin,
        position: {
            x: canvas.width / 2 - 192 / 4 / 2,
            y: canvas.height / 2 - 68 / 2
        },
        speed:10,
        type: 'player'
    }
)
enemies.push(testEnemy)
const testBoundary = new Boundary({
    position: {
        x: 400,
        y: 300
    }
})
moveables.push(background, foreground, ...enemies, testBoundary)


// console.log('x:', player.position.x - testEnemy.position.y, '\ny:', player.position.y - testEnemy.position.y)
// console.log('\n plaeyer:', player.position, '\nenemy:', testEnemy.position)

const init = () => {
    // fill background black
    // context.fillStyle = 'black'
    // context.fillRect(0, 0, canvas.width, canvas.height)
    addBoundaries()
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

const setColliedDetected = (boolean)=>{
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
    window.cancelAnimationFrame(reqAnim)
    gameStarted = true
    player.frames.scale = 3
    player.position = {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    }
    changeRoundText()
    play()
}
const changeRoundText = () => {
    p.style.display = 'flex'
    p.classList.add('zoom-in')
    setTimeout(() => {
        p.classList.remove('zoom-in')
        p.style.display = 'none'
        p.innerHTML = `Round: ${roundCount += 1}`
    }, 3000)
}

const play = () => {
    setTimeout(() => {
        // context.globalAlpha = 1
        context.clearRect(0, 0, canvas.width, canvas.height);
        // TODO every new game the player is randomly spawned anywhere use the base_img to change its start position
        // makes pixel images smoother
        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case 'w':
                    utils.keys.w.pressed = true;
                    break;
                case 'a':
                    utils.keys.a.pressed = true;
                    break;
                case 's':
                    utils.keys.s.pressed = true;
                    break;
                case 'd':
                    utils.keys.d.pressed = true;
                    break;
            }
        })
        window.addEventListener("keyup", (e) => {
            switch (e.key) {
                case 'w':
                    utils.keys.w.pressed = false;
                    break;
                case 'a':
                    utils.keys.a.pressed = false;
                    break;
                case 's':
                    utils.keys.s.pressed = false;
                    break;
                case 'd':
                    utils.keys.d.pressed = false;
                    break;
            }
        })
    }, 1000)
    //TODO generate enemies and other things and rount
    animate()
}

const gameOver = () => {
    new Audio(gameOverAudio).play();
    window.cancelAnimationFrame(reqAnim);
    // then display how did they did that game and have a button to restart the game
    // cancelAnimationFrame
    // player has died
    // bring back background image
    // bring back play button
    // restart everything 
    // make round count = 1
}
const changeMovement = (boolean) => {
    allowMoving = boolean
}
// TODO on the higher path is not drawing infront od player

const animate = () => {
    reqAnim = window.requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    if (player.stats.health <= 0) {
        gameOver()
        // return;
    }
    if (!gameStarted) {
        player.draw()
        return
    }
    player.moving = true
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    player.draw()
    foreground.draw()
    enemies.forEach(enemy => {
    //     utils.checkCollidingBoundary({ pixelCount: { 'y': { amount: 3 } }, obj: enemy })
        enemy.moveToPlayer({ 'canvas': canvas, 'player': player })
    //     // check colliding with other enemy
    })
    allowMoving = true
    utils.checkKeyPress(player)
}

init()

export {
    context, canvas, offset, moveables, player, changeMovement, colliding, setColliedDetected,allowMoving, boundaries
}