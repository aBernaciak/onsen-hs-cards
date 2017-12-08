import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  apiKey: "AIzaSyDCW4ijKA0lo6rJDKIKJc8YhlwuIZrWfpQ",
	authDomain: "hs-card-checker.firebaseapp.com",
	databaseURL: "https://hs-card-checker.firebaseio.com",
	projectId: "hs-card-checker",
	storageBucket: "hs-card-checker.appspot.com",
	messagingSenderId: "538952206084"
});

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database();