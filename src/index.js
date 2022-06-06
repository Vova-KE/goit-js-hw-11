import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';
const axios = require('axios');

const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');

const BASE_URL = 'https://pixabay.com/api/';
const MY_API_KEY = '27785613-3c730127b1356d079421a0eb8';  
const searchParams = new URLSearchParams({
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: 40,
});

let page = 1;
let valueInput = '';
let totalHitsCount = '';

searchForm.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleClick);

loadMoreBtn.classList.add('visually-hidden')

function handleSubmit(event) {
    event.preventDefault();

    gallery.innerHTML = '';
    valueInput = event.currentTarget.elements.searchQuery.value;
    page = 1;
    
    if (!loadMoreBtn.classList.contains('visually-hidden')) {
        loadMoreBtn.classList.add('visually-hidden')
    }
    if (valueInput === '') {
        Notify.info("Enter a query");
    } else {
        getUserText(valueInput).then(() => {
    if (totalHitsCount > 0) {
        Notify.success(`Hooray! We found ${totalHitsCount} totalHits images`);
    }
        page += 1;
    })
    }
    
}

async function getUserText(q) {
    try {
        const response = await axios.get(`${BASE_URL}?key=${MY_API_KEY}&q=${q}&${searchParams}&page=${page}`);
    if (response.data.hits.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again');
        }
        
    let arrayImages = response.data.hits;
    let lastPage = Math.ceil(response.data.totalHits / 40);
    totalHitsCount = response.data.totalHits;
    console.log(totalHitsCount);
    console.log(page);
    createListImages(arrayImages);

    if (response.data.total > 40) {
        loadMoreBtn.classList.remove('visually-hidden');
    }
    if (page === lastPage) {
        if (!loadMoreBtn.classList.contains('visually-hidden')) {
            loadMoreBtn.classList.add('visually-hidden')
        }
        Notify.info("We're sorry, but you've reached the end of search results");
    }
    } catch (error) {
        console.error(error);
    }
}

function createListImages(data) {
    const markup = createMarkupCard(data);
    gallery.insertAdjacentHTML('beforeend', markup); 

    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
}

function createMarkupCard(data){
    return data.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
        `<div class="photo-card">
            <a class="link" href="${largeImageURL}"> 
                <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        <span>${likes}</span>
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        <span>${views}</span>
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        <span>${comments}</span>
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        <span>${downloads}</span>
                    </p>
                </div>
            </a>
        </div>`).join(""); 
}

function handleClick() {
    getUserText(valueInput)
        .then(value => {
            page += 1;
        }
    )
}