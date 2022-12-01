// for goblin collison 
if (keys.w.pressed) {
    player.changeSprite('up', 'run')
    player.moving = true
    checkCollidingBoundary({ pixelCount: { 'y': { amount: -40 } }, obj: player })
    if (allowMoving) {
        moveables.forEach(item => {
            item.position.y = item.position.y + player.speed
        })
    }
} else if (keys.s.pressed) {
    player.changeSprite('down', 'run')
    player.moving = true
    checkCollidingBoundary({ pixelCount: { 'y': { amount: -60 } }, obj: player })
    if (allowMoving) {
        moveables.forEach(item => {
            item.position.y = item.position.y - player.speed
        })
    }
} else if (keys.a.pressed) {
    player.changeSprite('left', 'run')
    player.moving = true
    checkCollidingBoundary({ pixelCount: { 'x': { amount: 3 } }, obj: player })
    if (allowMoving) {
        moveables.forEach(item => {
            item.position.x = item.position.x + player.speed
        })
    }
} else if (keys.d.pressed) {
    player.changeSprite('right', 'run')
    player.moving = true
    checkCollidingBoundary({ pixelCount: { 'x': { amount: -40 } }, obj: player })
    if (allowMoving) {
        moveables.forEach(item => {
            item.position.x = item.position.x - player.speed
        })
    }
}