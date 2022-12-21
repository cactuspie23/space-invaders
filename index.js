const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0
    }
    this.rotation = 0

    const image = new Image()
    image.src = './img/spaceship.png'
    image.onload = () => {
      this.image = image
      this.width = image.width * 0.35
      this.height = image.height * 0.35
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 20
      }
    }
  }

  draw() {
    // c.fillStyle = 'red'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    if (this.image) {
      c.save()
      c.translate(
        player.position.x + player.width / 2, 
        player.position.y + player.height / 2
      )
      c.rotate(this.rotation)

      c.translate(
        -player.position.x - player.width / 2, 
        -player.position.y - player.height / 2
      )

      c.drawImage(
        this.image, 
        this.position.x, 
        this.position.y, 
        this.width, 
        this.height
      )
      c.restore()
    }
  }

  update() {
    if (this.image) {
      this.draw()
      this.position.x += this.velocity.x
    }
  }
}

class Projectile {
  constructor({position, velocity}) {
    this.position = position
    this.velocity = velocity
    this.radius = 3
  }

  draw() {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = 'red'
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

class Invader {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0
    }

    const image = new Image()
    image.src = './img/invader.png'
    image.onload = () => {
      this.image = image
      this.width = image.width * 0.2
      this.height = image.height * 0.2
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height / 2
      }
    }
  }

  draw() {
    if (this.image) {
      c.drawImage(
        this.image, 
        this.position.x, 
        this.position.y, 
        this.width, 
        this.height
      )
    }
  }

  update() {
    if (this.image) {
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    }
  }
}

class Grid {
  constructor() {
    this.position = {
      x: 0,
      y: 0
    }

    this.velocity = {
      x: 0,
      y:0
    }

    this.invaders = [new Invader()]

  }

  update() {

  }
}

const player = new Player()
const projectiles = []
const grids = [new Grid()]
const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  space: {
    pressed: false
  },
}

function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  player.update()
  projectiles.forEach((projectile, i) => {
    if (projectile.position.y + projectile.radius <= 0) {
      setTimeout(() => {
        projectiles.splice(i, 1)
      }, 0)
    } else {
      projectile.update()
    }
  })

  grids.forEach(grid => {
    grid.update()
    grid.invaders.forEach(invader => {
      invader.update()
    })
  })

  if (keys.a.pressed && player.position.x >= 0) {
    player.velocity.x = -5
    player.rotation = -0.15
  } else if (keys.d.pressed && player.position.x +player.width <= canvas.width) {
    player.velocity.x = 5
    player.rotation = 0.15
  } else {
    player.velocity.x = 0
    player.rotation = 0
  }
}

animate()

addEventListener('keydown', ({key}) => {
  switch (key) {
    case 'a':
      keys.a.pressed = true
      break
    case 'd':
      keys.d.pressed = true
      break
    case ' ':
      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + player.width / 2,
            y: player.position.y
          },
          velocity: {
            x: 0,
            y: -10
          }
        })
      )
      break
  }
})

addEventListener('keyup', ({key}) => {
  switch (key) {
    case 'a':
      keys.a.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
    case ' ':
      break
  }
})