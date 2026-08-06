$(function () {
  const $nav = $(".site-nav");
  const $toggle = $(".nav-toggle");
  const $links = $(".nav-links a");

  if ($nav.length === 0 || $toggle.length === 0) {
    return;
  }

  function setOpenState(isOpen) {
    $nav.toggleClass("is-open", isOpen);
    $toggle.attr("aria-expanded", String(isOpen));
  }

  $toggle.on("click", function () {
    const isOpen = $toggle.attr("aria-expanded") === "true";
    setOpenState(!isOpen);
  });

  $links.on("click", function () {
    if (window.matchMedia("(max-width: 768px)").matches) {
      setOpenState(false);
    }
  });

  $(document).on("keydown", function (event) {
    if (event.key === "Escape") {
      setOpenState(false);
    }
  });

  $(window).on("resize", function () {
    if (!window.matchMedia("(max-width: 768px)").matches) {
      setOpenState(false);
    }
  });

  const currentFile = (
    window.location.pathname.split("/").pop() || "index.html"
  ).toLowerCase();
  $links.each(function () {
    const href = ($(this).attr("href") || "").toLowerCase();
    if (href === currentFile) {
      $(this).attr("aria-current", "page");
    }
  });
});
