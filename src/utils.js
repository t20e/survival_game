import { collisions } from './assets/map/collision_array.js'
import { Boundary } from './classes.js'
import { offset, moveables, allowMoving } from './script.js'

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
const checkKeyPress = (player) => {
    if (keys.w.pressed) {
        player.changeSprite('up', 'run')
        player.moving = true
        checkCollidingBoundary({ pixelCount: { 'y': { amount: 3 } }, obj: player })
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.y = item.position.y + player.speed
            })
        }
    } else if (keys.s.pressed) {
        player.changeSprite('down', 'run')
        player.moving = true
        checkCollidingBoundary({ pixelCount: { 'y': { amount: -3 } }, obj: player })
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.y = item.position.y - player.speed
            })
        }
    } else if (keys.a.pressed) {
        player.changeSprite('left', 'run')
        player.moving = true
        checkCollidingBoundary({ pixelCount: { 'x': { amount: 3 } }, obj: player })
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.x = item.position.x + player.speed
            })
        }
    } else if (keys.d.pressed) {
        player.changeSprite('right', 'run')
        player.moving = true
        checkCollidingBoundary({ pixelCount: { 'y': { amount: -3 } }, obj: player })
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.x = item.position.x - player.speed
            })
        }
    } else {
        player.changeSprite(player.direction, 'idle')
    }
}

const collisions_map = []
let colliedDetected = false
// boundaries
const boundaries = []

// pixelCount checks if player is about to collied by  pixels
const checkCollidingBoundary = ({ pixelCount, obj }) => {
    let checkY;
    pixelCount['y'] ? checkY = true : checkY = false
    let add;
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        // check if its the y distance between obj and bountry that we are checking
        if (checkY) {
            // add is checking if the two objects are going to collied in the future
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
            console.log('colliding')
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

export { checkKeyPress, checkCollidingBoundary, addBoundaries, keys, boundaries }