(function () {
  const deckEl = document.getElementById("deck");
  const data = window.DECK;
  if (!deckEl || !data) return;

  const slides = data.slides || [];
  let index = Math.max(0, Number(location.hash.replace("#", "")) - 1) || 0;
  if (index >= slides.length) index = 0;

  let notesOn = false;

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function inline(s) {
    return escapeHtml(s)
      .replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  }

  const LANGUAGE_ALIASES = {
    kt: "kotlin", kts: "kotlin", kotlin: "kotlin",
    java: "java", xml: "xml", html: "xml",
    gradle: "gradle", groovy: "gradle",
    sh: "shell", shell: "shell", bash: "shell", console: "shell",
    json: "json", sql: "sql", md: "markdown", markdown: "markdown"
  };

  const KEYWORDS = {
    kotlin: new Set("as break class continue do else false for fun if in interface is null object package return super this throw true try typealias typeof val var when while by catch constructor delegate dynamic field file finally get import init param property receiver set setparam where actual abstract annotation companion const crossinline data enum expect external final infix inline inner internal lateinit noinline open operator out override private protected public reified sealed suspend tailrec vararg field it".split(" ")),
    java: new Set("abstract assert boolean break byte case catch char class const continue default do double else enum extends final finally float for goto if implements import instanceof int interface long native new null package private protected public return short static strictfp super switch synchronized this throw throws transient true try void volatile while record sealed permits non-sealed var".split(" ")),
    gradle: new Set("plugins pluginManagement repositories dependencies implementation api compileOnly runtimeOnly testImplementation android namespace compileSdk defaultConfig applicationId minSdk targetSdk versionCode versionName buildTypes release debug signingConfigs sourceSets kotlinOptions jvmTarget id alias version project fileTree include exclude true false null def val var fun class return if else for in".split(" ")),
    shell: new Set("if then else elif fi for while in do done case esac function select time until echo cd pwd export set unset source alias return exit local readonly shift getopts true false".split(" ")),
    json: new Set("true false null".split(" ")),
    sql: new Set("select from where insert into update delete create table alter drop join inner left right full outer on as and or not null is in exists group by order having limit offset distinct union all values set primary key foreign references index view case when then else end asc desc".split(" "))
  };

  const TYPE_WORDS = new Set("String Int Long Short Byte Double Float Boolean Char Unit Any Nothing List MutableList Set MutableSet Map MutableMap Array Flow StateFlow LiveData ViewModel Activity Fragment Bundle Context Intent RecyclerView View TextView Button ImageView CoroutineScope Result Retrofit Room Entity Dao Query Serializable Parcelable void int long short byte double float boolean char Object Integer Exception".split(" "));

  function token(type, value) {
    return `<span class="tok-${type}">${escapeHtml(value)}</span>`;
  }

  function highlightXml(code) {
    return escapeHtml(code).replace(
      /(&lt;\/?)([\w:.-]+)|([\w:.-]+)(=)(&quot;.*?&quot;)|(&lt;!--[\s\S]*?--&gt;)/g,
      (m, bracket, tag, attr, eq, value, comment) => {
        if (comment) return `<span class="tok-comment">${comment}</span>`;
        if (tag) return `<span class="tok-punctuation">${bracket}</span><span class="tok-tag">${tag}</span>`;
        return `<span class="tok-attribute">${attr}</span><span class="tok-punctuation">${eq}</span><span class="tok-string">${value}</span>`;
      }
    );
  }

  function highlightCode(code, rawLanguage) {
    const language = LANGUAGE_ALIASES[String(rawLanguage || "").toLowerCase()] || "plain";
    if (language === "xml") return highlightXml(code);
    const words = KEYWORDS[language] || KEYWORDS.kotlin;
    let out = "";
    let i = 0;
    while (i < code.length) {
      const rest = code.slice(i);
      let match;
      if ((match = rest.match(/^(\/\/|#)[^\n]*/))) {
        out += token("comment", match[0]); i += match[0].length; continue;
      }
      if ((match = rest.match(/^\/\*[\s\S]*?\*\//))) {
        out += token("comment", match[0]); i += match[0].length; continue;
      }
      if ((match = rest.match(/^("""[\s\S]*?"""|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")/))) {
        out += token("string", match[0]); i += match[0].length; continue;
      }
      if ((match = rest.match(/^@[A-Za-z_][\w.]*/))) {
        out += token("annotation", match[0]); i += match[0].length; continue;
      }
      if ((match = rest.match(/^\b(?:0x[\da-fA-F]+|\d+(?:\.\d+)?[fFdDL]?)\b/))) {
        out += token("number", match[0]); i += match[0].length; continue;
      }
      if ((match = rest.match(/^[A-Za-z_$][\w$-]*/))) {
        const word = match[0];
        const after = rest.slice(word.length);
        if (words.has(word) || words.has(word.toLowerCase())) out += token("keyword", word);
        else if (TYPE_WORDS.has(word) || /^[A-Z][A-Za-z0-9_$]*$/.test(word)) out += token("type", word);
        else if (/^\s*\(/.test(after)) out += token("function", word);
        else if (/^\s*:/.test(after) && language === "json") out += token("property", word);
        else out += escapeHtml(word);
        i += word.length; continue;
      }
      if ((match = rest.match(/^(===|!==|==|!=|<=|>=|&&|\|\||::|->|=>|[+*/%=&|!<>?:.-])/))) {
        out += token("operator", match[0]); i += match[0].length; continue;
      }
      out += escapeHtml(code[i]); i += 1;
    }
    return out;
  }

  function inferLanguage(code, declared) {
    const explicit = LANGUAGE_ALIASES[String(declared || "").toLowerCase()];
    if (explicit) return explicit;
    if (/^\s*</m.test(code) && /<\/?[A-Za-z]/.test(code)) return "xml";
    if (/^\s*[{[]/.test(code) && /"[^"]+"\s*:/.test(code)) return "json";
    if (/^\s*#{1,6}\s|^\s*-\s+/m.test(code)) return "markdown";
    if (/\b(SELECT|INSERT|UPDATE|DELETE|CREATE TABLE)\b/i.test(code)) return "sql";
    if (/\b(public|private|class|void|static)\b/.test(code) && /;/.test(code)) return "java";
    if (/\b(fun|val|var|data class|suspend)\b/.test(code)) return "kotlin";
    if (/^\s*(git|gradle|\.\/gradlew|adb|cd|mkdir|npm|curl)\b/m.test(code)) return "shell";
    return "plain";
  }

  function highlightByLanguage(code, language) {
    if (language === "markdown") {
      return escapeHtml(code)
        .replace(/^(#{1,6})(\s+.+)$/gm, '<span class="tok-keyword">$1</span><span class="tok-type">$2</span>')
        .replace(/^(\s*-\s+)/gm, '<span class="tok-operator">$1</span>');
    }
    return highlightCode(code, language);
  }

  function renderMarkdown(src) {
    if (!src) return "";
    const lines = src.replace(/\r\n/g, "\n").split("\n");
    let html = "";
    let i = 0;

    const flushPara = (buf) => {
      const t = buf.join(" ").trim();
      if (t) html += `<p>${inline(t)}</p>`;
    };

    while (i < lines.length) {
      const line = lines[i];

      if (line.trim().startsWith("```")) {
        const lang = line.trim().slice(3);
        const code = [];
        i += 1;
        while (i < lines.length && !lines[i].trim().startsWith("```")) {
          code.push(lines[i]);
          i += 1;
        }
        const rawCode = code.join("\n");
        const normalizedLang = inferLanguage(rawCode, lang);
        html += `<pre data-lang="${escapeHtml(normalizedLang)}"><code class="language-${escapeHtml(normalizedLang)}">${highlightByLanguage(rawCode, normalizedLang)}</code></pre>`;
        i += 1;
        continue;
      }

      if (line.trim().startsWith("|")) {
        const rows = [];
        while (i < lines.length && lines[i].trim().startsWith("|")) {
          rows.push(lines[i]);
          i += 1;
        }
        const parsed = rows
          .filter((r) => !/^\s*\|?\s*:?-{3,}/.test(r.replace(/\|/g, "").trim()) && !/^\s*\|?\s*-+\s*\|/.test(r))
          .map((r) =>
            r
              .trim()
              .replace(/^\|/, "")
              .replace(/\|$/, "")
              .split("|")
              .map((c) => c.trim())
          )
          .filter((cells) => cells.some((c) => c) && !cells.every((c) => /^:?-{3,}:?$/.test(c)));
        if (parsed.length) {
          const head = parsed[0];
          const body = parsed.slice(1);
          html += "<table><thead><tr>" + head.map((c) => `<th>${inline(c)}</th>`).join("") + "</tr></thead>";
          if (body.length) {
            html += "<tbody>" + body.map((r) => "<tr>" + r.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>").join("") + "</tbody>";
          }
          html += "</table>";
        }
        continue;
      }

      if (/^\s*-\s+\[[ xX]\]\s+/.test(line)) {
        html += '<ul class="check">';
        while (i < lines.length && /^\s*-\s+\[[ xX]\]\s+/.test(lines[i])) {
          const text = lines[i].replace(/^\s*-\s+\[[ xX]\]\s+/, "");
          html += `<li><span class="box"></span><span>${inline(text)}</span></li>`;
          i += 1;
        }
        html += "</ul>";
        continue;
      }

      if (/^\s*-\s+/.test(line)) {
        html += "<ul>";
        while (i < lines.length && /^\s*-\s+/.test(lines[i]) && !/^\s*-\s+\[[ xX]\]/.test(lines[i])) {
          html += `<li>${inline(lines[i].replace(/^\s*-\s+/, ""))}</li>`;
          i += 1;
        }
        html += "</ul>";
        continue;
      }

      if (/^\s*\d+\.\s+/.test(line)) {
        html += "<ol>";
        while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
          html += `<li>${inline(lines[i].replace(/^\s*\d+\.\s+/, ""))}</li>`;
          i += 1;
        }
        html += "</ol>";
        continue;
      }

      if (!line.trim()) {
        i += 1;
        continue;
      }

      const para = [];
      while (i < lines.length && lines[i].trim() && !/^\s*[-|`]/.test(lines[i]) && !/^\s*\d+\.\s+/.test(lines[i])) {
        para.push(lines[i]);
        i += 1;
      }
      flushPara(para);
    }

    return html;
  }

  function slideClass(type) {
    if (type === "section") return "slide is-section";
    if (type === "title") return "slide is-title";
    if (type === "teacher") return "slide is-teacher";
    if (type === "practice") return "slide is-practice";
    if (type === "homework") return "slide is-homework";
    return "slide is-content";
  }

  function chooseLayout(s) {
    if (s.layout) return String(s.layout);
    if (s.imageKind === "screenshot") return "screenshot";
    if (s.imageKind === "visual") return "visual";
    if (s.image) return "media";
    const body = s.body || "";
    const codeBlocks = (body.match(/```/g) || []).length / 2;
    const bullets = (body.match(/^\s*-\s+/gm) || []).length;
    const checks = (body.match(/^\s*-\s+\[[ xX]\]/gm) || []).length;
    const steps = (body.match(/^\s*\d+\.\s+/gm) || []).length;
    if (s.type === "section") return body.trim() ? "section-detail" : "section-clean";
    if (s.type === "title") return "cover";
    if (s.type === "teacher") return "portrait";
    if (/^\s*\|/m.test(body)) return "table-focus";
    if (checks >= 3) return "checklist";
    if (codeBlocks && (bullets >= 2 || steps >= 2 || body.split("\n\n").length > 2)) return "code-split";
    if (codeBlocks) return "code-focus";
    if (steps >= 3) return "steps";
    if (bullets >= 6) return "list-columns";
    if (bullets >= 3) return "list-focus";
    if (body.length < 220) return "statement";
    return "editorial";
  }

  function badgeClass(badge) {
    if (!badge) return "";
    if (/домашн/i.test(badge)) return "badge is-hw";
    return "badge";
  }

  function renderSlide(s, i) {
    const el = document.createElement("section");
    el.className = slideClass(s.type);
    const layout = chooseLayout(s);
    el.classList.add(`layout-${layout.replace(/[^a-z0-9-]/gi, "-").toLowerCase()}`);
    el.dataset.layout = layout;
    el.dataset.index = String(i);

    const badge = s.badge ? `<span class="${badgeClass(s.badge)}">${escapeHtml(s.badge)}</span>` : "";
    const brand = `<div class="slide-top"><span class="brand">${escapeHtml(data.course)} · лекция ${data.lectureId}</span>${badge}</div>`;

    if (s.type === "section") {
      const sectionNumber = slides.slice(0, i + 1).filter((slide) => slide.type === "section").length;
      const followingTitles = [];
      for (let nextIndex = i + 1; nextIndex < slides.length && followingTitles.length < 4; nextIndex += 1) {
        if (slides[nextIndex].type === "section") break;
        if (slides[nextIndex].title) followingTitles.push(slides[nextIndex].title);
      }
      const sectionBody = s.body || followingTitles.map((title) => `- ${title}`).join("\n");
      el.innerHTML = `
        ${brand}
        <div class="section-layout">
          <div class="section-marker">
            <span class="section-label">Раздел</span>
            <span class="section-number">${String(sectionNumber).padStart(2, "0")}</span>
          </div>
          <div class="section-copy">
            <h1>${escapeHtml(s.title || "")}</h1>
            ${s.subtitle ? `<p class="subtitle">${escapeHtml(s.subtitle)}</p>` : ""}
            ${sectionBody ? `<div class="body section-body"><span class="section-body-label">В этом разделе</span>${renderMarkdown(sectionBody)}</div>` : ""}
            ${s.outcome ? `<p class="section-outcome"><span>Результат</span>${escapeHtml(s.outcome)}</p>` : ""}
          </div>
        </div>`;
      return el;
    }

    let inner = "";
    if (s.kicker) inner += `<div class="kicker">${escapeHtml(s.kicker)}</div>`;
    inner += `<h1>${escapeHtml(s.title || "")}</h1>`;
    if (s.subtitle) inner += `<p class="subtitle">${escapeHtml(s.subtitle)}</p>`;

    if (s.type === "teacher" && data.photo) {
      inner = `
        ${brand}
        <div class="teacher-layout">
          <img class="portrait" src="${escapeHtml(data.photo)}" alt="${escapeHtml(data.teacher)}" />
          <div>
            <h1>${escapeHtml(s.title || "")}</h1>
            ${s.subtitle ? `<p class="subtitle">${escapeHtml(s.subtitle)}</p>` : ""}
            <div class="body">${renderMarkdown(s.body || "")}</div>
          </div>
        </div>`;
      el.innerHTML = inner;
      return el;
    }

    if (s.image) {
      const imageAlt = s.imageAlt || s.title || "Иллюстрация";
      inner = `
        ${s.kicker ? `<div class="kicker">${escapeHtml(s.kicker)}</div>` : ""}
        <h1>${escapeHtml(s.title || "")}</h1>
        ${s.subtitle ? `<p class="subtitle">${escapeHtml(s.subtitle)}</p>` : ""}
        <div class="media-layout">
          <div class="body">${renderMarkdown(s.body || "")}</div>
          <figure class="slide-figure">
            <img src="${escapeHtml(s.image)}" alt="${escapeHtml(imageAlt)}" />
            ${s.imageCaption ? `<figcaption>${escapeHtml(s.imageCaption)}</figcaption>` : ""}
          </figure>
        </div>`;
      el.innerHTML = brand + inner;
      return el;
    }

    inner += `<div class="body">${renderMarkdown(s.body || "")}</div>`;
    el.innerHTML = brand + inner;

    if (s.type === "title" && data.photo) {
      const img = document.createElement("img");
      img.className = "tiny-portrait";
      img.src = data.photo;
      img.alt = data.teacher;
      el.appendChild(img);
    }
    return el;
  }

  slides.forEach((s, i) => deckEl.appendChild(renderSlide(s, i)));

  const chrome = document.createElement("div");
  chrome.className = "chrome";
  chrome.innerHTML = `
    <div class="progress" id="progress"></div>
    <button class="nav-btn" id="home" type="button">Курс</button>
    <button class="nav-btn" id="prev" type="button">←</button>
    <button class="nav-btn" id="next" type="button">→</button>
    <button class="nav-btn" id="fs" type="button">Экран</button>
    <span class="hint">стрелки · пробел · F полноэкранный · N заметки</span>
    <span class="counter" id="counter"></span>
  `;
  document.body.appendChild(chrome);

  const notes = document.createElement("aside");
  notes.className = "notes";
  notes.id = "notes";
  document.body.appendChild(notes);

  function go(to) {
    index = Math.max(0, Math.min(slides.length - 1, to));
    deckEl.querySelectorAll(".slide").forEach((el, i) => {
      el.classList.toggle("is-on", i === index);
    });
    document.getElementById("counter").textContent = `${index + 1} / ${slides.length}`;
    document.getElementById("progress").style.width = `${((index + 1) / slides.length) * 100}%`;
    document.getElementById("prev").disabled = index === 0;
    document.getElementById("next").disabled = index === slides.length - 1;
    const n = slides[index].notes || "";
    notes.innerHTML = n ? `<strong>Заметки.</strong> ${escapeHtml(n)}` : "Заметок нет.";
    history.replaceState(null, "", `#${index + 1}`);
  }

  function next() {
    go(index + 1);
  }
  function prev() {
    go(index - 1);
  }

  document.getElementById("next").addEventListener("click", next);
  document.getElementById("prev").addEventListener("click", prev);
  document.getElementById("home").addEventListener("click", () => {
    location.href = data.hub || "../../index.html";
  });
  document.getElementById("fs").addEventListener("click", () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else document.exitFullscreen();
  });

  document.addEventListener("keydown", (e) => {
    if (["ArrowRight", "PageDown", " ", "Enter"].includes(e.key)) {
      e.preventDefault();
      next();
    } else if (["ArrowLeft", "PageUp", "Backspace"].includes(e.key)) {
      e.preventDefault();
      prev();
    } else if (e.key === "Home") {
      go(0);
    } else if (e.key === "End") {
      go(slides.length - 1);
    } else if (e.key === "f" || e.key === "F" || e.key === "а" || e.key === "А") {
      document.getElementById("fs").click();
    } else if (e.key === "n" || e.key === "N" || e.key === "т" || e.key === "Т") {
      notesOn = !notesOn;
      notes.classList.toggle("is-on", notesOn);
    } else if (e.key === "Escape") {
      notesOn = false;
      notes.classList.remove("is-on");
    }
  });

  let touchX = null;
  document.addEventListener(
    "touchstart",
    (e) => {
      touchX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );
  document.addEventListener(
    "touchend",
    (e) => {
      if (touchX == null) return;
      const dx = e.changedTouches[0].screenX - touchX;
      if (dx < -50) next();
      if (dx > 50) prev();
      touchX = null;
    },
    { passive: true }
  );

  go(index);
})();
