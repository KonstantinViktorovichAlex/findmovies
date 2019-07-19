const searchForm = document.querySelector('#search-form')
const movies = document.querySelector('#movies')

function apiSearch(event){
    event.preventDefault()
    const searchText = document.querySelector('.form-control').value
    const url = `https://api.themoviedb.org/3/search/multi?api_key=634b13926b24486ab4b08c23d223674c&language=ru&query=${searchText}`
    requestApi('GET', url);
}

searchForm.addEventListener('submit', apiSearch)

function requestApi(method, url){

    const request = new XMLHttpRequest()
    request.open(method, url)
    request.send()

    request.addEventListener('readystatechange' , () => {
        if (request.readyState !== 4) return
        if (request.status !== 200){
            console.log(`err ${request.status}`)
            return
        }

        const output = JSON.parse(request.responseText)
        let inner = ''

        output.results.forEach(function (item){
            let nameItem = item.name || item.title
            console.log(nameItem)
            inner += `<div class = "col-3">${nameItem}</div>`
        });

        movies.innerHTML = inner

    })
    
}
