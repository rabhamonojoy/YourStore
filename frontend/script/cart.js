let cartdiv = document.querySelector("#cart-div");
let amountdiv = document.querySelector("#amount-div");
async function fetchCart(){
    await fetch(`https://comfortable-slacks-bear.cyclic.app/cart`,{
        method: "GET",
        headers: {
            "Authorization":localStorage.getItem("token")
        }
    })
    .then((res)=>{return res.json()})
    .then((data)=> {
        console.log(data);
        displayCard(data)
    })
    .catch(err => console.log(err));
}

fetchCart()

function displayCard(data){
    cartdiv.innerHTML=null;
    let amount = 0;
    data.forEach((ele) => {
        amount += (Math.floor(+ele.price - (+ele.price * (ele.discount / 100)))) * ele.quantity;
        let card = document.createElement("div");
        let img = document.createElement("img");
        img.setAttribute("src",ele.imageURL)
        let titlediv = document.createElement("div");
        let title = document.createElement("h3");
        title.textContent = ele.title;
        titlediv.append(title)
        let newprice = document.createElement("h4")
        if(ele.discount === 0){
            newprice.textContent = ""
            let actualprice = document.createElement("h4")
            actualprice.textContent = "₹ "+ ele.price
            titlediv.append(newprice,actualprice)
        }
        else{
            let dprice = +ele.price - (+ele.price * (ele.discount / 100));
            newprice.textContent = "₹ " + Math.floor(dprice);
            let actualprice = document.createElement("h5")
            actualprice.textContent = "₹ "+ ele.price
            actualprice.style.color = "grey";
            actualprice.style.width = "fit-content";
            let hr = document.createElement("hr");
            hr.style.marginTop = "-25%";
            hr.style.width = "100%"
            actualprice.append(hr);
            let dis = document.createElement("h5");
            dis.textContent = ele.discount + " %";
            dis.style.color = "rgb(254,87,87)"
            titlediv.append(newprice,actualprice,dis)
        }
        

        let quantitydiv = document.createElement("div")
        quantitydiv.style.display = "flex";
        quantitydiv.setAttribute("id","quantitydivchange")
        let remove = document.createElement("button");
        remove.innerText = "Remove";
        remove.setAttribute("id","removebtn")
        remove.addEventListener("click",()=>{
            removeItem(ele);
        })
        let minus = document.createElement("button");
        minus.innerText = "-";
        minus.setAttribute("id","minusbtn")
        minus.addEventListener("click",()=>{
            minusQuantity(ele);
        })
        let quantity = document.createElement("p");
        quantity.innerText = ele.quantity;
        let plus = document.createElement("button");
        plus.innerText = "+";
        plus.setAttribute("id","plusbtn")
        plus.addEventListener("click",()=>{
            plusQuantity(ele);
        })
        quantitydiv.append(remove,plus,quantity,minus);

        card.append(img,titlediv,quantitydiv)
        cartdiv.append(card)
    });
    document.querySelector(".itemtype>#itemnumber").textContent = data.length;
    document.querySelector(".amount>#totalamount").textContent = amount;
}

async function plusQuantity(item){
    item.quantity += 1;
    // console.log(item)
    await fetch(`https://comfortable-slacks-bear.cyclic.app/cart/update/${item._id}`, {
            method: "PATCH",
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
            console.log(res.msg);
        })
        .catch((err) => {
            console.log(err);
        });
    fetchCart()
}

async function minusQuantity(item){
    if(item.quantity == 1){
        await fetch(`https://comfortable-slacks-bear.cyclic.app/cart/delete/${item._id}`, {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                "Authorization":localStorage.getItem("token")
                }
            })
            .then((res) => {
                return res.json();
            })
            .then(async(res) => {
                console.log(res.msg);
            })
            .catch((err) => {
                console.log(err);
            });
        fetchCart()
    }
    else{
        item.quantity -= 1;
        await fetch(`https://comfortable-slacks-bear.cyclic.app/cart/update/${item._id}`, {
                method: "PATCH",
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
                console.log(res.msg);
            })
            .catch((err) => {
                console.log(err);
            });
        fetchCart()
    }
}

async function removeItem(item){
    await fetch(`https://comfortable-slacks-bear.cyclic.app/cart/delete/${item._id}`, {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                "Authorization":localStorage.getItem("token")
                }
            })
            .then((res) => {
                return res.json();
            })
            .then(async(res) => {
                console.log(res.msg);
            })
            .catch((err) => {
                console.log(err);
            });
        fetchCart()
}

document.querySelector("form").addEventListener("submit",async(e)=>{
    e.preventDefault();
    let cartitem = [];
    await fetch(`https://comfortable-slacks-bear.cyclic.app/cart`,{
        method: "GET",
        headers: {
            "Authorization":localStorage.getItem("token")
        }
    })
    .then((res)=>{return res.json()})
    .then((data)=> {
        cartitem = data
    })
    .catch(err => console.log(err));
    cartitem.forEach(async(ele)=>{
        await fetch(`https://comfortable-slacks-bear.cyclic.app/cart/delete/${ele._id}`, {
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                "Authorization":localStorage.getItem("token")
                }
            })
            .then((res) => {
                return res.json();
            })
            .then(async(res) => {
                console.log(res.msg);
            })
            .catch((err) => {
                console.log(err);
            });
    })
    alert("Order Placed");
    window.location.href = "./homepage.html"
})

document.querySelector(".loginbtn").addEventListener("click",()=>{
    localStorage.setItem("token","");
    window.location.href = "/index.html"
  })