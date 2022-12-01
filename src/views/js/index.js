// Index for front-end template
window.onload = ()=>{
    document.getElementById("btn").addEventListener("click",()=>{
        $.post('/',{name:"soy isi technology"},(data)=>{
            console.log(data)
            alert(`recibí desde el backend: ${data}`)
        })
    })
}