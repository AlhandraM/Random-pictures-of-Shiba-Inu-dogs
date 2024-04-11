async function fetchAndDisplayShibes() {
  try {
    const response = await fetch("https://shibe.online/api/shibes?count=10");
    const data = await response.json();
    data.forEach((imageUrl) => {
      const container = document.createElement("div");
      const imageElement = document.createElement("img");
      imageElement.src = imageUrl;
      container.appendChild(imageElement);
      document.body.appendChild(container);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchAndDisplayShibes();
