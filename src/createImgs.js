import base_map_zoomed_out from './assets/map/base_map_zoomed_out.png'
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

// enemy
// down
const enemy_imgDownAttack = new Image()
enemy_imgDownAttack.src = enemy_imgDownPngAttack
const enemy_imgDownDeath = new Image()
enemy_imgDownDeath.src = enemy_imgDownPngDeath
const enemy_imgDownHurt = new Image()
enemy_imgDownHurt.src = enemy_imgDownPngHurt
const enemy_imgDownIdle = new Image()
enemy_imgDownIdle.src = enemy_imgDownPngIdle
const enemy_imgDownRun = new Image()
enemy_imgDownRun.src = enemy_imgDownPngRun
// left
const enemy_imgLeftAttack = new Image()
enemy_imgLeftAttack.src = enemy_imgLeftPngAttack
const enemy_imgLeftDeath = new Image()
enemy_imgLeftDeath.src = enemy_imgLeftPngDeath
const enemy_imgLeftHurt = new Image()
enemy_imgLeftHurt.src = enemy_imgLeftPngHurt
const enemy_imgLeftIdle = new Image()
enemy_imgLeftIdle.src = enemy_imgLeftPngIdle
const enemy_imgLeftRun = new Image()
enemy_imgLeftRun.src = enemy_imgLeftPngRun
// right
const enemy_imgRightAttack = new Image()
enemy_imgRightAttack.src = enemy_imgRightPngAttack
const enemy_imgRightDeath = new Image()
enemy_imgRightDeath.src = enemy_imgRightPngDeath
const enemy_imgRightHurt = new Image()
enemy_imgRightHurt.src = enemy_imgRightPngHurt
const enemy_imgRightIdle = new Image()
enemy_imgRightIdle.src = enemy_imgRightPngIdle
const enemy_imgRightRun = new Image()
enemy_imgRightRun.src = enemy_imgRightPngRun
// up
const enemy_imgUpAttack = new Image()
enemy_imgUpAttack.src = enemy_imgUpPngAttack
const enemy_imgUpDeath = new Image()
enemy_imgUpDeath.src = enemy_imgUpPngDeath
const enemy_imgUpHurt = new Image()
enemy_imgUpHurt.src = enemy_imgUpPngHurt
const enemy_imgUpIdle = new Image()
enemy_imgUpIdle.src = enemy_imgUpPngIdle
const enemy_imgUpRun = new Image()
enemy_imgUpRun.src = enemy_imgUpPngRun

const goblinSprites = {
    up: {
        attack: enemy_imgUpAttack,
        death: enemy_imgUpDeath,
        hurt: enemy_imgUpHurt,
        idle: enemy_imgUpIdle,
        run: enemy_imgUpRun
    },
    down: {
        attack: enemy_imgDownAttack,
        death: enemy_imgDownDeath,
        hurt: enemy_imgDownHurt,
        idle: enemy_imgDownIdle,
        run: enemy_imgDownRun
    },
    right: {
        attack: enemy_imgRightAttack,
        death: enemy_imgRightDeath,
        hurt: enemy_imgRightHurt,
        idle: enemy_imgRightIdle,
        run: enemy_imgRightRun
    },
    left: {
        death: enemy_imgLeftDeath,
        attack: enemy_imgLeftAttack,
        hurt: enemy_imgLeftHurt,
        idle: enemy_imgLeftIdle,
        run: enemy_imgLeftRun
    }
}

export {
    base_img, foregroundImg, playerImgDown, playerImgUp, playerImgRight,
    playerImgLeft, goblinSprites
}