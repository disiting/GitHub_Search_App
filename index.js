'use strict';

//const apiKey = "ccf15e957f0ba95beb3b7555408ea95552793b4a"

const searchURL = 'https://api.github.com';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson, userHandle) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results').append('<h2>' + userHandle + '</h2>');
  $('#results').append('<ul id="results-list"></ul>');
  
  // iterate through the articles array
  for (let i = 0; i < responseJson.length; i++){
    // for each video object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].svn_url}" target="_blank">${responseJson[i].name}</a></h3>
      <p>${responseJson[i].full_name}</p>
      </li>`
    )};
};

function getRepos(userHandle) {
  const params = {
    //q: query,
    type: "owner",
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '/users/' + userHandle + '/repos?' + queryString;

  console.log(url);

  const options = {
    //headers: new Headers({
    //  "X-Api-Key": apiKey})
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText || response.status);
    })
    .then(responseJson => displayResults(responseJson, userHandle))
    .catch(err => {
      $('#results').append('<p id="js-error-message" class="error-message">Something went wrong: ' + err.message + '</p>');
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('#results').empty();
    const userHandle = $('#js-search-term').val();
    getRepos(userHandle);
  });
}

$(watchForm);