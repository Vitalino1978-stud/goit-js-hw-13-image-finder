
import './css/styles.css';
import LoadMoreBtn from './load-next-page-btn';
import API from './images-api-service';
import galleryTemplate from '../tempates/image-cards.hbs';
const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
};
const api = new API();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  api.query = e.currentTarget.elements.query.value.trim();
  loadMoreBtn.show();
  loadMoreBtn.disable();
  api.resetPage();
 
  api.fetchImages().then(images => {
    cleargalleryContainer();
    appendArticlesMarkup(images);
    loadMoreBtn.enable();
  });
  
}

async function onLoadMore() {
  loadMoreBtn.disable();
  await api.fetchImages().then(images => {
    appendArticlesMarkup(images);
    loadMoreBtn.enable();
  });

  window.scrollBy({
    top: screen.height - 400,
    behavior: 'smooth',
  });
}
function appendArticlesMarkup(images) {
  refs.galleryContainer.insertAdjacentHTML(
    'beforeend',
    galleryTemplate(images),

  );
}
function cleargalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}

