

const canvas = document.getElementById("scene")

const ctx = canvas.getContext("2d")
const density = "        s    sÑ@#W$9876543210?!abc;:+=-,._ "
const image = new Image(48, 48)
image.src = "./pexels.jpg"

image.onload = function (e) {
    
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height)
 
    let imageData = ctx.getImageData(0, 0, image.width, image.height)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let w = canvas.width / imageData.width;
    let h = canvas.height / imageData.height;


    console.log(w, h, imageData.width,  image.width, image.height)


    for (let i = 0; i < imageData.width; i++) {

        let row = ""
        for (let j = 0; j < imageData.height; j++) {
            let index = (i + j * imageData.width) * 4
            let r = imageData.data[index]
            let g = imageData.data[index + 1]
            let b = imageData.data[index + 2]
            let a = imageData.data[index + 3]

            //console.log(index)

            let avg = Math.floor((r + g + b) / 3)

            let x = Math.floor(map(avg, 0, 255, density.length, 0))

            ctx.beginPath()
            //ctx.strokeStyle = `rgb(${r},${g}, ${b}, ${a})`
            //ctx.fillStyle = `rgb(${r},${g}, ${b}, ${a})`
            ctx.font =`${w}px Courier`
            //ctx.rect(i*w, j*h, w, h)
            ctx.fill();
            
            const c = density.charAt(x)
            if (c == ' ') row +=  "&nbsp;"
            else row += c;
            //row += density.charAt(x)
            ctx.textAlign = "center"
            ctx.strokeText(c, i * w, j * w, w)
            // console.log(r, g,b)
            ctx.closePath();
           
           
           
        }
        console.log(row)
    }

    //ctx.drawImage(image, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height)
    console.log(e)
}


function map(x, min1, max1, min2, max2) {

    if (min1 > max1) throw "error: min is great than max"
    if (x < min1) return min2
    if (x > max1) return max2

    let r = x / max1
    return min2 * (1 - r) + max2 * r
}