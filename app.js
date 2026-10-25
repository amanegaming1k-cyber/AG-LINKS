
/*
  AG LINKS — Official Link Hub

  IMPORTANT:
  Replace the example URLs below with your real official links.
  Use only accounts and websites you own or are authorized to share.
*/

const AG_LINKS = [
  {
    title: "YouTube — MUSE AG",
    description: "Official YouTube channel",
    category: "Social",
    icon: "YT",
    url: "https://www.youtube.com/@MUSE_AG"
  },
  {
    title: "YouTube — Amane Gaming",
    description: "Gaming videos and content",
    category: "Social",
    icon: "YT",
    url: "https://www.youtube.com/@amanegaming1k"
  },
  {
    title: "YouTube — Kiyotaka 1M",
    description: "Anime and entertainment content",
    category: "Social",
    icon: "YT",
    url: "https://www.youtube.com/@Kiyotaka1M"
  },
  {
    title: "Telegram Community",
    description: "Join the official AG community",
    category: "Community",
    icon: "TG",
    url: "https://t.me/ag_x_amane"
  },
  {
    title: "Facebook",
    description: "Official Facebook page",
    category: "Social",
    icon: "FB",
    url: ""
  },
  {
    title: "Instagram",
    description: "Official Instagram profile",
    category: "Social",
    icon: "IG",
    url: ""
  },
  {
    title: "TikTok",
    description: "Short videos and edits",
    category: "Social",
    icon: "TT",
    url: ""
  },
  {
    title: "AG ANIME BOX",
    description: "Anime website and project",
    category: "Apps",
    icon: "AB",
    url: ""
  },
  {
    title: "AG ONLINE COMMUNITY",
    description: "Community management project",
    category: "Apps",
    icon: "AG",
    url: ""
  },
  {
    title: "Contact AG",
    description: "Official contact and support",
    category: "Other",
    icon: "@",
    url: "https://t.me/ag_x_amane"
  }
];

const grid = document.getElementById("links-grid");
const searchInput = document.getElementById("search-input");
const countLabel = document.getElementById("link-count");
const noResults = document.getElementById("no-results");
const filterButtons = document.querySelectorAll(".filter");

let activeFilter = "All";

function isValidHttpUrl(value) {
  if (typeof value !== "string" || !value.trim()) return false;

  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function getVisibleLinks() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  return AG_LINKS.filter(link => {
    const categoryMatches =
      activeFilter === "All" || link.category === activeFilter;

    const text = [
      link.title,
      link.description,
      link.category
    ].join(" ").toLowerCase();

    return categoryMatches && text.includes(searchTerm);
  });
}

function createLinkCard(link) {
  const card = document.createElement("a");
  card.className = "link-card";

  const icon = document.createElement("span");
  icon.className = "link-icon";
  icon.textContent = link.icon || "AG";
  icon.setAttribute("aria-hidden", "true");

  const info = document.createElement("span");
  info.className = "link-info";

  const title = document.createElement("h3");
  title.textContent = link.title;

  const description = document.createElement("p");
  description.textContent = link.description;

  info.append(title, description);

  const arrow = document.createElement("span");
  arrow.className = "link-arrow";
  arrow.textContent = "↗";
  arrow.setAttribute("aria-hidden", "true");

  if (isValidHttpUrl(link.url)) {
    card.href = link.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.setAttribute("aria-label", `${link.title} — opens in a new tab`);
    card.append(icon, info, arrow);
  } else {
    card.classList.add("link-disabled");
    card.setAttribute("aria-disabled", "true");
    card.append(icon, info);

    const badge = document.createElement("span");
    badge.className = "link-arrow";
    badge.textContent = "—";
    badge.setAttribute("aria-label", "Link not added yet");
    card.append(badge);
  }

  return card;
}

function renderLinks() {
  const visibleLinks = getVisibleLinks();
  grid.replaceChildren();

  countLabel.textContent = `${visibleLinks.length} LINKS`;
  noResults.hidden = visibleLinks.length !== 0;

  if (visibleLinks.length === 0) return;

  const fragment = document.createDocumentFragment();

  visibleLinks.forEach(link => {
    fragment.appendChild(createLinkCard(link));
  });

  grid.appendChild(fragment);
}

searchInput.addEventListener("input", renderLinks);

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    renderLinks();
  });

  button.setAttribute(
    "aria-pressed",
    String(button.dataset.filter === activeFilter)
  );
});

document.addEventListener("keydown", event => {
  const target = event.target;
  const isTyping =
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target.isContentEditable;

  if (event.key === "/" && !isTyping) {
    event.preventDefault();
    searchInput.focus();
  }

  if (event.key === "Escape" && target === searchInput) {
    searchInput.value = "";
    renderLinks();
    searchInput.blur();
  }
});

document.getElementById("year").textContent =
  new Date().getFullYear();

renderLinks();
