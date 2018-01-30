(function iife() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCFUzT7hB4VPVj8PG-rn72kEw557BTbJ7w",
        authDomain: "simple-authentication-ff002.firebaseapp.com",
        databaseURL: "https://simple-authentication-ff002.firebaseio.com",
        projectId: "simple-authentication-ff002",
        storageBucket: "simple-authentication-ff002.appspot.com",
        messagingSenderId: "33857907100"
    };

    firebase.initializeApp(config);

    // Get Elements
    const txtEmail= document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogIn = document.getElementById('btnLogIn');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogOut = document.getElementById('btnLogOut');

    const userTitleElem = document.getElementById('username');

    // Add events
    btnSignUp.addEventListener('click', e => {
        // Need to validate email
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    // Add realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            btnLogOut.classList.remove('hide');
            btnSignUp.classList.add('hide');
            userTitleElem.textContent = firebaseUser.email;
        } else {
            console.log('Not Logged in!');
            btnLogOut.classList.add('hide');
            btnSignUp.classList.remove('hide');
            userTitleElem.textContent = 'no logged in user';
        }

    });

    btnLogIn.addEventListener('click', e => {
        // Need to validate email
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    btnLogOut.addEventListener('click', e => {
        firebase.auth().signOut();
    });
})();
