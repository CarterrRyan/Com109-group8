$(function () {
    //Init property objects
  const properties = [
    {
      id: 1,
      title: "The Old Millhouse",
      type: "Cottage",
      price: 289000,
      address: "4 Millstream Lane, Fernhill",
      bedrooms: 2,
      bathrooms: 1,
      area: 78,
      image: "https://picsum.photos/seed/fernhill1/600/450",
      description: "A converted stone mill with exposed beams and a private stream frontage.",
      featured: true
    },
    {
      id: 2,
      title: "Oakwood Family Home",
      type: "House",
      price: 415000,
      address: "12 Oakwood Drive, Ashbury",
      bedrooms: 4,
      bathrooms: 2,
      area: 142,
      image: "https://picsum.photos/seed/fernhill2/600/450",
      description: "Spacious detached house with a south-facing garden, close to good schools.",
      featured: true
    },
    {
      id: 3,
      title: "Harbourview Apartment",
      type: "Apartment",
      price: 198500,
      address: "Flat 6, Harbour Court, Southgate",
      bedrooms: 1,
      bathrooms: 1,
      area: 54,
      image: "https://picsum.photos/seed/fernhill3/600/450",
      description: "Bright top-floor apartment with balcony views over the harbour.",
      featured: false
    },
    {
      id: 4,
      title: "Willowbank Bungalow",
      type: "Bungalow",
      price: 265000,
      address: "9 Willowbank Road, Ashbury",
      bedrooms: 3,
      bathrooms: 1,
      area: 96,
      image: "https://picsum.photos/seed/fernhill4/600/450",
      description: "Single-storey living with a recently renovated kitchen and utility room.",
      featured: false
    },
    {
      id: 5,
      title: "Cedar Rise House",
      type: "House",
      price: 512000,
      address: "22 Cedar Rise, Fernhill",
      bedrooms: 5,
      bathrooms: 3,
      area: 178,
      image: "https://picsum.photos/seed/fernhill5/600/450",
      description: "A generous family home with a home office and double garage.",
      featured: false
    },
    {
      id: 6,
      title: "Riverside Studio",
      type: "Apartment",
      price: 142000,
      address: "Flat 2, Riverside Walk, Southgate",
      bedrooms: 1,
      bathrooms: 1,
      area: 41,
      image: "https://picsum.photos/seed/fernhill6/600/450",
      description: "Compact studio flat, ideal as a first home or rental investment.",
      featured: false
    },
    {
      id: 7,
      title: "Bramble Cottage",
      type: "Cottage",
      price: 231000,
      address: "3 Bramble Lane, Ashbury",
      bedrooms: 2,
      bathrooms: 1,
      area: 68,
      image: "https://picsum.photos/seed/fernhill7/600/450",
      description: "A cosy two-bedroom cottage with a wood-burning stove and small courtyard.",
      featured: false
    },
    {
      id: 8,
      title: "Green Meadow Bungalow",
      type: "Bungalow",
      price: 298000,
      address: "17 Green Meadow Close, Fernhill",
      bedrooms: 3,
      bathrooms: 2,
      area: 104,
      image: "https://picsum.photos/seed/fernhill8/600/450",
      description: "Level-access bungalow backing onto open fields, quiet cul-de-sac location.",
      featured: false
    }
  ];

  const $grid = $("#property-grid");
  const $emptyState = $("#empty-state");
  const $resultCount = $("#result-count");
  const $typeFilter = $("#type-filter");
  const $sortSelect = $("#sort-select");
  const $searchInput = $("#search-input");

  const currency = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0
  });

  // Build a card for a single property
  function buildCard(property) {
    const $card = $("<article>", { class: "property-card", "data-id": property.id });

    const $imageWrap = $("<div>", { class: "card-image-wrap" });
    $imageWrap.append(
      $("<img>", { src: property.image, alt: property.title, loading: "lazy" }),
      $("<span>", { class: "card-type-tag", text: property.type })
    );

    const $body = $("<div>", { class: "card-body" });
    $body.append(
      $("<p>", { class: "card-price", text: currency.format(property.price) }),
      $("<h3>", { class: "card-title", text: property.title }),
      $("<p>", { class: "card-address", text: property.address }),
      $("<p>", { class: "card-description", text: property.description })
    );

    const $stats = $("<div>", { class: "card-stats" });
    $stats.append(
      $("<span>").append(`${property.bedrooms} bed`),
      $("<span>").append(`${property.bathrooms} bath`),
      $("<span>").append(`${property.area} m²`)
    );

    $body.append($stats);
    $card.append($imageWrap, $body);

    return $card;
  }

  // Render a given list of properties into the grid.
  function render(list) {
    $grid.empty();

    if (list.length === 0) {
      $emptyState.prop("hidden", false);
    } else {
      $emptyState.prop("hidden", true);
      list.forEach(function (property) {
        $grid.append(buildCard(property));
      });
    }

    $resultCount.text(list.length);
  }
// update grid based on fitlers, sort and search
  function update() {
    const selectedType = $typeFilter.val();
    const sortValue = $sortSelect.val();
    const searchTerm = $searchInput.val().trim().toLowerCase();

    let result = properties.filter(function (property) {
      const matchesType = selectedType === "all" || property.type === selectedType;
      const matchesSearch =
        searchTerm === "" ||
        property.title.toLowerCase().includes(searchTerm) ||
        property.address.toLowerCase().includes(searchTerm);
      return matchesType && matchesSearch;
    });

    switch (sortValue) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "bedrooms-desc":
        result.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      default:
        // "Featured" first, keep original order otherwise
        result.sort((a, b) => (b.featured === true) - (a.featured === true));
    }

    render(result);
  }

  $typeFilter.on("change", update);
  $sortSelect.on("change", update);
  $searchInput.on("input", update);

// Initial render
  update();
});