 function setFBLogin() {

var isAppGetPermission = false;
  window.fbAsyncInit = function() {
  FB.init({
    appId      : '558713954216192',
    status     : true, // check login status
    cookie     : true, // enable cookies to allow the server to access the session
    xfbml      : true  // parse XFBML
  });

  FB.Event.subscribe('auth.authResponseChange', function(response) {
    // Here we specify what we do with the response anytime this event occurs. 
    if (response.status === 'connected') {

      isAppGetPermission = true;
      doAfterLogin();
    } else if (response.status === 'not_authorized') {
      // In this case, the person is logged into Facebook, but not into the app, so we call
      // FB.login() to prompt them to do so. 
      // In real-life usage, you wouldn't want to immediately prompt someone to login 
      // like this, for two reasons:
      // (1) JavaScript created popup windows are blocked by most browsers unless they 
      // result from direct interaction from people using the app (such as a mouse click)
      // (2) it is a bad experience to be continually prompted to login upon page load.
      isAppGetPermission = false;
      FB.login(function(response) {
          if (response.authResponse) {
              // The person logged into your app
          } else {
              // The person cancelled the login dialog
          }

      },{scope:"email"});
    } else {

      FB.login();
    }
  });
  };

  // Load the SDK asynchronously
  (function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "http://connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
  }(document));

  // Here we run a very simple test of the Graph API after login is successful. 
  // This testAPI() function is only called in those cases. 
  





};

function doAfterLogin() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      $("#fbmsg").html(
      	"<img src=http://graph.facebook.com/"+response.id+"/picture>"
      	+"<div class=highlight>"+response.id+"</div>"
      	+"<div class=highlight>"+response.name+"</div>"
      	+"<div class=highlight>"+response.email+"</div>"
      );
      console.log(response);
      console.log(response.id);
      console.log('Good to see you, ' + response.name + '.');

    });
  };

  function FBLogin() {
  	console.log("FBLoginBtn");
  	FB.login(function(response) {
          if (response.authResponse) {
              // The person logged into your app
              doAfterLogin();
          } else {
              // The person cancelled the login dialog
          }

      },{scope:"email"});
  };