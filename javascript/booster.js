const game = document.getElementById('game');
const playButton = document.getElementById('play');

var gameElements = [];

var lastId = 0;
function getId() {
    return lastId++;
}

playButton.addEventListener("click", () => {
    gameElements.push(new CollisionBox(0, 0, 300, 300, getId()))
})

class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
class CollisionBox{
    constructor(x, y, width, height, id){
        this.a = new Point(x, y);
        this.b = new Point(x + width, y);
        this.c = new Point(x + width, y + height);
        this.d = new Point(x, y + height);
        this.width = width;
        this.height = height;
        this.id = id;
    }

    display() {
        let boundingBox = document.createElementNS("http://www.w3.org/2000/svg",'svg');
        game.appendChild(boundingBox);

        boundingBox.setAttribute("id", this.id);
        boundingBox.setAttribute("viewBox", `0 0 ${this.width} ${this.height}`);

        boundingBox.innerHTML = `<polygon points="${this.a.x},${this.a.y} ${this.b.x},${this.b.y} ${this.c.x},${this.c.y} ${this.d.x},${this.d.y}" fill="none" stroke="black" />`;
    }

    update(boundingBox) {
        boundingBox.innerHTML = `<polygon points="${this.a.x},${this.a.y} ${this.b.x},${this.b.y} ${this.c.x},${this.c.y} ${this.d.x},${this.d.y}" fill="none" stroke="black" />`;
    }

    render() {
        const boundingBox = document.getElementById(this.id);

        if(boundingBox === null) {
            this.display();
            return;
        }

        this.update(boundingBox);
    }
}



class Player{
    constructor(position){
        this.position = position;
    }
}
class Ennemie{
    constructor(){
        this.position = 0;
    }
}

// var player1 = new Player('test',10 )

const intervalID = setInterval(myCallback, 500);
function myCallback()
{
    gameElements.forEach((gameElement) => {
        gameElement.render();
    })
}
