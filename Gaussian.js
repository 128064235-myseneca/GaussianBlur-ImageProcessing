var kernel = [[1,1,1],[1,1,1],[1,1,1]];
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
    var sigma = 0.5;
    
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
    var pixelData;
    var acc;
//    acc.data = [0,0,0,255];
//    acc.height = 1;
//    acc.width = 1;
    for(var i=0;i<img.height - img.height%3;i++){
        for(var j=0;j<img.width - img.width%3;j++){
            
            for(var k=0;k<kernel.length;k++){
                for(var l=0;l<kernel.length;l++){
                    pixelData = ctx1.getImageData(i+k,j+l,1,1);
                    acc = pixelData;
//                    console.log(pixelData); 
//                    console.log(Math.floor((pixelData.data[0] )));
                    acc.data[0]+=Math.floor((pixelData.data[0] * kernel[k][l])/9);
                    acc.data[1]+=Math.floor(pixelData.data[1] * kernel[k][l]/9);
                    acc.data[2]+=Math.floor(pixelData.data[2] * kernel[k][l]/9);
                    acc.data[3]=255;
                }
                
            }
//            console.log(acc);
            ctx2.putImageData(acc,i,j);
           
            
        
        }
    }
}


function gaussianBlur(){
//    generateKernel();
    convulation();
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
//        ctx2.putImageData(testData,0,0);
//        console.log(ctx);
    };  
    
    img.src = 'img/Shubham.jpg';
//    console.log(img);
    
}