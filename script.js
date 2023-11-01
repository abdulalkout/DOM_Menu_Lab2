// Data Structure
var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

// Queries
const mainEl = document.querySelector("main");
const header = document.querySelector("header");
const topMenuEl = document.querySelector("#top-menu");
const subMenuEl = document.querySelector("#sub-menu");
let showingSubMenu = false;

mainEl.style.backgroundColor = "var(--main-bg)";
mainEl.innerHTML = "<h1>SEI Rocks!</h1>";
mainEl.className = "flex-ctr";

// ----------TopElement-------------------
topMenuEl.className = "flex-around";
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";

//----------subMenuEl----------------------
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";
subMenuEl.className = "flex-around";
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

menuLinks.forEach((element) => {
  let newAnc = document.createElement("a");
  newAnc.href = element.href;
  newAnc.textContent = element.text;
  topMenuEl.appendChild(newAnc);
});
let topMenuLinks = document.querySelectorAll("a");
// console.log(topMenuLinks);

// -----------------------------------------------Functions----------------------------------------
function buildSubMenu(mySubLinks) {
  subMenuEl.textContent = "";
  for (let i = 0; i < mySubLinks.length; i++) {
    let newSubLink = document.createElement("a");
    newSubLink.setAttribute("href", " mySubLinks[i].href");
    newSubLink.textContent = mySubLinks[i].text;
    subMenuEl.append(newSubLink);
  }
}

//----------------------------------------Event Listners--------------------------------
topMenuEl.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName !== "A") {
    return;
  }
  console.log(e.target);
  // console.log(e.target.tagName);
  if (e.target.className === "active") {
    e.target.classList.remove("active");
    showingSubMenu = false;
    subMenuEl.style.top = "0";
    return;
  }

  topMenuLinks.forEach((topMenuATag) => {
    topMenuATag.classList.remove("active");
  });

  e.target.className = "active";

  let mySubLinks;
  menuLinks.forEach((data) => {
    if (e.target.textContent === data.text) {
      if (data.subLinks) {
        showingSubMenu = true;
        mySubLinks = data.subLinks;
      } else {
        mainEl.innerHTML = `<h1>${e.target.textContent}</h1>`;
      }
    }
  });

  if (showingSubMenu === true) {
    buildSubMenu(mySubLinks);
    subMenuEl.style.top = "100%";
  } else {
    subMenuEl.style.top = "0";
  }
});

subMenuEl.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName !== "A") {
    return;
  }
  console.log(e.target);

  showingSubMenu = false;
  subMenuEl.style.top = "0";

  topMenuLinks.forEach((topMenuATag) => {
    topMenuATag.classList.remove("active");
  });

  mainEl.innerHTML = `<h1>${e.target.textContent}</h1>`;
});
