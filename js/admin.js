let isadmin = false
fetch(server+"isadmin",{
    method:"post",
    headers:{
        "Content-type":"application/json"
    },
    body:JSON.stringify({
        "token":getCookie("token")
    })
}).then(r=>r.json())
.then(data=>{
    console.log("запрос на админа");
    if (data.admin){
        isadmin = true;
    }
    
    xhr.onload = () => {
        if (xhr.status == 200) {
            JSON.parse(xhr.responseText).data.forEach(comment => {
                document.querySelector(".comment-section").innerHTML += `<div class="comment__item">
                    <img src="img/icons/user.svg" alt="" class="user-pic">
                    <div class="comment__item__content">
                        <div class="comment__item__author">
                            ${comment.login}
                        </div>
                        <div class="comment__item__text">
                            ${comment.text}
                        </div>
                    </div>
                    ${isadmin?'<div class="delete-comment"></div>':""}
                </div>
                `
            });
            document.querySelectorAll(".delete-comment").forEach(element => {
                element.onclick = ()=>{
                    if (confirm("Удалить комментарий?")){
                        fetch(server+"delcomment",{
                            method:"post",
                            headers:{
                                "Content-type":"application/json"
                            },
                            body:JSON.stringify({
                                "token":getCookie("token"),
                                "login":element.parentElement.querySelector(".comment__item__author").textContent,
                                "text":element.parentElement.querySelector(".comment__item__text").textContent
                            })
                        }).then(r=>r.json())
                        .then(data=>{
                            window.location.reload()
                        })
                    }
                }
            });         
        } else {                               
            console.log("Server response: ", xhr.statusText);
        }
    };
    
    xhr.open("get",${server}getcomments)
    xhr.send();
});
