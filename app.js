const form = document.querySelector(".searchForm");

const submitFunction = (event) => {
    event.preventDefault();
    let inputValue = document.querySelector(".searchInput").value;
    query = inputValue.trim()

    getResults(query)
}

form.addEventListener("submit", submitFunction);

const getResults = (query) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&origin=*&srlimit=25&utf8=&format=json&srsearch=${query}`

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.query.search)
            addResults(data.query.search)
        })
        .catch((e) => console.error(`Error: ${e}`));
}

const addResults = (sResults) => {
    const searchResult = document.querySelector(".results");
    searchResult.innerHTML = "";

    sResults.forEach((result) => {
        const url = `https://en.wikipedia.org/?curid=${result.pageid}`;

        searchResult.insertAdjacentHTML(
            "beforeend",
            `<div class="card p-3" data-aos="fade-up">
                <h5 class="cardTitle">
                    <a href="${url}" target="_blank">${result.title}</a>
                </h5>
                <a href="${url}" class="cardLink mb-3 px-3 py-2" target="_blank">${url}</a>
                <span class="cardSnippet">${result.snippet}</span>
            </div>`
        )
    })
}
