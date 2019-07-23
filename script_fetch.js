const searchForm = document.querySelector('#search-form')
const movies = document.querySelector('#movies')

function apiSearch(event){
    event.preventDefault()
    const searchText = document.querySelector('.form-control').value
    const url = `https://api.themoviedb.org/3/search/multi?api_key=634b13926b24486ab4b08c23d223674c&language=ru&query=${searchText}`
    movies.innerHTML = 'loading'
    requestApi('GET', url)
        .then(function(result){
            const output = JSON.parse(result)
            let inner = ''
            output.results.forEach(function (item){
                let nameItem = item.name || item.title
                console.log(nameItem)
                inner += `<div class = "col-3">${nameItem}</div>`
                });
            movies.innerHTML = inner
        })
        .catch(function(err){
            movies.innerHTML = 'Ooops'
            console.log(`err ${err.status}`)
        })
}

searchForm.addEventListener('submit', apiSearch)

function requestApi(method, url){
    return new Promise (function (resolve, reject){
        const request = new XMLHttpRequest()
        request.open(method, url)
        request.addEventListener('load', function(){
            if(request.status !== 200){
                reject({status: request.status})
                return
            }

            resolve(request.response)
        })
        request.addEventListener('error', function(){
            reject({status: request.status})
        })
        request.send()
    })

    // request.addEventListener('readystatechange' , () => {
    //     if (request.readyState !== 4) {
    //         movies.innerHTML = 'Loading'
    //         return
    //     }
    //     if (request.status !== 200){
    //         movies.innerHTML = 'Ooops'
    //         console.log(`err ${request.status}`)
    //         return
    //     }
    //     const output = JSON.parse(request.responseText)
    //     let inner = ''
    //     output.results.forEach(function (item){
    //         let nameItem = item.name || item.title
    //         console.log(nameItem)
    //         inner += `<div class = "col-3">${nameItem}</div>`
    //     });
    //     movies.innerHTML = inner

    // })
    
}
