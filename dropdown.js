// Dropdown builder function
function createDropdown({ container, placeholder, options, onSelect }) {
  const dropdown = document.createElement("div");
  dropdown.className = "custom-dropdown";

  const selected = document.createElement("div");
  selected.className = "dropdown-selected";
  selected.textContent = placeholder;

  const arrow = document.createElement("img");
  arrow.src = "/assets/images/arrow.svg";
  arrow.className = "arrow";
  arrow.style.rotate = "0deg";
  selected.appendChild(arrow);

  const optionsDiv = document.createElement("div");
  optionsDiv.className = "dropdown-options";
  optionsDiv.style.display = "none";

  options.forEach((opt) => {
    const optDiv = document.createElement("div");
    optDiv.setAttribute("data-value", opt);
    optDiv.innerHTML = `${opt} <img class="checkmark" src="/assets/images/checkmark.png" style="display:none;">`;
    optionsDiv.appendChild(optDiv);

    optDiv.addEventListener("click", () => {
      selected.textContent = opt;
      selected.appendChild(arrow);
      optionsDiv.style.display = "none";
      arrow.style.rotate = "0deg";

      // reset checkmarks
      [...optionsDiv.querySelectorAll(".checkmark")].forEach(
        (c) => (c.style.display = "none")
      );
      optDiv.querySelector(".checkmark").style.display = "inline";

      if (onSelect) onSelect(opt); // callback for linked dropdown
    });
  });

  selected.addEventListener("click", () => {
    optionsDiv.style.display =
      optionsDiv.style.display === "block" ? "none" : "block";
    arrow.style.rotate = arrow.style.rotate === "0deg" ? "180deg" : "0deg";
  });

  // close on outside click
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".custom-dropdown")) {
      optionsDiv.style.display = "none";
      arrow.style.rotate = "0deg";
    }
  });

  dropdown.appendChild(selected);
  dropdown.appendChild(optionsDiv);
  container.appendChild(dropdown);
}

// ---------------------------
// Example usage with linking
// ---------------------------
const subOptionsData = {
  Projects: ["Project 1", "Project 2", "Project 3"],
  Media: ["Media 1", "Media 2", "Media 3"],
  Career: ["Career 1", "Career 2", "Career 3"],
};

const dropdownContainer = document.getElementById("dropdownContainer");
const secondContainer = document.createElement("div");
dropdownContainer.appendChild(secondContainer);

// Create first dropdown
createDropdown({
  container: dropdownContainer,
  placeholder: "Query Type",
  options: Object.keys(subOptionsData),
  //   onSelect: (selectedCategory) => {
  //     // clear second dropdown
  //     secondContainer.innerHTML = "";
  //     // build second dropdown
  //     createDropdown({
  //       container: secondContainer,
  //       placeholder: `Select ${selectedCategory} option`,
  //       options: subOptionsData[selectedCategory],
  //     });
  //   },
  onSelect: (selectedCategory) => {
    // remove old second container if exists
    const existingSecond = document.getElementById("secondDropdownContainer");
    if (existingSecond) existingSecond.remove();

    // make a new second container
    const secondContainer = document.createElement("div");
    secondContainer.id = "secondDropdownContainer";

    // insert right after the first dropdown
    dropdownContainer.insertAdjacentElement("afterend", secondContainer);

    // create second dropdown inside it
    createDropdown({
      container: secondContainer,
      placeholder: `Select ${selectedCategory} option`,
      options: subOptionsData[selectedCategory],
    });
  },

});


