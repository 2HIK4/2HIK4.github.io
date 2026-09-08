(function () {
  "use strict";

  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && window.matchMedia("(pointer: fine)").matches;

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Mobile navigation */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-primary-nav]");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.hasAttribute("data-open");
      nav.toggleAttribute("data-open", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.removeAttribute("data-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Fixed-header scroll progress */
  var header = document.querySelector(".site-header");
  function updateScrollProgress() {
    if (!header) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    header.style.setProperty("--scroll-progress", progress.toFixed(4));
  }
  updateScrollProgress();
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("resize", updateScrollProgress, { passive: true });

  /* Scroll reveal with stronger staggered motion */
  var revealTargets = Array.prototype.slice.call(document.querySelectorAll(
    "[data-reveal], .section__head, .lab-card, .beyond-card, .timeline__item, .skills__group, .tool-group"
  ));

  if (reducedMotion) {
    revealTargets.forEach(function (el) { el.classList.add("revealed"); });
  } else if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -7%", threshold: 0.07 });

    revealTargets.forEach(function (el, index) {
      if (el.classList.contains("lab-card") || el.classList.contains("tool-group") || el.classList.contains("beyond-card")) {
        el.style.transitionDelay = Math.min(index % 4, 3) * 70 + "ms";
      }
      revealObserver.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("revealed"); });
  }

  /* Active section in navigation */
  var sectionLinks = Array.prototype.slice.call(document.querySelectorAll('.primary-nav a[href^="#"]'));
  var sections = sectionLinks.map(function (link) {
    var id = link.getAttribute("href");
    return document.querySelector(id);
  }).filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach(function (link) {
          var active = link.getAttribute("href") === "#" + entry.target.id;
          if (active) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-28% 0px -62%", threshold: 0.01 });
    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  /* Page-level pointer spotlight */
  var cursorGlow = document.querySelector(".cursor-glow");
  if (cursorGlow && finePointer && !reducedMotion) {
    document.body.classList.add("has-pointer");
    window.addEventListener("pointermove", function (event) {
      cursorGlow.style.transform = "translate3d(" + event.clientX + "px," + event.clientY + "px,0)";
    }, { passive: true });
  }

  /* Restrained 3D interaction on the featured game */
  var tilt = document.querySelector("[data-tilt-card]");
  if (tilt && finePointer && !reducedMotion) {
    tilt.addEventListener("pointermove", function (event) {
      var rect = tilt.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width - 0.5;
      var y = (event.clientY - rect.top) / rect.height - 0.5;
      tilt.style.transform = "rotateY(" + (x * 6).toFixed(2) + "deg) rotateX(" + (-y * 6).toFixed(2) + "deg) translateY(-3px)";
    });
    tilt.addEventListener("pointerleave", function () {
      tilt.style.transform = "rotateY(0deg) rotateX(0deg) translateY(0)";
    });
  }

  /* Mouse-follow glow inside cards */
  document.querySelectorAll("[data-glow-card]").forEach(function (card) {
    if (!card.querySelector(":scope > .card-glow")) {
      var glow = document.createElement("span");
      glow.className = "card-glow";
      glow.setAttribute("aria-hidden", "true");
      card.appendChild(glow);
    }

    if (!finePointer) return;
    card.addEventListener("pointermove", function (event) {
      var rect = card.getBoundingClientRect();
      card.style.setProperty("--glow-x", (event.clientX - rect.left).toFixed(1) + "px");
      card.style.setProperty("--glow-y", (event.clientY - rect.top).toFixed(1) + "px");
    }, { passive: true });
  });

  /* Handwritten digit recognizer — uses Hussam's saved Python network from GitHub. */
  var digitRoot = document.querySelector("[data-digit-demo]");
  if (digitRoot) setupDigitDemo(digitRoot);

  function setupDigitDemo(root) {
    var canvas = root.querySelector("[data-digit-canvas]");
    var clearButton = root.querySelector("[data-digit-clear]");
    var predictButton = root.querySelector("[data-digit-predict]");
    var statusEl = root.querySelector("[data-digit-status]");
    var resultEl = root.querySelector("[data-digit-result]");
    var confidenceEl = root.querySelector("[data-digit-confidence]");
    var barsEl = root.querySelector("[data-digit-bars]");

    if (!canvas || !clearButton || !predictButton || !statusEl || !resultEl || !confidenceEl || !barsEl) return;

    var ctx = canvas.getContext("2d", { willReadFrequently: true });
    var drawing = false;
    var lastPoint = null;
    var hasInk = false;
    var autoTimer = null;
    var pyodideInstance = null;
    var modelPromise = null;
    var modelReady = false;
    var modelAccuracy = null;

    var PYODIDE_VERSION = "314.0.6";
    var PYODIDE_INDEX = "https://cdn.jsdelivr.net/pyodide/v" + PYODIDE_VERSION + "/full/";
    var MODEL_URL = "https://raw.githubusercontent.com/2HIK4/Number-Prediction/main/saved_networks/np_64n_4l_2.pkl";

    function setStatus(text, state) {
      statusEl.textContent = text;
      if (state) statusEl.setAttribute("data-state", state);
      else statusEl.removeAttribute("data-state");
    }

    function buildBars() {
      var fragment = document.createDocumentFragment();
      for (var digit = 0; digit <= 9; digit += 1) {
        var row = document.createElement("div");
        row.className = "digit-bar";
        row.setAttribute("data-digit-bar", String(digit));
        row.innerHTML = '<span class="digit-bar__label">' + digit + '</span>' +
          '<span class="digit-bar__track"><i class="digit-bar__fill"></i></span>' +
          '<span class="digit-bar__pct">0.0%</span>';
        fragment.appendChild(row);
      }
      barsEl.replaceChildren(fragment);
    }

    function updateBars(confidence, winner) {
      var rows = barsEl.querySelectorAll("[data-digit-bar]");
      rows.forEach(function (row, index) {
        var value = Number(confidence[index] || 0);
        var percent = Math.max(0, Math.min(100, value * 100));
        row.querySelector(".digit-bar__fill").style.width = percent.toFixed(2) + "%";
        row.querySelector(".digit-bar__pct").textContent = percent.toFixed(1) + "%";
        row.classList.toggle("is-winner", winner === index);
      });
    }

    function resetCanvas() {
      window.clearTimeout(autoTimer);
      ctx.save();
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      drawing = false;
      lastPoint = null;
      hasInk = false;
      resultEl.textContent = "—";
      confidenceEl.textContent = modelReady ? "Model ready — draw another digit." : "Draw a number, then predict.";
      updateBars(Array(10).fill(0), null);
      setStatus(modelReady ? "Model ready" : "Ready");
    }

    function canvasPoint(event) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left) * (canvas.width / rect.width),
        y: (event.clientY - rect.top) * (canvas.height / rect.height)
      };
    }

    function drawLine(from, to) {
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 22;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
      hasInk = true;
    }

    function startDrawing(event) {
      if (event.button !== undefined && event.button !== 0) return;
      event.preventDefault();
      drawing = true;
      lastPoint = canvasPoint(event);
      drawLine(lastPoint, lastPoint);
      if (canvas.setPointerCapture && event.pointerId !== undefined) {
        try { canvas.setPointerCapture(event.pointerId); } catch (ignore) {}
      }
      setStatus(modelReady ? "Drawing" : "Ready");
    }

    function keepDrawing(event) {
      if (!drawing) return;
      event.preventDefault();
      var point = canvasPoint(event);
      drawLine(lastPoint, point);
      lastPoint = point;
    }

    function stopDrawing(event) {
      if (!drawing) return;
      drawing = false;
      lastPoint = null;
      if (canvas.releasePointerCapture && event && event.pointerId !== undefined) {
        try { canvas.releasePointerCapture(event.pointerId); } catch (ignore) {}
      }
      if (modelReady && hasInk) {
        window.clearTimeout(autoTimer);
        autoTimer = window.setTimeout(runPrediction, 260);
      } else {
        setStatus("Ready");
      }
    }

    function getNetworkInput() {
      var full = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = full.data;
      var minX = canvas.width;
      var minY = canvas.height;
      var maxX = -1;
      var maxY = -1;

      for (var y = 0; y < canvas.height; y += 1) {
        for (var x = 0; x < canvas.width; x += 1) {
          var index = (y * canvas.width + x) * 4;
          var gray = (data[index] + data[index + 1] + data[index + 2]) / 3;
          if (gray < 245) {
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
      }

      if (maxX < 0 || maxY < 0) return null;

      var cropWidth = maxX - minX + 1;
      var cropHeight = maxY - minY + 1;
      var scale = 20 / Math.max(cropWidth, cropHeight);
      var targetWidth = Math.max(1, Math.round(cropWidth * scale));
      var targetHeight = Math.max(1, Math.round(cropHeight * scale));
      var left = Math.floor((28 - targetWidth) / 2);
      var top = Math.floor((28 - targetHeight) / 2);

      var small = document.createElement("canvas");
      small.width = 28;
      small.height = 28;
      var smallCtx = small.getContext("2d", { willReadFrequently: true });
      smallCtx.fillStyle = "#ffffff";
      smallCtx.fillRect(0, 0, 28, 28);
      smallCtx.drawImage(canvas, minX, minY, cropWidth, cropHeight, left, top, targetWidth, targetHeight);

      var smallData = smallCtx.getImageData(0, 0, 28, 28).data;
      var pixels = [];
      for (var i = 0; i < smallData.length; i += 4) {
        var pixelGray = (smallData[i] + smallData[i + 1] + smallData[i + 2]) / 3;
        pixels.push((255 - pixelGray) / 255);
      }
      return pixels;
    }

    function loadExternalScript(src) {
      return new Promise(function (resolve, reject) {
        var existing = document.querySelector('script[data-runtime-src="' + src + '"]');
        if (existing) {
          if (window.loadPyodide) resolve();
          else existing.addEventListener("load", resolve, { once: true });
          return;
        }
        var script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.crossOrigin = "anonymous";
        script.setAttribute("data-runtime-src", src);
        script.addEventListener("load", resolve, { once: true });
        script.addEventListener("error", function () { reject(new Error("Could not load the Python runtime.")); }, { once: true });
        document.head.appendChild(script);
      });
    }

    function ensureModel() {
      if (modelReady && pyodideInstance) return Promise.resolve(pyodideInstance);
      if (modelPromise) return modelPromise;

      modelPromise = (async function () {
        predictButton.disabled = true;
        setStatus("Loading runtime", "loading");
        confidenceEl.textContent = "Preparing browser-side Python…";

        await loadExternalScript(PYODIDE_INDEX + "pyodide.js");
        if (typeof window.loadPyodide !== "function") throw new Error("Python runtime did not initialize.");

        pyodideInstance = await window.loadPyodide({ indexURL: PYODIDE_INDEX });
        setStatus("Loading NumPy", "loading");
        await pyodideInstance.loadPackage("numpy");

        setStatus("Loading trained model", "loading");
        confidenceEl.textContent = "Fetching the saved network from GitHub…";
        var modelResponse = await fetch(MODEL_URL, { cache: "force-cache" });
        if (!modelResponse.ok) throw new Error("Could not fetch the saved network from GitHub.");
        var modelBytes = new Uint8Array(await modelResponse.arrayBuffer());
        pyodideInstance.FS.writeFile("/number-prediction.pkl", modelBytes);

        pyodideInstance.runPython(`
import json
import pickle
import numpy as np

class Neuron:
    pass

class NetworkUnpickler(pickle.Unpickler):
    def find_class(self, module, name):
        if name == "Neuron":
            return Neuron
        return super().find_class(module, name)

with open("/number-prediction.pkl", "rb") as model_file:
    HIDDEN_LAYERS, OUTPUT_NEURONS, MODEL_ACCURACY = NetworkUnpickler(model_file).load()

def _sigmoid(value):
    return 1.0 / (1.0 + np.exp(-value))

def _softmax(values):
    shifted = values - np.max(values)
    exp_values = np.exp(shifted)
    return exp_values / exp_values.sum()

def predict_digit_values(values):
    current = np.asarray(values, dtype=float)
    for layer in HIDDEN_LAYERS:
        current = np.asarray([
            _sigmoid(np.dot(current, neuron.weights) + neuron.bias)
            for neuron in layer
        ])

    logits = np.asarray([
        np.dot(current, neuron.weights) + neuron.bias
        for neuron in OUTPUT_NEURONS
    ])
    probabilities = _softmax(logits)
    prediction = int(np.argmax(probabilities))
    return {
        "prediction": prediction,
        "confidence": [float(value) for value in probabilities],
    }
`);

        modelAccuracy = Number(pyodideInstance.runPython("float(MODEL_ACCURACY)"));
        modelReady = true;
        setStatus("Model ready");
        confidenceEl.textContent = "Your trained network is loaded in this browser.";
        return pyodideInstance;
      })().catch(function (error) {
        modelPromise = null;
        modelReady = false;
        setStatus("Model error", "error");
        confidenceEl.textContent = "The live model could not load. The source link still opens the original project.";
        throw error;
      }).finally(function () {
        predictButton.disabled = false;
      });

      return modelPromise;
    }

    async function runPrediction() {
      window.clearTimeout(autoTimer);
      var pixels = getNetworkInput();
      if (!pixels || !hasInk) {
        resultEl.textContent = "—";
        confidenceEl.textContent = "Draw a digit from 0–9 first.";
        updateBars(Array(10).fill(0), null);
        setStatus(modelReady ? "Model ready" : "Ready");
        return;
      }

      predictButton.disabled = true;
      try {
        var runtime = await ensureModel();
        setStatus("Predicting", "loading");
        runtime.globals.set("digit_pixel_json", JSON.stringify(pixels));
        var resultJson = runtime.runPython("json.dumps(predict_digit_values(json.loads(digit_pixel_json)))");
        var result = JSON.parse(resultJson);
        var prediction = Number(result.prediction);
        var confidence = Array.isArray(result.confidence) ? result.confidence : Array(10).fill(0);
        var winningConfidence = Number(confidence[prediction] || 0);

        resultEl.textContent = String(prediction);
        updateBars(confidence, prediction);
        var accuracyText = Number.isFinite(modelAccuracy) ? " · saved model accuracy " + (modelAccuracy * 100).toFixed(1) + "%" : "";
        confidenceEl.textContent = "Confidence " + (winningConfidence * 100).toFixed(1) + "%" + accuracyText;
        setStatus("Live model");
      } catch (error) {
        console.error("Digit recognizer:", error);
      } finally {
        predictButton.disabled = false;
      }
    }

    buildBars();
    resetCanvas();

    canvas.addEventListener("pointerdown", startDrawing);
    canvas.addEventListener("pointermove", keepDrawing);
    canvas.addEventListener("pointerup", stopDrawing);
    canvas.addEventListener("pointercancel", stopDrawing);
    canvas.addEventListener("pointerleave", function (event) {
      if (drawing && event.buttons === 0) stopDrawing(event);
    });

    clearButton.addEventListener("click", resetCanvas);
    predictButton.addEventListener("click", runPrediction);
  }

  /* Quick-jump command palette */
  var commandRoot = document.querySelector("[data-command-root]");
  var commandOpeners = document.querySelectorAll("[data-command-open]");
  var commandCloser = commandRoot ? commandRoot.querySelector("[data-command-close]") : null;
  var commandLinks = commandRoot ? commandRoot.querySelectorAll("a") : [];
  var commandLastFocus = null;

  function openCommand() {
    if (!commandRoot || !commandRoot.hidden) return;
    commandLastFocus = document.activeElement;
    commandRoot.hidden = false;
    document.body.style.overflow = "hidden";
    if (commandLinks.length) commandLinks[0].focus();
  }

  function closeCommand() {
    if (!commandRoot || commandRoot.hidden) return;
    commandRoot.hidden = true;
    document.body.style.overflow = "";
    if (commandLastFocus && typeof commandLastFocus.focus === "function") commandLastFocus.focus();
  }

  commandOpeners.forEach(function (button) { button.addEventListener("click", openCommand); });
  if (commandCloser) commandCloser.addEventListener("click", closeCommand);
  Array.prototype.forEach.call(commandLinks, function (link) { link.addEventListener("click", closeCommand); });

  document.addEventListener("keydown", function (event) {
    var target = event.target;
    var typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

    if (event.key === "/" && !typing && commandRoot) {
      event.preventDefault();
      openCommand();
    }
    if (event.key === "Escape") closeCommand();

    if (!commandRoot || commandRoot.hidden || event.key !== "Tab" || !commandLinks.length) return;
    var first = commandLinks[0];
    var last = commandLinks[commandLinks.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  /* Lightbox */
  var lightboxRoot = document.querySelector("[data-lightbox-root]");
  if (!lightboxRoot) return;

  var lightboxImg = lightboxRoot.querySelector("[data-lightbox-img]");
  var lightboxCaption = lightboxRoot.querySelector("[data-lightbox-caption]");
  var closeBtn = lightboxRoot.querySelector("[data-lightbox-close]");
  var lastFocused = null;

  function openLightbox(trigger) {
    var full = trigger.getAttribute("data-full");
    var cap = trigger.getAttribute("data-caption") || "";
    if (!full) return;
    lastFocused = trigger;
    lightboxImg.src = full;
    lightboxImg.alt = cap;
    lightboxCaption.textContent = cap;
    lightboxRoot.hidden = false;
    closeBtn.focus();
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightboxRoot.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll("[data-lightbox]").forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      openLightbox(trigger);
    });
  });
  closeBtn.addEventListener("click", closeLightbox);
  lightboxRoot.addEventListener("click", function (event) { if (event.target === lightboxRoot) closeLightbox(); });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !lightboxRoot.hidden) closeLightbox();
  });
})();
