import React from "react";
import gsap from "gsap";
const GameConst = require("./GameClasses")
const Enemy = require("./GameClasses").Enemy;
const Particle = require("./GameClasses").Particle;
const Projectile = require("./GameClasses").Projectile;

// const canvas = ""
// const canvasContext = canvas.getContext("2d");
// const canvas = document.querySelector("canvas");
// const canvasContext = canvas.getContext("2d");
// const canvasEle = canvas.current;
// const canvasContext = canvasEle.getContext("2d")
// const scoreElement = document.querySelector("#scoreElement")

// canvas.width = "100%";
// canvas.height = "100%";

//console.log(canvasContext); GET ALL CANVAS DATA

// class Player {
//     constructor(x, y, radius, color) {
//         this.x = x
//         this.y = y
//         this.radius = radius
//         this.color = color
//     }

//     //draw is a variable
//     draw() {
//         canvasContext.beginPath()
//         canvasContext.arc(
//             this.x,
//             this.y,
//             this.radius,
//             0,
//             Math.PI * 2,
//             false)
//         canvasContext.fillStyle = this.color
//         canvasContext.fill()
//     }
// }

// //The Projectile class for creating multiple of projectiles
// class Projectile {
//     //Class constructor when creating the class must pass these veriables into the class
//     //The x and y refer to the position of the object created-Peojectile
//     //velocity refers to the speed
//     constructor(x, y, radius, color, velocity) {
//         this.x = x
//         this.y = y
//         this.radius = radius
//         this.color = color
//         this.velocity = velocity
//     }

//     //draw a variable// what it looks like
//     draw() {
//         canvasContext.beginPath()
//         canvasContext.arc(
//             this.x,
//             this.y,
//             this.radius,
//             0,
//             Math.PI * 2,
//             false)
//         canvasContext.fillStyle = this.color
//         canvasContext.fill()
//     }

//     //update is minipulating the propities
//     update() {
//         this.draw()
//         this.x = this.x + this.velocity.x
//         this.y = this.y + this.velocity.y
//     }
// }

// class Enemy {
//     constructor(x, y, radius, color, velocity) {
//         this.x = x
//         this.y = y
//         this.radius = radius
//         this.color = color
//         this.velocity = velocity
//     }

//     draw() {
//         canvasContext.beginPath()
//         canvasContext.arc(
//             this.x,
//             this.y,
//             this.radius,
//             0,
//             Math.PI * 2,
//             false)
//         canvasContext.fillStyle = this.color
//         canvasContext.fill()
//     }

//     update() {
//         this.draw()
//         this.x = this.x + this.velocity.x
//         this.y = this.y + this.velocity.y
//     }

// }

// const friction = 0.99;
// class Particle {
//     constructor(x, y, radius, color, velocity) {
//         this.x = x
//         this.y = y
//         this.radius = radius
//         this.color = color
//         this.velocity = velocity
//         this.alpha = 1 //opacity value. A negitave value will make it reappear again
//     }

//     draw() {
//         canvasContext.save() // to edit opacity call global function save
//         canvasContext.globalAlpha = this.alpha
//         canvasContext.beginPath()
//         canvasContext.arc(
//             this.x,
//             this.y,
//             this.radius,
//             0,
//             Math.PI * 2,
//             false)
//         canvasContext.fillStyle = this.color
//         canvasContext.fill()
//         canvasContext.restore() // ends global call save
//     }

//     update() {
//         this.draw()
//         this.velocity.x *= friction
//         this.velocity.y *= friction
//         this.x = this.x + this.velocity.x
//         this.y = this.y + this.velocity.y
//         this.alpha -= 0.01

//     }

// }


// const x = canvas.width / 2
// const y = canvas.height / 2

// const player = new Player(x, y, 10, "red")


// //projectile array to "hold" to projectile while it is on the canvas
// const projectiles = [];
// const enemies = [];
// const particles = [];



// function spawnEnemies() {
//     setInterval(() => {
//         const radius = Math.random() * (50 - 10) + 10

//         let x
//         let y

//         if (Math.random() < 0.5) {

//             x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
//             y = Math.random() * canvas.height
//         } else {
//             x = Math.random() * canvas.width
//             y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
//         }
//         const color = `hsl(${Math.random() * 360} , 50%, 50%)`

