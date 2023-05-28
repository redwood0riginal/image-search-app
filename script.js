const apiKey = "Dc_n8nApTR2LmtRFXFj-Lq041Oou8jPx88n8YkG1JtM";
const formEl = document.querySelector('form');
const searchInput = document.getElementById('input-search');
const serachResults = document.getElementById('search-results');
const showMoreBtn = document.getElementById('more-btn')

let inputData = ''
let page = 1

async function searchImages() {
    inputData = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`
    const response = await fetch(url) 
    const data = await response.json()
    const results = data.results

    if (page === 1){
        serachResults.innerHTML = '';
    }
    results.map((result)=>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('search-result')
        const images = document.createElement('img');
        images.src = result.urls.small;
        images.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = '_blank';
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(images);
        imageWrapper.appendChild(imageLink);
        serachResults.appendChild(imageWrapper);
    });
    page++
    if (page>1){
        showMoreBtn.style.display = 'block';
    }
}

formEl.addEventListener('submit',(e)=>{
    e.preventDefault();
    page = 1
    searchImages()
    
})
showMoreBtn.addEventListener('click',()=>{
    searchImages()
})
