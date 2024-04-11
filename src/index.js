fetch("https://shibe.online/api/shibes?count=10")
  .then((response) => response.json())
  .then((data) => {
    // Assuming the response is in JSON format and contains an array of images
    console.log(data); // Logging the data to the console
    // You can do further processing with the fetched data here
  })
  .catch((error) => console.error("Error fetching data:", error)); // Handling errors
