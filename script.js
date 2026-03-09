document.addEventListener("DOMContentLoaded", function() {

  // ------------------------------
  // Parse URL parameters
  // ------------------------------
  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      from: params.get("from"),
      to: params.get("to"),
    };
  }

  const params = getUrlParams();

  // ------------------------------
  // Show Valentine Section or Generator
  // ------------------------------
  if (params.from && params.to) {
    // Show valentine section
    document.getElementById("generatorSection").style.display = "none";
    document.getElementById("valentineSection").style.display = "block";

    // Set custom values
    document.getElementById("toNameDisplay").textContent = decodeURIComponent(params.to);
    document.getElementById("fromNameSuccess").textContent = decodeURIComponent(params.from);

    // Initialize moving No button
    initializeNoButton();
  } else {
    // Show generator section
    initializeGenerator();
  }

  // ------------------------------
  // No Button Functionality
  // ------------------------------
  function initializeNoButton() {
    const noBtn = document.getElementById("noBtn");
    const yesBtn = document.getElementById("yesBtn");
    const tooltip = document.getElementById("noTooltip");
    const valentineContent = document.getElementById("valentineContent");
    const successMessage = document.getElementById("successMessage");

    let tooltipTimer;

    function showTooltip() {
      const rect = noBtn.getBoundingClientRect();
      tooltip.style.left = rect.left + rect.width / 2 + "px";
      tooltip.style.top = rect.top - 10 + "px";
      tooltip.classList.add("show");

      clearTimeout(tooltipTimer);
      tooltipTimer = setTimeout(() => {
        tooltip.classList.remove("show");
      }, 2000);
    }

    function hideTooltip() {
      tooltip.classList.remove("show");
      clearTimeout(tooltipTimer);
    }

    noBtn.addEventListener("mouseenter", () => {
      hideTooltip(); // hide previous tooltip
      noBtn.classList.add("moving");

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const btnWidth = noBtn.offsetWidth;
      const btnHeight = noBtn.offsetHeight;

      const maxX = viewportWidth - btnWidth - 20;
      const maxY = viewportHeight - btnHeight - 20;

      const randomX = Math.max(20, Math.random() * maxX);
      const randomY = Math.max(20, Math.random() * maxY);

      // Move button
      noBtn.style.left = randomX + "px";
      noBtn.style.top = randomY + "px";

      // Show tooltip after move
      setTimeout(() => {
        showTooltip();
      }, 120);
    });

    noBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      noBtn.dispatchEvent(new Event("mouseenter"));
    }, { passive: false });

    yesBtn.addEventListener("click", () => {
      valentineContent.style.display = "none";
      successMessage.style.display = "block";
      setTimeout(() => {
        document.getElementById("kissingAnimation").style.display = "block";
      }, 300);
    });

    noBtn.addEventListener("click", (e) => {
      e.preventDefault();
    });
  }

  // ------------------------------
  // Link Generator Functionality
  // ------------------------------
  function initializeGenerator() {
    const form = document.getElementById("linkForm");
    const generatedLinkDiv = document.getElementById("generatedLink");
    const linkDisplay = document.getElementById("linkDisplay");
    const copyBtn = document.getElementById("copyBtn");
    const createAnotherBtn = document.getElementById("createAnother");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fromName = document.getElementById("fromName").value.trim();
      const toName = document.getElementById("toName").value.trim();

      if (!fromName || !toName) return;

      const baseUrl = window.location.origin + window.location.pathname;
      const link = `${baseUrl}?from=${encodeURIComponent(fromName)}&to=${encodeURIComponent(toName)}`;

      linkDisplay.textContent = link;
      generatedLinkDiv.style.display = "block";
      generatedLinkDiv.scrollIntoView({ behavior: "smooth" });
    });

    copyBtn.addEventListener("click", () => {
      const link = linkDisplay.textContent;
      navigator.clipboard.writeText(link).then(() => {
        copyBtn.textContent = "✅ Copied!";
        setTimeout(() => copyBtn.textContent = "📋 Copy Link", 2000);
      });
    });

    createAnotherBtn.addEventListener("click", () => {
      form.reset();
      generatedLinkDiv.style.display = "none";
    });
  }

});
