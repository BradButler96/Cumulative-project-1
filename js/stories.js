"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const stories = new StoryList();
  const newStory = new Story(story);
  const hostName = newStory.getHostName();

  if (currentUser.username == story.username) {
    return $(`
      <li id="${story.storyId}">
        <div id="${story.storyId}-container" class="row">

          <div id="${story.storyId}-story-info-div" class="col-6">
            <a href="${story.url}" target="a_blank" class="story-link">
               ${story.title}
            </a>
            <small class="story-hostname">(${hostName})</small>
            <small class="story-author">by ${story.author}</small>
            <small class="story-user">posted by ${story.username}</small>
          </div>

          <div id="${story.storyId}-edit-div" class="col-6 d-none d-xl-flex d-lg-flex d-md-flex d-sm-flex justify-content-end">
            <button id="${story.storyId}-edit" onclick="currentUser.editStory('${story.storyId}')" style="border: none;">Edit</button>

            <button id="${story.storyId}-delete" style="margin-right: 1rem; border: none;" onclick="deleteStory('${story.storyId}')">Delete</button>

            <input type="checkbox" name="favorite-mark" value="" class="fav-check" id="${story.storyId}-fav" onclick="currentUser.updateFavs('${story.storyId}')">
          </div>        

          <div id="${story.storyId}-edit-btn-div" class="col-5 col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 d-flex justify-content-end" style="padding-right: 0;">

            <div id="${story.storyId}-edit-btn-group" class="dropleft btn-group d-xl-none d-lg-none d-md-none d-sm-none d-sm-none">
              <button class="btn btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="border: none;">
              <i class="fa-solid fa-bars"></i>
              </button>
              <div class="dropdown-menu">
                <button id="${story.storyId}-edit" class="w-100" onclick="currentUser.editStory('${story.storyId}')">Edit</button>

                <button id="${story.storyId}-delete" class="w-100" style="margin-right: 1rem;" onclick="deleteStory('${story.storyId}')">Delete</button>
              </div>
            </div>
          </div>

          <div id="${story.storyId}-edit-div" class="col-1 col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 d-flex d-xs-none d-sm-none justify-content-end" style="padding-left: 0;">
            <input type="checkbox" name="favorite-mark" value="" class="fav-check" id="${story.storyId}-fav" onclick="currentUser.updateFavs('${story.storyId}')">
        </div>

        </div>

        <form id="${story.storyId}-editor" style="display:none;">

          <div id="${story.storyId}-edit-author-container" class="row">
            <div id="${story.storyId}-edit-author-label-div" class="form-group col d-flex justify-content-center justify-content-xl-end justify-content-lg-end justify-content-md-end justify-content-sm-end">
              <label for="colFormLabel">Author: </label>
            </div>

            <div id="${story.storyId}-edit-author-input-div" class="form-group col-12 col-sm col-md col-lg col-xl text-center">
              <input type="text" id="edit-${story.storyId}-author-input" class="form-control-sm">
            </div>

            <div class="col"></div>
          </div>

          <div id="${story.storyId}-edit-title-container" class="row">
            <div id="${story.storyId}-edit-title-label-div" class="form-group col d-flex justify-content-center justify-content-xl-end justify-content-lg-end justify-content-md-end justify-content-sm-end">
              <label for="colFormLabel">Title: </label>
            </div>

            <div id="${story.storyId}-edit-title-input-div" class="form-group col-12 col-sm col-md col-lg col-xl text-center">
              <input type="text" id="edit-${story.storyId}-title-input" class="form-control-sm">
            </div>

            <div class="col"></div>
          </div>

          <div id="${story.storyId}-edit-url-container" class="row">
            <div id="${story.storyId}-edit-url-label-div" class="form-group col d-flex justify-content-center justify-content-xl-end justify-content-lg-end justify-content-md-end justify-content-sm-end">
              <label for="colFormLabel">URL: </label>
            </div>

            <div id="${story.storyId}-edit-url-input-div" class="form-group col-12 col-sm col-md col-lg col-xl text-center">
              <input type="text" id="edit-${story.storyId}-url-input" class="form-control-sm">
            </div>

            <div class="col"></div>
          </div>

          <div id="${story.storyId}-submit-edit-btn-container" class="row">

            <div class="col"></div>

            <div id="${story.storyId}-submit-edit-btn-div" class="form-group col d-flex justify-content-center">
              <button id="edit-${story.storyId}-submit-btn" type="button" style="white-space: nowrap;" onclick="currentUser.submitEdit('${story.storyId}')">Submit Edits</button>
            </div>

            <div class="col"></div>

          </div>
        </form>
      </li>
    `);
  } else {
    return $(`
    <li id="${story.storyId}">
      <div id="${story.storyId}-container" class="row">
        <div id="${story.storyId}-story-info-div" class="col-10">
          <a href="${story.url}" target="a_blank" class="story-link">
             ${story.title}
          </a>
          <small class="story-hostname">(${hostName})</small>
          <small class="story-author">by ${story.author}</small>
          <small class="story-user">posted by ${story.username}</small>
        </div>

        <div id="${story.storyId}-edit-btn-div" class="col-2 d-flex justify-content-end">
          <input type="checkbox" name="favorite-mark" value="" class="fav-check" id="${story.storyId}-fav" onclick="currentUser.updateFavs('${story.storyId}')">
        </div>
      </div>
    </li>
  `);
  }
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}




