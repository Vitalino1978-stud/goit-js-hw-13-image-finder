
import imageCardTemplate from "../tempates/image-cards.hbs";
import ImageSearch from "./images-ap-service";
 import LoadMoreBtn from "./load-next-page-btn";


const refs = {
  searhForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
}

refs.searhForm.addEventListener('submit', onSearch)
 

const imageSearch = new ImageSearch();
const loadMoreBtn = new LoadMoreBtn({selector: '[data-action="load-more"]', hidden: true,
});

function onSearch(event) {
  event.preventDefault();
  
  imageSearch.query = event.currentTarget.elements.query.value;
  if (imageSearch.query === '') {
    return alert('Please enter correct data.');
  }

  // loadMoreBtn.show();
  imageSearch.resetPage();
  clearGallery();
  fetchImages();
}
  

function fetchImages() {
  // loadMoreBtn.disable();
    imageSearch.fetchImages().then(images => {
    appendImageCardsMarkup(images);
    // loadMoreBtn.enable();
  });
};


function appendImageCardsMarkup(hits) {
  refs.gallery.insertAdjacentHTML("beforeend", imageCardTemplate(hits))
};

function clearGallery() {
  refs.gallery.innerHTML = ""
};
///
