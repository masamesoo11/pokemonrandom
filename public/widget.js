/*!
 * PokémonRandom embeddable widgets — free, no signup, no API key.
 * Docs & more widgets: https://pokemonrandom.com/widgets/
 *
 * Usage (Random Pokémon Generator):
 *   <script async src="https://pokemonrandom.com/widget.js"></script>
 *   <div class="pokemonrandom-widget"></div>
 *
 * Usage (Type Effectiveness Lookup):
 *   <div class="pokemonrandom-widget" data-widget="types"></div>
 *
 * The visible "Powered by PokémonRandom" link may be styled but must stay
 * in place (it is what keeps these widgets free).
 */
(function () {
  "use strict";

  var BASE = "https://pokemonrandom.com/";
  var API = "https://pokeapi.co/api/v2/pokemon/";
  var ART =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

  var TYPE_COLORS = {
    normal: "#9099A1", fire: "#FF9D55", water: "#5090D6", electric: "#F9D94C",
    grass: "#63BC5A", ice: "#73CEC0", fighting: "#CE4069", poison: "#AB6AC8",
    ground: "#D97845", flying: "#8FA9DE", psychic: "#FA7179", bug: "#90C12C",
    rock: "#C7B78B", ghost: "#5269AC", dragon: "#0B6DC3", dark: "#5A5465",
    steel: "#5A8EA1", fairy: "#EC8FE6"
  };

  /* attack type -> { defending type : multiplier } (1x omitted) */
  var TYPE_CHART = {
    normal: { rock: 0.5, ghost: 0, steel: 0.5 },
    fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
    water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
    electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
    grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
    ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
    fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
    poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
    ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
    flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
    psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
    bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
    rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
    ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
    dragon: { dragon: 2, steel: 0.5, fairy: 0 },
    dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
    steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
    fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 }
  };

  var TYPE_ORDER = [
    "normal", "fire", "water", "electric", "grass", "ice", "fighting",
    "poison", "ground", "flying", "psychic", "bug", "rock", "ghost",
    "dragon", "dark", "steel", "fairy"
  ];

  var TYPE_LABELS = {
    normal: "Normal", fire: "Fire", water: "Water", electric: "Electric",
    grass: "Grass", ice: "Ice", fighting: "Fighting", poison: "Poison",
    ground: "Ground", flying: "Flying", psychic: "Psychic", bug: "Bug",
    rock: "Rock", ghost: "Ghost", dragon: "Dragon", dark: "Dark",
    steel: "Steel", fairy: "Fairy"
  };

  function isDark() {
    try {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch (e) {
      return false;
    }
  }

  function theme() {
    var dark = isDark();
    return dark
      ? { bg: "#17171f", card: "#1f1f2b", border: "#34344a", text: "#f2f2f7", sub: "#9a9aad", btn: "#e3350d", btnText: "#fff" }
      : { bg: "#f6f7f9", card: "#ffffff", border: "#e3e5ea", text: "#1c1c28", sub: "#6b7280", btn: "#e3350d", btnText: "#fff" };
  }

  function el(tag, css, html) {
    var e = document.createElement(tag);
    if (css) e.style.cssText = css;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function fmt(name) {
    return String(name)
      .split("-")
      .map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); })
      .join(" ");
  }

  function badge(type, t) {
    return el(
      "span",
      "display:inline-block;padding:3px 12px;border-radius:999px;color:#fff;" +
        "font:600 11px/1.5 -apple-system,'Segoe UI',Roboto,Arial,sans-serif;" +
        "text-transform:uppercase;letter-spacing:.4px;background:" +
        (TYPE_COLORS[type] || "#8a8a9a"),
      TYPE_LABELS[type] || fmt(type)
    );
  }

  /* Shared, visible attribution — keeps the widgets free. */
  function credit(t) {
    var wrap = el(
      "div",
      "text-align:right;font:400 11px/1.6 -apple-system,'Segoe UI',Roboto,Arial,sans-serif;" +
        "color:" + t.sub + ";margin-top:10px"
    );
    var a = document.createElement("a");
    a.href = BASE;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "Powered by PokémonRandom";
    a.style.cssText = "color:" + t.sub + ";text-decoration:underline;text-underline-offset:2px";
    wrap.appendChild(a);
    return wrap;
  }

  /* ------------------------------------------------------------------ */
  /* Widget 1 — Random Pokémon Generator                                 */
  /* ------------------------------------------------------------------ */
  function randomWidget(container) {
    var t = theme();
    container.style.cssText =
      "max-width:560px;box-sizing:border-box;padding:16px;border-radius:16px;" +
      "background:" + t.card + ";border:1px solid " + t.border + ";font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif";

    var title = el(
      "div",
      "font-weight:700;font-size:15px;color:" + t.text + ";margin-bottom:12px",
      "Random Pok&eacute;mon"
    );

    var body = el(
      "div",
      "display:flex;gap:16px;align-items:center;flex-wrap:wrap"
    );

    var imgBox = el(
      "div",
      "flex:0 0 128px;width:128px;height:128px;border-radius:12px;background:" +
        t.bg + ";display:flex;align-items:center;justify-content:center;overflow:hidden"
    );
    var img = document.createElement("img");
    img.alt = "";
    img.width = 112;
    img.height = 112;
    img.style.cssText = "width:112px;height:112px;object-fit:contain";
    imgBox.appendChild(img);

    var info = el("div", "flex:1;min-width:200px");
    var nameEl = el(
      "div",
      "font-weight:800;font-size:20px;color:" + t.text,
      "Press Generate"
    );
    var idEl = el(
      "div",
      "font:500 12px/1.6 ui-monospace,SFMono-Regular,Menlo,monospace;color:" + t.sub,
      "&mdash;"
    );
    var typesEl = el("div", "display:flex;gap:6px;margin:10px 0 12px;flex-wrap:wrap");
    info.appendChild(nameEl);
    info.appendChild(idEl);
    info.appendChild(typesEl);

    var btn = el(
      "button",
      "appearance:none;border:0;cursor:pointer;border-radius:10px;padding:10px 18px;" +
        "background:" + t.btn + ";color:" + t.btnText +
        ";font:700 14px/1 -apple-system,'Segoe UI',Roboto,Arial,sans-serif",
      "Generate"
    );
    btn.type = "button";
    info.appendChild(btn);

    body.appendChild(imgBox);
    body.appendChild(info);

    container.appendChild(title);
    container.appendChild(body);
    container.appendChild(credit(t));

    function render(p) {
      img.src = ART + p.id + ".png";
      img.alt = fmt(p.name);
      nameEl.innerHTML =
        '<a href="' + BASE + "pokemon/" + p.id + '/" target="_blank" rel="noopener" ' +
        'style="color:' + t.text + ';text-decoration:none">' + fmt(p.name) + "</a>";
      idEl.textContent = "#" + String(p.id).padStart(4, "0");
      typesEl.innerHTML = "";
      (p.types || []).forEach(function (slot) {
        typesEl.appendChild(badge(slot.type.name, t));
      });
    }

    function generate() {
      btn.disabled = true;
      btn.textContent = "\u2026";
      var id = 1 + Math.floor(Math.random() * 1025);
      fetch(API + id)
        .then(function (r) { return r.json(); })
        .then(function (p) { render(p); })
        .catch(function () {
          nameEl.textContent = "Connection error";
          idEl.textContent = "Please try again";
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = "Generate";
        });
    }

    btn.addEventListener("click", generate);
    generate();
  }

  /* ------------------------------------------------------------------ */
  /* Widget 2 — Type Effectiveness Lookup                                */
  /* ------------------------------------------------------------------ */
  function typesWidget(container) {
    var t = theme();
    container.style.cssText =
      "max-width:560px;box-sizing:border-box;padding:16px;border-radius:16px;" +
      "background:" + t.card + ";border:1px solid " + t.border + ";font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif";

    var title = el(
      "div",
      "font-weight:700;font-size:15px;color:" + t.text + ";margin-bottom:12px",
      "Type Effectiveness"
    );

    var select = document.createElement("select");
    select.style.cssText =
      "width:100%;box-sizing:border-box;padding:9px 12px;border-radius:10px;" +
      "border:1px solid " + t.border + ";background:" + t.bg + ";color:" + t.text +
      ";font:600 14px/1.4 -apple-system,'Segoe UI',Roboto,Arial,sans-serif;outline:none";
    TYPE_ORDER.forEach(function (type) {
      var o = document.createElement("option");
      o.value = type;
      o.textContent = TYPE_LABELS[type] + " (attacking)";
      select.appendChild(o);
    });

    var out = el("div", "margin-top:12px");

    function group(label, list, color) {
      var row = el(
        "div",
        "font:400 13px/1.7 -apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:" + t.sub,
        ""
      );
      var b = el("strong", "color:" + color, label + ": ");
      row.appendChild(b);
      if (!list.length) {
        row.appendChild(document.createTextNode("none"));
      } else {
        list.forEach(function (type, i) {
          row.appendChild(badge(type, t));
          row.appendChild(document.createTextNode(i < list.length - 1 ? " " : ""));
        });
      }
      return row;
    }

    function update() {
      var chart = TYPE_CHART[select.value] || {};
      var superEff = [], weak = [], immune = [];
      TYPE_ORDER.forEach(function (def) {
        var m = chart[def];
        if (m === 2) superEff.push(def);
        else if (m === 0.5) weak.push(def);
        else if (m === 0) immune.push(def);
      });
      out.innerHTML = "";
      out.appendChild(group("2\u00d7 Super effective", superEff, "#16a34a"));
      out.appendChild(group("\u00bd\u00d7 Not very effective", weak, "#d97706"));
      out.appendChild(group("0\u00d7 No effect", immune, "#6b7280"));
    }

    select.addEventListener("change", update);
    update();

    container.appendChild(title);
    container.appendChild(select);
    container.appendChild(out);
    container.appendChild(credit(t));
  }

  /* ------------------------------------------------------------------ */
  /* Bootstrap                                                            */
  /* ------------------------------------------------------------------ */
  function init() {
    var nodes = document.querySelectorAll(".pokemonrandom-widget");
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.getAttribute("data-pr-initialized")) continue;
      n.setAttribute("data-pr-initialized", "1");
      if (n.getAttribute("data-widget") === "types") {
        typesWidget(n);
      } else {
        randomWidget(n);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
