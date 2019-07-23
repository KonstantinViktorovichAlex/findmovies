const searchForm = document.querySelector('#search-form')
const movies = document.querySelector('#movies')
const urlPoster = 'https://image.tmdb.org/t/p/w500'

function apiSearch(event){
    event.preventDefault()
    const searchText = document.querySelector('.form-control').value
    const url = `https://api.themoviedb.org/3/search/multi?api_key=634b13926b24486ab4b08c23d223674c&language=ru&query=${searchText}`
    movies.innerHTML = 'loading'

    fetch(url)
        .then((value) => {
            if(value.status !== 200){
                return Promise.reject(new Error(value.status))
            }
            return value.json()
        })
        .then((output) => {
            console.log(output.results)
            let inner = ''
            output.results.forEach(function (item){
                let nameItem = item.name || item.title
                inner += `<div class = "col-12 col-md-4 col-xl-3 item">
                <img src = "${urlPoster + item.poster_path}" alt = "${nameItem}">
                ${nameItem}
                </div>`
                })
            movies.innerHTML = inner
        })
        .catch((err) => {
            movies.innerHTML = 'Ooops'
            console.log(`err ${err}`)
        })

}
searchForm.addEventListener('submit', apiSearch)


    

