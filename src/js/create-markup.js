export default function createMarkupCard(data){
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