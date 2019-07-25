const searchForm = document.querySelector('#search-form')
const movies = document.querySelector('#movies')
const urlPoster = 'https://image.tmdb.org/t/p/w500'

function apiSearch(event){
    event.preventDefault()
    const searchText = document.querySelector('.form-control').value
    if(searchText.trim().length === 0){
        movies.innerHTML = '<h2 class = "col-12 text-center text-danger">field clear</h2>'
        return
    }

    const url = `https://api.themoviedb.org/3/search/multi?api_key=634b13926b24486ab4b08c23d223674c&language=ru&query=${searchText}`
    movies.innerHTML = `<div class="spiner"></div>`

    fetch(url)
        .then((value) => {
            if(value.status !== 200){
                return Promise.reject(new Error(value.status))
            }
            return value.json()
        })
        .then((output) => {
            let inner = ''
            if(output.results.length === 0){
                inner = '<h2 class = "col-12 text-center text-info">По вашему запросу ничего не найдено</h2>'
            }
            output.results.forEach(function (item){
                let nameItem = item.name || item.title
                const poster = item.poster_path ? urlPoster + item.poster_path : './img/noposter.jpeg'
                let dataInfo = ''
                if(item.media_type !== 'person'){
                    dataInfo = `data-id = ${item.id} data-type = "${item.media_type}"`
                }
                inner += `<div class = "col-12 col-md-4 col-xl-3 item">
                <img src = "${poster}" class="poster" alt = "${nameItem}" ${dataInfo}>
                ${nameItem}
                </div>`
                })
            movies.innerHTML = inner
            addEventMedia()
        })
        .catch((err) => {
            movies.innerHTML = 'Oooooops'
            console.log(`err ${err}`)
        })
}

searchForm.addEventListener('submit', apiSearch)

function addEventMedia(){
    const media = movies.querySelectorAll('img[data-id]')
        media.forEach(function(elem){
            elem.style.cursor = 'pointer'
            elem.addEventListener('click', showFullInfo)
        })
}

document.addEventListener('DOMContentLoaded', function(){
    fetch('https://api.themoviedb.org/3/trending/all/week?api_key=634b13926b24486ab4b08c23d223674c&language=ru')
        .then((value) => {
            if(value.status !== 200){
                return Promise.reject(new Error(value.status))
            }
            return value.json()
        })
        .then((output) => {
            let inner = '<h2 class = "col-12 text-center text-info">Top Week</h2>'
            if(output.results.length === 0){
                inner = '<h2 class = "col-12 text-center text-info">По вашему запросу ничего не найдено</h2>'
            }
            output.results.forEach(function (item){
                let nameItem = item.name || item.title
                let mediaType = item.title ? 'movie' : 'tv'
                const poster = item.poster_path ? urlPoster + item.poster_path : './img/noposter.jpeg'
                let dataInfo = `data-id = ${item.id} data-type = "${mediaType}"`
                
                inner += `<div class = "col-12 col-md-4 col-xl-3 item">
                <img src = "${poster}" class="poster" alt = "${nameItem}" ${dataInfo}>
                ${nameItem}
                </div>`
                })
            movies.innerHTML = inner
            addEventMedia()
        })
        .catch((err) => {
            movies.innerHTML = 'Oooooops'
            console.log(`err ${err}`)
        })
})

function showFullInfo(){
    let url = ''
    if(this.dataset.type === 'movie'){
        url = `https://api.themoviedb.org/3/movie/${this.dataset.id}?api_key=634b13926b24486ab4b08c23d223674c&language=ru`
    }else if(this.dataset.type === 'tv'){
        url = `https://api.themoviedb.org/3/tv/${this.dataset.id}?api_key=634b13926b24486ab4b08c23d223674c&language=ru`
    }else {
        movies.innerHTML = '<h2 class = "col-12 text-center text-danger">Произошла ошибка повторите позже</h2>'
    }
    
    fetch(url)
        .then((value) => {
            if(value.status !== 200){
                return Promise.reject(new Error(value.status))
            }
            return value.json()
        })
        .then((output) => {
            movies.innerHTML = `
            <h4 class = "col-12 text-center text-info">${output.name || output.title}</h4>
            <div class = "col-10">
            <img src = "${urlPoster + output.poster_path}" alt = "${output.name || output.title}">
            ${(output.homepage) ? `<p class = "text-center"> <a href = "${output.homepage}"> Официальная страница </a> </p>` : ''}
            </div>
            <div class = "col-8">
            <p>Рейтинг: ${output.vote_average}</p>
            <p>Статус: ${output.status}</p>
            <p>Премьера: ${output.first_air_date || output.release_date}</p>
            </div>
            `
        })
        .catch((err) => {
            movies.innerHTML = 'Oooooops'
            console.log(`err ${err}`)
        })
}