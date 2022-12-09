import { context, canvas, player } from './script.js'
import { editHealthBar } from './utils'
class Sprite {
    constructor({
        position, image, moving = false, speed, stats,
        frames = { x: 1, y: 0, max: 1, scale: 1, offset: { x: 0, y: 0 } }, sprites, type = 'undefined',
    }) {
        this.stats = stats
        this.type = type
        this.currAction = undefined
        this.sprites = sprites
        this.direction = 'down'
        this.position = position
        this.moving = moving
        this.speed = speed
        this.attackingMode = false
        this.frames = { ...frames, val: 0, elapsed: 0 }
        this.image = new Image()
        this.image.src = image
        this.image.onload = () => {
            this.width = (this.image.width / this.frames.max)
            this.height = this.image.height
        }
        if (this.type !== 'background') {
            for (const imgType in this.sprites) {
                if (Object.keys(this.sprites[imgType]).length > 1) {
                    for (const mode in this.sprites[imgType]) {
                        let newImg = new Image()
                        newImg.src = this.sprites[imgType][mode]
                        newImg.onload = () => {
                            this.sprites[imgType][mode] = newImg
                        }
                    }
                }
            }
        }
    }
    draw() {
        // if(this.type === 'player')
        // console.log(this.image)
        context.drawImage(
            this.image,
            // the next two parameters are also used to animate a sprite image
            // to get around the background and foreground not in the animate method i added the width < 5000
            (this.image.width / this.frames.max) < 5000 ? this.frames.val * (this.image.width / this.frames.max) : this.frames.val, //The x coordinate where to start clipping from img
            0, //The y coordinate where to start clipping from img
            this.image.width / this.frames.max, //how much to crop
            this.image.height, // The height of the clipped image
            // offset is for removing the padding from the final cropped sprite,
            this.position.x - this.frames.offset.x, //The x coordinate where to place the image on the canvas
            this.position.y - this.frames.offset.y, //The y coordinate where to place the image on the canvas
            (this.image.width / this.frames.max) * this.frames.scale, //adjust scale the cutout image x
            this.image.height * this.frames.scale, //adjust scale the cutout image y
        )
        // create a strok at the center of the sprite 
        // context.strokeRect(this.position.x + (this.image.width / this.frames.max), this.position.y + (this.image.height), 10, 10)
        if (!this.moving) return
        this.animate()
    }
    animate() {
        // animate the image by making look like the entity is moving
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
    getAroundBoundary() {
    }
    changeSprite(direction, mode, whichFrames) {
        let changeWidthHeight = false
        // if (this.type === 'enemy') {
        //     // to make the enemy be able to attack and move in the same direction did this
        //     this.frames.max = this.sprites[whichFrames]
        // }
        switch (direction) {
            case 'down':
                if (this.image !== this.sprites[direction][mode]) {
                    this.direction = direction
                    this.image = this.sprites[direction][mode]
                    this.frames.max = this.sprites[whichFrames]
                    changeWidthHeight = true
                }
                break;
            case 'up':
                if (this.image !== this.sprites[direction][mode]) {
                    this.direction = direction
                    this.image = this.sprites[direction][mode]
                    this.frames.max = this.sprites[whichFrames]
                    changeWidthHeight = true
                }
                break;
            case 'right':
                if (this.image !== this.sprites[direction][mode]) {
                    this.direction = direction
                    this.image = this.sprites[direction][mode]
                    this.frames.max = this.sprites[whichFrames]
                    changeWidthHeight = true
                }
                break;
            case 'left':
                if (this.image !== this.sprites[direction][mode]) {
                    this.direction = direction
                    this.image = this.sprites[direction][mode]
                    this.frames.max = this.sprites[whichFrames]
                    changeWidthHeight = true
                }
                break;
            case 'special':
                // handle attacks and hurt modes 
                this.currAction = 'hurt'
                this.image = this.sprites[this.direction][mode]
                this.frames.max = this.sprites[whichFrames]
                changeWidthHeight = true
                setTimeout(() => {
                    this.currAction = undefined
                }, 400)
                break;
        }
        if (changeWidthHeight) {
            // this.image.onload = () => {
            this.width = (this.image.width / this.frames.max)
            this.height = this.image.height
            // }
        }
    }
}


class Enemy extends Sprite {
    constructor(...args) {
        super(...args)
        this.directionToPlayer = 'left'
    }
    test() {
    }
    moveToPlayer({ canvas, player }) {
        super.draw()
        if (player.stats.health <= 0) {
            this.image = this.sprites[this.directionToPlayer]['idle']
            this.frames.max = this.sprites.idleFrames
            return
        }
        if (this.frames.elapsed % 5 === 0) {
            let pathToPlayer = {
                direction: undefined,
                mode: 'run',
                whichFrames: 'runFrames',
                x: 0,
                y: 0,
                speed: this.speed
            }
            const amountToMoveTo = {
                x: this.position.x - player.position.x + (player.image.width / player.frames.max),
                y: this.position.y - player.position.y + (player.image.height)
            }
            if (
                amountToMoveTo.x < 100 && amountToMoveTo.y < 100 &&
                amountToMoveTo.x > -100 && amountToMoveTo.y > -100
            ) {
                // console.log('close to player')
                pathToPlayer = { ...pathToPlayer, speed: 0, mode: 'attack', whichFrames: 'attackFrames' }
                this.attackPlayer(player)
                this.attackingMode = true
            }
            if (amountToMoveTo.x > 0) {
                // move enemy to the left
                if (Math.abs(amountToMoveTo.x) > Math.abs(amountToMoveTo.y)) {
                    pathToPlayer.direction = 'left'
                }
                pathToPlayer.x = -pathToPlayer.speed
            } else if (amountToMoveTo.x < 0) {
                // move enemy to the right
                if (Math.abs(amountToMoveTo.x) > Math.abs(amountToMoveTo.y)) {
                    pathToPlayer.direction = 'right'
                }
                pathToPlayer.x = pathToPlayer.speed
            }
            if (amountToMoveTo.y > 0) {
                // move enemy to the top
                if (Math.abs(amountToMoveTo.y) > Math.abs(amountToMoveTo.x)) {
                    pathToPlayer.direction = 'up'
                }
                pathToPlayer.y = -pathToPlayer.speed
            } else if (amountToMoveTo.y < 0) {
                // move enemy to the bottom
                if (Math.abs(amountToMoveTo.y) > Math.abs(amountToMoveTo.x)) {
                    pathToPlayer.direction = 'down'
                }
                pathToPlayer.y = pathToPlayer.speed
            }
            this.position.x += pathToPlayer.x
            this.position.y += pathToPlayer.y
            // console.log(pathToPlayer.direction)
            // console.log(this.frames.max)
            this.changeSprite(pathToPlayer.direction, pathToPlayer.mode, pathToPlayer.whichFrames)
        }
    }
    attackPlayer(player) {
        if (player.stats.health <= 0) {
            editHealthBar(0 + '%')
            console.log('player died')
            return
        }
        if (this.frames.elapsed % 20 === 0) {
            if (this.attackingMode) {
                player.stats.health -= this.stats.attackDamage
                editHealthBar(player.stats.health + '%')
                player.changeSprite('special', 'hurt', 'hurtFrames')
                this.attackingMode = false
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
        this.flicker = false
    }
    draw() {
        // context.fillStyle = 'rgba(255,0,0,0.4)'
        context.fillStyle = this.flicker ? 'rgba(255,0,0,0.4)' : 'rgba(255,0,0,0.0)'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

export { Boundary, Sprite, Enemy }

