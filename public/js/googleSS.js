
// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '555150682260-mvj2a3esh23118k4aekt9fni7738ukdo.apps.googleusercontent.com'; //esta funciona para firebase
//var CLIENT_ID = '555150682260-2kpu5ahoc78ph1vjs9juhmrl9fbm8u67.apps.googleusercontent.com'; //esta funciona para localhost 8000

var SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

window.googleSS = false;
/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult).then(function(){
      console.log('termino auth');
    });
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    authorizeDiv.style.display = 'none';
    loadSheetsApi();
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    authorizeDiv.style.display = 'inline';
  }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
 * Load Sheets API client library.
 */
function loadSheetsApi() {
  var discoveryUrl = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
  gapi.client.load(discoveryUrl)
  .then(function(){
    console.log('termino de cargar');
    window.googleSS = true;
    console.log(window.googleSS);
  });
  // .then(listMajors);
}

// /**
//  * Print the names and majors of students in a sample spreadsheet:
//  * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
//  */
// function listMajors() {
//   gapi.client.sheets.spreadsheets.values.get({
//     // spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
//     spreadsheetId: '1141SH5sMcqhzrSI4XAUJdJ8A5jOjxeW9AWIz3IMTjco',
//     range: 'Base!A1:D',
//   }).then(function(response) {
//     var range = response.result;
//     console.log(response.result);
//     appendPre(range);
//   }, function(response) {
//     appendPre('Error: ' + response.result.error.message);
//   });
// }
//
// /**
//  * Append a pre element to the body containing the given message
//  * as its text node.
//  *
//  * @param {string} message Text to be placed in pre element.
//  */
// function appendPre(message) {
//   var pre = document.getElementById('output');
//   var textContent = document.createTextNode(message + '\n');
//   pre.appendChild(textContent);
// }
