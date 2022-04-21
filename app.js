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
    input.value = ''
    exibirTarefa()
}

function exibirTarefa() {
    lista.innerHTML = ''

    tarefas.map((tarefa, index) => {
        lista.innerHTML += `<li id='${index}' class='tarefas li'>
            <div class='container-tarefas'>
                <input type='checkbox' onclick='concluirTarefa(${index})'/>
                <span class='tarefas span'>${tarefa}</span>
                <div class='container-btn'>
                    <button class='btn-editar' onclick='editarTarefa(${index})'>Editar</button>
                    <button onclick='deletarTarefa(${index})' class='btn-deletarTarefa'>Deletar</button>  
                </div>
            </div>
        </li>`
    })
   
}



function editarTarefa(id) {
    const input = document.createElement('input')
    input.type='text'
    input.classList.add('input')
    input.classList.add
    let spanTarefas = document.querySelectorAll('.span')
    const li = document.querySelectorAll('.li')


    input.value = spanTarefas[id].innerText

    input.addEventListener('change', (e) => {
         spanTarefas[id].innerText = e.target.value
  
        if(localStorage.getItem('tarefas') != null) {
            localStorage.setItem('tarefas', JSON.stringify(tarefas))
            exibirTarefa()
        }
    })

    li[id].appendChild(input)
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
//em todas as funções preciso do exibir tarefas
// e preciso atualizar os dados do storage
//solução alternativa concluir tarefa => adicionar um checkbox javascript

