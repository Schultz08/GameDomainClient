let canvas;
const canvasContext = null;
const friction = 0.99;

class Player {
    constructor(x, y, radius, color, canvasContext) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.canvasContext = canvasContext
    }

    //draw is a variable
    draw() {
        console.log(canvas, "Context")
        canvasContext.beginPath()
        canvasContext.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2,
            false)
        canvasContext.fillStyle = this.color
        canvasContext.fill()
    }
    
}

//The Projectile class for creating multiple of projectiles
class Projectile {
    //Class constructor when creating the class must pass these veriables into the class
    //The x and y refer to the position of the object created-Peojectile
    //velocity refers to the speed
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    //draw a variable// what it looks like
    draw() {
        canvasContext.beginPath()
        canvasContext.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2,
            false)
        canvasContext.fillStyle = this.color
        canvasContext.fill()
    }

    //update is minipulating the propities
    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        canvasContext.beginPath()
        canvasContext.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2,
            false)
        canvasContext.fillStyle = this.color
        canvasContext.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }

}

class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1 //opacity value. A negitave value will make it reappear again
    }

    draw() {
        canvasContext.save() // to edit opacity call global function save
        canvasContext.globalAlpha = this.alpha
        canvasContext.beginPath()
        canvasContext.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2,
            false)
        canvasContext.fillStyle = this.color
        canvasContext.fill()
        canvasContext.restore() // ends global call save
    }

    update() {
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.alpha -= 0.01

    }

}


// const x = canvas.width / 2
// const y = canvas.height / 2

// const player = new Player(10, 10, 10, "red")

module.exports = { Player, Projectile, Enemy, Particle, canvasContext, canvas}