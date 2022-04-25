let tarefas = []
const $ = document.querySelector.bind(document)
const btnAdd = $('[data-btnAdd]').addEventListener('click', adicionarTarefa)
let lista = $('[ data-lista]')

const inputEditarTarefa = document.createElement('input')
inputEditarTarefa.type = 'text'
inputEditarTarefa.classList.add('input-editar')




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
    input.value = ''
    exibirTarefa()
}

function exibirTarefa() {
    lista.innerHTML = ''

    tarefas.map((tarefa, index) => {
        lista.innerHTML += `<li id='${index}' class='tarefas li'>
            <div class='container-tarefas'>
                <div class='container-texto'>
                    <input type='checkbox' onclick='concluirTarefa(${index})'/>
                    <span class='tarefas span'>${tarefa}</span>
                </div>
                <div class='container-btn'>
                    <button class='btn-editar' onclick='editarTarefa(${index})'>Editar</button>
                    <button onclick='deletarTarefa(${index})' class='btn-deletarTarefa'>Deletar</button>  
                </div>
            </div>
        </li>`
    })
   
}

function editarTarefa(id) {

    let spanTarefas = document.querySelectorAll('.span')
    const li = document.querySelectorAll('.li')


    inputEditarTarefa.value = spanTarefas[id].innerText

    inputEditarTarefa.addEventListener('change',  (e) => armazenarTarefaEditada(e,id))


    li[id].appendChild(inputEditarTarefa)

}

function armazenarTarefaEditada(e, id) {
    let spanTarefas = document.querySelectorAll('.span')

    spanTarefas[id].innerText = e.target.value 
    tarefas[id] = spanTarefas[id].innerText


    if(localStorage.getItem('tarefas') != null) {
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
    } 

    exibirTarefa()
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
    if(tarefas[id].includes(`<strike class='tarefas'>`)) {
        tarefas[id] = tarefas[id].replace(`<strike class='tarefas'>`, '')
        tarefas[id] = tarefas[id].replace('</strike>', '')
        if(localStorage.getItem('tarefas') != null) {
            localStorage.setItem('tarefas', JSON.stringify(tarefas))
        }
    } else {
        tarefas[id] = `<strike class='tarefas'>${tarefas[id]}</strike>`
        if(localStorage.getItem('tarefas') != null) {
            localStorage.setItem('tarefas', JSON.stringify(tarefas))
        }
    }

    exibirTarefa()
}
