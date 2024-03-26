
function blogPage() {
    fetch('blog.json')
        .then(response => {
            if (!response.ok) {
                window.location.href = "/";
            }
            return response.json();
        })
        .then(data => {
            if (data && data.status) {

                data.data.blog.forEach(Blog => {
                    const englishArticle = createArticle(Blog, 'EN');
                    const turkishArticle = createArticle(Blog, 'TR');
                    const paginationContainer = document.querySelector('.pagination');
                    paginationContainer.parentNode.insertBefore(englishArticle, paginationContainer);
                    paginationContainer.parentNode.insertBefore(turkishArticle, paginationContainer);
                });
            }
        })
        .catch(error => {
            window.location.href = "/";
        });
}

function createArticle(blogData, lang) {
    const articleElement = document.createElement('article');
    articleElement.classList.add('grid-item', 'col-sm-12', 'col-md-6', 'col-lg-4', 'post-29', 'post', 'type-post', 'status-publish', 'format-standard', 'has-post-thumbnail', 'hentry', 'category-design', 'tag-news', 'tag-travel', 'tag-ux-ui-design', `lang${lang}`);
    if (lang === 'TR') {
        articleElement.style.display = 'none';
    }
    const maxDescriptionLength = 90;
    const truncatedDescription = blogData[`${lang}description`].slice(0, maxDescriptionLength) + (blogData[`${lang}description`].length > maxDescriptionLength ? '...' : '');
    articleElement.innerHTML = `
            <a href="read.html?r=${blogData.seo}" aria-label="${blogData[`${lang}title`]}">
                <figure class="media-wrapper media-wrapper--4:3">
                    <img decoding="async" src="${blogData.imageUrl}" alt="${blogData[`${lang}title`]}">
                </figure>
            </a>
            <div class="post-meta-cont">
                <a href="read.html?r=${blogData.seo}" aria-label="title">
                    <h3>${blogData[`${lang}title`]}</h3>
                </a>
                <p class="post-excerpt">${truncatedDescription}</p>
              
            </div>
        `;
    return articleElement;
}

function readArticle(seo) {
    fetch('blog.json')
        .then(response => {
            if (!response.ok) {
                console.log('BUBU');
                // window.location.href = "/blog.html";
            }
            return response.json();
        })
        .then(data => {
            if (data && data.status) {
                if (data.data && data.data.blog && Array.isArray(data.data.blog)) {
                    data.data.blog.forEach(function (item) {
                        if (item.hasOwnProperty('seo') && item['seo'].includes(seo)) {

                            var langCookie = document.cookie
                                .split('; ')
                                .find(row => row.startsWith('lang='));

                            // Eğer langCookie varsa ve değeri "TR" veya "EN" ise, bu değeri alın
                            var lang = langCookie ? langCookie.split('=')[1] : 'EN';

                            changeMeta(item, lang)

                            const imageContainer = document.getElementById('image-container');
                            const englishImage = readArticleImage(item, 'EN');
                            const turkishImage = readArticleImage(item, 'TR');
                            imageContainer.appendChild(englishImage);
                            imageContainer.appendChild(turkishImage);




                            const titleContainer = document.getElementById('title-container');
                            const englishTitle = readArticleTitle(item, 'EN');
                            const turkishTitle = readArticleTitle(item, 'TR');
                            titleContainer.appendChild(englishTitle);
                            titleContainer.appendChild(turkishTitle);




                            const contentElement = document.querySelector('.ms-sp--header');
                            const englishContent = readArticleData(item, 'EN');
                            const turkishContent = readArticleData(item, 'TR');
                            contentElement.insertAdjacentElement('afterend', englishContent);
                            contentElement.insertAdjacentElement('afterend', turkishContent);
                        }
                    });
                }
            }
        })
        .catch(error => {
            console.log('BU');
            console.log(error);
            //window.location.href = "/blog.html";
        });
}

function changeMeta(blogData, lang) {

    var newTitle = blogData[`${lang}title`]

    // Meta etiketlerini bul
    var metaDescription = document.querySelector('meta[name="description"]');
    var metaKeywords = document.querySelector('meta[name="keywords"]');
    var ogMetaDescription = document.querySelector('meta[property="og:description"]');
    var ogMetaTitle = document.querySelector('meta[property="og:title"]');
    var ogMetaImage = document.querySelector('meta[property="og:image"]');

    // Yeni meta açıklama ve anahtar kelimeler
    var newDescription = blogData[`${lang}description`]
    var newKeywords = blogData[`${lang}keywords`]





    document.title = newTitle + ' - cy4udev';
    metaDescription.setAttribute('content', newDescription);
    metaKeywords.setAttribute('content', newKeywords);
    ogMetaDescription.setAttribute('content', newDescription);
    ogMetaTitle.setAttribute('content', newTitle + ' - cy4udev');
    ogMetaImage.setAttribute('content', blogData['imageUrl']);

}

function readArticleImage(blogData, lang) {
    const imageElement = document.createElement('img');

    imageElement.classList.add(`lang${lang}`);

    if (lang === 'TR') {
        imageElement.style.display = 'none';
    }
    imageElement.src = blogData['imageUrl']
    imageElement.alt = blogData[`${lang}title`]
    return imageElement;
}

function readArticleTitle(blogData, lang) {
    const titleElement = document.createElement('h1');

    titleElement.classList.add('heading-title', 'single', `lang${lang}`);
    if (lang === 'TR') {
        titleElement.style.display = 'none';
    }
    titleElement.innerHTML = blogData[`${lang}title`];
    return titleElement;
}

function readArticleData(blogData, lang) {
    const dataElement = document.createElement('article');

    dataElement.classList.add('container', `lang${lang}`);
    if (lang === 'TR') {
        dataElement.style.display = 'none';
    }
    dataElement.innerHTML = blogData[`${lang}content`];
    return dataElement;
}

var currentURL = window.location.href;

if (currentURL.indexOf('read.html') !== -1) {
    var urlParams = new URLSearchParams(window.location.search);
    var paramName = "r";
    if (urlParams.has(paramName)) {
        var paramValue = urlParams.get(paramName);
        readArticle(paramValue);
    } else {
        console.log('b');
        //  window.location.href = "/blog.html";
    }
} else if (currentURL.indexOf('blog.html') !== -1) {
    blogPage();
}