'use strict';

class Contact {
    #name;
    #city;
    #email;

    constructor(name, city, email) {
        this.#name = name;
        this.#city = city;
        this.#email = email;
    }

    get name() {
        return this.#name;
    }

    get city() {
        return this.#city;
    }

    get email() {
        return this.#email;
    }
}

const contactsArray = [];

function validateInput(name, city, email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameCityRegex = /^[a-zA-Z\s]+$/;

    if (!name || !city || !email) {
        return "All fields are required.";
    } else if (!nameCityRegex.test(name)) {
        return "Name should contain only letters and spaces.";
    } else if (!nameCityRegex.test(city)) {
        return "City should contain only letters and spaces.";
    } else if (!emailRegex.test(email)) {
        return "Please enter a valid email address.";
    }
    return "";
}

function addContact() {
    const name = document.getElementById("contactNameInput").value;
    const city = document.getElementById("contactCityInput").value;
    const email = document.getElementById("contactEmailInput").value;

    const errorMessage = validateInput(name, city, email);
    const errorElement = document.getElementById("error-message");

    if (errorMessage) {
        errorElement.textContent = errorMessage;
        return;
    }

    errorElement.textContent = "";

    const newContact = new Contact(name, city, email);
    contactsArray.unshift(newContact);

    document.getElementById("contactNameInput").value = "";
    document.getElementById("contactCityInput").value = "";
    document.getElementById("contactEmailInput").value = "";

    listContacts();
}

function listContacts() {
    const contactsListElement = document.getElementById("contactsList");
    contactsListElement.innerHTML = "";

    contactsArray.forEach((contact, index) => {
        const contactDiv = document.createElement("div");
        contactDiv.classList.add("contact-card");

        const nameParagraph = document.createElement("p");
        nameParagraph.textContent = `Name: ${contact.name}`;

        const cityParagraph = document.createElement("p");
        cityParagraph.textContent = `City: ${contact.city}`;

        const emailParagraph = document.createElement("p");
        emailParagraph.textContent = `Email: ${contact.email}`;

        contactDiv.appendChild(nameParagraph);
        contactDiv.appendChild(cityParagraph);
        contactDiv.appendChild(emailParagraph);

        contactDiv.onclick = () => deleteContact(index);

        contactsListElement.appendChild(contactDiv);
    });

    document.querySelector(".count").textContent = `Total contacts: ${contactsArray.length}`;
}

function deleteContact(index) {
    contactsArray.splice(index, 1);
    listContacts();
}