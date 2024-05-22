document.querySelector(".comment-btn").onclick = ()=>{
    text = document.querySelector("#add__comment__input").value
    if (text.length >= 2){
        xhr.onload = () => {
            if (xhr.status == 200) {   
                window.location.reload()  
            } else {                               
                console.log("Server response: ", xhr.statusText);
            }
        };
        token = getCookie("token")
        if (token != null){
            xhr.open("POST", `${server}comment`);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify({"text":text,"token":token}));
        }else{
            alert("Вам необходимо войти в свой аккаунт")
            openModal()
        }
    }else{
        alert("Комментарий должен быть как минимум 2 символа")
    }
}