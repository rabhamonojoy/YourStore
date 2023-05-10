let allregistereduser = [];
const fetchRegisteredUser = async()=>{
    await fetch("https://comfortable-slacks-bear.cyclic.app/user/alluser")
        .then((res)=>{ return res.json() })
        .then(data => allregistereduser=data)
        .catch(err => console.log(err) )
}
fetchRegisteredUser();

let lin = document.querySelector("#login");
let reg = document.querySelector("#register");

let linbtn = document.querySelector("#loginbtn");
let regbtn = document.querySelector("#registerbtn");

reg.style.display = "none";
regbtn.style.opacity = "50%";

linbtn.addEventListener("click",()=>{
    reg.style.display = "none";
    lin.style.display = "flex";
    linbtn.style.opacity = "100%";
    regbtn.style.opacity = "50%";
});

regbtn.addEventListener("click",()=>{
    lin.style.display = "none";
    reg.style.display = "flex";
    linbtn.style.opacity = "50%";
    regbtn.style.opacity = "100%";
})


    


    // -----------login-------------------------
lin.addEventListener("submit",async(event)=>{
    event.preventDefault();
    let email = document.querySelector("#lemail").value;
    let password = document.querySelector("#lpass").value;
    let obj = {
        email,
        password
    }
    // console.log(name,email,password);
    await fetch("https://comfortable-slacks-bear.cyclic.app/user/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        })
        .then((res) => {
            return res.json();
        })
        .then(async(res) => {
            if(res.msg == "Login Successful"){
                localStorage.setItem("token",res.token);
                document.querySelector("#status").textContent = res.msg;
                await setTimeout(()=>{
                    window.location.href = "./homepage.html"
                }, 2000);
            }
            else{
                alert(res.msg)
            }
        })
        .catch((err) => {
            console.log(err);
        });
})


    // ----------------register-------------------
reg.addEventListener("submit",async(event)=>{
    event.preventDefault();
    let name = document.querySelector("#rname").value;
    let email = document.querySelector("#remail").value;
    let password = document.querySelector("#rpass").value;
    let obj = {
        name,
        email,
        password
    }
    // console.log(name,email,password);
    await fetch("https://comfortable-slacks-bear.cyclic.app/user/register", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            alert(res.msg);
        })
        .catch((err) => {
            console.log(err);
        });
            
    reg.reset();
})
