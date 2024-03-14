function createCountryCard(country){
    const card = document.createElement('div')
    card.classList.add('country')

    const countryName = country.name.common
    const name = document.createElement('h2')
    name.textContent = countryName

    const flag = document.createElement("img")
    flag.src = country.flags.svg
    flag.alt = countryName

    card.append(name, flag)
    document.querySelector('#countries').append(card)
}
async function getCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all')
    const countries = await response.json()
    console.log('Countries :>> ', countries)
    countries.forEach(createCountryCard)
    
}

//---
const form = document.querySelector('form')
form.addEventListener('submit', async(ev) =>{
    ev.preventDefault()

    const articleData = {
        title: document.querySelector('#title').value,
        author: document.querySelector('#author').value,
        content: document.querySelector('#content').value
    }
    const response = await fetch('http://localhost:3000/articles', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(articleData)
    })
})
function renderArticle(articleData) {
    const article = document.createElement('article')
    article.classList.add('article')
    article.id= `article-${articleData.id}`

    const title = document.createElement('h3')
    title.classList.add('article-title')
    title.textContent = articleData.title

    const content = document.createElement('div')
    content.classList.add('article-content')
    content.innerHTML= articleData.content

    const author = document.createElement('div')
    author.classList.add('article')
    author.textContent= articleData.author

    article.append(title, content, author)
    document.querySelector('#articles').appendChild(article)
}
async function fetchArticles() {
    const articles = await fetch('http://localhost:3000/articles').then(res => res.json())
    articles.forEach(renderArticle)
}
document.addEventListener('DOMContentLoaded', ()=>{
    fetchArticles()
})