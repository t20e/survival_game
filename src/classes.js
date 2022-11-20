import { context } from './script'

class Sprite {
    constructor({
        position, image, moving = false, speed = 3, health = 100, direction, frames = { x: 1, y: 0, max: 1 }, sprites = []
    }) {
        this.sprites = sprites
        this.direction = direction
        this.health = health
        this.position = position
        this.image = image
        this.moving = moving
        this.speed = speed
        this.frames = { ...frames, val: 0, elapsed: 0 }
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
            // console.log('height: ' + this.height, 'width: ' + this.width)
        }
    }
    draw() {
        context.drawImage(
            this.image,
            // the next two parameters are also used to animate a sprite image
            // to get around the background and foreground not in the animate method i added the this.width < 5000
            this.width < 5000 ? this.frames.val * this.width : this.frames.val, //The x coordinate where to start clipping from img
            0, //The y coordinate where to start clipping from img
            this.image.width / this.frames.max, //how much to crop
            this.image.height, // The height of the clipped image
            this.position.x, //The x coordinate where to place the image on the canvas
            this.position.y, //The y coordinate where to place the image on the canvas
            this.image.width / this.frames.max, //adjust scale the cutout image x
            this.image.height, //adjust scale the cutout image y
        )
        if (!this.moving) return
        this.animate()
    }
    animate() {
        if (this.frames.max > 1) {
            this.frames.elapsed++
        }
        if (this.frames.elapsed % 11 === 0) {
            if (this.frames.val < this.frames.max - 1) {
                this.frames.val++
            } else {
                this.frames.val = 0
            }
        }
    }
}

class Enemy extends Sprite {
    constructor(...args) {
        super(...args)
        // this.image.onload = () => {
        //     this.width = this.image.width / this.frames.max
        //     this.height = this.image.height
        //     console.log('height: ' + this.height, 'width: ' + this.width)
        // }
        this.directionToPlayer = 'left'
    }
    test() {
    }
    moveToPlayer({ canvas }) {
        super.draw()
        const canvasCenterWidth = canvas.width / 2
        const canvasCenterHeight = canvas.height / 2
        // console.log(canvasCenterHeight, centerWidth)
        // the image takes up more then just one spirte so calculate the current position divide by individual sprite
        let objFromCenter = {
            x: canvasCenterWidth - this.position.x - 50,
            y: canvasCenterHeight - this.position.y - 150
        }
        // console.log(objFromCenter)
        // if (this.frames.elapsed % 5 === 0) {
        // TODO maybe its better to move the enemy by which is closer the x or y position
        // instead of it just moving in both direction , doesn't look good on screen
        // TODO rn the enemy is changing its position and not working correctly, only change the enemys
        //  direction to player if the direction is in the x or y is less than the direction in the x or y
        let directionOfTravel = { x: 0, y: 0 }
        if (objFromCenter.x < 0) {
            // move enemy x left
            directionOfTravel.x -= this.speed
            this.directionToPlayer = 'left'
        } else {
            this.directionToPlayer = 'right'
            directionOfTravel.x = this.speed
        }
        if (objFromCenter.y < 0) {
            // move enemy y up
            this.directionToPlayer = 'up'
            directionOfTravel.y -= this.speed
        } else {
            this.directionToPlayer = 'down'
            directionOfTravel.y = this.speed
        }
        this.image = this.sprites[this.directionToPlayer]['run']
        // stop moving if the enemy is at center most likely attacking
        // stops the enemy when its a center distance from player
        // console.log(objFromCenter)
        if (
            objFromCenter.x < 50 && objFromCenter.x > -50
            &&
            objFromCenter.y < 50 && objFromCenter.y > -50
        ) {
            this.image = this.sprites[this.directionToPlayer]['attack']
            this.frames.max = 10
            return;
        } else {
            this.image = this.sprites[this.directionToPlayer]['run']
            this.frames.max = 6
        };
        this.position.x += directionOfTravel.x
        this.position.y += directionOfTravel.y
    }
}

class Boundary {
    // 16 pixels times 4 (the zoomed in amount is 400%) = 64
    static width = 64
    static height = 64
    constructor({ position }) {
        this.position = position,
            this.width = 64
        this.height = 64
    }
    draw() {
        // TODO when a player collieds with a block make an affect to ficker the red color of the block
        context.fillStyle = 'rgba(255,0,0,0.0)'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
export { Boundary, Sprite, Enemy }

