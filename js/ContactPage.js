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

  function showModal() {
    $modal.addClass("is-visible").attr("aria-hidden", "false");
  }

  function closeModal() {
    $modal.removeClass("is-visible").attr("aria-hidden", "true");
    $form[0].reset(); // Reset form fields after closing
  }

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

  $emailInput.on("input", validateEmail);
  $nameInput.on("input", validateName);
  $messageInput.on("input", validateMessage);

  $form.on("submit", function (event) {
    event.preventDefault();

    const isEmailValid = validateEmail();
    const isNameValid = validateName();
    const isMessageValid = validateMessage();

    if (isEmailValid && isNameValid && isMessageValid) {
      showModal();
    }
  });

  $closeModalBtn.on("click", closeModal);

  $modal.on("click", function (e) {
    if ($(e.target).is("#successModal")) {
      closeModal();
    }
  });
});
