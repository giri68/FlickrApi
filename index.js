// 'use strict';

// $.getJSON('https://api.flickr.com/services/rest/');

'use strict';

const STORE = {
api_url: "https://api.flickr.com/services/rest/",
api_key: "c7fe3deed240d22632e1d0771c5025f4",
userSearchTerm: '',
searchResults: [],
onPage: 1
};

function handleSearch() {
  $(".js-form").on("submit", function(event) {
    event.preventDefault();
    STORE.searchResults = [];
    STORE.userSearchTerm = $(".js-input").val();
    $(".js-input").val("");
    getDataFromApi(STORE.userSearchTerm, displayData);
    getDataFromApi(STORE.userSearchTerm, displayData);
    $(".js-more-results").removeClass("hidden");
  });
}

function handleMoreResults() {
  $(".js-more-results").on("click", function(event) {
    getDataFromApi(STORE.userSearchTerm, displayData);
  });
}

function handleImageClick() {
  $(".js-search-results").on("click", ".js-image", function(event) {
    $(".lightbox").removeClass("hidden");
    $(".selected-image").removeClass("hidden");
    const imgUrl = $(event.currentTarget).parent().find("img").attr("data-index");
    $(".js-selected-image").attr("src", imgUrl);
});
}

function handleRemoveLightbox() {
  $("body").on("click", ".lightbox", function(event) {
    $(".js-selected-image").attr("src", "");
    pageRender();
  });
}

function getDataFromApi(searchTerm, callback) {
  const request = {
    method: 'flickr.photos.search',
    api_key: STORE.api_key,
    text: searchTerm,
    format: 'json',
    nojsoncallback: 1,
    per_page: 10,
    page: STORE.onPage
  };
  $.getJSON(STORE.api_url, request, callback); 
}

function getInfoFromApi(photoIdInsert, secretInsert, callback) {
  const request = {
    method: 'flickr.photos.getInfo',
    api_key: STORE.api_key,
    format: 'json',
    nojsoncallback: 1,
    photo_id: photoIdInsert,
    secret: '',
  };
  $.getJSON(STORE.api_url, request, callback); 
}

function displayData(data) {
  console.log(data); 
  STORE.searchResults.push(data["photos"]["photo"]);
  // renderToHtml();
  STORE.onPage ++;
}

function displayInfo(data) {
  STORE.searchResults[0][0].forEach(function(data) {
    title: data
  }
}


// function renderToHtml() {
//   const imagesString = STORE.searchResults.join(" ");
//   $('.js-search-results').html(imagesString);
//   }

function renderImages(item) {
  getInfoFromApi(item.id, item.secret, function(event) {
  });
  return `
<div class="image-item">
<img src="https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg" data-index="https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg" class="js-image image">
  <div class="image-data">
    <h2>${title}</h2>
    <p>${description}</p>
  </div>
</div>`;
}

function pageRender() {
  $(".lightbox").addClass("hidden");
  $(".selected-image").addClass("hidden");
}

function eventHandlers() {
  handleSearch();
  handleMoreResults();
  handleImageClick();
  handleRemoveLightbox();
}

$(eventHandlers);
// function displayData(data){
//   STORE = data.items.map(item) => {STORE.push(renderString(item, index));