class Canvas{
    constructor(width,height){
        this.buffer = new Uint8ClampedArray(width*height*4);
        this.width = width;
        this.height = height;
    }
    clear(){
        this.buffer.fill(0);
    }
    toImageData(){
        return new ImageData(this.buffer,this.width,this.height);
    }
    drawUpperTriangle(x0,y0,x1a,x1b,y1,r,g,b,a){
        const buffer = this.buffer;
        const width = this.width;
        for(let y = Math.floor(y0); y < y1; y++){
            let t = ((y-y0)/(y1-y0));
            let x00 = Math.floor(x0+(x1a-x0)*t);
            let x11 = Math.ceil(x0+(x1b-x0)*t);
            for(let x = x00; x < x11; x++){
                const idx = (x+y*width)*4;
                buffer[idx+0] = r;
                buffer[idx+1] = g;
                buffer[idx+2] = b;
                buffer[idx+3] = a;
            }
        }
    }
    drawLowerTriangle(x0a,x0b,y0,x1,y1,r,g,b,a){
        const buffer = this.buffer;
        const width = this.width;
        for(let y = Math.floor(y0); y <= y1; y++){
            let t = ((y-y0)/(y1-y0));
            let x00 = Math.floor(x0a+(x1-x0a)*t);
            let x11 = Math.ceil(x0b+(x1-x0b)*t);
            for(let x = x00; x < x11; x++){
                const idx = (x+y*width)*4;
                buffer[idx+0] = r;
                buffer[idx+1] = g;
                buffer[idx+2] = b;
                buffer[idx+3] = a;
            }
        }
    }
    drawTriangle(x1,y1,x2,y2,x3,y3,r,g,b,a){
        // sort from y min to max
        let tmp;
        if(y1 > y2){
            [x1,y1,x2,y2] = [x2,y2,x1,y1];
        }
        if(y2 > y3){
            [x2,y2,x3,y3] = [x3,y3,x2,y2];
        }
        if(y1 > y2){
            [x1,y1,x2,y2] = [x2,y2,x1,y1];
        }
        // Now y1 < y2 < y3
        
        let t = (y2-y1)/(y3-y1);
        if(x2 < x3){
            this.drawUpperTriangle(x1,y1,x2,x1+(x3-x1)*t,y2,r,g,b,a);
            this.drawLowerTriangle(x2,x1+(x3-x1)*t,y2,x3,y3,r,g,b,a);
        }else{
            this.drawUpperTriangle(x1,y1,x1+(x3-x1)*t,x2,y2,r,g,b,a);
            this.drawLowerTriangle(x1+(x3-x1)*t,x2,y2,x3,y3,r,g,b,a);
        }
    }
}


let main = function(){
    const width = 500;
    const height = 500;
    const canvasElement = document.createElement("canvas");
    document.body.appendChild(canvasElement);
    canvasElement.width = width;
    canvasElement.height = height;
    const ctx = canvasElement.getContext("2d");
    const canvas = new Canvas(width,height);
    canvas.drawTriangle(100,100, 200,50,  250,200, 255,0,0,255);
    ctx.putImageData(canvas.toImageData(),0,0);
}

main();


