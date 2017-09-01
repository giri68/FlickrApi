// 'use strict';

// $.getJSON('https://api.flickr.com/services/rest/');

'use strict';

const STORE = {
api_url: "https://api.flickr.com/services/rest/",
api_key: "b7201f356e3eee6525240d1e58bcee4e",
userSearchTerm: '',
searchResults: [],
onPage: 1
};

function handleSearch() {
  $(".js-form").on("submit", function(event) {
    event.preventDefault();
    STORE.searchResults = [];
    $(".js-search-results").html("");
    let search = $(".js-input").val();
    STORE.userSearchTerm = `${search} wallpaper`;
    $(".js-input").val("");
    $(".form").addClass("form-shift");
    getDataFromApi(STORE.userSearchTerm, displayData);
    $(".js-more-results").removeClass("hidden");
    $(".js-more-results").addClass("block");
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
    const id = $(event.currentTarget).parent().find("img").attr("data-id");
    const secret = $(event.currentTarget).parent().find("img").attr("data-secret");
    getInfoFromApi(id, secret, displayInfo);
    getSizeFromApi(id, displaySize);
    // $(".selected-image").find("h4").append(`Download Wallpaper: ${imgUrl}`);
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
    secret: secretInsert,
  };
  $.getJSON(STORE.api_url, request, callback); 
}

function getSizeFromApi(photoIdInsert, callback) {
  const request = {
    method: 'flickr.photos.getSizes',
    api_key: STORE.api_key,
    format: 'json',
    nojsoncallback: 1,
    photo_id: photoIdInsert,
  };
  $.getJSON(STORE.api_url, request, callback); 
}

function displayData(data) {
  STORE.searchResults = data.photos.photo;
  renderImages(data.photos.photo);
  STORE.onPage ++;
}

function displayInfo(response) {
  $(".description").append(`
    <h2>${response.photo.title._content}</h2>
    <h4 class="download"></h4>
    `);
  
}

function displaySize(response) {
  $(".description").find(".download").html(`
  <a href="${response.sizes.size[response.sizes.size.length-1].source}">Download Here</a>`);
}

// function renderToHtml() {
//   const imagesString = STORE.searchResults.join(" ");
//   $('.js-search-results').html(imagesString);
//   }

function renderImages(results) {
 results.forEach(function(result) {
  $(".js-search-results").append(`<div class="image-item col-4 box">
    <img src="https://farm${result.farm}.staticflickr.com/${result.server}/${result.id}_${result.secret}.jpg" data-index="https://farm${result.farm}.staticflickr.com/${result.server}/${result.id}_${result.secret}.jpg" data-id="${result.id}" data-secret="${result.secret}" class="js-image image">
      <div class="image-data">
      </div>
    </div>`);
  });

}

function pageRender() {
  $(".lightbox").addClass("hidden");
  $(".selected-image").addClass("hidden");
  $(".description").html("");
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