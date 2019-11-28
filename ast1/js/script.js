var container = document.getElementsByClassName('carousel-container')[0];
var wrapper = document.getElementsByClassName("carousel-image-wrapper")[0];
var images = document.getElementsByTagName("img");
var dots = [];
console.log(wrapper);
const WIDTH = 600;
var countImage = 3;
var imgIndex = 0;
var i = 0;

createDot();


function startSlideShow() {
    slideShow = setInterval(function() {
        showSlide(imgIndex);
    }, 2000);

}
var mleft = 0;
var step = 10;

function showSlide(index) {
    // setInterval(function() {
    imgIndex = index;
    var slides = document.getElementsByClassName("mySlides")
    dots = document.getElementsByClassName('dots');

    // dots[i].setAttribute("class", "inactive");

    if (imgIndex >= countImage) { //greater than 3 vako belama 0 maa leune
        imgIndex = 0;

    }
    if (imgIndex < 0) {
        imgIndex = countImage - 1; //3 -1 = 2 

    }

    // mleft = mleft - step;
    // wrapper.style.left = mleft + 'px'; //it displays image at position imgIndex

    wrapper.style.left = -WIDTH * imgIndex + 'px'; //it displays image at position imgIndex

    imgIndex++;
    dots[i].setAttribute("class", "active");
    // dots[i].setAttribute("class", "active");

    if (mleft === -600) {
        step = 0
    }



    setTimeout(function() { step = 10 }, 30)


}




document.body.onload = startSlideShow();

function createDot() {
    for (var i = 0; i < images.length; i++) {
        dots[i] = document.createElement('div');
        dots[i].className = "dots"
        dots[i].style.height = 15 + 'px';
        dots[i].style.width = 15 + 'px';
        // dots[i].style.background = 'pink';
        dots[i].style.border = "1px solid";
        // dots.style.backgroundColor = black;
        dots[i].style.borderRadius = 10 + 'px';
        dots[i].style.position = 'absolute';
        dots[i].style.top = "80%";
        dots[i].addEventListener("click", clickDot);
        dots[i].style.left = (i * 30) + 250 + 'px';
        container.appendChild(dots[i]);
    }
}



function prevSlide() {
    imgIndex = imgIndex - 2;
    showSlide(imgIndex);
    // setInterval(showSlide(imgIndex), 50);
}

function nextSlide() {
    showSlide(imgIndex);
    // setInterval(showSlide(imgIndex), 50);
}

function clickDot() {
    showSlide(imgIndex);
}