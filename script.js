      // Parse URL parameters
      function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return {
          from: params.get("from"),
          to: params.get("to"),
        };
      }

      // Check if this is a valentine link or generator page
      const params = getUrlParams();
      if (params.from && params.to) {
        // Show valentine section
        document.getElementById("generatorSection").style.display = "none";
        document.getElementById("valentineSection").style.display = "block";

        // Set custom values
        document.getElementById("toNameDisplay").textContent = params.to;
        document.getElementById("fromNameSuccess").textContent = params.from;

        // Initialize moving No button
        initializeNoButton();
      } else {
        // Show generator section
        initializeGenerator();
      }

      // Generator functionality
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

	    // move button first
	    noBtn.style.left = randomX + "px";
	    noBtn.style.top = randomY + "px";

	    // show tooltip AFTER moving
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