//         //when getting the distance between 2 points always subtract from destination
//         const angle = Math.atan2(
//             canvas.height / 2 - y,
//             canvas.width / 2 - x)
//         // 0-360degrees = radiants 0-6.28
//         // console.log(angle) gets angle
//         //Create a projectile and pushes it to an array
//         const velocity = {
//             x: Math.cos(angle),
//             y: Math.sin(angle)
//         }
//         enemies.push(new Enemy(x, y, radius, color, velocity))
//         console.log(enemies)
//     }, 1000)
// }
// let animeationId
// let score = 0
// function animate() {
//     animeationId = requestAnimationFrame(animate)
//     canvasContext.fillStyle = "rgba(0,0,0,0.2)"
//     canvasContext.fillRect(0, 0, canvas.width, canvas.height)

//     player.draw();
//     //create explosions
//     particles.forEach((particle, index) => {
//         if (particle.alpha <= 0) {
//             particles.splice(index, 1)
//         } else {
//             particle.update()
//         }
//     });
//     //create projectiles
//     projectiles.forEach((projectile, index) => {
//         projectile.update()

//         if (projectile.x + projectile.radius < 0 ||
//             projectile.x - projectile.radius > canvas.width ||
//             projectile.y + projectile.radius < 0 ||
//             projectile.y - projectile.radius > canvas.height) {
//             setTimeout(() => {
//                 projectiles.splice(index, 1)
//             }, 0)
//         }
//     })

//     enemies.forEach((enemy, index) => {
//         enemy.update()

//         //gets the distance from an enemy to the player
//         const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)

//         if (dist - enemy.radius - player.radius < 1) {
//             cancelAnimationFrame(animeationId)
//         }

//         projectiles.forEach((projectile, pIndex) => {
//             const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
//             //Peojectiles hit enemy
//             if (dist - enemy.radius - projectile.radius < 5) {


//                 //create explosions
//                 for (let i = 0; i < enemy.radius * 2; i++) {
//                     particles.push(new Particle(
//                         projectile.x, // spawn location projectiles x
//                         projectile.y, // spawn location projectiles y
//                         Math.random() * 2, //radius(size) of particle
//                         enemy.color, { //makes explosion same color as enemy
//                         x: (Math.random() - 0.5) * (Math.random() * 8),//x volocity
//                         y: (Math.random() - 0.5) * (Math.random() * 8) //y volocity
//                     }))
//                 }

//                 if (enemy.radius - 10 > 5) {
//                     //the score
//                     score += 100;
//                     scoreElement.innerHTML = score;
//                     gsap.to(enemy, { radius: enemy.radius - 10 })
//                     setTimeout(() => {
//                         projectiles.splice(pIndex, 1)
//                     }, 0)
//                 }
//                 else {
//                     score += 250;
//                     scoreElement.innerHTML = score;
//                     setTimeout(() => {
//                         enemies.splice(index, 1)
//                         projectiles.splice(pIndex, 1)
//                     }, 0)
//                 }
//             }

//         })
//     })
// }

// addEventListener("click", (event) => {
//     //console.log(event)  WILL GET MOUSE EVENT LOG
//     //gets the angle from play to point of click
//     const angle = Math.atan2(
//         event.clientY - canvas.height / 2,
//         event.clientX - canvas.width / 2)
//     // 0 - 360degrees = radiants 0 - 6.28
//     // console.log(angle) gets angle
//     //Create a projectile and pushes it to an array
//     const velocity = {
//         x: Math.cos(angle) * 5,
//         y: Math.sin(angle) * 5
//     }
//     projectiles.push(
//         new Projectile(
//             canvas.width / 2,
//             canvas.height / 2,
//             5,
//             "white",
//             velocity
//         )
//     )
//     console.log(projectiles)

// })

class Canvas extends React.Component {
    // constructor create.Ref(canvas)
    constructor(props){
        super(props);
        this.state = {
            score: 0,
            isPlaying: true,
            projectiles: [],
            enemies: [],
            particles: [],
            canvas: React.createRef(),
            // canvasContext: this.state.canvas.getContext("2d"),
            player: 0
        }
    }
    componentDidMount(){
        // const canvas = React.createRef();
        // canvas.width = canvas.clientWidth;
        // canvas.height = canvas.clientHeight;
        // let myCanvas = React.createRef()

        GameConst.canvas = this.state.canvas;
        console.log(GameConst.canvas, "My Game CanvasConst")
        GameConst.canvasContext = this.state.canvas.getContext("2d")

        console.log(GameConst.canvasContext, "My Game CanvasContext State")
        console.log(this.state.canvas.current, "My Canvas State")
        // console.log(myCanvas.current, "My Canvas Mount")

        
        this.animate()
        this.spawnEnemies()
    }
    
