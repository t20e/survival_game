import base_mapPng from './assets/map/base_map.png'
import foregroundImport from './assets/map/foreground_map.png'
// player imgs

// player
// down 
import playerDownPngAttack from './assets/sprites/player/Down/downAttack.png'
import playerDownPngDeath from './assets/sprites/player/Down/downDeath.png'
import playerDownPngHurt from './assets/sprites/player/Down/downHurt.png'
import playerDownPngIdle from './assets/sprites/player/Down/downIdle.png'
import playerDownPngRun from './assets/sprites/player/Down/downRun.png'
//  right
import playerRightPngAttack from './assets/sprites/player/Right/rightAttack.png'
import playerRightPngDeath from './assets/sprites/player/Right/rightDeath.png'
import playerRightPngHurt from './assets/sprites/player/Right/rightHurt.png'
import playerRightPngIdle from './assets/sprites/player/Right/rightIdle.png'
import playerRightPngRun from './assets/sprites/player/Right/rightRun.png'
//up
import playerUpPngAttack from './assets/sprites/player/Up/upAttack.png'
import playerUpPngDeath from './assets/sprites/player/Up/upDeath.png'
import playerUpPngHurt from './assets/sprites/player/Up/upHurt.png'
import playerUpPngIdle from './assets/sprites/player/Up/upIdle.png'
import playerUpPngRun from './assets/sprites/player/Up/upRun.png'
//left
import playerLeftPngAttack from './assets/sprites/player/Left/leftAttack.png'
import playerLeftPngDeath from './assets/sprites/player/Left/leftDeath.png'
import playerLeftPngHurt from './assets/sprites/player/Left/leftHurt.png'
import playerLeftPngIdle from './assets/sprites/player/Left/leftIdle.png'
import playerLeftPngRun from './assets/sprites/player/Left/leftRun.png'


// flying_bat
// down 
import flyingBatDownPngAttack from './assets/sprites/flyingBat/Down/GoblinRiderAttack03.png'
import flyingBatDownPngDeath from './assets/sprites/flyingBat/Down/GoblinRiderDeath.png'
import flyingBatDownPngHurt from './assets/sprites/flyingBat/Down/GoblinRiderHurt.png'
import flyingBatDownPngIdle from './assets/sprites/flyingBat/Down/GoblinRiderIdle.png'
import flyingBatDownPngRun from './assets/sprites/flyingBat/Down/GoblinRiderMove.png'
//left
import flyingBatLeftPngAttack from './assets/sprites/flyingBat/Left/GoblinRiderLeftAttack03.png'
import flyingBatLeftPngDeath from './assets/sprites/flyingBat/Left/GoblinRiderLeftDeath.png'
import flyingBatLeftPngHurt from './assets/sprites/flyingBat/Left/GoblinRiderLeftHurt.png'
import flyingBatLeftPngIdle from './assets/sprites/flyingBat/Left/GoblinRiderLeftIdle.png'
import flyingBatLeftPngRun from './assets/sprites/flyingBat/Left/GoblinRiderLeftMove.png'
// sprites/flyingBat right
import flyingBatRightPngAttack from './assets/sprites/flyingBat/Right/GoblinRiderRightAttack03.png'
import flyingBatRightPngDeath from './assets/sprites/flyingBat/Right/GoblinRiderRightDeath.png'
import flyingBatRightPngHurt from './assets/sprites/flyingBat/Right/GoblinRiderRightHurt.png'
import flyingBatRightPngIdle from './assets/sprites/flyingBat/Right/GoblinRiderRightIdle.png'
import flyingBatRightPngRun from './assets/sprites/flyingBat/Right/GoblinRiderRightMove.png'
//up
import flyingBatUpPngAttack from './assets/sprites/flyingBat/Up/GoblinRiderUpAttack03.png'
import flyingBatUpPngDeath from './assets/sprites/flyingBat/Up/GoblinRiderUpDeath.png'
import flyingBatUpPngHurt from './assets/sprites/flyingBat/Up/GoblinRiderUpHurt.png'
import flyingBatUpPngIdle from './assets/sprites/flyingBat/Up/GoblinRiderUpIdle.png'
import flyingBatUpPngRun from './assets/sprites/flyingBat/Up/GoblinRiderUpMove.png'


