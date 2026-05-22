// Get references to the elements
const editStudentForm = document.getElementById("editStudentForm");
const loadingMessageDiv = document.getElementById("loadingMessage");
const messageDiv = document.getElementById("message");

const studentIdInput = document.getElementById("studentId");
const editNameInput = document.getElementById("editName");
const editAddressInput = document.getElementById("editAddress");

const studentTitle = document.getElementById("studentTitle");

// Base URL for the API
const apiBaseUrl = "http://localhost:3000";

// Function to get student ID from URL
function getStudentIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Function to fetch student data
async function fetchStudentData(studentId) {
  try {
    const response = await fetch(
      `${apiBaseUrl}/students/${studentId}`
    );

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

    const student = await response.json();
    return student;

  } catch (error) {
    console.error("Error fetching student data:", error);

    messageDiv.textContent =
      `Failed to load student data: ${error.message}`;

    messageDiv.style.color = "red";

    loadingMessageDiv.textContent = "";

    return null;
  }
}

// Populate form fields
function populateForm(student) {

  // Append student ID to heading
  studentTitle.textContent =
    `Details of Student ${student.id}`;

  studentIdInput.value = student.id;

  editNameInput.value = student.name;

  editAddressInput.value = student.address;

  loadingMessageDiv.style.display = "none";

  editStudentForm.style.display = "block";
}

// Run when page loads
const studentIdToView = getStudentIdFromUrl();

if (studentIdToView) {

  fetchStudentData(studentIdToView).then((student) => {

    if (student) {

      populateForm(student);

    } else {

      loadingMessageDiv.textContent =
        "Student not found or failed to load.";

      messageDiv.textContent =
        "Could not find the student.";

      messageDiv.style.color = "red";
    }
  });

} else {

  loadingMessageDiv.textContent =
    "No student ID specified.";

  messageDiv.textContent =
    "Please provide a student ID in the URL (e.g., view.html?id=1).";

  messageDiv.style.color = "orange";
}