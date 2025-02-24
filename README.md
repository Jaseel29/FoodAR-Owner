### **Setup Firestore in WebStorm for a Web App**  

Follow these steps to connect Firestore with WebStorm:  

---

### **1. Install WebStorm**  
- Download and install **WebStorm** from [JetBrains](https://www.jetbrains.com/webstorm/download/).  
- Open WebStorm and create a new **Empty Project**.  

---

### **2. Initialize Firebase in WebStorm**  
1. Open the **Terminal** in WebStorm.  
2. Run the following command to initialize a package.json file:  
   ```sh
   npm init -y
   ```  
3. Install Firebase SDK using npm:  
   ```sh
   npm install firebase  
   ```

---

### **3. Configure Firestore in WebStorm**  
1. **Create a Firebase Project**  
   - Go to [Firebase Console](https://console.firebase.google.com/).  
   - Click **Create a Project** → Follow the steps → Enable Firestore.  

2. **Add Firestore to Web App**  
   - In Firebase Console, go to **Project Settings**.  
   - Scroll to **Your Apps** → Click **Add App** → Select **Web**.  
   - Register your app and click **Next**.  
   - Copy the Firebase configuration.  

3. **Create Firebase Config File in WebStorm**  
   - Inside WebStorm, create a file `firebase-config.js`.  
   - Paste the following code and replace **your Firebase config**:  

   ```javascript
   import { initializeApp } from "firebase/app";
   import { getFirestore } from "firebase/firestore";

   // Your Firebase configuration (from Firebase Console)
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
   };

   // Initialize Firebase
   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);

   export { db };
   ```

---

### **4. Allow Firestore Access (Security Rules - for Development)**  
1. In **Firestore Database** → **Rules** tab → Click **Edit Rules**.  
2. Set rules to allow read/write for testing:  
   ```javascript
   rules_version = '2';
   service cloud.firestore {
       match /databases/{database}/documents {
           match /{document=**} {
               allow read, write: if true;
           }
       }
   }
   ```
3. Click **Publish**.  

---
| Desktop| Mobile |
|--|--|
|![Screenshot 2025-02-25 005621](https://github.com/user-attachments/assets/8aa32358-b4bd-4bc7-8f00-c2b3f60e0146)|![WhatsApp Image 2025-02-25 at 00 57 44_e127a6af](https://github.com/user-attachments/assets/912d2062-6782-4290-bc1e-99ebcc801d7f)|


