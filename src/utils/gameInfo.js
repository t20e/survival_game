import * as script from '../script.js'
import * as Utils from './utils.js'
import gameOverAudio from '../assets/audio/death_sound.mp3'
import startAudio from '../assets/audio/game_start.mp3'



let gameStarted = false
let isGameOver = false
const gameOverCont = document.getElementById('gameOverCont')

const setGameStarted = (boolean) => {
    gameStarted = boolean
}
const playBtn = document.querySelector('.playBtn')
const gameStats = {
    roundCount: 0,
    enemiesKilled: 0,
    amountOfBulletsFired: 0,
}

const gameOver = () => {
    new Audio(gameOverAudio).play();
    script.context.clearRect(0, 0, script.canvas.width, script.canvas.height)
    isGameOver = true;
    gameOverCont.style.display = 'flex'
    document.querySelector('.numEnemiesKilled').innerHTML = '# of enemies killed : ' + gameStats.enemiesKilled
    document.querySelector('.amountOfBulletsFired').innerHTML = 'amount of bullets fired : ' + gameStats.amountOfBulletsFired
    document.querySelector('.roundsSurvived').innerHTML = 'rounds survived : ' + (gameStats.roundCount -1)
    window.removeEventListener('click', Utils.createBullet)
    playBtn.addEventListener('click', restartGame)
    script.init()
    script.menu.style.display = 'flex'
    // clear enemies and and bullets
    // bring back background image
    // restart the generate a new position for player
    // bring back play button
    // restart everything 
    // make round count = 1
}
const restartGame = () => {
    gameStats.roundCount = 0
    gameStats.enemiesKilled = 0
    gameStats.amountOfBulletsFired = 0
    Utils.editHealthBar(100 + '%')
    isGameOver = false
    playGameStartAudio()
    script.menu.style.display = 'none'
    gameOverCont.style.display = 'none'
    playBtn.removeEventListener('click', playGameStartAudio)
}
const playGameStartAudio = () => {
    new Audio(startAudio).play();
    script.transitionToPLay();
}
export { gameStats, playGameStartAudio, gameOver, playBtn, isGameOver, gameStarted, setGameStarted }