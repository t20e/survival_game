
import {
    colliding, setColliedDetected, boundaries,
    changeMovement
} from '../script'

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
    // return (
    //     objOne.position.x + objOne.image.width >= collidingObj.position.x
    //     && objOne.position.x <= collidingObj.position.x + collidingObj.image.width
    //     // check if objOne and bottom of boundary are colliding
    //     && objOne.position.y <= collidingObj.position.y + collidingObj.image.height
    //     // check if objOne and top of boundary are colliding
    //     && objOne.position.y + objOne.image.height >= collidingObj.position.y
    // )
    return (
        objOne.position.x + objOne.width >= collidingObj.position.x
        && objOne.position.x <= collidingObj.position.x + collidingObj.width
        // check if objOne and bottom of boundary are colliding
        && objOne.position.y <= collidingObj.position.y + collidingObj.height
        // check if objOne and top of boundary are colliding
        && objOne.position.y + objOne.height >= collidingObj.position.y
    )
}

export {
    checkCollidingObjs, checkCollidingBoundary
}