// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC9Vd3UhLwmEVxYLIgGrI4YrOVyeVmAOys",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "catchananimal",
    storageBucket: "nam5 (us-central)",
    messagingSenderId: "800777167785",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

const animals = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Fish'];
let currentUser;

function toggleAuth() {
    const authContainer = document.getElementById('auth');
    const catchBtn = document.getElementById('catch-btn');
    authContainer.style.display = authContainer.style.display === 'none' ? 'block' : 'none';
    catchBtn.style.display = catchBtn.style.display === 'none' ? 'block' : 'none';
}

function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            currentUser = userCredential.user;
            toggleAuth();
        })
        .catch((error) => {
            alert(error.message);
        });
}

function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            currentUser = userCredential.user;
            toggleAuth();
        })
        .catch((error) => {
            alert(error.message);
        });
}

function catchAnimal() {
    const randomIndex = Math.floor(Math.random() * animals.length);
    const caughtAnimal = animals[randomIndex];

    // Save the caught animal to the user's data (Firestore)
    if (currentUser) {
        const db = firebase.firestore();
        db.collection('users').doc(currentUser.uid).update({
            caughtAnimal: caughtAnimal
        });
    }

    document.getElementById("result").innerHTML = `You caught a ${caughtAnimal}!`;
}
