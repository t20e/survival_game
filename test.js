// // the image takes up more then just one spirte so calculate the current position divide by individual sprite
        // super.draw()
        // // TODO fix enemy movement to play
        // if (player.stats.health <= 0) {
        //     this.sprites[this.directionToPlayer]['idle']
        //     // this.moving = false
        //     return
        // }
        // if (this.frames.elapsed % 5 === 0) {
        //     let direction = {
        //         look: undefined,
        //         mode: undefined,
        //         speed: this.speed
        //     }
        //     const amountToMoveTo = {
        //         x: this.position.x - player.position.x + (player.image.width / player.frames.max),
        //         y: this.position.y - player.position.y + (player.image.height)
        //     }
        //     if (
        //         amountToMoveTo.x < 100 && amountToMoveTo.y < 100 &&
        //         amountToMoveTo.x > -100 && amountToMoveTo.y > -100
        //     ) {
        //         direction = {
        //             speed: 0,
        //             mode: 'attack',
        //         }
        //         this.frames.max = this.sprites.attackFrames
        //         // TODO attack player
        //         this.attackPlayer(player)
        //     }
        //     if (amountToMoveTo.y < 0) {
        //         // move enemy y up
        //         if (Math.abs(amountToMoveTo.x) < Math.abs(amountToMoveTo.y)) {
        //             if (direction.mode !== 'attack') {
        //                 direction.mode = 'run'
        //             }
        //             direction.look = 'down'
        //         }
        //         this.position.y += direction.speed
        //     } else if (amountToMoveTo.y > 0) {
        //         if (Math.abs(amountToMoveTo.x) < Math.abs(amountToMoveTo.y)) {
        //             if (direction.mode !== 'attack') {
        //                 direction.look = 'up'
        //             }
        //             direction.mode = 'run'
        //         }
        //         this.position.y -= direction.speed
        //     }
        //     if (amountToMoveTo.x < 0) {
        //         if (Math.abs(amountToMoveTo.y) < Math.abs(amountToMoveTo.x)) {
        //             if (direction.mode !== 'attack') {
        //                 direction.mode = 'run'
        //             }
        //             direction.look = 'right'
        //         }
        //         // move enemy x left
        //         this.position.x += direction.speed
        //     } else if (amountToMoveTo.x > 0) {
        //         if (Math.abs(amountToMoveTo.y) < Math.abs(amountToMoveTo.x)) {
        //             if (direction.mode !== 'attack') {
        //                 direction.mode = 'run'
        //             }
        //             direction.look = 'left'
        //         }
        //         this.position.x -= direction.speed
        //     }
        //     this.changeSprite(direction.look, direction.mode)
