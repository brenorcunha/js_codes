const form = document.querySelector('form')
form.addEventListener('submit', async(ev) =>{
    ev.preventDefault()

    const opData={
        name: document.querySelector('name').value,
        value: document.querySelector('value').value
    }
    const response = await fetch('http://localhost:3000/operations', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(opData)
    })
})

function renderOp(opData) {
    const operation = document.createElement('operation')
    operation.classList.add('operations')
    operation.id = `operation-${opData.id}`

    const name = document.createElement('div')
    name.classList.add('operation')
    name.textContent = opData.name

    const value = document.createElement('div')
    value.classList.add('operation')
    value.textContent = opData.value

    operation.append(name, value)
    document.querySelector('#operations').appendChild(operation)
}

async function fetchOps() {
    const operation = await fetch('http://localhost:3000/operations').then(res => res.json())
    operation.forEach(renderArticle)
}
document.addEventListener('DOMContentLoaded', ()=>{
    fetchOps()
})