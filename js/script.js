'use strict'

// const opt={
//   articleSelector : '.post',
//   titleSelector : '.post-title',
//   titleListSelector : '.titles',
//   articleTagsSelector : '.post-tags .list',
//   articleAuthorSelector : '.post p.post-author',
//   tagsListSelector : '.tags.list',
//   authorsListSelector : '.authors.list',
// };

const opts = {
  tagSizes: {
    cloudClassCount: 5,
    cloudClassPrefix : 'tag-size-',
  },
  authorSizes:{
    cloudAuthorClassCount :3,
    cloudAuthorClassPrefix : 'author-size-',
  },
};

const select = {
  all: {
    articleSelector: '.post',
    titleSelector : '.post-title',
    linksTo: {
      tags: 'a[href^="#tag-"]',
      authors: 'a[href^="#author-"]',
    },
  },
  article: {
    articleTagsSelector: '.post-tags .list',
    articleAuthorSelector: '.post-author',
  },
  listOf: {
    titleListSelector: '.titles',
    tagsListSelector: '.tags.list',
    authorsListSelector: '.authors.list',
  },
};




const titleClickHandler = function (event) {

  const clickedElement = this;
  event.preventDefault();

  /*[DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /*[DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelector('.posts article.active').classList.remove('active');
  console.log(activeArticles);

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}


// GENERATE TITLES LINKS






function generateTitleLinks(customSelector = '') {
  console.log(customSelector);

  /* remove contents of titleList */
  const titleList = document.querySelector(select.listOf.titleListSelector);
  console.log(titleList);

  clearTitleList();


  /* for each article */
  const articles = document.querySelectorAll(select.all.articleSelector + customSelector);
  console.log(articles);

  let html = '';

  for (let article of articles) {
    console.log(article);

    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);


    /* find the title element */
    /* get the title from the title element */
    // Do znalezienia elementu w konkretnym artykule wykorzystamy querySelector wywołany na artykule.

    const articleTitle = article.querySelector(select.all.titleSelector).innerHTML;

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);


    /* insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);

    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
// Ta funkcja ma uruchamiać się od razu po odświeżeniu strony,
// więc nie musisz umieszczać wywołania w żadnej dodatkowej funkcji,
// ani tworzyć listenerów eventów.

generateTitleLinks();

function clearTitleList() {
  document.querySelector(select.listOf.titleListSelector).innerHTML = '';
}




//finding the extreme numbers of the tag
function calculateTagsParams(tags) {
  const params = {
    min: 9999,
    max: 0
  }
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    } else if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

// choosing a class for the tag
function calculateTagClass(count, params) {


  const normalizedCount = count - params.min;
  // Następnie zmniejszyliśmy 10 – również o 2:

  const normalizedMax = params.max - params.min;
  // W kolejnym kroku podzieliliśmy te dwie liczby – 4 i 8:

  const percentage = normalizedCount / normalizedMax;
  // I wreszcie, zastosowaliśmy algorytm znany z losowania liczby całkowitej:

  const classNumber = Math.floor(percentage * (opts.tagSizes.cloudClassCount - 1) + 1);

  return ( opts.tagSizes.cloudClassPrefix, classNumber);

}



// GENERATE TAGS

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  console.log(allTags);

  // Tablica allTags służy nam tutaj tylko za katalog,
  //   który informuje nas, czy dany tag już widzieliśmy,
  //     czy jeszcze nie.Jednocześnie jest zbiorem linków
  //       (a konkretniej – tekstów, które zawierają kod HTML linków),
  //       które później wstawiamy do listy tagów w prawej kolumnie.

  /* find all articles */
  const articles = document.querySelectorAll(select.all.articleSelector);
  console.log(articles);


  /* START LOOP: for every article: */
  for (let article of articles) {
    console.log(article);


    /* find tags wrapper */
    const tagsWrapper = article.querySelector(select.article.articleTagsSelector);
    console.log('tagsWrapper:', tagsWrapper);



    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    // do każdego artykułu znajdujemy jego tagi
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);


    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);
      // do każdego z tych tagów jest generowany kod HTML linka
      /* generate HTML of the link */
      const linkHTML = `<li><a href=#${tag}>${tag}</a></li>`;
      console.log(linkHTML);


      // html = html + linkHTML;
      tagsWrapper.insertAdjacentHTML('beforeend', linkHTML);


      /* [NEW] check if this link is NOT already in allTags */
      // sprawdzamy czy dokładnie taki link mamy już w tablicy allTags
      // "jeśli allTags NIE MA klucza tag".
      if (!allTags.hasOwnProperty(tag)) {

        /* [NEW] add generated code to allTags object */
        // jeżeli go nie mamy, dodajemy go do tablicy
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
      /* add generated code to html variable */
      html = html + linkHTML;
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }

  /*[NEW] find list of tags in right column*/
  // znajdujemy listę tagów i dodajemy do niej wszystkie linki znajdujące się w tablicy
  const tagList = document.querySelector('.tags');

  /*[NEW] add html from allTags to tagList */
  // łącząc je ze sobą za pomocą spacji
  // tagList.innerHTML = allTags.join(' ');

  //Liczba wystąpen danego tagu. ....Należy wyświetlić listę wystąpień w każdym z linków w prawej kolumnie
  console.log(allTags);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* {NEW} START LOOP: for each tag in allTags */
  for (let tag in allTags) {
    /* [NEW] generate code of link and add it to allTagsHTML */

    allTagsHTML += `<li><a class= "${ opts.tagSizes.cloudClassPrefix + calculateTagClass(allTags[tag], tagsParams)}" href="${tag}"><span>${tag}</span></a></li>`;
    console.log(allTagsHTML);


    // const tagLinkHTML = '<li><a class"' + calculateTagClass(allTags[tag], tagsParams) + '"</a></li>';
    // console.log('tagLinkHTML:', tagLinkHTML);

    // allTagsHTML += tagLinkHTML;

  }
  /* [NEW] END LOOP : for each tag in allTAgs: */
  /*[NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}



generateTags();
addClickListenersToTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault()
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#', '');
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    console.log(activeTagLink);
    /* remove class active */
    activeTagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.post-tags .list a ');
  console.log(tagLinks);

  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */

  const tagLinksSidebar = document.querySelectorAll('.list.tags a');
  /* START LOOP: for each link */
  for (let tagLink of tagLinksSidebar) {

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}




