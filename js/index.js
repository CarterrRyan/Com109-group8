$(function () {
  // ---------- "Why Fernhill" accordion ----------
  // Click a principle to reveal its detail; closes any other open one
  // so the reader stays focused on a single point at a time.
  $(".principle-toggle").on("click", function () {
    const $principle = $(this).closest(".principle");
    const isOpen = $principle.attr("data-open") === "true";

    $(".principle")
      .not($principle)
      .attr("data-open", "false")
      .find(".principle-toggle")
      .attr("aria-expanded", "false");

    $principle.attr("data-open", !isOpen);
    $(this).attr("aria-expanded", !isOpen);
  });

  // ---------- Featured properties preview ----------
  // Mirrors the two "featured: true" listings from js/properties.js
  // so the homepage teaser always matches what's actually for sale.
  const featuredProperties = [
    {
      id: 1,
      title: "The Old Millhouse",
      type: "Cottage",
      price: 289000,
      address: "4 Millstream Lane, Fernhill",
      image: "https://picsum.photos/seed/fernhill1/600/450",
      description:
        "A converted stone mill with exposed beams and a private stream frontage.",
    },
    {
      id: 2,
      title: "Oakwood Family Home",
      type: "House",
      price: 415000,
      address: "12 Oakwood Drive, Ashbury",
      image: "https://picsum.photos/seed/fernhill2/600/450",
      description:
        "Spacious detached house with a south-facing garden, close to good schools.",
    },
  ];

  const $featuredGrid = $("#featured-grid");

  const currency = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  });

  // Build a card for a single featured property
  function buildFeaturedCard(property) {
    const $card = $("<article>", {
      class: "property-card",
      "data-id": property.id,
    });

    const $imageWrap = $("<div>", { class: "card-image-wrap" });
    $imageWrap.append(
      $("<img>", { src: property.image, alt: property.title, loading: "lazy" }),
      $("<span>", { class: "card-type-tag", text: property.type }),
    );

    const $body = $("<div>", { class: "card-body" });
    $body.append(
      $("<p>", { class: "card-price", text: currency.format(property.price) }),
      $("<h3>", { class: "card-title", text: property.title }),
      $("<p>", { class: "card-address", text: property.address }),
      $("<p>", { class: "card-description", text: property.description }),
    );

    $card.append($imageWrap, $body);
    return $card;
  }

  // Render the featured properties into the grid
  featuredProperties.forEach(function (property) {
    $featuredGrid.append(buildFeaturedCard(property));
  });

  // ---------- Scroll-triggered reveal animation ----------
  $(".section-head, .principle, .property-card, .stat").addClass("reveal");

  function revealOnScroll() {
    const windowBottom = $(window).scrollTop() + $(window).height();
    $(".reveal:not(.is-visible)").each(function () {
      const elTop = $(this).offset().top;
      if (windowBottom > elTop + 60) {
        $(this).addClass("is-visible");
      }
    });
  }

  $(window).on("scroll resize", revealOnScroll);

  // Initial render
  revealOnScroll();
});
