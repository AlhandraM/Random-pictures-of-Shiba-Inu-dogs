// Wait for the DOM content to load before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch shibes data from a JSON file
  async function fetchShibesFromJSON() {
    try {
      const response = await fetch("db.json"); // Fetch JSON data
      const data = await response.json(); // Parse JSON data
      // Display fetched shibes data
      displayShibes(data.shibes); // Call display function with fetched data
    } catch (error) {
      console.error("Error fetching data:", error); // Log error if fetch fails
    }
  }

  // Call the function to fetch shibes data
  fetchShibesFromJSON();

  // Function to display shibes
  function displayShibes(data) {
    const container = document.getElementById("imageContainer"); // Get the container element
    // Loop through each shibe data
    data.forEach((shibe) => {
      // Create image element for the shibe
      const imageElement = createImageElement(shibe.url);
      // Create like button for the shibe
      const likeButton = createLikeButton();
      // Create element to display likes count
      const likesCount = createLikesCountElement();
      // Create input element for comments
      const commentInput = createCommentInputElement();
      // Create button element for commenting
      const commentButton = createCommentButtonElement();

      // Append elements to the container
      appendElements(container, [
        imageElement,
        likeButton,
        likesCount,
        commentInput,
        commentButton,
      ]);

      // Update likes count and button state
      updateLikesCount(likesCount, shibe.likes);
      if (shibe.likes > 0) {
        likeButton.classList.add("active");
      }

      let liked = false;
      let likes = shibe.likes;
      // Event listener for like button click
      likeButton.addEventListener("click", () => {
        if (!liked) {
          // Increment likes count and update display
          likes++;
          updateLikesCount(likesCount, likes);
          toggleLikeButton(likeButton);
          console.log("Liked! Total likes:", likes);
        } else {
          // Toggle like button state
          toggleLikeButton(likeButton);
          console.log("Unliked! Total likes:", likes);
        }
        liked = !liked; // Toggle liked state
      });

      // Event listener for comment button click
      commentButton.addEventListener(
        "click",
        () => console.log("Commented:", commentInput.value) // Log the comment
      );
    });
  }

  // Function to create an image element
  function createImageElement(imageUrl) {
    const imageElement = document.createElement("img");
    imageElement.src = imageUrl; // Set image source
    return imageElement;
  }

  // Function to create a like button element
  function createLikeButton() {
    const likeButton = document.createElement("button");
    likeButton.classList.add("like-button"); // Add class for styling
    likeButton.innerHTML = '<i class="fas fa-heart"></i>'; // Add heart icon
    return likeButton;
  }

  // Function to create an element for displaying likes count
  function createLikesCountElement() {
    const likesCount = document.createElement("span");
    likesCount.classList.add("likes-count"); // Add class for styling
    likesCount.textContent = "0 likes"; // Initialize likes count
    return likesCount;
  }

  // Function to create an input element for comments
  function createCommentInputElement() {
    const commentInput = document.createElement("input");
    commentInput.placeholder = "Add a comment"; // Set placeholder text
    return commentInput;
  }

  // Function to create a button element for commenting
  function createCommentButtonElement() {
    const commentButton = document.createElement("button");
    commentButton.textContent = "Comment"; // Set button text
    return commentButton;
  }

  // Function to append multiple elements to a container
  function appendElements(container, elements) {
    elements.forEach((element) => container.appendChild(element)); // Append each element to the container
  }

  // Function to update the likes count display
  function updateLikesCount(likesCountElement, likes) {
    likesCountElement.textContent = `${likes} like${likes !== 1 ? "s" : ""}`; // Update likes count text
  }

  // Function to toggle the state of the like button
  function toggleLikeButton(likeButton) {
    likeButton.classList.toggle("active"); // Toggle 'active' class for button styling
  }
});
