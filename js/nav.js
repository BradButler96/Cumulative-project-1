"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

$('#submit-btn').on('click', function() {
  $('#new-story').css('display') === 'none' ? $('#new-story').slideDown('slow') : $('#new-story').slideUp('slow');
});

$('#fav-btn').on('click', function() {

  $('#favorited-stories').css('display') === 'none' ? $('#favorited-stories').slideDown('slow') : $('#favorited-stories').slideUp('slow');
})

$('#edit-profile-btn').on('click', function() {
  $('#profile').css('display') === 'none' ? $('#profile').slideDown('slow') : $('#profile').slideUp('slow')
  $('#edit-username').val(`${currentUser.username}`)
  $('#edit-name').val(`${currentUser.name}`);
})