import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27785613-3c730127b1356d079421a0eb8';

const searchForm = document.querySelector('#search-form');
const searchQuery = document.querySelector('input[name=searchQuery]');
const gallery = document.querySelector('.gallery');
const searchBtn = document.querySelector('button[type=submit]');
const loadMoreBtn = document.querySelector('.load-more');
// console.log(searchForm);
// console.log(searchQuery);
// console.log(gallery);
// console.log(searchBtn);
// console.log(loadMoreBtn);

let totalHitsCount = 0;
let searchUserText = '';
let page = 1;

// Notify.success(`Hooray! We found ${totalHitsCount} totalHits images`);
// Notify.failure('Sorry, there are no images matching your search query. Please try again');
// Notify.info("We're sorry, but you've reached the end of search results");

searchForm.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

function handleSubmit(event) {
    event.preventDefault();
    
    searchUserText = event.currentTarget.elements.searchQuery.value;
    console.log(searchUserText);

    fetch(`${BASE_URL}?key=${API_KEY}&q=${searchUserText}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`)
        .then(response => response.json())

            // <div class="photo-card">
            //     <img src="" alt="" loading="lazy" />
            //     <div class="info">
            //         <p class="info-item">
            //             <b>Likes</b>
            //         </p>
            //         <p class="info-item">
            //             <b>Views</b>
            //         </p>
            //         <p class="info-item">
            //             <b>Comments</b>
            //         </p>
            //         <p class="info-item">
            //             <b>Downloads</b>
            //         </p>
            //     </div>
            // </div >
                
        .catch(error => console.log(error))
};

function handleLoadMore() {
    
};

// заготовка отрисовки разметки
// function renderGallery(photos) {
//     const markup = photos
//         .map((photo) => {
            //// return `<img src = ${user.flags.svg} width="80"/><span style="font-size:40px"> ${user.name.official}</span>
            //// <p><b>Capital:</b> ${user.capital}</p>
            //// <p><b>Population:</b> ${new Intl.NumberFormat('en').format(user.population)}</p>
            //// <p><b>Languages:</b> ${Object.values(user.languages)}</p>`;

            // return `<div class="photo-card">
            //     <img src="" alt="" loading="lazy" />
            //     <div class="info">
            //         <p class="info-item">
            //             <b>Likes</b>
            //         </p>
            //         <p class="info-item">
            //             <b>Views</b>
            //         </p>
            //         <p class="info-item">
            //             <b>Comments</b>
            //         </p>
            //         <p class="info-item">
            //             <b>Downloads</b>
            //         </p>
            //     </div>
            // </div>`
//         })
//         .join("");

//     return markup;//если надо
// };

// gallery.insertAdjacentHTML('beforeend', renderGallery(photos));


// инициализация библиотеки SimpleLightbox
// let gallery = new SimpleLightbox('.gallery a',
//         {
//             captionsData: 'alt',
//             captionDelay: 250,
//         });
//     galleryImage.on('show.simplelightbox', function () {
//     });
// refresh() //добавить