    spawnEnemies = () => {
        let newEnemies = this.state.enemies;
        setInterval(() => {
            const radius = Math.random() * (50 - 10) + 10
    
            let x;
            let y;
    
            if (Math.random() < 0.5) {
    
                x = Math.random() < 0.5 ? 0 - radius : this.canvas.width + radius
                y = Math.random() * this.canvas.height
            } else {
                x = Math.random() * this.canvas.width
                y = Math.random() < 0.5 ? 0 - radius : this.canvas.height + radius
            }
            const color = `hsl(${Math.random() * 360} , 50%, 50%)`
    
            //when getting the distance between 2 points always subtract from destination
            const angle = Math.atan2(
                this.canvas.height / 2 - y,
                this.canvas.width / 2 - x)
            // 0-360degrees = radiants 0-6.28
            // console.log(angle) gets angle
            //Create a projectile and pushes it to an array
            const velocity = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            }
            newEnemies.push(new Enemy(x, y, radius, color, velocity))
            this.setState({enemies: newEnemies})
        }, 1000)
    }
    
    animate = () => {
        let animeationId
        let newParticles = this.state.particles
        let newProjectiles = this.state.projectiles
        let newEnemies = this.state.enemies
        let score = this.state.score
        
        animeationId = requestAnimationFrame(this.animate)
        this.canvasContext.fillStyle = "rgba(0,0,0,0.2)"
        this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height)
        
        this.state.player.draw();
        //create explosions
        newParticles.forEach((particle, index) => {
            if (particle.alpha <= 0) {
                newParticles.splice(index, 1)
            } else {
                particle.update()
            }
            this.setState({particles: newParticles})
        });
        //create projectiles
        newProjectiles.forEach((projectile, index) => {
            projectile.update()
            
            if (projectile.x + projectile.radius < 0 ||
                projectile.x - projectile.radius > this.canvas.width ||
                projectile.y + projectile.radius < 0 ||
                projectile.y - projectile.radius > this.canvas.height) {
                    setTimeout(() => {
                        newProjectiles.splice(index, 1)
                    }, 0)
                }
                this.setState({projectiles: newProjectiles})
                
            })
            
            newEnemies.forEach((enemy, index) => {
                enemy.update()
                
                //gets the distance from an enemy to the player
            const dist = Math.hypot(this.state.player.x - enemy.x, this.state.player.y - enemy.y)
            
            if (dist - enemy.radius - this.state.player.radius < 1) {
                cancelAnimationFrame(animeationId)
            }
            
            newProjectiles.forEach((projectile, pIndex) => {
                const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
                //Peojectiles hit enemy
                if (dist - enemy.radius - projectile.radius < 5) {
                    
                    
                    //create explosions
                    for (let i = 0; i < enemy.radius * 2; i++) {
                        newParticles.push(new Particle(
                            projectile.x, // spawn location projectiles x
                            projectile.y, // spawn location projectiles y
                            Math.random() * 2, //radius(size) of particle
                            enemy.color, { //makes explosion same color as enemy
                            x: (Math.random() - 0.5) * (Math.random() * 8),//x volocity
                            y: (Math.random() - 0.5) * (Math.random() * 8) //y volocity
                        }))
                    }
                    this.setState({particles: newParticles})

                    if (enemy.radius - 10 > 5) {
                        //the score
                        score += 100;
                        gsap.to(enemy, { radius: enemy.radius - 10 })
                        setTimeout(() => {
                            newProjectiles.splice(pIndex, 1)
                        }, 0)
                        this.setState({projectiles: newProjectiles})
                    }
                    else {
                        score += 250;
                        // scoreElement.innerHTML = score;
                        setTimeout(() => {
                            newEnemies.splice(index, 1)
                            newProjectiles.splice(pIndex, 1)
                        }, 0)
                        this.setState({enemies: newEnemies})
                        this.setState({projectiles: newProjectiles})
                    }
                }

            })
        })
    }

    handleClick = (event) => {
        let newProjectile = this.state.projectiles
        //console.log(event)  WILL GET MOUSE EVENT LOG
        //gets the angle from play to point of click
        const angle = Math.atan2(
            event.clientY - this.canvas.height / 2,
            event.clientX - this.canvas.width / 2)
        // 0 - 360degrees = radiants 0 - 6.28
        // console.log(angle) gets angle
        //Create a projectile and pushes it to an array
        const velocity = {
            x: Math.cos(angle) * 5,
            y: Math.sin(angle) * 5
        }
        newProjectile.push(
            new Projectile(
                this.canvas.width / 2,
                this.canvas.height / 2,
                5,
                "white",
                velocity
            )
        )
        this.setState({projectiles: newProjectile})
    
    }


    render() {
        return (
            <div>

            <canvas  ref={this.state.canvas}   onClick={(e) => this.handleClick}>
                {/* <div className="score"><span>Score:  </span><span>{this.state.score}</span></div> */}
            </canvas>


            </div>
        )
    }

}

export default Canvas;
