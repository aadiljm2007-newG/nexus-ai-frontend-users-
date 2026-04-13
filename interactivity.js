(function initNexusInteractivity() {
  var page = (window.location.pathname.split("/").pop() || "").toLowerCase();
  var storageKey = "nexus:settings:" + page;

  function ensureToast() {
    var existing = document.getElementById("nexus-toast");
    if (existing) {
      return existing;
    }

    var toast = document.createElement("div");
    toast.id = "nexus-toast";
    toast.setAttribute("aria-live", "polite");
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%) translateY(12px)";
    toast.style.padding = "10px 14px";
    toast.style.borderRadius = "12px";
    toast.style.background = "rgba(17, 17, 17, 0.92)";
    toast.style.color = "#ffffff";
    toast.style.fontSize = "12px";
    toast.style.fontWeight = "600";
    toast.style.letterSpacing = "0.02em";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 180ms ease, transform 180ms ease";
    toast.style.zIndex = "9999";
    toast.style.pointerEvents = "none";
    document.body.appendChild(toast);
    return toast;
  }

  var toastTimer = null;
  function showToast(message) {
    var toast = ensureToast();
    toast.textContent = message;
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";

    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    toastTimer = setTimeout(function () {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(12px)";
    }, 1600);
  }

  function normalizeButtonLabel(button) {
    return (button.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function applyToggleVisualState(button, isActive) {
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  }

  function handleToggleButton(button) {
    var isActive = !button.classList.contains("active");
    applyToggleVisualState(button, isActive);
    showToast(isActive ? "Enabled" : "Disabled");
  }

  function handleThemeButton(button) {
    var group = button.parentElement;
    if (!group) {
      return;
    }
    var themeButtons = group.querySelectorAll(".theme-button");
    themeButtons.forEach(function (item) {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    showToast("Theme updated");
  }

  function handleConnectButton(button) {
    var label = normalizeButtonLabel(button);
    var isConnect = label.indexOf("connect") !== -1;
    var isConnected = label.indexOf("disconnect") !== -1 || button.dataset.connected === "true";

    if (!isConnect && !isConnected) {
      return false;
    }

    var nextConnected = !isConnected;
    button.dataset.connected = nextConnected ? "true" : "false";
    button.textContent = nextConnected ? "Disconnect" : "Connect";

    button.classList.toggle("bg-black", !nextConnected);
    button.classList.toggle("text-white", !nextConnected);
    button.classList.toggle("bg-white", nextConnected);
    button.classList.toggle("text-black", nextConnected);

    showToast(nextConnected ? "Service connected" : "Service disconnected");
    return true;
  }

  function getFieldKey(element, index) {
    return (
      element.id ||
      element.name ||
      element.getAttribute("data-setting") ||
      element.getAttribute("aria-label") ||
      element.placeholder ||
      "field-" + index
    );
  }

  function serializeSettings() {
    var state = {};
    var fields = document.querySelectorAll("input, select, textarea");
    fields.forEach(function (field, index) {
      var key = getFieldKey(field, index);
      if (field.type === "checkbox" || field.type === "radio") {
        state[key] = field.checked;
      } else {
        state[key] = field.value;
      }
    });

    var toggles = document.querySelectorAll(".toggle-btn, .toggle-switch, .theme-button");
    toggles.forEach(function (toggle, index) {
      state["toggle-" + index] = toggle.classList.contains("active");
    });

    return state;
  }

  function restoreSettings() {
    var raw = localStorage.getItem(storageKey);
    if (!raw) {
      return;
    }

    var state = null;
    try {
      state = JSON.parse(raw);
    } catch (error) {
      return;
    }

    var fields = document.querySelectorAll("input, select, textarea");
    fields.forEach(function (field, index) {
      var key = getFieldKey(field, index);
      if (!(key in state)) {
        return;
      }

      if (field.type === "checkbox" || field.type === "radio") {
        field.checked = !!state[key];
      } else {
        field.value = state[key];
      }
    });

    var toggles = document.querySelectorAll(".toggle-btn, .toggle-switch, .theme-button");
    toggles.forEach(function (toggle, index) {
      var toggleKey = "toggle-" + index;
      if (!(toggleKey in state)) {
        return;
      }
      applyToggleVisualState(toggle, !!state[toggleKey]);
    });
  }

  function saveSettings() {
    localStorage.setItem(storageKey, JSON.stringify(serializeSettings()));
    showToast("Changes saved");
  }

  function resetSettings() {
    document.querySelectorAll("form").forEach(function (form) {
      form.reset();
    });
    localStorage.removeItem(storageKey);
    showToast("Settings reset");
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest("button");
    if (!button || button.disabled) {
      return;
    }

    var id = (button.id || "").toLowerCase();
    var label = normalizeButtonLabel(button);
    var type = (button.getAttribute("type") || "button").toLowerCase();

    if (
      id === "open-account-popup-btn" ||
      id === "close-account-popup-btn" ||
      id === "edit-profile-btn" ||
      id === "manage-account-btn"
    ) {
      return;
    }

    if (button.classList.contains("theme-button")) {
      handleThemeButton(button);
      return;
    }

    if (button.classList.contains("toggle-btn") || button.classList.contains("toggle-switch")) {
      handleToggleButton(button);
      return;
    }

    if (handleConnectButton(button)) {
      return;
    }

    if (type === "submit") {
      saveSettings();
      event.preventDefault();
      return;
    }

    if (label.indexOf("save") !== -1 || label.indexOf("apply") !== -1 || label.indexOf("update") !== -1) {
      event.preventDefault();
      saveSettings();
      return;
    }

    if (label.indexOf("reset") !== -1 || label.indexOf("cancel") !== -1 || label.indexOf("restore") !== -1) {
      event.preventDefault();
      resetSettings();
      return;
    }

    if (label.indexOf("test") !== -1 || label.indexOf("verify") !== -1 || label.indexOf("check") !== -1) {
      event.preventDefault();
      showToast("Check completed");
      return;
    }

    if (label.indexOf("generate") !== -1 && label.indexOf("key") !== -1) {
      event.preventDefault();
      showToast("New API key generated");
      return;
    }

    if (label.indexOf("delete") !== -1 || label.indexOf("remove") !== -1) {
      event.preventDefault();
      showToast("Action completed");
      return;
    }
  });

  restoreSettings();
})();
