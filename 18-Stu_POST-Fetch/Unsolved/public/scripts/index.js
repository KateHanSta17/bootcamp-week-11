const userNameInput = document.getElementById('username');
const productInput = document.getElementById('product');
const reviewInput = document.getElementById('review');
const reviewForm = document.getElementById('review-form');

// TODO: Add a comment explaining the functionality of this helper function
// The postReview function makes a POST request to the /api/reviews endpoint with the review object as the request body.
// The review object contains the username, product, and review text that the user entered in the form.
// The function returns a Promise that resolves with the response data if the request is successful.
// If the request fails, the function logs an error message to the console.
const postReview = (review) =>
  // TODO: Add a comment explaining what sort of data we need to provide when invoking the fetch function for a POST request
// The fetch function for a POST request requires an object with the following properties:
// - method: The HTTP method for the request (in this case, 'POST').
// - headers: An object containing the request headers. We set the 'Content-Type' header to 'application/json' to indicate that the request body contains JSON data.
// - body: The request body, which is a JSON string representing the review object.
// We use JSON.stringify(review) to convert the review object to a JSON string before sending it in the request body.
// This is necessary because the fetch function expects the request body to be a string.
  fetch('/api/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // TODO: Add a comment describing why one would need to convert the JSON object to a string in this instance
    // The fetch function expects the request body to be a string. To send JSON data in the request body, we need to convert the JSON object to a string.
    // We use JSON.stringify(review) to convert the review object to a JSON string before sending it in the request body.
    // This ensures that the request body contains the review data in the correct format.
    body: JSON.stringify(review),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Successful POST request:', data);
      return data;
    })
    // TODO: Add a comment describing the functionality of the catch statement
    // The catch statement is used to handle errors that occur during the fetch request.
    // If the request fails, the catch block will log an error message to the console.
    // This helps us identify and troubleshoot any issues that occur during the POST request.
    .catch((error) => {
      console.error('Error in POST request:', error);
    });

// Listen for when the form is submitted
reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Create a new review object from the input values
  const newReview = {
    username: userNameInput.value.trim(),
    product: productInput.value.trim(),
    review: reviewInput.value.trim(),
  };

  // Call our `postReview` method to make a POST request with our `newReview` object.
  postReview(newReview)
    .then((data) => alert(`Review added! Review ID: ${data.body.review_id}`))
    .catch((err) => console.error(err));
});
