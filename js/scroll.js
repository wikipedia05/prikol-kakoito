const server = "https://ef48c834-2de7-4a2c-bc0b-26d03412ade5-00-1j42pdgzz88pp.pike.replit.dev/"


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
    });
});
document.querySelector(".concert__btn").onclick = ()=>{
    alert("Ты рофлишь? реально на концерт не плутоне поедешь?")
}
