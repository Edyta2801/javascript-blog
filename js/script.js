'use strict'

const titleClickHandler = function (event) {

    const clickedElement = this;
    event.preventDefault();

    /*[DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelector('.titles a.active').classList.remove('active');

    /* [IN PROGRESS] add class 'active' to the clicked link */
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

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}