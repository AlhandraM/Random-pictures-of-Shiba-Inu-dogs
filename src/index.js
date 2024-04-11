// Wait for the DOM content to load before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {
  async function fetchShibesFromJSON() {
    try {
      const response = await fetch("db.json");
      const data = await response.json();
      displayShibes(data.shibes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  fetchShibesFromJSON();

  function displayShibes(data) {
    const container = document.getElementById("imageContainer"); // Get the container
    data.forEach((shibe) => {
      const imageElement = createImageElement(shibe.url);
      const likeButton = createLikeButton();
      const likesCount = createLikesCountElement();
      const commentInput = createCommentInputElement();
      const commentButton = createCommentButtonElement();

      appendElements(container, [
        imageElement,
        likeButton,
        likesCount,
        commentInput,
        commentButton,
      ]);

      updateLikesCount(likesCount, shibe.likes);
      if (shibe.likes > 0) {
        likeButton.classList.add("active");
      }

      let liked = false;
      let likes = shibe.likes;
      likeButton.addEventListener("click", () => {
        if (!liked) {
          likes++;
          updateLikesCount(likesCount, likes);
          toggleLikeButton(likeButton);
          console.log("Liked! Total likes:", likes);
        } else {
          toggleLikeButton(likeButton);
          console.log("Unliked! Total likes:", likes);
        }
        liked = !liked;
      });

      commentButton.addEventListener("click", () =>
        console.log("Commented:", commentInput.value)
      );
    });
  }

  function createImageElement(imageUrl) {
    const imageElement = document.createElement("img");
    imageElement.src = imageUrl;
    return imageElement;
  }

  function createLikeButton() {
    const likeButton = document.createElement("button");
    likeButton.classList.add("like-button");
    likeButton.innerHTML = '<i class="fas fa-heart"></i>';
    return likeButton;
  }

  function createLikesCountElement() {
    const likesCount = document.createElement("span");
    likesCount.classList.add("likes-count");
    likesCount.textContent = "0 likes";
    return likesCount;
  }

  function createCommentInputElement() {
    const commentInput = document.createElement("input");
    commentInput.placeholder = "Add a comment";
    return commentInput;
  }

  function createCommentButtonElement() {
    const commentButton = document.createElement("button");
    commentButton.textContent = "Comment";
    return commentButton;
  }

  function appendElements(container, elements) {
    elements.forEach((element) => container.appendChild(element));
  }

  function updateLikesCount(likesCountElement, likes) {
    likesCountElement.textContent = `${likes} like${likes !== 1 ? "s" : ""}`;
  }

  function toggleLikeButton(likeButton) {
    likeButton.classList.toggle("active");
  }
});
