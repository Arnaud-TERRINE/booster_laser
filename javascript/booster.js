const game = document.getElementById('game')
const playButton = document.getElementById('play')
const camera = [500, 900]

var gameElements = []

var lastId = 0
function getId() {
  return lastId++
}

playButton.addEventListener('click', () => {
  const id = getId()
  gameElements.push(new CollisionBox(0, 0, 300, 300, id))
})

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}
class CollisionBox {
  constructor(x, y, width, height, id, layer, props) {
    this.a = new Point(x, y)
    this.b = new Point(x + width, y)
    this.c = new Point(x + width, y + height)
    this.d = new Point(x, y + height)
    this.width = width
    this.height = height
    this.id = id
    this.layer = layer || 'main'
    this.props = props
  }

  setX(x) {
    this.a.x += x
    this.b.x += x + this.width
    this.c.x += x + this.width
    this.d.x += x
  }

  setY(y) {
    this.a.y += y
    this.b.y += y
    this.c.y += y + this.height
    this.d.y += y + this.height
  }

  onCollide(triggeredObject) {
    if (
      this.a.x < triggeredObject.b.x &&
      this.b.x > triggeredObject.a.x &&
      this.a.y < triggeredObject.c.y &&
      this.d.y > triggeredObject.a.y
    ) {
      // Collision detected!
      console.log({
        id: this.id,
        triggeredObject: triggeredObject.id,
        isCollide: true,
      })
    } else {
      // No collision
      // console.log({id: this.id, triggeredObject: triggeredObject.id, isCollide: false})
    }
  }

  create() {
    let boundingBox = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    game.appendChild(boundingBox)

    boundingBox.setAttribute('id', this.id)
    boundingBox.setAttribute('viewBox', `0 0 ${camera[0]} ${camera[1]}`)
    boundingBox.style.position = 'absolute'
    boundingBox.style.top = this.a.x + this.id * 10 + 'px'
    boundingBox.style.left = this.a.y + this.id * 10 + 'px'
    boundingBox.style.width = this.width + 'px'
    boundingBox.style.height = this.height + 'px'
  }

  render() {
    const boundingBox = document.getElementById(this.id)

    if (!boundingBox) {
      this.create()
      return
    }

    if (this.props.sprite) {
      game.innerHTML = `<img src="${this.props.sprite}" alt="" style="position: absolute; top: ${this.a.x + this.id * 10}px; left: ${this.a.y + this.id * 10}px; width: ${this.width}px; height: ${this.height}px;" />`
    } else {
      boundingBox.innerHTML = `<polygon points="${this.a.x},${this.a.y} ${this.b.x},${this.b.y} ${this.c.x},${this.c.y} ${this.d.x},${this.d.y}" fill="none" stroke="black" />`
    }
  }
}

class Player extends CollisionBox {
  constructor() {
    super(200, 700, 100, 100, getId(), 'player', {sprite: "../img/Spaceship.svg"})
  }

  move() {
    document.addEventListener("keydown", (event) => {
        if (event.key == 'ArrowLeft') {
            this.setY(-1)
        }

        if(event.key == 'ArrowRight') {
            this.setY(1)
        }
    })
  }
}
class Ennemie {
  constructor() {
    this.position = 0
  }
}

function updateRender() {
  gameElements.forEach((gameElement) => {
    gameElement.render()
  })
}

function updatePhysix() {
  gameElements.forEach((gameElement) => {
    gameElement.move()
    gameElements
      .filter((el) => el.id !== gameElement.id && el.layer === gameElement.layer)
      .forEach((triggeredElement) => {
        gameElement.onCollide(triggeredElement)
      })
  })
}

function init() {
  const player = new Player()
  gameElements.push(player)
}

init()

const intervalID = setInterval(main, 500)
function main() {
  updatePhysix()
  updateRender()
}
