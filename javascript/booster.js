var vaisseau = document.getElementById('space');
var gameElements = [];

function createColisionBox(x,y){
    gameElements.push(new colisionBox(x,y))
}


class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
class collisionBox{
    constructor(x, y, width, height){
        this.a = new Point(x, y);
        this.b = new Point(x + width, y);
        this.c = new Point(y + height, y);
        this.d = new Point(x + width, y + height);
    }

    get box() {
        var boxi = document.createElement('box');
        boxi.innerHTML = `<path d = ${this.a} ${this.b} ${this.c} ${this.d} />` 
        customElements.define('new box', boxi);
      }

}



class Player{
    constructor(position){
        this.position = position;
    }
}
class Ennemie{
    constructor(position){
        this.position = 0;
    }
}

// var player1 = new Player('test',10 )

const intervalID = setInterval(myCallback, 500, vaisseau.x, vaisseau.y);
function myCallback(x, y)
{
 // Your code here
 // Parameters are purely optional.
 console.log("voici mon abs ",x);
 console.log("voici mon ordo ",y);
}
