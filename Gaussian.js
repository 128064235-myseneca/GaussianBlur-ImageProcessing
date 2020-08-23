var kernel = []
function gaussianDestribution(mean, sigma, x, y){
    var num = 1/(sigma*sigma*2*Math.PI) * Math.exp(-1/2*(Math.pow((x-mean),2)+Math.pow((y-mean),2))/(2*Math.pow(sigma,2)));
    return(num)
}

function generateKernel(){

    var mean = 0;
    var sigma = 1;
// 3*3 kernel 
    for(var x = -1;x<=1;x++){
        for(var y=-1;y<=1;y++)
            {
                kernel.push(gaussianDestribution(mean, sigma, x,y));
                     
            }

    }
}
