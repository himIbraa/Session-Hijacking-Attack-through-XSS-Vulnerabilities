
// Check if user is logged in
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in
    displayPosts();
  } else {
    // No user is signed in, redirect to login
    window.location.href = "login.html";
  }
});

