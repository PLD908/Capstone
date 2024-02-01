fetch("https://dummyjson.com/users")
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("NETWORK RESPONSE ERROR");
        }
    })
    .then((data) => {
        console.log(data);
        generateRegistrationForm(data.users);
    })
    .catch((error) => console.error("FETCH ERROR:", error));

const spinner = document.querySelector(".loader");
    spinner.style.display = "none";


function generateRegistrationForm(data) {
    const formContainer = document.getElementById("form-container");
    let randomNumber = Math.floor(Math.random() * data.length);
    const user = data[randomNumber];

    const form = document.createElement('form');
        form.innerHTML = `
            <label for="email">Email</label><br>
                    <div class="change">
                        <input type="email" class="email" value="${user.email}">
                    </div>
                    <div class="input-box">
                        <div class="box">
                            <label for="text">First name</label><br>
                            <div class="change">
                                <input type="text" class="inputs" value="${user.firstName}">
                            </div>
                        </div>
                        <div class="box1">
                            <label for="text">Last name</label><br>
                            <div class="change">
                                <input type="text" class="inputs" value="${user.lastName}">
                            </div>
                        </div>
                    </div>
                    <div class="input-box">
                        <div class="box">
                            <label for="text" class="number">HMO Number</label>
                            <input type="tel" class="inputs" value=${user.phone.replace(/\s/g, '')}>
                        </div>
                        <div class="box1">
                            <label for="text">Date <span class="admitted">Admitted</span></label>
                            <input type="date" class="inputs" value=${user.birthDate}>
                        </div>
                    </div>
                    <label for="text">Location</label><br>
                    <div class="locations">
                        <img src="images/location.png" class="location" alt="location">
                        <input type="text" class="input" value="${user.address.address}">
                    </div>
                    <div class="btn">
                    <button type="button" onclick="fetchAndGenerateUser()">Generate User</button>
                    <a href="index.html"><button type="button">+ Register Patients</button></a>
                    </div>
                `;

        formContainer.innerHTML = '';
        formContainer.appendChild(form);
};

function fetchAndGenerateUser() {
    spinner.style.display = "block";

    setTimeout(() => {
        fetch("https://dummyjson.com/users")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("NETWORK RESPONSE ERROR");
                }
            })
            .then((data) => {
                generateRegistrationForm(data.users);
                spinner.style.display = "none";
            })
            .catch((error) => console.error("FETCH ERROR:", error));
    }, 1000)
};

fetchAndGenerateUser();