import base_mapPng from './assets/map/base_map.png'
import foregroundImport from './assets/map/foreground_map.png'
// player imgs
import player_imgDown from './assets/test_player/playerDown.png'
import playerImgUpPng from './assets/test_player/playerUp.png'
import playerImgRightPng from './assets/test_player/playerRight.png'
import playerImgLeftPng from './assets/test_player/playerLeft.png'

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

const base_img = new Image()
base_img.src = base_mapPng

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


const goblin = {
    type:'enemy',
    moving: true,
    speed: 2,
    image: enemy_imgDownPngIdle,
    position: {
        //TODO new location for every enemy
        x:200,
        y:400
    },
    frames: { max: 6, scale: 3, offset: { x: 13, y: 14 } },
    //TODO needs to be done on creating enemy ,
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
export {
    base_img, foregroundImg, playerImgDown, playerImgUp, playerImgRight,
    playerImgLeft, goblin
}