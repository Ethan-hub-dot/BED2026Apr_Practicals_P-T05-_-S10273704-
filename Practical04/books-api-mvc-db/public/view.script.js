// Get references to HTML elements
const bookDetailsDiv = document.getElementById("bookDetails");
const messageDiv = document.getElementById("message");

const apiBaseUrl = "http://localhost:3000";

// Function to get the book ID from the URL
function getBookIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Function to fetch and display a single book
async function fetchBookDetails() {
  const bookId = getBookIdFromUrl();

  // Check if ID exists in URL
  if (!bookId) {
    messageDiv.textContent = "No book ID provided in URL.";
    messageDiv.style.color = "red";
    return;
  }

  try {
    bookDetailsDiv.innerHTML = "Loading book details...";
    messageDiv.textContent = "";

    // Fetch the specific book
    const response = await fetch(`${apiBaseUrl}/books/${bookId}`);

    // Handle HTTP errors
    if (!response.ok) {
      const errorBody = response.headers
        .get("content-type")
        ?.includes("application/json")
        ? await response.json()
        : { message: response.statusText };

      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorBody.message}`
      );
    }

    // Parse JSON response
    const book = await response.json();

    // Display book details
    bookDetailsDiv.innerHTML = `
      <div class="book-item">
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>ID:</strong> ${book.id}</p>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching book details:", error);

    bookDetailsDiv.innerHTML = "";
    messageDiv.textContent = `Failed to load book details: ${error.message}`;
    messageDiv.style.color = "red";
  }
}

// Fetch book details when page loads
window.addEventListener("load", fetchBookDetails);