import './style.css'
import { collisions } from './assets/map/collision_array.js'
import zoomedOutMapPng from './assets/map/base_map_zoomed_out.png'
import { Boundary, Sprite, Enemy } from './classes.js'
import {
    playerImgDown, playerImgUp, playerImgRight,
    playerImgLeft, goblin
} from './createImgs.js'
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
let colliedDetected = false
// boundaries
const collisions_map = []
const boundaries = []
let gameStarted = false
const zoomedOutMap = document.getElementById('zoomedOutMap')
zoomedOutMap.src = zoomedOutMapPng
let roundCount = 1

document.querySelector('.playBtn').addEventListener('click', () => {
    new Audio(startAudio).play();
    transitionToPLay();
})
// keys pressed
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
}

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
const testEnemy = new Enemy({...goblin})
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
        type:'player'
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
    context.translate(canvas.width / 2, canvas.height / 2);
    // give images opacity has to be done before adding imag to context
    // context.globalAlpha = .6
    // context.drawImage(base_img, -base_img.width / 2, -base_img.height / 2);
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
        addBoundaries()
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

const checkCollidingObjs = ({ objOne, collidingObj }) => {
    return (
        objOne.position.x + objOne.width >= collidingObj.position.x
        && objOne.position.x <= collidingObj.position.x + collidingObj.width
        // check if objOne and bottom of boundary are colliding
        && objOne.position.y <= collidingObj.position.y + collidingObj.height
        // check if objOne and top of boundary are colliding
        && objOne.position.y + objOne.height >= collidingObj.position.y
    )
}

const addBoundaries = () => {
    // loop over all in the collisions array to make boundaries, increment by 80 because my tiled map is 80 tiled wide
    for (let i = 0; i < collisions.length; i += 80) {
        // loop through height
        collisions_map.push(collisions.slice(i, 80 + i))
        // console.log(collisions_map)
    }
    // console.log(collisions_map)
    collisions_map.forEach((row, i) => {
        row.forEach((Symbol, j) => {
            // the symbol us equal to the collision red block in the collision array from json which was imported from tiled app
            if (Symbol === 10509) {
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

// pixelCount checks if player is about to collied by  pixels
const checkCollidingBoundary = ({ pixelCount, obj }) => {
    let checkY;
    pixelCount['y'] ? checkY = true : checkY = false
    let add;
    // if(data['keyPressed'] !== keys.lastKeyPressed) allowMoving = true
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (checkY) {
            add = { x: boundary.position.x, y: boundary.position.y + pixelCount['y']['amount'] }
        } else {
            add = { x: boundary.position.x + pixelCount['x']['amount'], y: boundary.position.y }
        }
        if (checkCollidingObjs({
            objOne: obj, collidingObj: {
                ...boundary, position: add
            }
        })) {
            // this checks if the  objs are colliding
            if (obj.type === 'player') {
                allowMoving = false
            }
            colliding()
            colliedDetected = true
            boundary.flicker = true
            setTimeout(() => {
                boundary.flicker = false
            }, 1000)
            // stops the loop so because we already collied, no reason to continue looping over the rest of the boundaries
            break;
        }
    }
}
const collideWarningElem = document.getElementById('colliedAlert');
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
const checkKeyPress = () => {
    if (keys.w.pressed) {
        player.changeSprite('up', 'run')
        player.moving = true
        checkCollidingBoundary({ pixelCount: { 'y': { amount: 3 } }, obj: player })
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.y = item.position.y + player.speed
            })
        }
    } else
        if (keys.s.pressed) {
            player.changeSprite('down', 'run')
            player.moving = true
            checkCollidingBoundary({ pixelCount: { 'y': { amount: -3 } }, obj: player })
            if (allowMoving) {
                moveables.forEach(item => {
                    item.position.y = item.position.y - player.speed
                })
            }
        } else
            if (keys.a.pressed) {
                player.changeSprite('left', 'run')
                player.moving = true
                checkCollidingBoundary({ pixelCount: { 'x': { amount: 3 } }, obj: player })
                if (allowMoving) {
                    moveables.forEach(item => {
                        item.position.x = item.position.x + player.speed
                    })
                }
            } else
                if (keys.d.pressed) {
                    player.changeSprite('right', 'run')
                    player.moving = true
                    checkCollidingBoundary({ pixelCount: { 'y': { amount: -3 } }, obj: player })
                    if (allowMoving) {
                        moveables.forEach(item => {
                            item.position.x = item.position.x - player.speed
                        })
                    }
                }
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
    context.clearRect(0,0, canvas.width, canvas.height)
    if (player.stats.health <= 0) {
        gameOver()
        return;
    }
    if (!gameStarted) {
        player.draw()
        return
    }
    background.draw()
    // boundaries.forEach(boundary => {
    //     boundary.draw()
    // })
    player.draw()
    enemies.forEach(enemy => {
        // checkCollidingBoundary({ pixelCount: { 'y': { amount: 3 } }, obj: testEnemy })
        enemy.moveToPlayer({ 'canvas': canvas, 'player': player })
        // check colliding with other enemy
    })
    // foreground.draw()
    allowMoving = true
    player.moving = true

    checkKeyPress()
}

    init()

export {
    context, canvas
}