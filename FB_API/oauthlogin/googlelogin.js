var clientId = '471350517724-keqbv9ne8eonva2ip627bvo1li0c8oer.apps.googleusercontent.com';

      // var apiKey = 'AIzaSyDsK1vV8omFdwlImSpD3xixU51H0F-1fiw';

      var scopes = 'https://www.googleapis.com/auth/userinfo.email';

      function handleClientLoad() {
        // Step 2: Reference the API key
        // gapi.client.setApiKey(apiKey);
        window.setTimeout(checkAuth,1);
      }

      function checkAuth() {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
      }

      function handleAuthResult(authResult) {
        var authorizeButton = document.getElementById('authorize-button');
        if (authResult && !authResult.error) {//經過授權
          authorizeButton.style.visibility = 'hidden';
          makeApiCall();
        } else {//未經過授權
          authorizeButton.style.visibility = '';
          authorizeButton.onclick = handleAuthClick;
        }
      }

      function handleAuthClick(event) {
        // Step 3: get authorization to use private data
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
        return false;
      }

      // Load the API and make an API call.  Display the results on the screen.
      function makeApiCall() {
        // Step 4: Load the Google+ API
        gapi.client.load('plus', 'v1', function() {
          // Step 5: Assemble the API request
          var request = gapi.client.plus.people.get({
            'userId': 'me'
          });
          // Step 6: Execute the API request
          request.execute(function(response) {
          	console.log(response);
          	$("#googlemsg").html(
		      	"<img src="+response.image.url+">"
		      	+"<div class=highlight>"+response.id+"</div>"
		      	+"<div class=highlight>"+response.displayName+"</div>"
		      	+"<div class=highlight>"+response.emails[0].value+"</div>"
		      );
            
          });
        });
      }