document.querySelector("#login").onclick = openModal
document.querySelector(".modal__overlay").onclick = closeModal
let mode = 0
document.querySelector("#login-option").onclick = ()=>{
    mode = 0;
    changemode()
}
document.querySelector("#registration-option").onclick = ()=>{
    mode = 1;
    changemode()
}




function openModal(){
    document.querySelector(".modal").style.display = "block";
    changemode()
    scrollPos = {x:scrollX,y:scrollY};
    document.onscroll = ()=>{
        window.scrollTo(scrollPos.x,scrollPos.y)
    }
}
function closeModal(){
    document.querySelector(".modal").style.display = "none";
    document.onscroll = ()=>{
    }
}

function changemode(){
    document.querySelector(".modal__top__value").style.transform = `translateX(${mode*100}%)`;
    if (mode){
        document.querySelector("#logbutton").style.display = "none"
        document.querySelector("#regbutton").style.display = "block"
    }else{
        document.querySelector("#logbutton").style.display = "block"
        document.querySelector("#regbutton").style.display = "none"
    }
}

document.querySelector(".modal__bottom").onsubmit = (e)=>{
    e.preventDefault()
    login = document.querySelector("#login-input").value.toLowerCase()
    password = document.querySelector("#login-input").value
    if (mode == 0){
        xhr.open("POST", `${server}login`);
        xhr.onload = () => {
            if (xhr.status == 200) {   
                token = JSON.parse(xhr.responseText).token
                console.log(token);
                setCookie("token",token);
                window.location.reload()
            } else {                               
                console.log("Server response: ", xhr.statusText);
            }
        };
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({"login":login,"password":password}));
    }else{
        xhr.open("POST", `${server}register`);
        xhr.onload = () => {
            if (xhr.status == 200) {
                if (JSON.parse(xhr.responseText).status=="success"){
                    token = JSON.parse(xhr.responseText).token
                    setCookie("token",token);  
                    window.location.reload()
                }else{
                    alert("Логин занят")
                }
            } else {                               
                console.log("Server response: ", xhr.statusText);
            }
        };
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({"login":login,"password":password}));
    }
}