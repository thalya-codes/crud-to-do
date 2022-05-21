let tarefas = []
const $ = document.querySelector.bind(document)
const btnAdd = $('[data-btnAdd]').addEventListener('click', adicionarTarefa)
let lista = $('[data-lista]')

const inputEditarTarefa = document.createElement('input')
inputEditarTarefa.type = 'text'
inputEditarTarefa.classList.add('input-editar-tarefa')


const containerInput = document.createElement('div')
const btnSalvar  = document.createElement('button')
const btnDescartar = document.createElement('button')



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
                <div class='container-tarefas-btn'>
                    <button class='btn-editar' onclick='editarTarefa(${index})'>Editar</button>
                    <button onclick='deletarTarefa(${index})' class='btn-deletar-tarefa'>Deletar</button>  
                </div>
            </div>
        </li>`
    })
   
}

function editarTarefa(id) {
    let spanTarefas = document.querySelectorAll('.span')
    const li = document.querySelectorAll('.li')
    
    containerInput.classList.add('container-editar-tarefa')
    btnSalvar.classList.add('btnSalvar')
    btnDescartar.classList.add('btnDescartar')

    btnSalvar.innerText = '✓'
    btnDescartar.innerText = 'x'

    inputEditarTarefa.name = 'input'
    btnSalvar.name = 'salvar-alteracao'
    btnDescartar.name = 'descartar-alteracao'


    containerInput.classList.contains('display-none') && containerInput.classList.remove('display-none')

    inputEditarTarefa.value = spanTarefas[id].innerText
    containerInput.append(inputEditarTarefa)

    containerInput.append(btnSalvar)
    containerInput.append(btnDescartar)
    li[id].append(containerInput)

    inputEditarTarefa.addEventListener('change',  (e) => armazenarTarefaEditada(e,id))

    containerInput.addEventListener('click', (e) => {

            if(e.target.name === 'salvar-alteracao') {
                atualizarSpanEditado(inputEditarTarefa ,id, containerInput)
            } else if(e.target.name === 'descartar-alteracao') {
                descartarTarefaEditada(containerInput)
            }
    })
}

function deletarTarefa(id) {
    tarefas.splice(id,1)
    console.log(tarefas)

    if(localStorage.getItem('tarefas') != null) {
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
    }
    exibirTarefa()
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



function armazenarTarefaEditada(e, id) {
    tarefas[id] = e.target.value
}

function atualizarSpanEditado(input,id,containerInput) {
    let spanTarefas = document.querySelectorAll('.span')
    spanTarefas[id].innerText = input.value 

    containerInput.classList.remove('display-none')
    containerInput.classList.add('display-flex')
    if(localStorage.getItem('tarefas') != null) {
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
    } 

    exibirTarefa()
}
function descartarTarefaEditada(containerInput) {
    containerInput.classList.add('display-none')
}
//leitura: https://www.digitalocean.com/community/tutorials/how-to-use-node-js-modules-with-npm-and-package-json-pt
