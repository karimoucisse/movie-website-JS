const API_Key = `api_key=747f31256b14e6163aa7b59d992c5bc5`;
const BASE_URL = `https://api.themoviedb.org/3` ;
const API_URL = BASE_URL + `/discover/movie?sort_by=popularity.desc&` + API_Key;
const IMG_URL = "https://image.tmdb.org/t/p/w500/"
const main = document.getElementById('main');
const form = document.getElementById('form')
const search = document.getElementById('search')
const SEARCH_URL = BASE_URL + "/search/movie?" + API_Key;

const getMovies = (url) => {
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results)
    }) 
}

getMovies(API_URL);

const showMovies = (data) => {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie
        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')
        movieElement.innerHTML = `

            <img src="${IMG_URL + poster_path}" alt="${title}">
            <div class="movie-info">
                <h1>${title}</h1>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieElement);
    });
}

const getColor = (vote) => {
    if(vote >= 8) {
        return "green"
    }else if (vote >= 5){
        return "orange"
    }else {
        return "red"
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value;
    if(searchTerm) {
        getMovies(SEARCH_URL + "&query=" + searchTerm)
    }else {
        getMovies(API_URL);
    }
})