class Shape {
    info: string;
    draw: string;
    constructor(info: string = "this is shape", draw: string = 'drawing a shape') {
        this.info = info;
        this.draw = draw;
    }

    print() {
        return this.info;
    }
    retDraw(){
        return this.draw
    }
}

class Rectangle extends Shape {
    height: number;
    width: number;

    constructor(width: number, height: number, info: string, draw) {
        super(info = "this is rectangle");
        this.height = height;
        this.width = width;
    }

    area(): number {
        return this.height * this.width;
    }
}

class ColoredRectangle extends Rectangle {
    color:string;
    constructor(color:string, heigth, width) {
        const info = `this is rectangle in color ${color}`;
        super(width, heigth, info);
        this.color = color;
    }
}

class Square extends Rectangle {
    sideLength: number;

    constructor(sideLength: number, info, draw) {
        super(sideLength, sideLength, "this is square", 'drawing a square');
    }
}
class triangle extends Shape {
    constructor(draw) {
        super(draw = 'drawing a triangle');
    }
}
class circle extends Shape {
    constructor(draw) {
        super(draw = "drawing a circle");
    }
}


function renderShapes(array: Shape[]) {
    for (let i = 0; i < array.length; i++) {
        console.log(array[i].draw);
        
    }
}

