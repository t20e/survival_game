import { Bullet, Enemy } from '../classes.js'
import { flying_bat } from '../createImgs.js'
import {
    moveables, allowMoving, arrOfBullets, enemies, pRound
} from '../script.js'
import * as gameInfo from './gameInfo.js'
import Lottie from 'lottie-web'
import keysGesture from '../assets/other/keys.json'
import mouseGesture from '../assets/other/mouse.json'
import * as collisionDection from './collisionDetection'

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
        collisionDection.checkCollidingBoundary({ pixelCount: { 'y': { amount: -40 } }, obj: player })
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.y += player.speed
            })
        }
    } else if (keys.s.pressed) {
        player.changeSprite('down', 'run', 'runFrames')
        player.moving = true
        collisionDection.checkCollidingBoundary({ pixelCount: { 'y': { amount: -60 } }, obj: player })
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.y -= player.speed
            })
        }
    } else if (keys.a.pressed) {
        player.changeSprite('left', 'run', 'runFrames')
        player.moving = true
        collisionDection.checkCollidingBoundary({ pixelCount: { 'x': { amount: 3 } }, obj: player })
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.x += player.speed
            })
        }
    } else if (keys.d.pressed) {
        player.changeSprite('right', 'run', 'runFrames')
        player.moving = true
        collisionDection.checkCollidingBoundary({ pixelCount: { 'x': { amount: -40 } }, obj: player })
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.x -= player.speed
            })
        }
    } else {
        player.changeSprite(player.direction, 'idle', 'runFrames')
    }
}


const healthBar = document.querySelector('.health')
const editHealthBar = (percentage) => {
    healthBar.style.width = percentage
}
const changeRoundText = () => {
    pRound.style.display = 'flex'
    pRound.classList.add('zoom-in')
    setTimeout(() => {
        pRound.classList.remove('zoom-in')
        pRound.style.display = 'none'
        pRound.innerHTML = `Round: ${gameInfo.gameStats.roundCount}`
    }, 3000)
}
const startGame = () => {
    // enable all things that are needed for the game such as the health bar etc
    const healthDiv = document.getElementById('healthBar')
    healthDiv.style.display = 'block'
    movementGestureCont.style.display = 'flex'
    setTimeout(() => {
        movementGestureCont.style.display = 'none'
    }, 10000)
}
const mouseGestContainer = document.querySelector('.mouseMovement')
const keysContainer = document.querySelector('.keysMovement')
const movementGestureCont = document.querySelector('.movementGestureCont')

// load lottie files
Lottie.loadAnimation({
    container: mouseGestContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: mouseGesture
})
Lottie.loadAnimation({
    container: keysContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: keysGesture
})

// bullet
const createBullet = () => {
    // draw the bullet from which ever direction the player is in
    const bullet = new Bullet()
    arrOfBullets.push(bullet)
    moveables.push(bullet)
    gameInfo.gameStats.amountOfBulletsFired += 1
}
const moveBullets = () => {
    for (let i in arrOfBullets) {
        if (arrOfBullets[i].travelDistance >= 500) {
            deleteBullet(arrOfBullets[i])
            return
        }
        arrOfBullets[i].draw()
        checkBulletCollied(arrOfBullets[i])
    }
}
const deleteBullet = (bullet) => {
    let index = arrOfBullets.indexOf(bullet) //remove from bullet arr
    bullet = null
    arrOfBullets.splice(index, 1)
    index = moveables.indexOf(bullet) //remove from moveables arr
    moveables.splice(index, 1)
}
const checkBulletCollied = (bullet) => {
    enemies.forEach((enemy, index) => {
        if (collisionDection.checkCollidingObjs({
            objOne: bullet, collidingObj: enemy
        })) {
            // console.log('enemy', enemy)
            if (enemy.stats.health <= 0) {
                //check to see if enemy is dead and do death sprite //return remove enemy from array list 
                // console.log('killed enemy')
                enemy.changeSprite('special', 'death', 'deathFrames')
                setTimeout(() => {
                    // console.log('before enemy', enemies)
                    console.log(index)
                    enemies.splice(index, 1)
                    // console.log('killed enemy', enemies)
                }, 200)
                gameInfo.gameStats.enemiesKilled += 1
                return
            }
            deleteBullet(bullet)
            // console.log('bullet hit enemy')
            enemy.takeDamage(25)
        }
    })
}
// map location
const spawnAblePositions = [
    [-200, -400],
    [-1000, -350],
    [0, -1300],
    [-700, -1400]
]

const spawnEntitiesPos = () => {
    const position = spawnAblePositions[Math.floor(Math.random() * spawnAblePositions.length)]
    return {
        x: position[0],
        y: position[1],
    }
}

const generateEnemies = () => {
    let count = 0
    let enemiesArr = []
    while (count < (4 * (gameInfo.gameStats.roundCount === 0 ? 1 : gameInfo.gameStats.roundCount))) {
        const enemy = new Enemy({
            ...flying_bat,
            position: {
                x: Math.floor(Math.random() * 800) + 500,
                y: Math.floor(Math.random() * 800) + 500
            }
        })
        enemiesArr.push(enemy)
        count += 1
    }
    // console.log('enemiesArr', enemiesArr)
    return enemiesArr
}
export { checkKeyPress, generateEnemies, changeRoundText, createBullet, moveBullets, deleteBullet, keys, editHealthBar, startGame, spawnEntitiesPos }