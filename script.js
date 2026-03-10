document.addEventListener("DOMContentLoaded", function () {

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
    document.getElementById("generatorSection").style.display = "none";
    document.getElementById("valentineSection").style.display = "block";

    document.getElementById("toNameDisplay").textContent = decodeURIComponent(params.to);
    document.getElementById("fromNameSuccess").textContent = decodeURIComponent(params.from);

    initializeNoButton();
  } else {
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

    function hideTooltip() {
      tooltip.classList.remove("show");
      clearTimeout(tooltipTimer);
    }

    function showTooltipAt(x, y) {

      tooltip.style.left = x + "px";
      tooltip.style.top = y + "px";

      tooltip.classList.add("show");

      clearTimeout(tooltipTimer);

      tooltipTimer = setTimeout(() => {
        tooltip.classList.remove("show");
      }, 2000);
    }

    noBtn.addEventListener("mouseenter", () => {

      hideTooltip();

      // Save OLD button position
      const oldRect = noBtn.getBoundingClientRect();

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

      // Show tooltip at OLD position
      const tooltipX = oldRect.left + oldRect.width / 2;
      const tooltipY = oldRect.top - 10;

      setTimeout(() => {
        showTooltipAt(tooltipX, tooltipY);
      }, 50);

    });

    // Mobile support
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

      const link =
        `${baseUrl}?from=${encodeURIComponent(fromName)}&to=${encodeURIComponent(toName)}`;

      linkDisplay.textContent = link;

      generatedLinkDiv.style.display = "block";

      generatedLinkDiv.scrollIntoView({ behavior: "smooth" });

    });

    copyBtn.addEventListener("click", () => {

      const link = linkDisplay.textContent;

      navigator.clipboard.writeText(link).then(() => {

        copyBtn.textContent = "✅ Copied!";

        setTimeout(() => {
          copyBtn.textContent = "📋 Copy Link";
        }, 2000);

      });

    });

    createAnotherBtn.addEventListener("click", () => {

      form.reset();

      generatedLinkDiv.style.display = "none";

    });

  }

});
