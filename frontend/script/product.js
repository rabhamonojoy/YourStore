let allproduct = [];
let subcategoryproduct = [];

async function funOne(){
    await fetch(`https://comfortable-slacks-bear.cyclic.app/product/${localStorage.getItem("gender")}`)
    .then((res)=>{return res.json()})
    .then((data)=> {
      allproduct=data;
      displayProduct(data);
      displayCategory(data);
      displaySubcategory(data);
      displayColor(data);
      displayBrand(data);
    })
    .catch(err => console.log(err));
}

funOne()

async function fetchCategory(key){
  await fetch(`https://comfortable-slacks-bear.cyclic.app/product/${localStorage.getItem("gender")}?category=${key}`)
    .then((res)=>{return res.json()})
    .then((data)=> {
      // console.log(data)
      allproduct=data;
      displayProduct(data);
      // displayCategory(data);
      displaySubcategory(data);
      displayColor(data);
      displayBrand(data);
    })
    .catch(err => console.log(err));
}


let subcategoryoption = document.querySelector("#select-type");
let coloroption = document.querySelector("#select-color");
let brandoption = document.querySelector("#select-brand");
let categoryoption = document.querySelector(".category-option-div");
let categorychoice = document.querySelector(".category-option-div>button")
let sortoption = document.querySelector("#select-sort");
let discountoption = document.querySelector("#select-discount");

let b = document.querySelectorAll(".category-div button");
for(let i=0;i<b.length;i++){
  b[i].addEventListener("click",(e)=>{
    if(b[i].name){
      localStorage.setItem("gender",b[i].name)
      funOne()
    }
  })
}


function displayProduct(data){
    let container = document.querySelector("#container")
    container.innerHTML="";
    data.forEach((ele)=>{
        let card = document.createElement("div");
        let img = document.createElement("img");
        img.setAttribute("src",ele.imageURL);
        let pricediv = document.createElement("div");
        let newprice = document.createElement("h4")
        if(ele.discount === 0){
            newprice.textContent = ""
            let actualprice = document.createElement("h4")
            actualprice.textContent = "₹ "+ ele.price
            pricediv.append(newprice,actualprice)
        }
        else{
            let dprice = +ele.price - (+ele.price * (ele.discount / 100));
            newprice.textContent = "₹ " + Math.floor(dprice);
            let actualprice = document.createElement("h5")
            actualprice.textContent = "₹ "+ ele.price
            actualprice.style.color = "grey";
            let hr = document.createElement("hr");
            hr.style.marginTop = "-25%";
            actualprice.append(hr);
            let dis = document.createElement("h5");
            dis.textContent = ele.discount + " %";
            dis.style.color = "rgb(254,87,87)"
            pricediv.append(newprice,actualprice,dis)
        }
        let title = document.createElement("p")
        title.textContent = ele.title;

        let btndiv = document.createElement("div");
        let cartbtn = document.createElement("button");
        cartbtn.innerText = "ADD TO BAG"
        cartbtn.setAttribute("id","cartbtn")
        cartbtn.addEventListener("click",()=>{
          addtoCart(ele);
        })

        let favbtn = document.createElement("button");
        let favimg = document.createElement("img")
        favimg.setAttribute("src","https://cdn-icons-png.flaticon.com/512/5644/5644698.png")
        favbtn.append(favimg)
        favbtn.setAttribute("id","favbtn")
        favbtn.addEventListener("click",()=>{
          addtofFav(ele);
        })

        btndiv.append(cartbtn,favbtn);
        card.append(img,pricediv,title,btndiv);
        container.append(card);
    })
}

// ----add to cart / favorite-----------
async function addtoCart(item){
  await fetch(`https://comfortable-slacks-bear.cyclic.app/cart/addnew`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization":localStorage.getItem("token")
            },
            body: JSON.stringify(item),
        })
        .then((res) => {
            return res.json();
        })
        .then(async(res) => {
            alert(res.msg);
        })
        .catch((err) => {
            console.log(err);
        });
}

async function addtofFav(item){
  await fetch(`https://comfortable-slacks-bear.cyclic.app/favorite/addnew`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization":localStorage.getItem("token")
            },
            body: JSON.stringify(item),
        })
        .then((res) => {
            return res.json();
        })
        .then(async(res) => {
            alert(res.msg);
        })
        .catch((err) => {
            console.log(err);
        });
}


// ------------- to append filter ----------------------
function displayCategory(data){
  categoryoption.innerHTML = null;
  let category = {};
  for(let i=0;i<data.length;i++){
    category[data[i].category]=1;
  }
  console.log(category);
  for(key in category){
    let catdiv = document.createElement("button");
    let op = key.split("")
    op[0] = op[0].toUpperCase();
    op = op.join("")
    catdiv.textContent = op;
    catdiv.setAttribute("class","category-option");
    catdiv.setAttribute("title",key)
    catdiv.addEventListener("click",()=>{
      fetchCategory(catdiv.title);
    })
    categoryoption.append(catdiv);
  }
}

