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
const titleList=document.querySelector(optTitleListSelector).innerHTML='';
console.log(titleList);


    /* for each article */

    /* get the article id */

    /* find the title element */

    /* get the title from the title element */

    /* create HTML of the link */

    /* insert link into titleList */

}

// Ta funkcja ma uruchamiać się od razu po odświeżeniu strony,
// więc nie musisz umieszczać wywołania w żadnej dodatkowej funkcji,
// ani tworzyć listenerów eventów.

generateTitleLinks();

