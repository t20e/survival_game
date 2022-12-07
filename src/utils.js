import { Boundary } from './classes.js'
import { moveables, allowMoving, colliding, setColliedDetected, boundaries, changeMovement } from './script.js'
// todo create a map that all the thigs the player can go over like houses and draw it above player
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
        player.changeSprite('up', 'run', 'runFrames')
        player.moving = true
        checkCollidingBoundary({ pixelCount: { 'y': { amount: -40 } }, obj: player })
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.y = item.position.y + player.speed
            })
        }
    } else if (keys.s.pressed) {
        player.changeSprite('down', 'run', 'runFrames')
        player.moving = true
        checkCollidingBoundary({ pixelCount: { 'y': { amount: -60 } }, obj: player })
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.y = item.position.y - player.speed
            })
        }
    } else if (keys.a.pressed) {
        player.changeSprite('left', 'run', 'runFrames')
        player.moving = true
        checkCollidingBoundary({ pixelCount: { 'x': { amount: 3 } }, obj: player })
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.x = item.position.x + player.speed
            })
        }
    } else if (keys.d.pressed) {
        player.changeSprite('right', 'run', 'runFrames')
        player.moving = true
        checkCollidingBoundary({ pixelCount: { 'x': { amount: -40 } }, obj: player })
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.x = item.position.x - player.speed
            })
        }
    } else {
        player.changeSprite(player.direction, 'idle', 'runFrames')
    }
}


// pixelCount checks if player is about to collied by  pixels
const checkCollidingBoundary = ({ pixelCount, obj }) => {
    let checkY;
    pixelCount['y'] ? checkY = true : checkY = false
    let add;
    for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        // check if its the y distance between obj and boundary that we are checking
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
                changeMovement(false)
            }
            console.log('colliding')
            colliding()
            setColliedDetected(true)
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


export { checkKeyPress, checkCollidingBoundary, checkCollidingObjs, keys }