function displaySubcategory(data){
  subcategoryoption.innerHTML = null;
  let opzero = document.createElement("option")
  opzero.textContent = "Type";
  opzero.hidden = "hidden"
  subcategoryoption.append(opzero);
  let type = {};
  for(let i=0;i<data.length;i++){
    type[data[i].subCategory]=1;
  }
  for(key in type){
    let option = document.createElement("option")
    let op = key.split("")
    op[0] = op[0].toUpperCase();
    op = op.join("")
    option.textContent = op;
    option.value = key;
    subcategoryoption.append(option)
  }
}

function displayColor(data){
  coloroption.innerHTML = null;
  let opzero1 = document.createElement("option")
  opzero1.textContent = "Color";
  opzero1.hidden = "hidden"
  coloroption.append(opzero1);
  let color = {};
  for(let i=0;i<data.length;i++){
    color[data[i].color]=1;
  }
  for(key in color){
    let option = document.createElement("option")
    let op = key.split("")
    op[0] = op[0].toUpperCase();
    op = op.join("")
    option.textContent = op;
    option.value = key;
    coloroption.append(option)
  }
}

function displayBrand(data){
  brandoption.innerHTML = null;
  let opzero2 = document.createElement("option")
  opzero2.textContent = "Brand";
  opzero2.hidden = "hidden";
  brandoption.append(opzero2);
  let brand = {};
  for(let i=0;i<data.length;i++){
    brand[data[i].brand]=1;
  }
  for(key in brand){
    let option = document.createElement("option")
    let op = key.split("")
    op[0] = op[0].toUpperCase();
    op = op.join("")
    option.textContent = op;
    option.value = key;
    brandoption.append(option)
  }
}


// ---------------------filter EventListener------------------


sortoption.addEventListener("change",async()=>{
  let choice = sortoption.value;
  if(choice == "LTH"){
    await fetch(`https://comfortable-slacks-bear.cyclic.app/product/${localStorage.getItem("gender")}?sortBy=price&order=asc`)
      .then((res)=>{return res.json()})
      .then((data)=> {
        allproduct = data;
        displayProduct(data);
      })
      .catch(err => console.log(err));
  }
  else if(choice == "HTL"){
    await fetch(`https://comfortable-slacks-bear.cyclic.app/product/${localStorage.getItem("gender")}?sortBy=price&order=desc`)
      .then((res)=>{return res.json()})
      .then((data)=> {
        allproduct = data;
        displayProduct(data);
      })
      .catch(err => console.log(err));
  }
  else if(choice == "ATZ"){
    await fetch(`https://comfortable-slacks-bear.cyclic.app/product/${localStorage.getItem("gender")}?sortBy=title`)
      .then((res)=>{return res.json()})
      .then((data)=> {
        allproduct = data;
        displayProduct(data);
      })
      .catch(err => console.log(err));
  }
})

discountoption.addEventListener("change",()=>{
  let choice = discountoption.value;
  if(choice == "LTH"){
    allproduct.sort((a,b)=> {return a.discount - b.discount });
  }
  else if(choice == "HTL"){
    allproduct.sort((a,b)=> {return b.discount - a.discount });
  }
  displayProduct(allproduct)
})

subcategoryoption.addEventListener("change",()=>{
  let choice = subcategoryoption.value;
  let newdata = allproduct.filter((ele)=>{
    return ele.subCategory == choice;
  })
  subcategoryproduct = newdata;
  displayProduct(newdata);
  displayColor(newdata);
  displayBrand(newdata);
})

coloroption.addEventListener("change",()=>{
  let choice = coloroption.value;
  let newdata = subcategoryproduct.filter((ele)=>{
    return ele.color == choice;
  })
  displayProduct(newdata);
  displayBrand(newdata);
})

brandoption.addEventListener("change",()=>{
  let choice = brandoption.value;
  let newdata = []
  if(subcategoryproduct.length!==0){
    newdata = subcategoryproduct.filter((ele)=>{
      return ele.brand == choice;
    })
    displayProduct(newdata);
    displaySubcategory(newdata);
    displayColor(newdata);
  }
  else{
    newdata = allproduct.filter((ele)=>{
      return ele.brand == choice;
    })
    displayProduct(newdata);
    displaySubcategory(newdata);
    displayColor(newdata);
  }
})

document.querySelector(".loginbtn").addEventListener("click",()=>{
  localStorage.setItem("token","");
  window.location.href = "/index.html"
})