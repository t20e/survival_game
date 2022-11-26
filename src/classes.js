import { context, canvas, player } from './script.js'

class Sprite {
    constructor({
        position, image, moving = false, speed, stats,
        frames = { x: 1, y: 0, max: 1, scale: 1, offset: { x: 0, y: 0 } }, sprites, type = 'undefined',
    }) {
        this.stats = stats
        this.type = type
        this.sprites = sprites
        this.direction = 'down'
        this.position = position
        this.moving = moving
        this.speed = speed
        this.frames = { ...frames, val: 0, elapsed: 0 }
        this.image = new Image()
        this.image.src = image
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
    getAroundBoundary() {
    }
    changeSprite(direction, mode) {
        if (direction === player.direction) {
            this.image = this.sprites[direction][mode]
        }
        switch (direction) {
            case 'down':
                if (this.direction !== 'down') {
                    this.direction = direction
                    this.image = this.sprites[direction][mode]
                    this.frames.max = this.sprites.runFrames
                }
                break
            case 'up':
                if (this.direction !== 'up') {
                    this.direction = direction
                    this.image = this.sprites[direction][mode]
                    this.frames.max = this.sprites.runFrames
                }
                break
            case 'right':
                if (this.direction !== 'right') {
                    this.direction = direction
                    this.image = this.sprites[direction][mode]
                    this.frames.max = this.sprites.runFrames
                }
                break
            case 'left':
                if (this.direction !== 'left') {
                    this.direction = direction
                    this.image = this.sprites[direction][mode]
                    this.frames.max = this.sprites.runFrames
                }
                break
            // case 'jump':
            //   if (this.image !== this.sprites.jump.image) {
            //     this.image = this.sprites.jump.image
            //     this.framesMax = this.sprites.jump.framesMax
            //     this.framesCurrent = 0
            //   }
            //   break

            // case 'fall':
            //   if (this.image !== this.sprites.fall.image) {
            //     this.image = this.sprites.fall.image
            //     this.framesMax = this.sprites.fall.framesMax
            //     this.framesCurrent = 0
            //   }
            //   break

            // case 'attack1':
            //   if (this.image !== this.sprites.attack1.image) {
            //     this.image = this.sprites.attack1.image
            //     this.framesMax = this.sprites.attack1.framesMax
            //     this.framesCurrent = 0
            //   }
            //   break

            // case 'takeHit':
            //   if (this.image !== this.sprites.takeHit.image) {
            //     this.image = this.sprites.takeHit.image
            //     this.framesMax = this.sprites.takeHit.framesMax
            //     this.framesCurrent = 0
            //   }
            //   break

            // case 'death':
            //   if (this.image !== this.sprites.death.image) {
            //     this.image = this.sprites.death.image
            //     this.framesMax = this.sprites.death.framesMax
            //     this.framesCurrent = 0
            //   }
            //   break
        }
    }
}


class Enemy extends Sprite {
    constructor(...args) {
        super(...args)
        this.directionToPlayer = 'left'
        this.attackingMode = false
    }
    test() {
    }
    moveToPlayer({ canvas, player }) {
        // the image takes up more then just one spirte so calculate the current position divide by individual sprite
        super.draw()
        // TODO fix enemy movement to play
        if (player.stats.health <= 0) {
            this.sprites[this.directionToPlayer]['idle']
            this.moving = false
            return
        }
        if (this.frames.elapsed % 5 === 0) {
            const canvasCenterWidth = canvas.width / 2
            const canvasCenterHeight = canvas.height / 2
            let objFromCenter = {
                x: canvasCenterWidth - this.position.x - 100,
                y: canvasCenterHeight - this.position.y - 50
            }
            let directionOfTravel = { x: 0, y: 0 }
            // if amount is less than zero meaning (canvasHalf 400 - enemy position 900) = -500
            //  means i need to move enemy in either up or left and vice versa if position to right and down
            // TODO if i can get the direction between canvas and enemy that i can better adjust
            // there directionToPlayer
            if (objFromCenter.y < 0) {
                // move enemy y up
                directionOfTravel.y -= this.speed
            } else {
                directionOfTravel.y = this.speed
            }
            if (objFromCenter.x < 0) {
                // move enemy x left
                directionOfTravel.x -= this.speed
            } else {
                directionOfTravel.x = this.speed
            }
            if (objFromCenter.y < 0) {
                // move enemy y up
                directionOfTravel.y -= this.speed
                this.directionToPlayer = 'up'
            } else {
                directionOfTravel.y = this.speed
                this.directionToPlayer = 'down'
            }
            if (objFromCenter.x < 0) {
                // move enemy x left
                directionOfTravel.x -= this.speed
                this.directionToPlayer = 'left'
            } else {
                directionOfTravel.x = this.speed
                this.directionToPlayer = 'right'
            }
            // stop moving if the enemy is at center most likely attacking
            // stops the enemy when its a center distance from player
            // console.log(objFromCenter)
            // TODO attacking player
            if (
                objFromCenter.x < 50 && objFromCenter.x > -50
                &&
                objFromCenter.y < 50 && objFromCenter.y > -50
            ) {
                this.image = this.sprites[this.directionToPlayer]['attack']
                this.frames.max = this.sprites.attackFrames
                this.attackingMode = true
                this.attackPlayer(player)
                return;
            } else {
                this.image = this.sprites[this.directionToPlayer]['run']
                this.frames.max = this.sprites.runFrames
            };
            this.position.x += directionOfTravel.x
            this.position.y += directionOfTravel.y
        }
    }
    attackPlayer(player) {
        // if(player.stats.health <= 0 ){
        //     console.log('player died')
        //     return
        // }
        if (this.frames.elapsed % 100 === 0) {
            player.stats.health -= this.stats.attackDamage
            console.log(player.stats.health)
            this.attackingMode = false
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
        // TODO when a player collieds with a block make an affect to ficker the red color of the block
        context.fillStyle = 'rgba(255,0,0,0.4)'
        // context.fillStyle = this.flicker ? 'rgba(255,0,0,0.4)' : 'rgba(255,0,0,0.0)'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

export { Boundary, Sprite, Enemy }

