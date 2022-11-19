// const { context } = require('./script')
import { context } from './script'

class Sprite {
    constructor({
        position, image, frames = { x: 1, y: 0, max: 1 }, sprites = [], clippedSpriteSize = { x: 1, y: 1 }, adjustImage = { x: 1, y: 1 }
    }) {
        this.sprites = sprites
        this.position = position
        this.image = image
        this.moving = false
        // this.clippedSpriteSize = clippedSpriteSize
        // this.adjustImage = adjustImage
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
            this.image.width / this.frames.max, //The width of the clipped image
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
        if (this.frames.elapsed % 10 === 0) {
            if (this.frames.val < this.frames.max - 1) {
                this.frames.val++
            } else {
                this.frames.val = 0
            }
        }
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
export { Boundary, Sprite }