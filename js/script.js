'use strict'

const titleClickHandler = function (event) {

    const clickedElement = this;
    event.preventDefault();

    /*[DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelector('.titles a.active').classList.remove('active');

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /*[DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelector('.posts article.active').classList.remove('active');

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');
console.log(links);
for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}



const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

function generateTitleLinks() {
    console.log('Title was generated');

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector).innerHTML = '';
    console.log(titleList);


    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);

    for (let article of articles) {
        console.log(article);

        /* get the article id */
        const articleId = article.getAttribute('id');
        console.log(articleId);



        /* find the title element */
        // Do znalezienia elementu w konkretnym artykule wykorzystamy querySelector wywołany na artykule.
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        console.log(articleTitle);

        /* get the title from the title element */


        /* create HTML of the link */

        /* insert link into titleList */

    }
}

// Ta funkcja ma uruchamiać się od razu po odświeżeniu strony,
// więc nie musisz umieszczać wywołania w żadnej dodatkowej funkcji,
// ani tworzyć listenerów eventów.

generateTitleLinks();