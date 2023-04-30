import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import LoginPage from "./pages/loginPage";



// Import the Firebase testing library
import { getFirestore, clearFirestoreData } from 'firebase-functions-test';

describe('Firebase Authentication', () => {
    // Initialize Firebase app for testing
    const app = firebase.initializeApp({
        apiKey: "AIzaSyCenUwPI7d35xGIbVtp0LNb9Ia70STYCA4",
        authDomain: "wits-overflow-cbe02.firebaseapp.com",
        projectId: "wits-overflow-cbe02",
    });

    // Use the Firebase authentication API
    const auth = app.auth();

    // Use Jest's beforeEach function to clear any existing user data
    beforeEach(async() => {
        await auth.signOut();
    });

    it('allows a user to sign up', async() => {
        const email = 'ruben@wits.ac.za';
        const password = 'AaAa1!1!';
        // Use Firebase authentication API to create a new user
        await auth.createUserWithEmailAndPassword(email, password);

        // Verify that the user was created and is signed in
        expect(auth.currentUser).not.toBeNull();
        expect(auth.currentUser.email).toEqual(email);
    });

    it('allows a user to sign in', async() => {
        const email = 'ruben@wits.ac.za';
        const password = 'AaAa1!1!';

        // Use Firebase authentication API to create a new user
        await auth.createUserWithEmailAndPassword(email, password);

        // Use Firebase authentication API to sign in the user
        await auth.signInWithEmailAndPassword(email, password);

        // Verify that the user is signed in
        expect(auth.currentUser).not.toBeNull();
        expect(auth.currentUser.email).toEqual(email);
    });
});

describe('Firestore Database', () => {
    // Initialize Firebase app for testing
    const app = firebase.initializeApp({
        apiKey: "AIzaSyCenUwPI7d35xGIbVtp0LNb9Ia70STYCA4",
        authDomain: "wits-overflow-cbe02.firebaseapp.com",
        projectId: "wits-overflow-cbe02",

    });

    // Use the Firebase Firestore API
    const db = app.firestore();

    // Use the Firebase testing library to create a mock Firestore database
    const test = getFirestore(app);

    // Use Jest's beforeEach function to clear any existing data in the mock database
    beforeEach(async() => {
        await clearFirestoreData({ projectId: 'test' });
    });

    it('can read and write to the database', async() => {
        const docRef = db.collection('users').doc('testdoc');
        const data = {
            foo: 'bar',
            baz: 123,
        };

        // Use Firebase Firestore API to write data to the database
        await docRef.set(data);

        // Use Firebase Firestore API to read data from the database
        const docSnapshot = await docRef.get();
        const retrievedData = docSnapshot.data();

        // Verify that the data was written and retrieved correctly
        expect(retrievedData).toEqual(data);
    });
});