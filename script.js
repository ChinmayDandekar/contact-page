
// mobile modal

const openModalBtn = document.getElementById("enquiry-btn");
const modalOverlay = document.getElementById("modalOverlay");

openModalBtn.addEventListener("click", () => {
  modalOverlay.classList.add("active");

  setTimeout(() => {
    // Clear existing dropdowns if necessary
    const dropdownContainer = document.getElementById("dropdownContainerModal");
    dropdownContainer.innerHTML = "";

    // Rebuild dropdown inside the modal
    const subOptionsData = {
      Projects: ["Project 1", "Project 2", "Project 3"],
      Media: ["Media 1", "Media 2", "Media 3"],
      Career: ["Career 1", "Career 2", "Career 3"],
    };

    const secondContainer = document.createElement("div");
    dropdownContainer.appendChild(secondContainer);

    createDropdown({
      container: dropdownContainer,
      placeholder: "Query Type",
      options: Object.keys(subOptionsData),
      onSelect: (selectedCategory) => {
        const existingSecond = document.getElementById(
          "secondDropdownContainerModal"
        );
        if (existingSecond) existingSecond.remove();

        const secondContainer = document.createElement("div");
        secondContainer.id = "secondDropdownContainerModal";
        dropdownContainer.insertAdjacentElement("afterend", secondContainer);

        createDropdown({
          container: secondContainer,
          placeholder: `Select ${selectedCategory} option`,
          options: subOptionsData[selectedCategory],
        });
      },
    });
  }, 0); // small delay to ensure modal is rendered
});

// Optional: Close modal when clicking outside the form
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("active");
  }
});

const navbar = document.getElementById("nav-bar");

// Mobile nav toggle
document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("mobileNav").classList.toggle("open");

  navbar.style.background =
    navbar.style.background === "white" ? "transparent" : "white";
});

// Close mobile nav if screen width exceeds 900px
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    mobileNav.classList.remove("open");
    // Optional: reset navbar background if needed
    navbar.style.background = "transparent";
  }
});

window.addEventListener("scroll", () => {
  if (document.getElementById("mobileNav").classList.contains("open"))
    return (navbar.style.backgroundColor = "white");
  if (window.scrollY > 0) {
    navbar.style.backgroundColor = "white";
  } else {
    navbar.style.backgroundColor = "transparent";
  }
});

// Form Submit
function getFormDataAndSubmit() {
  // Clear previous errors
  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.textContent = ""));

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();

  const dropdowns = document.querySelectorAll(
    ".custom-dropdown .dropdown-selected"
  );
  const queryType = dropdowns[0]?.textContent?.trim();
  const subOption = dropdowns[1]?.textContent?.trim();

  let isValid = true;

  // Validate Name
  if (!name) {
    document.getElementById("error-name").textContent = "Name is required.";
    isValid = false;
  }

  // Validate Email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById("error-email").textContent =
      "Valid email is required.";
    isValid = false;
  }

  // Validate Mobile
  if (!mobile || !/^\d{10,15}$/.test(mobile)) {
    document.getElementById("error-mobile").textContent =
      "Valid mobile number is required.";
    isValid = false;
  }

  // Validate Dropdowns

  if (!subOption || subOption.startsWith("Select")) {
    document.getElementById("error-queryType").textContent =
      "Please select a sub-option.";
    isValid = false;
  }

  if (!queryType || queryType === "Query Type") {
    document.getElementById("error-queryType").textContent =
      "Please select a query type.";
    isValid = false;
  }
  if (!isValid) return;

  const formData = {
    name,
    email,
    mobile,
    queryType,
    subOption,
  };

  // Dummy POST
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Success:", data);
      alert("Form submitted successfully!");
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("There was an error submitting the form.");
    });
}
// Attach event listener to button
document
  .querySelector(".primary-button")
  .addEventListener("click", getFormDataAndSubmit);



// Submit for mobile modal
function handleModalSubmit() {
  console.log("insised model submit");
  // Clear previous errors
  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.textContent = ""));

  const name = document.getElementById("name-modal").value.trim();
  const email = document.getElementById("email-modal").value.trim();
  const mobile = document.getElementById("mobile-modal").value.trim();

  const modal = document.getElementById("modalOverlay");
  const dropdowns = modal.querySelectorAll(
    ".custom-dropdown .dropdown-selected"
  );
  const queryType = dropdowns[0]?.textContent?.trim();
  const subOption = dropdowns[1]?.textContent?.trim();

  let isValid = true;

  if (!name) {
    document.getElementById("error-name-modal").textContent =
      "Name is required.";
    isValid = false;
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById("error-email-modal").textContent =
      "Valid email is required.";
    isValid = false;
  }

  if (!mobile || !/^\d{10,15}$/.test(mobile)) {
    document.getElementById("error-mobile-modal").textContent =
      "Valid mobile number is required.";
    isValid = false;
  }

  if (!queryType || queryType === "Query Type") {
    document.getElementById("error-queryType-modal").textContent =
      "Please select a query type.";
    isValid = false;
  }

  if (!subOption || subOption.startsWith("Select")) {
    document.getElementById("error-queryType-modal").textContent =
      "Please select a sub-option.";
    isValid = false;
  }

  if (!isValid) return;

  const formData = {
    name,
    email,
    mobile,
    queryType,
    subOption,
  };

  // Dummy POST
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Success:", data);
      alert("Form submitted successfully!");
      closeModal(); // Optional
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("Error submitting form.");
    });
}
document
  .querySelector(".modal-content .primary-button")
  .addEventListener("click", handleModalSubmit);

// document
//   .querySelector(".primary-button")
//   .addEventListener("click", () => getFormDataAndSubmit(true));


// helper functions

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}