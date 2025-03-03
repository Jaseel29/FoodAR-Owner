// Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase Configuration from the Firestore database when we build the web app
// Replace with your API key and Configurations
const firebaseConfig = {
    apiKey: "AIzaSyBOQOTpLHQLpR9_LqZmhrahUpdihNy6OEA",
    authDomain: "menucard-25f3c.firebaseapp.com",
    databaseURL: "https://menucard-25f3c-default-rtdb.firebaseio.com",
    projectId: "menucard-25f3c",
    storageBucket: "menucard-25f3c.firebasestorage.app",
    messagingSenderId: "209194874363",
    appId: "1:209194874363:web:7d178647acfd367bee875e",
    measurementId: "G-GJTL9PZKGP"
};

// Initialize Firebase inorder to access the data from the firestore database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch and Display Customer Reviews from the firestore database
async function fetchReviews() {
    const reviewsContainer = document.getElementById("reviewsContainer");
    reviewsContainer.innerHTML = "<p>Loading reviews...</p>";

    try {
        const querySnapshot = await getDocs(collection(db, "Feedback"));
        reviewsContainer.innerHTML = "";

        if (querySnapshot.empty) {
            reviewsContainer.innerHTML = "<p>No reviews available.</p>";
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();

            const reviewCard = document.createElement("div");
            reviewCard.classList.add("review-card");

            reviewCard.innerHTML = `
                <h3>${data.Name || "Anonymous"}</h3>
                <p class="phone"> 📞${data.PhoneNumber || "N/A"}</p> 
                <p><strong>Review:</strong> ${data.Review || "No review provided."}</p>
            `;

            reviewsContainer.appendChild(reviewCard);
        });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        reviewsContainer.innerHTML = "<p>Error loading reviews.</p>";
    }
}

window.onload = fetchReviews;
document.addEventListener("DOMContentLoaded", () => {
    const refreshBtn = document.getElementById("refreshBtn");
    if (refreshBtn) {
        refreshBtn.addEventListener("click", fetchReviews);
    }
});
