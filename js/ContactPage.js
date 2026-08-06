$(document).ready(function () {
  const $form = $("#contact-form");
  const $emailInput = $("#email");
  const $emailError = $("#email-error");
  const $nameInput = $("#name");
  const $nameError = $("#name-error");
  const $messageInput = $("#message");
  const $messageError = $("#message-error");

  const $modal = $("#successModal");
  const $closeModalBtn = $("#closeModalBtn");

  const savedData = JSON.parse(sessionStorage.getItem("formData") || "{}");

  const selectedProperty = JSON.parse(
    localStorage.getItem("selectedProperty") || "{}",
  );

  if (savedData.name) $nameInput[0].value = savedData.name;
  if (savedData.email) $emailInput[0].value = savedData.email;
  if (savedData.message) $messageInput[0].value = savedData.message;
  if (selectedProperty.title)
    $messageInput[0].value = `I am interested in the property: ${selectedProperty.title} located at ${selectedProperty.address}. Please provide more details.`;

  function saveInput(e) {
    const sessionData = JSON.parse(sessionStorage.getItem("formData") || "{}");
    sessionData[e.target.name] = e.target.value;
    sessionStorage.setItem("formData", JSON.stringify(sessionData));
  }

  // FORM FIELDS VALIDATION
  function validateEmail() {
    const validity = $emailInput[0].validity;
    if (validity.valid) {
      $emailError.text("").removeClass("active");
      $emailInput.removeClass("is-invalid");
      return true;
    }

    if (validity.valueMissing) {
      $emailError.text("Please enter your email address.");
    } else if (validity.typeMismatch) {
      $emailError.text(
        "Please enter a valid email address (e.g., name@domain.com).",
      );
    }

    $emailError.addClass("active");
    $emailInput.addClass("is-invalid");
    return false;
  }

  function validateName() {
    const validity = $nameInput[0].validity;
    if (validity.valid) {
      $nameError.text("").removeClass("active");
      $nameInput.removeClass("is-invalid");
      return true;
    }

    if (validity.valueMissing) {
      $nameError.text("Please enter your name.");
    }

    $nameError.addClass("active");
    $nameInput.addClass("is-invalid");
    return false;
  }

  function validateMessage() {
    const validity = $messageInput[0].validity;
    if (validity.valid) {
      $messageError.text("").removeClass("active");
      $messageInput.removeClass("is-invalid");
      return true;
    }

    if (validity.valueMissing) {
      $messageError.text("Please enter your message.");
    }

    $messageError.addClass("active");
    $messageInput.addClass("is-invalid");
    return false;
  }

  // MODAL UI MANAGEMENT
  function showModal() {
    $modal.addClass("is-visible").attr("aria-hidden", "false");
  }

  function closeModal() {
    $modal.removeClass("is-visible").attr("aria-hidden", "true");
    $form[0].reset(); // Reset form fields after closing
  }

  // EVENT LISTENERS
  $emailInput.on("input", function (e) {
    validateEmail();
    saveInput(e);
  });

  $nameInput.on("input", function (e) {
    validateName();
    saveInput(e);
  });
  $messageInput.on("input", function (e) {
    validateMessage();
    saveInput(e);
  });

  $form.on("submit", function (event) {
    event.preventDefault();

    const isEmailValid = validateEmail();
    const isNameValid = validateName();
    const isMessageValid = validateMessage();

    // Submit form only if all individual validations pass
    if (isEmailValid && isNameValid && isMessageValid) {
      window.localStorage.setItem(
        "interestedProperty",
        JSON.stringify({ property: selectedProperty.id, interested: true }),
      );
      window.localStorage.removeItem("selectedProperty");
      showModal();
      sessionStorage.removeItem("formData");
    }
  });

  // Close modal via button click
  $closeModalBtn.on("click", closeModal);

  // Close modal when clicking on the outer backdrop overlay
  $modal.on("click", function (e) {
    if ($(e.target).is("#successModal")) {
      closeModal();
    }
  });

  window.addEventListener("pagehide", () => {
    localStorage.removeItem("selectedProperty");
  });
});
