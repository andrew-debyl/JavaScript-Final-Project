const moviesListEl = document.querySelector(".body__container");

async function main(keyword) {    
    let link = "http://www.omdbapi.com/?i=tt3896198&apikey=7ba85e40&s=" + keyword;
    
    const movies = await fetch(link);
    const moviesData = await movies.json();

    if (moviesData.Response === "False") {
        moviesListEl.innerHTML = notFound(keyword)
    }
    else if (moviesData.Response === "True") {
        moviesListEl.innerHTML = moviesData.Search.map((movie) => moviesHTML(movie)).slice(0,6).join("");
    }  
}


function onEnter(text) {
    if (text.keyCode === 13) {    
        main(text.target.value);    //Checks if the key entered is the enter key
    }
}


function onClick() {
    main(document.getElementById('search-bar').value);
}


function moviesHTML(movies) {
    return `<div class="body__movie">
    <div class="body__img--wrapper">
        <img class="body__img" src="${movies.Poster}" alt="">
    </div>
    <div class="body__about--wrapper">
        <h3 class="body__about">${movies.Title} - ${movies.Year}</h3>
    </div>
</div>`
}


function notFound(movie) {
    return `<div class="error-message">
    <div class="error">
        <h1 class="error--title">Unfortunately there are no movies found with the name <span class="error--movie-name">${movie}</span> in our database.</h1>
    </div>
</div>`
}