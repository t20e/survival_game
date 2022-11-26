import './style.css'
import zoomedOutMapPng from './assets/map/base_map_zoomed_out.png'
import { Boundary, Sprite, Enemy } from './classes.js'
import {
    playerImgDown, playerImgUp, playerImgRight,
    playerImgLeft, goblin
} from './createImgs.js'
import { checkKeyPress,checkCollidingBoundary, addBoundaries, keys, boundaries } from './utils'

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
const testEnemy = new Enemy({ ...goblin })
// const testEnemyTwo = new Enemy({

// })
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
    //     // TODO test 
    // }
    // goblin
    {
        ...goblin,
        position: {
            x: canvas.width / 2 - 192 / 4 / 2,
            y: canvas.height / 2 - 68 / 2
        },
        type: 'player'
    }
)
enemies.push(testEnemy)
moveables.push(background, foreground, ...enemies)

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
    // TODO when user clicks play button it starts game 
    setTimeout(() => {
        // context.globalAlpha = 1
        context.clearRect(0, 0, canvas.width, canvas.height);
        // TODO make start sound
        // TODO every new game the player is randomly spawned anywhere use the base_img to change its start position
        // makes pixel images smoother
        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case 'w':
                    keys.w.pressed = true;
                    break;
                case 'a':
                    keys.a.pressed = true;
                    break;
                case 's':
                    keys.s.pressed = true;
                    break;
                case 'd':
                    keys.d.pressed = true;
                    break;
            }
        })
        window.addEventListener("keyup", (e) => {
            switch (e.key) {
                case 'w':
                    keys.w.pressed = false;
                    break;
                case 'a':
                    keys.a.pressed = false;
                    break;
                case 's':
                    keys.s.pressed = false;
                    break;
                case 'd':
                    keys.d.pressed = false;
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


const animate = () => {
    reqAnim = window.requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    if (player.stats.health <= 0) {
        gameOver()
        return;
    }
    if (!gameStarted) {
        player.draw()
        return
    }
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    player.draw()
    enemies.forEach(enemy => {
        checkCollidingBoundary({ pixelCount: { 'y': { amount: 3 } }, obj: enemy })
        enemy.moveToPlayer({ 'canvas': canvas, 'player': player })
        // check colliding with other enemy
    })
    foreground.draw()
    allowMoving = true
    player.moving = true

    checkKeyPress(player)
}

init()

export {
    context, canvas, offset, moveables, player, allowMoving
}