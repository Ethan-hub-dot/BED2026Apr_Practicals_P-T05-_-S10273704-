// Get references to the elements
const loadingMessageDiv = document.getElementById("loadingMessage");
const messageDiv = document.getElementById("message");

// Elements for displaying book details
const editTitleInput = document.getElementById("editTitle");
const editAuthorInput = document.getElementById("editAuthor");
const heading = document.querySelector("h1");

// Base URL for the API
const apiBaseUrl = "http://localhost:3000";

// Function to get book ID from URL query parameter
function getBookIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Function to fetch existing book data
async function fetchBookData(bookId) {
  try {
    const response = await fetch(`${apiBaseUrl}/books/${bookId}`);

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

    const book = await response.json();
    return book;

  } catch (error) {
    console.error("Error fetching book data:", error);

    messageDiv.textContent = `Failed to load book data: ${error.message}`;
    messageDiv.style.color = "red";

    loadingMessageDiv.textContent = "";

    return null;
  }
}

// Function to display book details
function populateBookDetails(book) {
  // Append ID to heading
  heading.textContent = `Details of Book ${book.id}`;

  // Make fields read-only
  editTitleInput.value = book.title;
  editTitleInput.readOnly = true;

  editAuthorInput.value = book.author;
  editAuthorInput.readOnly = true;

  loadingMessageDiv.style.display = "none";
  document.getElementById("editBookForm").style.display = "block";
}

// --- Run on page load ---

const bookId = getBookIdFromUrl();

if (bookId) {
  fetchBookData(bookId).then((book) => {
    if (book) {
      populateBookDetails(book);
    } else {
      loadingMessageDiv.textContent = "Book not found or failed to load.";

      messageDiv.textContent = "Could not find the book.";
      messageDiv.style.color = "red";
    }
  });
} else {
  loadingMessageDiv.textContent = "No book ID specified.";

  messageDiv.textContent =
    "Please provide a book ID in the URL (e.g., details.html?id=1).";

  messageDiv.style.color = "orange";
}