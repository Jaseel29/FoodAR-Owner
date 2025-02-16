// Import Firebase Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase Configuration (Replace with your credentials)
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch and Display Customer Reviews
async function fetchReviews() {
    const reviewsContainer = document.getElementById("reviewsContainer");
    reviewsContainer.innerHTML = "<p>Loading reviews...</p>"; // Show loading message

    try {
        const querySnapshot = await getDocs(collection(db, "Feedback"));
        reviewsContainer.innerHTML = ""; // Clear loading message

        if (querySnapshot.empty) {
            reviewsContainer.innerHTML = "<p>No reviews available.</p>";
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();

            // Create Review Card
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

// Load reviews when the page loads
window.onload = fetchReviews;
