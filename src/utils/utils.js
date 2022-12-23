import { Bullet, Enemy, Sprite } from '../classes.js'
import { flying_bat } from '../createImgs.js'
import {
    moveables, allowMoving, arrOfBullets, enemies, extraAmmoAndHealth, editEnemies, editMoveables, player
} from '../script.js'
import * as gameInfo from './gameInfo.js'
import Lottie from 'lottie-web'
import keysGesture from '../assets/other/keys.json'
import mouseGesture from '../assets/other/mouse.json'
import * as collisionDection from './collisionDetection'
import outOfAmmoAudio from '../assets/audio/outOfAmmo.mp3'
import clockGunAudio from '../assets/audio/clockGun.mp3'
import healthPlusImg from '../assets/other/pills_2.png'
import ammoPlusImg from '../assets/other/ammo_3.png'
import health_pickupAudio from '../assets/audio/health_pickup.mp3'
import gunHitAudio from '../assets/audio/gunHit.mp3'
import gunShotAudio from '../assets/audio/gunshot.mp3'
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
        playerCollectAmmoOrHealth()
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.y += player.speed
            })
        }
    } else if (keys.s.pressed) {
        player.changeSprite('down', 'run', 'runFrames')
        player.moving = true
        collisionDection.checkCollidingBoundary({ pixelCount: { 'y': { amount: -60 } }, obj: player })
        playerCollectAmmoOrHealth()
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.y -= player.speed
            })
        }
    } else if (keys.a.pressed) {
        player.changeSprite('left', 'run', 'runFrames')
        player.moving = true
        collisionDection.checkCollidingBoundary({ pixelCount: { 'x': { amount: 3 } }, obj: player })
        playerCollectAmmoOrHealth()
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.x += player.speed
            })
        }
    } else if (keys.d.pressed) {
        player.changeSprite('right', 'run', 'runFrames')
        player.moving = true
        collisionDection.checkCollidingBoundary({ pixelCount: { 'x': { amount: -40 } }, obj: player })
        playerCollectAmmoOrHealth()
        if (allowMoving) {
            moveables.forEach(item => {
                item.position.x -= player.speed
            })
        }
    } else {
        player.changeSprite(player.direction, 'idle', 'idleFrames')
    }
}

const survivalScreen = document.querySelector('.roundStart')
const pRound = survivalScreen.children[0]
pRound.style.display = 'none'
const healthBar = document.querySelector('.health')
const editHealthBar = (percentage) => {
    healthBar.style.width = percentage
}
const ammoDiv = document.getElementById('ammoDiv')
const editAmmoDiv = () => {
    ammoDiv.children[0].innerHTML = `AMMO: ${player.ammo}`
}
const changeRoundText = () => {
    gameInfo.changeGameStats('roundCount', gameInfo.gameStats.roundCount + 1)
    pRound.style.display = 'flex'
    pRound.classList.add('zoom-in')
    pRound.innerHTML = `Round: ${gameInfo.gameStats.roundCount}`
    setTimeout(() => {
        pRound.classList.remove('zoom-in')
        pRound.style.display = 'none'
    }, 3000)
}
const startGame = () => {
    // enable all things that are needed for the game such as the health bar etc
    new Audio(clockGunAudio).play();
    const healthDiv = document.getElementById('healthBar')
    healthDiv.style.display = 'block'
    movementGestureCont.style.display = 'flex'
    setTimeout(() => {
        movementGestureCont.style.display = 'none'
        ammoDiv.style.display = 'block'
    }, 5000)
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
    player.changeSprite('special', 'attack', 'attackFrames')
    setTimeout(() => {
        if (player.ammo <= 0) {
            new Audio(outOfAmmoAudio).play();
            return;
        }
        player.ammo -= 1
        editAmmoDiv()
        const bullet = new Bullet()
        arrOfBullets.push(bullet)
        moveables.push(bullet)
        new Audio(gunShotAudio).play();
        gameInfo.changeGameStats('amountOfBulletsFired', gameInfo.gameStats.amountOfBulletsFired + 1)
    }, 300);
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
    editMoveables(bullet)
    let index = arrOfBullets.indexOf(bullet) //remove from bullet arr
    arrOfBullets.splice(index, 1)
    bullet = null
}
const checkBulletCollied = (bullet) => {
    enemies.forEach((enemy, index) => {
        if (collisionDection.checkCollidingObjs({
            objOne: bullet, collidingObj: enemy
        })) {
            enemy.takeDamage(25)
            deleteBullet(bullet)
            new Audio(gunHitAudio).play();
            // console.log('enemy', enemy)
            if (enemy.stats.health <= 0) {
                //check to see if enemy is dead and do death sprite //return remove enemy from array list 
                // console.log('killed enemy')
                enemy.changeSprite('special', 'death', 'deathFrames')
                // setTimeout(() => {
                // console.log('before enemy', enemies)
                editMoveables(enemy)
                editEnemies(index)
                // console.log('killed enemy', enemies)
                // }, 200)
                gameInfo.changeGameStats('enemiesKilled', gameInfo.gameStats.enemiesKilled + 1)
                return
            }
            // console.log('bullet hit enemy')
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
    while (count < (4 * gameInfo.gameStats.roundCount)) {
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

const generateExtraAmmo = () => {
    // between every 1 and 10s generate wither of the bottom two
    let count = 0
    let arr = []
    while (count < 3) {
        count++
        const ammoPlus = new Sprite({
            position: {
                x: Math.floor(Math.random() * 800) + 0,
                y: Math.floor(Math.random() * 800) + 0
            },
            currAction: 'up',
            image: ammoPlusImg,
            type: 'ammo',
            frames: { x: 1, y: 0, max: 1, scale: .5, offset: { x: 0, y: 0 } },
        })
        arr.push(ammoPlus)
    }
    return arr
}
// bree6T78dfdf
const generateHealthPlus = () => {
    let arr = []
    const healthPlus = new Sprite({
        type: 'health',
        currAction: 'up',
        position: {
            x: Math.floor(Math.random() * 800) + 0,
            y: Math.floor(Math.random() * 800) + 0
        },
        frames: { x: 1, y: 0, max: 1, scale: .5, offset: { x: 0, y: 0 } },
        image: healthPlusImg,
    })
    arr.push(healthPlus)
    return arr
}

const givePlayerHealth = () => {
    if (player.stats.health + 55 > 100) {
        player.stats.health = 100
    } else {
        player.stats.health += 55
    }
}
const playerCollectAmmoOrHealth = () => {
    extraAmmoAndHealth.forEach((item, index) => {
        if (collisionDection.checkCollidingObjs({
            objOne: player, collidingObj: item
        })) {
            if (item.type === 'health') {
                givePlayerHealth()
                editHealthBar(player.stats.health + '%')
                new Audio(health_pickupAudio).play();
            } else {
                new Audio(clockGunAudio).play();
                player.ammo += 5
                editAmmoDiv()
            }
            extraAmmoAndHealth.splice(index, 1)
            editMoveables(item)
        }
    })

}
export {
    checkKeyPress, ammoDiv, generateEnemies, editAmmoDiv, generateExtraAmmo, generateHealthPlus, changeRoundText,
    createBullet, moveBullets, deleteBullet, keys, editHealthBar, startGame, spawnEntitiesPos
}