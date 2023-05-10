let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

document.querySelector(".incont").addEventListener("click",(e)=>{
    alert("Login")
})

let b = document.querySelectorAll(".category-div button")
for(let i=0;i<b.length;i++){
  b[i].addEventListener("click",(e)=>{
    if(b[i].name){
      localStorage.setItem("gender",b[i].name)
      window.location.href = "./product.html"
    }
  })
}


// function show(){
//   let btn = document.querySelector(".mentbn")
//   console.log(btn.name)
// }

document.querySelector(".loginbtn").addEventListener("click",()=>{
  localStorage.setItem("token","");
  window.location.href = "/index.html"
})