// GENERATE AUTHORS

function calculateAuthorsParams(authors) {
  console.log('calculate authors', calculateAuthorsParams);
  const params =
  {
    max: 0,
    min: 999999
  }
  for (let author in authors) {
    if (authors[author] > params.max) {
      params.max = authors[author];
    } else {
      if (authors[author] < params.min) {
        params.min = authors[author];
      }
    }
    return params;
  }
}

function calculateAuthorClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const authorClassNumber = Math.floor(percentage * (opts.authorSizes.cloudAuthorClassCount - 1) + 1);


  return (opts.authorSizes.cloudAuthorClassPrefix, authorClassNumber);
}



function generateAuthors() {
  /*/[New] create a new vairable allAuthors with an empty object*/
  let allAuthors = {};
  console.log(allAuthors);

  /* find all authors */
  const articles = document.querySelectorAll(select.all.articleSelector);
  console.log(articles);

  /* START LOOP: for every article: */
  for (let article of articles) {

    const authorsWrapper = article.querySelector(select.article.articleAuthorSelector);
    console.log('authorsWrapper:', authorsWrapper);

    /* make html variable with empty string */
    let html = '';
    /* get authors from data-authors attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);


    /* generate HTML of the link of author */
    const authorHTML = `<a href=#${article}>${articleAuthor}</a>`;
    console.log(authorHTML);
    const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>'
    console.log(linkHTML);

    // /* find authors wrapper */
    authorsWrapper.insertAdjacentHTML('beforeend', authorHTML)
    /* add generated code to html variable */
    html = html + linkHTML;

    /*[NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors.hasOwnProperty(articleAuthor)) {
      /* [NEW] add author to allAuthors object*/
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    /* insert HTML of all the links into the tags wrapper */
    authorsWrapper.innerHTML = html;
    /* END LOOP: for every author: */
  }
  /*[new] find list of authors in right column*/
  const authorList = document.querySelector('.authors');
  console.log(authorList);

  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams', authorsParams);

  /* [new] create variable for all authors links HTML code */
  let allAuthorsHTML = '';

  /* [new] START LOOP: for each author in allAuthors */
  for (let articleAuthor in allAuthors) {
    /*[new] generate code of link and add it to allAuthorsHTML */
    // allAuthorsHTML += `<li><a class="${opts.authorSizes.cloudAuthorClassPrefix + calculateAuthorClass(allAuthors[articleAuthor], authorsParams)}" href="$articleAuthor{}"><span>${articleAuthor}</span></a></li>`;
    const authorLinkHTML = '<li><a class="' + opts.tagSizes.cloudClassPrefix + calculateAuthorClass(allAuthors[articleAuthor], authorsParams) + '"' + 'href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';
    console.log('authorLinkHTML', authorLinkHTML);
    allAuthorsHTML = allAuthorsHTML + authorLinkHTML;

  }
  /* [new] add html from allAuthorsHTML to authorList*/
  authorList.innerHTML = allAuthorsHTML;
}

generateAuthors();
addClickListenersToAuthors();


function authorClickHandler(event) {

  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);
  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]')
  console.log(activeAuthorLinks);
  /* START LOOP: for each active author link */
  for (let activeAuthorLink of activeAuthorLinks) {
    console.log(activeAuthorLink);
    /* remove class active */
    activeAuthorLinks.classList.remove('active');
    /* END LOOP: for each active author link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(authorLinks);
  /* START LOOP: for each found author link */
  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');
    /* END LOOP: for each found author link */
  }
  /* execute function "generateTitleLinks" with authore selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthors() {
  /* find all links to tags */
  // const authorsLinks = document.querySelectorAll('.post p .post-autor');
  const authorsLinks = document.querySelectorAll('.post-author  a');
  console.log(authorsLinks);

  /* START LOOP: for each link */
  for (let authorLink of authorsLinks) {

    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  }
  /* END LOOP: for each link */

  const authorLinksSidebar = document.querySelectorAll('.list.authors a');

  /* START LOOP: for each link */
  for (let authorLink of authorLinksSidebar) {

    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  }
  /* END LOOP: for each link */
}






// function addClickListenersSidebarToAuthors() {
//   const listSidebarAuthors = document.querySelectorAll('ul .list.authors a');
//   for (let listSidebarAuthor of listSidebarAuthors) {
//     listSidebarAuthor.addEventListener('click', authorClickHandler)
//   }
// }

// addClickListenersSidebarToAuthors();


