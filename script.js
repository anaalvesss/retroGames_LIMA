const API_URL = "http://localhost:3000"

const btnCadastrar = document.getElementById("btnCadastrar")
const btnCancelar = document.getElementById("btnCancelar")
const modal = document.getElementById("modalCadastro")
const form = document.getElementById("formJogo")
const lista = document.getElementById("listaJogos")
const mensagemVazia = document.getElementById("mensagemVazia")

btnCadastrar.addEventListener("click", ()=> {
    modal.showModal()
})
btnCancelar.addEventListener("click", ()=> {
    modal.close()
})

async function carregarJogos() {
    try {
        const resposta = await fetch(API_URL + '/listar')
        const jogos = await resposta.json()

        lista.innerHTML =""

        if(jogos.length === 0){
            mensagemVazia.hidden = false 
            lista.appendChild(mensagemVazia)
            return
        }
        mensagemVazia.hidden = true
        jogos.forEach(jogo => {
            criarCard(jogo.titulo, jogo.plataforma, jogo.desenvolvedora, jogo.imagem, jogo.preco)
        })
    }catch(erro){
        console.error("Erro ao carregar jogos: ", erro)
        alert("Erro ao carregar jogos . Por favor, tente novamente mais tarde.")
    }
}

form.addEventListener("submit", async (evento)=>{
    evento.preventDefault()

    const novoJogo = {
        titulo: document.getElementById("titulo").value.trim(),
        desenvolvedora: document.getElementById("desenvolvedora").value.trim(),
        imagem: document.getElementById("imagem_url").value.trim(),
        preco: Number(document.getElementById("preco").value),
        plataforma: document.getElementById("plataforma").value.trim(),
    }

    try {
        const resposta = await fetch(API_URL + '/cadastrar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoJogo)
        })

        if (resposta.ok) {
            form.reset()
            modal.close()
            carregarJogos()
        } else {
            alert("Erro ao salvar jogos.")
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro)
        alert("Erro de conexão com o servidor")
    }
})

function criarCard(titulo, plataforma, desenvolvedora, imagem, preco) {
    const card = document.createElement("article")
    card.classList.add("card")

    const capa = document.createElement("div")
    capa.classList.add("capa")

    const imagemCapa = document.createElement("img")
    imagemCapa.src = imagem
    capa.appendChild(imagemCapa)

    const info = document.createElement("div")
    info.classList.add("info-jogo")

    const nomeJogo = document.createElement("h3")
    nomeJogo.textContent = titulo

    const nomePlataforma = document.createElement("p")
    nomePlataforma.textContent = "Plataforma: " + plataforma

    const nomeDesenvolvedora = document.createElement("p")
    nomeDesenvolvedora.textContent = "Desenvolvedora: " + desenvolvedora

    const valor = document.createElement("strong")
    valor.classList.add("preco")
    valor.textContent = preco.toLocaleString("pt-BR", {style: "currency",currency: "BRL"
    }) 

    info.append(nomeJogo, nomePlataforma, nomeDesenvolvedora, valor)
    card.append(capa, info)
    lista.appendChild(card)
}
carregarJogos()