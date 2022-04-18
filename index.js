let tarefas = []
const $ = document.querySelector.bind(document)
const btnAdd = $('[data-btnAdd]').addEventListener('click', adicionarTarefa)

window.onload = () => {
    if(localStorage.getItem('tarefas') != null) {
        tarefas = JSON.parse(localStorage.getItem('tarefas'))
        exibirTarefa()
    }
}


function adicionarTarefa() {
    const input  = $('[data-input]')
    const naoExiste = localStorage.getItem('tarefas') == null
    tarefas.push(input.value.trim())

    if(naoExiste) {
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
    } else {
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
    }

    exibirTarefa()
}

function exibirTarefa() {
    const lista = $('[ data-lista]')
    lista.innerHTML = ''

  
    tarefas.map((tarefa, index) => {
        lista.innerHTML += `<li id='${index}'}>
        <input type='checkbox' placeholder='Adicione uma tarefa..' />
        ${tarefa}
        <button>Deletar</button>
        </li>`
    })
}