import * as script from '../script.js'
import * as Utils from './utils.js'
import gameOverAudio from '../assets/audio/death_sound.mp3'
import startAudio from '../assets/audio/game_start.mp3'


const gameOverCont = document.getElementById('gameOverCont')
const playBtn = document.querySelector('.playBtn')

const gameStats = {
    roundCount: 0,
    enemiesKilled: 0,
    amountOfBulletsFired: 0,
    gameStarted: false,
    isGameOver: false
}
const changeGameStats = (property, value) => {
    gameStats[property] = value
}

const gameOver = () => {
    new Audio(gameOverAudio).play();
    script.context.clearRect(0, 0, script.canvas.width, script.canvas.height)
    gameStats.isGameOver = true;
    gameOverCont.style.display = 'flex'
    document.querySelector('.numEnemiesKilled').innerHTML = '# of enemies killed : ' + gameStats.enemiesKilled
    document.querySelector('.amountOfBulletsFired').innerHTML = 'amount of bullets fired : ' + gameStats.amountOfBulletsFired
    document.querySelector('.roundsSurvived').innerHTML = 'rounds survived : ' + (gameStats.roundCount - 1)
    window.removeEventListener('click', Utils.createBullet)
    playBtn.addEventListener('click', restartGame)
    script.menu.style.display = 'flex'
    script.init()
    Utils.ammoDiv.style.display = 'none'
}
const restartGame = () => {
    for (const i in gameStats) {
        if (typeof gameStats[i] == 'boolean') {
            gameStats[i] = false
        }
        else {
            gameStats[i] = 0
        }
    }
    Utils.editHealthBar(100 + '%')
    playGameStartAudio()
    script.menu.style.display = 'none'
    gameOverCont.style.display = 'none'
    playBtn.removeEventListener('click', playGameStartAudio)
}
const playGameStartAudio = () => {
    new Audio(startAudio).play();
    script.transitionToPLay();
}
export { gameStats, playGameStartAudio, gameOver, playBtn, changeGameStats }