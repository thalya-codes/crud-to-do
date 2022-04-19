let tarefas = []
const $ = document.querySelector.bind(document)
const btnAdd = $('[data-btnAdd]').addEventListener('click', adicionarTarefa)
let lista = $('[ data-lista]')

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
    lista.innerHTML = ''

    tarefas.map((tarefa, index) => {
        lista.innerHTML += `<li id='${index}'}>
        <input type='checkbox' onclick='concluirTarefa(${index})'/>
        ${tarefa}
        <button onclick='deletarTarefa(${index})'>Deletar</button>
        </li>`

    })
   
}

function deletarTarefa(id) {
    tarefas.splice(id,1)
    console.log(tarefas)

    if(localStorage.getItem('tarefas') != null) {
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
        exibirTarefa()
    }
}

function concluirTarefa(id) {
    if(tarefas[id].includes('<strike>')) {
        tarefas[id] = tarefas[id].replace('<strike>', '')
        tarefas[id] = tarefas[id].replace('</strike>', '')
        if(localStorage.getItem('tarefas') != null) {
            localStorage.setItem('tarefas', JSON.stringify(tarefas))
        }
    } else {
        tarefas[id] = `<strike>${tarefas[id]}</strike>`
        if(localStorage.getItem('tarefas') != null) {
            localStorage.setItem('tarefas', JSON.stringify(tarefas))
        }
    }

    exibirTarefa()
}
//em todas as funções preciso do exibir tarefas
// e preciso atualizar os dados do storage
//solução alternativa concluir tarefa => adicionar um checkbox javascript



/*

        lista.innerHTML += `<li id='${index}'}>
        <input type='checkbox' onclick='concluirTarefa(${index})'/>
        ${tarefa}
        <button onclick='deletarTarefa(${index})'>Deletar</button>
        </li>`
*/