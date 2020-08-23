var kernel = [];
var img;
var imgData;
var canvas1;
var canvas2;
var ctx;
var testData;
var kernelSum = 0.0;
function gaussianDestribution(mean, sigma, x, y){
    var num = 1/(sigma*sigma*2*Math.PI) * Math.exp(-1/2*(Math.pow((x-mean),2)+Math.pow((y-mean),2))/(2*Math.pow(sigma,2)));
    return(num)
}

function generateKernel(){

    var mean = 0;
    var sigma = 1;
    
    var temp = [];
// 3*3 kernel 
    for(var x = -1;x<=1;x++){
        for(var y=-1;y<=1;y++)
            {
                
                temp.push(gaussianDestribution(mean, sigma, x,y));   
                kernelSum += gaussianDestribution(mean, sigma, x,y);
            }
        kernel.push(temp);
        temp = [];
    }   
}

function convulation(){
    var sum = 0;
    for(var i=0;i<img.width - img.width%3;i++){
        for(var j=0;j<img.height - img.height%3;j++){
           
        }
    }
}


function gaussianBlur(){
    
}


function draw() {
    canvas1 = document.getElementById('myCanvas1');
    canvas2 = document.getElementById('myCanvas2');
    ctx1 = canvas1.getContext('2d');
    ctx2 = canvas2.getContext('2d');
    img = new Image();
    img.onload = function() {
        canvas1.height = img.height;
        canvas1.width = img.width;
        canvas2.height = img.height;
        canvas2.width = img.width;
        ctx1.drawImage(img, 0, 0);
        imgData = ctx1.getImageData(0, 0, canvas1.width, canvas1.height);
        testData = imgData;
        gaussianBlur();
        ctx2.putImageData(testData,0,0);
//        console.log(ctx);
    };  
    
    img.src = 'img/Shubham.jpg';
//    console.log(img);
    
}