// bullet
import bulletLeft from './assets/bullet/bullet_left.png'
import bulletDown from './assets/bullet/bullet_down.png'
import bulletRight from './assets/bullet/bullet_right.png'
import bulletUp from './assets/bullet/bullet_up.png'

const bulletObj = {
    left: bulletLeft,
    right: bulletRight,
    down: bulletDown,
    up: bulletUp,
}
const base_img = new Image()
base_img.src = base_mapPng
const foregroundImg = new Image()
foregroundImg.src = foregroundImport



const playerObj = {
    type: 'enemy',
    moving: true,
    speed: 2,
    image: playerDownPngIdle,
    position: {
        x: 200,
        y: 400
    },
    // frames: { max: 6, scale: 3, offset: { x: 20, y: 5 } },
    frames: { max: 6, scale: 3, offset: { x: 50, y: 30 } },
    stats: {
        health: 100,
        attackDamage: 15
    },
    sprites: {
        attackFrames: 6,
        deathFrames: 14,
        hurtFrames: 1,
        idleFrames: 6,
        runFrames: 8,
        up: {
            attack: playerUpPngAttack,
            death: playerUpPngDeath,
            hurt: playerUpPngHurt,
            idle: playerUpPngIdle,
            run: playerUpPngRun
        },
        down: {
            attack: playerDownPngAttack,
            death: playerDownPngDeath,
            hurt: playerDownPngHurt,
            idle: playerDownPngIdle,
            run: playerDownPngRun
        },
        right: {
            attack: playerRightPngAttack,
            death: playerRightPngDeath,
            hurt: playerRightPngHurt,
            idle: playerRightPngIdle,
            run: playerRightPngRun
        },
        left: {
            death: playerLeftPngDeath,
            attack: playerLeftPngAttack,
            hurt: playerLeftPngHurt,
            idle: playerLeftPngIdle,
            run: playerLeftPngRun
        }
    }
}

const flying_bat = {
    id: undefined,
    type: 'enemy',
    moving: true,
    speed: 3,
    image: flyingBatDownPngIdle,
    frames: {
        max: 5, scale: 2,
        offset: {
            // offset will crop the image so to remove the padding ie empty white space
            x: 0, y: 0
        }
    },
    stats: {
        health: 50,
        attackDamage: 12
    },
    sprites: {
        attackFrames: 5,
        deathFrames: 10,
        hurtFrames: 4,
        idleFrames: 5,
        runFrames: 4,
        up: {
            attack: flyingBatUpPngAttack,
            death: flyingBatUpPngDeath,
            hurt: flyingBatUpPngHurt,
            idle: flyingBatUpPngIdle,
            run: flyingBatUpPngRun
        },
        down: {
            attack: flyingBatDownPngAttack,
            death: flyingBatDownPngDeath,
            hurt: flyingBatDownPngHurt,
            idle: flyingBatDownPngIdle,
            run: flyingBatDownPngRun
        },
        right: {
            attack: flyingBatRightPngAttack,
            death: flyingBatRightPngDeath,
            hurt: flyingBatRightPngHurt,
            idle: flyingBatRightPngIdle,
            run: flyingBatRightPngRun
        },
        left: {
            death: flyingBatLeftPngDeath,
            attack: flyingBatLeftPngAttack,
            hurt: flyingBatLeftPngHurt,
            idle: flyingBatLeftPngIdle,
            run: flyingBatLeftPngRun
        }
    }
}

export {
    base_img, foregroundImg, playerObj, flying_bat, bulletObj
}