const searchButton = document.getElementById('searchButton');
const searchList = document.getElementById('search-list');
const singleLyrics = document.getElementById("lyrics");

/* Getting search result from API */
 searchButton.addEventListener('click', function() {
    // singleLyrics.innerHTML = "";
    const searchInput = document.getElementById('searchInput').value;
        if (searchInput) {
            fetch(`https://api.lyrics.ovh/suggest/${searchInput}/`)
                .then(response => response.json())
                .then(data => getSearchResult(data));
        } else {
            alert("Please write a valid song tittle");
        }
        document.getElementById('searchInput').value = "";
    })

    function getSearchResult(search) {
        searchList.innerHTML = "";
        for (let i = 0; i < 10; i++) {
            let title = search.data[i].title;
            let artist = search.data[i].artist.name;
            let image = search.data[i].artist.picture_small;

             let result = `<div class="single-result row align-items-center my-3 p-3">
                            <div class="col-md-8">
                                <h3 class="lyrics-name">${title}</h3>
                                <p class="author lead">Album by <span>${artist}</span></p>
                            </div>
                            <div class="col-md-1">
                                <img src="${image}" alt="">
                            </div>
                            <div class="col-md-3 text-md-right text-center">
                                <button class="btn btn-success" onclick="getLyrics('${artist}', '${title}')">Get Lyrics</button>
                            </div>
                            </div>`;
                searchList.innerHTML += result;
            }
        }


        /* Getting lyrics from API */


        function getLyrics(artist, title) {
            fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
                .then(response => response.json())
                .then((data) => {
                    singleLyrics.innerHTML = `
                                <button class="btn go-back text-white" onclick="goBack()">&lsaquo; go back</button>
                                <h2 class="text-success mb-4">${artist} - ${title}</h2>
                                <pre class="lyric text-white">${
                                    !data.lyrics ? data.error : data.lyrics
                                }</pre>
                            `;
                    searchList.style.display = "none";
                });
        }

        /* Back to search result */
        function goBack() {
            searchList.style.display = "block";
            singleLyrics.innerHTML = "";
        }