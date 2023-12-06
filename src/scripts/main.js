
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('form-sorteador').addEventListener('submit', function(evento){
        evento.preventDefault();

        const ponto1 = "."
        const ponto2 = ".."
        const ponto3 = "..."

        let numeroMaximo = document.getElementById('numero-maximo').value;
        numeroMaximo = parseInt(numeroMaximo);
        
        let numeroAleatorio = Math.random() * numeroMaximo;
        numeroAleatorio = Math.floor(numeroAleatorio + 1);

        setTimeout(function(){
            document.getElementById('resultado-valor').innerText = ponto1;
        }, 100)
        setTimeout(function(){
            document.getElementById('resultado-valor').innerText = ponto2;
        }, 600)
        setTimeout(function(){
            document.getElementById('resultado-valor').innerText = ponto3;
        }, 1100)

        setTimeout(function(){
            document.getElementById('resultado-valor').innerText = ponto1;
        }, 1600)
        setTimeout(function(){
            document.getElementById('resultado-valor').innerText = ponto2;
        }, 2100)
        setTimeout(function(){
            document.getElementById('resultado-valor').innerText = ponto3;
        }, 2600)

        setTimeout(function(){
            document.getElementById('resultado-valor').innerText = numeroAleatorio;
        }, 3600)
    })
})
