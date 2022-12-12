import base_mapPng from './assets/map/base_map.png'
import foregroundImport from './assets/map/foreground_map.png'
// player imgs

// goblin
// down 
import enemy_imgDownPngAttack from './assets/goblin/Down/GoblinDownAttack01.png'
import enemy_imgDownPngDeath from './assets/goblin/Down/GoblinDownDeath.png'
import enemy_imgDownPngHurt from './assets/goblin/Down/GoblinDownHurt.png'
import enemy_imgDownPngIdle from './assets/goblin/Down/GoblinDownIdle.png'
import enemy_imgDownPngRun from './assets/goblin/Down/GoblinDownRun.png'
//left
import enemy_imgLeftPngAttack from './assets/goblin/Left/GoblinLeftAttack01.png'
import enemy_imgLeftPngDeath from './assets/goblin/Left/GoblinLeftDeath.png'
import enemy_imgLeftPngHurt from './assets/goblin/Left/GoblinLeftHurt.png'
import enemy_imgLeftPngIdle from './assets/goblin/Left/GoblinLeftIdle.png'
import enemy_imgLeftPngRun from './assets/goblin/Left/GoblinLeftRun.png'
// goblin right
import enemy_imgRightPngAttack from './assets/goblin/Right/GoblinRightAttack01.png'
import enemy_imgRightPngDeath from './assets/goblin/Right/GoblinRightDeath.png'
import enemy_imgRightPngHurt from './assets/goblin/Right/GoblinRightHurt.png'
import enemy_imgRightPngIdle from './assets/goblin/Right/GoblinRightIdle.png'
import enemy_imgRightPngRun from './assets/goblin/Right/GoblinRightRun.png'
//up
import enemy_imgUpPngAttack from './assets/goblin/Up/GoblinUpAttack01.png'
import enemy_imgUpPngDeath from './assets/goblin/Up/GoblinUpDeath.png'
import enemy_imgUpPngHurt from './assets/goblin/Up/GoblinUpHurt.png'
import enemy_imgUpPngIdle from './assets/goblin/Up/GoblinUpIdle.png'
import enemy_imgUpPngRun from './assets/goblin/Up/GoblinUpRun.png'

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



const goblin = {
    type: 'enemy',
    moving: true,
    speed: 2,
    image: enemy_imgDownPngIdle,
    position: {
        x: 200,
        y: 400
    },
    frames: { max: 6, scale: 3, offset: { x: 18, y: 36 } },
    stats: {
        health: 100,
        attackDamage: 15
    },
    sprites: {
        attackFrames: 10,
        deathFrames: 9,
        hurtFrames: 4,
        idleFrames: 6,
        runFrames: 6,
        up: {
            attack: enemy_imgUpPngAttack,
            death: enemy_imgUpPngDeath,
            hurt: enemy_imgUpPngHurt,
            idle: enemy_imgUpPngIdle,
            run: enemy_imgUpPngRun
        },
        down: {
            attack: enemy_imgDownPngAttack,
            death: enemy_imgDownPngDeath,
            hurt: enemy_imgDownPngHurt,
            idle: enemy_imgDownPngIdle,
            run: enemy_imgDownPngRun
        },
        right: {
            attack: enemy_imgRightPngAttack,
            death: enemy_imgRightPngDeath,
            hurt: enemy_imgRightPngHurt,
            idle: enemy_imgRightPngIdle,
            run: enemy_imgRightPngRun
        },
        left: {
            death: enemy_imgLeftPngDeath,
            attack: enemy_imgLeftPngAttack,
            hurt: enemy_imgLeftPngHurt,
            idle: enemy_imgLeftPngIdle,
            run: enemy_imgLeftPngRun
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
    base_img, foregroundImg, goblin, flying_bat, bulletObj
}