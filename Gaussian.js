var kernel=[];
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

    var mean = 1;
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
    var pixelData;
    var r = 0;
    var g = 1;
    var b = 2;
    var d = 4;
    var w = img.width;
    var acc;
    acc = [0,0,0,255];
//    acc.height = 1;
//    acc.width = 1;
    
//            console.log(acc);

           
            for(var i=0;i<imgData.data.length;i+=4){
                acc[0] = (imgData.data[i+r]*kernel[0][0]+imgData.data[i+d+r]*kernel[0][1]+imgData.data[i+2*d+r]*kernel[0][2] +imgData.data[i+w*d+r]*kernel[1][0]+imgData.data[i+(w*d)+d+r]*kernel[1][1]+imgData.data[i+(w*d)+2*d+r]*kernel[1][2] +imgData.data[i+2*w*d+r]*kernel[2][0]+imgData.data[i+(2*w*d)+d+r]*kernel[2][1]+imgData.data[i+(2*w*d)+2*d+r]*kernel[2][2])/kernelSum;
                
                acc[1] = (imgData.data[i+g]*kernel[0][0]+imgData.data[i+d+g]*kernel[0][1]+imgData.data[i+2*d+g]*kernel[0][2] +imgData.data[i+w*d+g]*kernel[1][0]+imgData.data[i+(w*d)+d+g]*kernel[1][1]+imgData.data[i+(w*d)+2*d+g]*kernel[1][2] +imgData.data[i+2*w*d+g]*kernel[2][0]+imgData.data[i+(2*w*d)+d+g]*kernel[2][1]+imgData.data[i+(2*w*d)+2*d+g]*kernel[2][2])/kernelSum;
                
                acc[2] = (imgData.data[i+b]*kernel[0][0]+imgData.data[i+d+b]*kernel[0][1]+imgData.data[i+2*d+b]*kernel[0][2] +imgData.data[i+w*d+b]*kernel[1][0]+imgData.data[i+(w*d)+d+b]*kernel[1][1]+imgData.data[i+(w*d)+2*d+b]*kernel[1][2] +imgData.data[i+2*w*d+b]*kernel[2][0]+imgData.data[i+(2*w*d)+d+b]*kernel[2][1]+imgData.data[i+(2*w*d)+2*d+b]*kernel[2][2])/kernelSum;
                
                testData.data[i+(w*d)+d+r] = acc[0];
                testData.data[i+(w*d)+d+g] = acc[1];
                testData.data[i+(w*d)+d+b] = acc[2];
            }
    
        
        }
    



function gaussianBlur(){
    generateKernel();
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
        ctx2.putImageData(testData,0,0);
//        console.log(ctx);
    };  
    
    img.src = 'img/Shubham.jpg';
//    console.log(img);
    
}