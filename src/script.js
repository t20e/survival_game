import './styles/main.css'
import base_img_import from './assets/base_map.png'
import base_map_zoomed_out from './assets/base_map_zoomed_out.png'
import player from './assets/player/Shotgunner/idle.png'
import { collisions } from './assets/collision_array'

const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const context = canvas.getContext('2d')
const base_img = new Image()
base_img.src = base_map_zoomed_out
base_img.style.opacity = .4
const playerImg = new Image()
playerImg.src = player


// map location
class Sprite {
    constructor({ position, image }) {
        this.position = position
        this.image = image
    }
    draw() {
        context.drawImage(this.image, this.position.x, this.position.y);
    }
}
const offset = {
    x: -1250,
    y: -1500
}
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: base_img
})
// boundaries
const collisions_map = []
const boundaries = []

class Boundary {
    static width = 64
    static height = 64
    constructor({ position }) {
        this.position = position,
            // 16pixels times 4 (the zoomed in amount is 400%) = 64
            this.width = 64
        this.height = 64
    }
    draw() {
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const init = () => {
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.translate(canvas.width / 2, canvas.height / 2);
    // give images opacity has to be done before adding imag to context
    // context.globalAlpha = 0.9
    context.drawImage(base_img, -base_img.width / 2, -base_img.height / 2);
    context.translate(-canvas.width / 2, -canvas.height / 2)
    // TODO when user clicks play button it starts game 
    base_img.src = ''
    base_img.src = base_img_import
    base_img.onload = () => {
        setTimeout(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            play()
        }, 1000)
    }
}

// 
base_img.onload = () => {
    init()
}

const spawnAblePositions = [[-1650, -1500]]
const play = () => {
    // TODO make start sound
    // TODO every new game the player is randomly spawned anywhere use the base_img to change its start position
    // makes pixel images smoother
    context.imageSmoothingEnabled = false;
    addBoundaries()
    window.addEventListener("keydown", (e) => {
        switch (e.key) {
            case 'w':
                keys.w.pressed = true;
                break;
            case 'a':
                keys.a.pressed = true;
                break;
            case 's':
                keys.s.pressed = true;
                break;
            case 'd':
                keys.d.pressed = true;
                break;
        }
    })
    window.addEventListener("keyup", (e) => {
        switch (e.key) {
            case 'w':
                keys.w.pressed = false;
                break;
            case 'a':
                keys.a.pressed = false;
                break;
            case 's':
                keys.s.pressed = false;
                break;
            case 'd':
                keys.d.pressed = false;
                break;
        }
    })

    //TODO generate enemies and other things and rount
    animate()
}
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

const testBoundary = new Boundary({
    position: {
        x: 400,
        y: 400
    }
})

const moveables = [background, testBoundary]
const animate = () => {
    window.requestAnimationFrame(animate)
    background.draw()
    // boundaries.forEach(boundary =>{
    //     boundary.draw()
    // })
    testBoundary.draw()
    context.drawImage(
        playerImg,
        0, //x coordinate ? of player sprites crop
        0, //y coordinate ? of player sprites crop
        playerImg.width, // how much to crop the image //tip if threes 5 characters going left to right, and u want the 3rd character then this should be 3
        playerImg.height / 5, // how much to crop the image 
        canvas.width / 2 - (playerImg.width),//location that image is placed on canvas x
        canvas.height / 2 - (playerImg.height) / 2, //location that image is placed on canvas y,
        playerImg.width * 4, // image the crop is rendered as y
        playerImg.height / 5 * 4, // image the crop is rendered as x
    )
    // collision between the player and boundaries
        // if(player)
    // /w 
    if (keys.w.pressed && keys.a.pressed) {
        moveables.forEach(pChange => {
            pChange.position.y = pChange.position.y + 2
            pChange.position.x = pChange.position.x + 2
        })
    }
    else if (keys.w.pressed && keys.s.pressed) {
        moveables.forEach(pChange => {
            pChange.position.y = pChange.position.y
            pChange.position.x = pChange.position.x
        })
    }
    else if (keys.w.pressed && keys.d.pressed) {
        moveables.forEach(pChange => {
            pChange.position.y = pChange.position.y + 2
            pChange.position.x = pChange.position.x - 2
        })
        // background.position.y = background.position.y + 2
        // background.position.x = background.position.x - 2
    }
    // s
    else if (keys.s.pressed && keys.a.pressed) {
        moveables.forEach(pChange => {
            pChange.position.y = pChange.position.y - 2
            pChange.position.x = pChange.position.x + 2
        })
    }
    else if (keys.s.pressed && keys.d.pressed) {
        moveables.forEach(pChange => {
            pChange.position.y = pChange.position.y - 2
            pChange.position.x = pChange.position.x - 2
        })
    }
    else if (keys.w.pressed ) {
        moveables.forEach(pChange => {
            pChange.position.y = pChange.position.y + 3
        })
    }
    else if (keys.s.pressed ) {
        moveables.forEach(pChange => {
            pChange.position.y = pChange.position.y - 3
        })
    }
    else if (keys.a.pressed ) {
        moveables.forEach(pChange => {
            pChange.position.x = pChange.position.x + 3
        })
    }
    else if (keys.d.pressed ) {
        moveables.forEach(pChange => {
            pChange.position.x = pChange.position.x - 3
        })
    }
}
const addBoundaries = () => {
    // loop over all in the collisions array to make boundaries, increment by 80 because my tiled map is 80 tiled wide
    for (let i = 0; i < collisions.length; i += 80) {
        // loop through height
        collisions_map.push(collisions.slice(i, 80 + i))
        console.log(collisions_map)
    }

    collisions_map.forEach((row, i) => {
        row.forEach((Symbol, j) => {
            if (Symbol === 2684365069) {
                boundaries.push(new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                }))
            }
        })
    })
    console.log(boundaries)
}