import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import "./gameStyle.css"

const Canvas = props => {
    let [score, setScore] = useState(0)
    let [isPlaying, setIsPlaying] = useState(false)
    const [projectiles, setProjectiles] = useState([])
    const [enemies, setEnemies] = useState([])
    const [particles, setParticles] = useState([])
    const getWidth = () => window.innerWidth
    const getHeight = () => window.innerHeight
    let [width, setWidth] = useState(getWidth())
    let [height, setHeight] = useState(getHeight())
    let prevent = 1;

    const canvasRef = useRef(null)
    const friction = 0.99;
    let player;

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext("2d");
        canvas.style.width ='100%';
        canvas.style.height='100%';
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        canvasContext.fillStyle = "rgba(0,0,0,1)"
        canvasContext.fillRect(0, 0, canvas.width, canvas.height)
    },[prevent])

    useEffect(() => {
        buildGame();
    },[isPlaying])


    useEffect(() => {
        const resizeListener = () => {
            setWidth(getWidth())
            setHeight(getHeight())
        };
        window.addEventListener("resize", resizeListener)

        return () => {
            window.removeEventListener("resize", resizeListener)
        }
    },[width, height])

    class Player {
        constructor(x, y, radius, color) {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
        }

        draw() {

            const canvasContext = canvasRef.current.getContext("2d")
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

    class Projectile {
        constructor(x, y, radius, color, velocity) {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.velocity = velocity
        }

        draw() {
            const canvasContext = canvasRef.current.getContext("2d")
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


    class Enemy {
        constructor(x, y, radius, color, velocity) {
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.velocity = velocity
        }

        draw() {
            const canvasContext = canvasRef.current.getContext("2d")
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
            this.alpha = 1
        }

        draw() {
            const canvasContext = canvasRef.current.getContext("2d")
            canvasContext.save()
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
            canvasContext.restore()
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


    function setGameWindow(){
        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext("2d");
        canvas.style.width ='100%';
        canvas.style.height='100%';
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    function startGame() {
        setIsPlaying(prevState => !prevState)
        
    }
    
    function buildGame() {
        setGameWindow();
        console.log("1",isPlaying)

        const canvas = canvasRef.current;
        console.log("2",isPlaying)

        const canvasContext = canvas.getContext("2d");
        console.log("3",isPlaying)

        const x = canvas.width / 2
        console.log("4",isPlaying)

        const y = canvas.height / 2
        console.log("5",isPlaying)

        player = new Player(x, y, 10, "red",)
        console.log("6",isPlaying)

        spawnEnemies()
        animate()
    }


    function spawnEnemies() {
        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext("2d");

        let newEnemies = enemies;
        // const canvas = canvasRef.current;
        // const canvasContext = canvasRef.current.getContext("2d")
        setInterval(() => {
            const radius = Math.random() * (50 - 10) + 10

            let x;
            let y;

            if (Math.random() < 0.5) {

                x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
                y = Math.random() * canvas.height
            } else {
                x = Math.random() * canvas.width
                y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
            }
            const color = `hsl(${Math.random() * 360} , 50%, 50%)`

            const angle = Math.atan2(
                canvas.height / 2 - y,
                canvas.width / 2 - x)
            const velocity = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            }
            newEnemies.push(new Enemy(x, y, radius, color, velocity))
            setEnemies(newEnemies)
        }, 1000)
    }


    function animate() {
        const canvas = canvasRef.current;
        const canvasContext = canvas.getContext("2d");
        let animeationId;
        let newParticles = particles
        let newProjectiles = projectiles
        let newEnemies = enemies


        animeationId = requestAnimationFrame(animate)
        canvasContext.fillStyle = "rgba(0,0,0,0.2)"
        canvasContext.fillRect(0, 0, canvas.width, canvas.height)

        player.draw();

        if(!isPlaying){
            cancelAnimationFrame(animeationId)
        }
        //create explosions
        newParticles.forEach((particle, index) => {
            if (particle.alpha <= 0) {
                particles.splice(index, 1)
                setParticles(newParticles)

            } else {
                particle.update()
            }
        });
        //create projectiles
        newProjectiles.forEach((projectile, index) => {
            projectile.update()

            if (projectile.x + projectile.radius < 0 ||
                projectile.x - projectile.radius > canvas.width ||
                projectile.y + projectile.radius < 0 ||
                projectile.y - projectile.radius > canvas.height) {
                setTimeout(() => {
                    newProjectiles.splice(index, 1)
                    setProjectiles(newProjectiles)
                }, 0)
            }

        })

        newEnemies.forEach((enemy, index) => {
            enemy.update()

            //gets the distance from an enemy to the player
            const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y)

            if (dist - enemy.radius - player.radius < 1) {
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
                    setParticles(newParticles)

                    if (enemy.radius - 10 > 5) {
                        //the score
                        setScore(score += 100)
                        gsap.to(enemy, { radius: enemy.radius - 10 })
                        setTimeout(() => {
                            newProjectiles.splice(pIndex, 1)
                            setProjectiles(newProjectiles)
                        }, 0)
                    }
                    else {
                        setScore(score += 250)
                        setTimeout(() => {
                            newEnemies.splice(index, 1)
                            newProjectiles.splice(pIndex, 1)
                            setEnemies(newEnemies)
                            setProjectiles(newProjectiles)
                        }, 0)
                    }
                }

            })
        })
    }

    function handleClick(event) {
        const canvas = canvasRef.current
        let newProjectiles = projectiles
        const angle = Math.atan2(
            event.clientY - height / 2,
            event.clientX -  width / 2)
        const velocity = {
            x: Math.cos(angle) * 5,
            y: Math.sin(angle) * 5
        }
        newProjectiles.push(
            new Projectile(
                canvas.width / 2,
                canvas.height / 2,
                5,
                "white",
                velocity
            )
        )
        setProjectiles(newProjectiles)

    }



    return (
        <div className="container">
            <div className="score">
                <span>Score:  </span>
                <span>{score}</span>
            </div>
            <canvas ref={canvasRef}{...props} onClick={(e) => handleClick(e)}></canvas>
            <button onClick={() => startGame()} className="thebutton">The Button</button>
        </div>
    )
}



export default Canvas;
