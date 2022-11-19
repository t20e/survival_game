import './style.css'
import base_img_import from './assets/base_map.png'
import base_map_zoomed_out from './assets/base_map_zoomed_out.png'
import foregroundImport from './assets/foreground_map.png'
import { collisions } from './assets/collision_array'

// const Sprite = require('./classes')
// const  Sprite  = require('./classes')
import { Boundary, Sprite } from './classes'
// player imgs
import player_imgDown from './assets/test_player/playerDown.png'
import playerImgUpPng from './assets/test_player/playerUp.png'
import playerImgRightPng from './assets/test_player/playerRight.png'
import playerImgLeftPng from './assets/test_player/playerLeft.png'

//
const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
export const context = canvas.getContext('2d')
const base_img = new Image()
base_img.src = base_map_zoomed_out

const foregroundImg = new Image()
foregroundImg.src = foregroundImport
// down
const playerImgDown = new Image()
playerImgDown.src = player_imgDown
// up
const playerImgUp = new Image()
playerImgUp.src = playerImgUpPng
// right
const playerImgRight = new Image()
playerImgRight.src = playerImgRightPng
// left
const playerImgLeft = new Image()
playerImgLeft.src = playerImgLeftPng



// map location

const offset = {
    x: -1250,
    y: -1500
}
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: base_img
})
const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: foregroundImg
})

const player = new Sprite({
    image: playerImgRight,
    frames: { max: 4 },
    // clippedSpriteSize: { x: 4, y: 1 },
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    sprites: {
        up: playerImgUp,
        left: playerImgLeft,
        right: playerImgRight,
        down: playerImgDown,
    }
})
// boundaries
const collisions_map = []
const boundaries = []



const init = () => {
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.translate(canvas.width / 2, canvas.height / 2);
    // give images opacity has to be done before adding imag to context
    // context.globalAlpha = 0.9
    context.drawImage(base_img, -base_img.width / 2, -base_img.height / 2);
    context.translate(-canvas.width / 2, -canvas.height / 2)
    base_img.src = ''
    base_img.src = base_img_import
    // TODO when user clicks play button it starts game 
    base_img.onload = () => {
        setTimeout(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            play()
        }, 1000)
    }
}

// 
base_img.onload = () => {
    init()
}

const spawnAblePositions = [[-1650, -1500]]
const play = () => {
    // TODO make start sound
    // TODO every new game the player is randomly spawned anywhere use the base_img to change its start position
    // makes pixel images smoother
    context.imageSmoothingEnabled = false;
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

    //TODO generate enemies and other things and rount
    animate()
}
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

// const testBoundary = new Boundary({
//     position: {
//         x: 400,
//         y: 400
//     }
// })
const chechCollidingObjs = ({ objOne, collidingObj }) => {
    return (
        objOne.position.x + objOne.width >= collidingObj.position.x
        && objOne.position.x <= collidingObj.position.x + collidingObj.width
        // check if objOne and bottom of boundary are colliding
        && objOne.position.y <= collidingObj.position.y + collidingObj.height
        // check if objOne and top of boundary are colliding
        && objOne.position.y + objOne.height >= collidingObj.position.y
    )
}
const moveables = [background, foreground]
const animate = () => {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    player.draw()
    foreground.draw()

    // testBoundary.draw()
    allowMoving = true
    player.moving = false
    if (keys.w.pressed) {
        player.image = player.sprites.up
        player.moving = true
        checkCollidingOnKeyPress({ pixelCount: { 'y': { amount: 3 } } })
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.y = item.position.y + 3
            })
        }
    }
    if (keys.s.pressed) {
        player.image = player.sprites.down
        player.moving = true
        checkCollidingOnKeyPress({ pixelCount: { 'y': { amount: -3 } } })
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.y = item.position.y - 3
            })
        }
    }
    if (keys.a.pressed) {
        player.image = player.sprites.left
        player.moving = true
        checkCollidingOnKeyPress({ pixelCount: { 'x': { amount: 3 } } })
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.x = item.position.x + 3
            })
        }
    }
    if (keys.d.pressed) {
        player.moving = true
        player.image = player.sprites.right
        checkCollidingOnKeyPress({ pixelCount: { 'y': { amount: -3 } } })
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.x = item.position.x - 3
            })
        }
    }
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
                    }
                }))
            }
        })
    })
    // console.log(boundaries)
    moveables.push(...boundaries)
}
let allowMoving;
// pixelCount checks if player is about to collied by  pixels
const checkCollidingOnKeyPress = ({ pixelCount }) => {
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
        if (chechCollidingObjs({
            objOne: player, collidingObj: {
                ...boundary, position: add
            }
        })) {
            // this checks if the  objs are colliding
            allowMoving = false
            colliding()
            // context.fillStyle = 'blue'?
            // stops the loop so because we already collied, no reason to continue looping over the rest of the boundaries
            break;
        }
    }
}
const colliding = () => {
    // TODO div that popups saying that the user is going to restricted area
    console.log('colliding')

}

module.exports = context