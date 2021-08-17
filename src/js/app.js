const input = document.querySelector('.search-form__input')


input.addEventListener('input',debounce(() => {
        fetchSearch()
    }, 500)    
)

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('suggestions__item')) {
        selectSuggestion(e.target.textContent, e.target.owner, e.target.stars)
        const liveResults = Array.from(document.getElementsByClassName('suggestions__item'))
        liveResults.forEach(item => item.remove())
        let inputVal = document.querySelector('.search-form__input')
        inputVal.value = null 
    }
    if (e.target.classList.contains('item__btn-img2')) e.target.closest('.results__item').remove()    
})


function suggest(name, owner, stars) {
    const suggestions = document.querySelector('.suggestions')
    let suggestion = document.createElement('div')
    suggestion.classList.add('suggestions__item')
    suggestion.textContent = name
    suggestion.owner = owner
    suggestion.stars = stars
    suggestions.appendChild(suggestion)  
}

function selectSuggestion(name, owner, stars) {
    const results = document.querySelector('.results')
    let resItem = document.createElement('div')
    resItem.classList.add('results__item')
    results.appendChild(resItem)
    
        let content = document.createElement('div')
        content.classList.add('item__content')
        resItem.appendChild(content) 

            let sugName = document.createElement('div')
            sugName.classList.add('content__name')
            sugName.textContent = 'Name: ' + name
            content.appendChild(sugName)

            let sugOwner = document.createElement('div')
            sugOwner.classList.add('content__owner')
            sugOwner.textContent = 'Owner: ' + owner
            content.appendChild(sugOwner)

            let sugStars = document.createElement('div')
            sugStars.classList.add('content__stars')
            sugStars.textContent = 'Stars: ' + stars
            content.appendChild(sugStars)

        let btn = document.createElement('button')
        btn.classList.add('item__btn')
        resItem.appendChild(btn)

            let img1 = document.createElement('img')
                img1.classList.add('item__btn-img1')
                img1.src = "./src/imgs/vector1.svg"
                btn.appendChild(img1)

            let img2 = document.createElement('img')
                img2.classList.add('item__btn-img2')
                img2.src = "./src/imgs/vector3.svg"
                btn.appendChild(img2)

        }

function debounce(fn, debounceTime) {
    let inDebounce
    return function() {
      const context = this
      const args = arguments
      clearTimeout(inDebounce)
      inDebounce = setTimeout(() => fn.apply(context, args), debounceTime)
    }
  }

async function fetchSearch() {
    const results = document.querySelectorAll('.suggestions__item')
    results.forEach(item => item.remove())
    const data = await fetch(`https://api.github.com/search/repositories?q={${document.querySelector('.search-form__input').value}}+in:repositories&per_page=5`)
    const fullres = await data.json()
    fullres.items.forEach((item) => {
        suggest(item.name, item.owner.login, item.stargazers_count)
    });
}

       
