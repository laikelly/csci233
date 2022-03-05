/*Melinda Chen Login/SignUp Page js for Foodie CSCI 233 */ 

/* Invalid Username/Password Error Message */
function setFormMessage(formElement, type, message) { 
    /* error messages */
    const messageElement = formElement.querySelector(".form-message-error");

    /* resetting the styles(colors) of error message  and the message itself */
    messageElement.textContent = message;
    messageElement.classList.remove(".form-message-error", "form-input-error-message");
    messageElement.classList.add(`form-message-error--${type}`);
}

/* Error messages for individual input boxes border toggle */
function setInputError(inputElement, message) {
    inputElement.classList.add("form-input-error");
    inputElement.parentElement.querySelector(".form-input-error-message").textContent = message;

}

function clearInputError(inputElement) {
    inputElement.classList.remove("form-input-error");
    inputElement.parentElement.querySelector(".form-input-error-message").textContent = "";
}

/* toggling between login and signup page */
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const signupForm = document.querySelector("#signup");
    const forgotpwForm = document.querySelector("#forgotpw");

    /* when "Create An Account" signuplink is clicked, login form is hidden to show sign up form */
    document.querySelector("#signuplink").addEventListener("click", e => {
        e.preventDefault(); /*so it doesnt redirect to href link */
        loginForm.classList.add("form-hidden");
        signupForm.classList.remove("form-hidden");
        forgotpwForm.classList.add("form-hidden");
    });

    /* when the loginlink is clicked, login form is toggled on */
    document.querySelector("#loginlink").addEventListener("click", e => {
        e.preventDefault(); 
        loginForm.classList.remove("form-hidden");
        signupForm.classList.add("form-hidden");
        forgotpwForm.classList.add("form-hidden");
    });

    /*when forgot password is clicked, forgot pw page toggled on */
    document.querySelector("#forgotpwlink").addEventListener("click", e => { 
        e.preventDefault(); 
        loginForm.classList.add("form-hidden");
        signupForm.classList.add("form-hidden");
        forgotpwForm.classList.remove("form-hidden");
    });

    /* back to login page from forgot pw page */
    document.querySelector("#backloginlink").addEventListener("click", e => { 
        e.preventDefault(); 
        loginForm.classList.remove("form-hidden");
        signupForm.classList.add("form-hidden");
        forgotpwForm.classList.add("form-hidden");
    });



    Form.addEventListener("submit", e => {
        e.preventDefault();

        /* run thru database  */

        /* incorrect un/pw text shows up */
        setFormMessage(loginForm, "error", "Invalid username or password");
    });

    /* requirements for when they click out if the input field */
    document.querySelectorAll(".form-input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        })
    });
});