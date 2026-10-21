import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CSS_PATH = ROOT / "css" / "deck.css"
JS_PATH = ROOT / "js" / "deck.js"

# 1. Update css/deck.css
css_text = CSS_PATH.read_text(encoding="utf-8").replace("\r\n", "\n")

old_css_pattern = r"\.notes\s*\{[^}]*\}\s*\.notes\.is-on\s*\{[^}]*\}"

new_css = """
.nav-btn-info {
  font-family: var(--mono);
  font-weight: 800;
  font-style: italic;
  font-size: 16px;
  min-width: 42px;
  color: var(--blue);
  border-color: rgba(11, 87, 208, 0.28);
  background: #f0f7ff;
  transition: all 0.15s ease;
}

.nav-btn-info:hover {
  background: #e1effe;
  border-color: var(--blue);
}

.nav-btn-info.is-active {
  background: var(--blue);
  color: #ffffff;
  border-color: var(--blue);
  box-shadow: 0 2px 8px rgba(11, 87, 208, 0.35);
}

/* Speaker Notes Drawer (Right Side Panel) */
.speaker-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 72px;
  width: clamp(340px, 32vw, 500px);
  background: var(--surface);
  border-left: 1px solid var(--line);
  box-shadow: -8px 0 32px rgba(26, 28, 30, 0.14);
  z-index: 20;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}

.speaker-panel.is-open {
  transform: translateX(0);
}

.speaker-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: #f8fafc;
  border-bottom: 1px solid var(--line);
}

.speaker-panel-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--blue);
}

.speaker-panel-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--blue);
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  font-family: var(--mono);
}

.speaker-panel-close {
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--muted);
  font-size: 18px;
  transition: background 0.15s, color 0.15s;
}

.speaker-panel-close:hover {
  background: #e2e8f0;
  color: var(--ink);
}

.speaker-panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.speaker-slide-meta {
  padding-bottom: 12px;
  border-bottom: 1px solid var(--line);
}

.speaker-slide-num {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--green-dark);
  margin-bottom: 4px;
}

.speaker-slide-heading {
  margin: 0 0 4px;
  font-size: 19px;
  font-weight: 750;
  line-height: 1.3;
  color: var(--ink);
}

.speaker-slide-sub {
  font-size: 13px;
  color: var(--muted);
}

.speaker-card {
  background: #f8fafc;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 14px 16px;
}

.speaker-card-primary {
  background: #f0f7ff;
  border-color: #c7dffd;
}

.speaker-card-tip {
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.speaker-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 700;
  color: var(--ink);
}

.speaker-card-primary .speaker-card-header {
  color: var(--blue);
}

.speaker-card-tip .speaker-card-header {
  color: var(--green-dark);
}

.speaker-card-icon {
  font-size: 16px;
}

.speaker-card-body {
  font-size: 14px;
  line-height: 1.55;
  color: var(--ink);
}

.speaker-card-body p {
  margin: 0 0 8px;
}

.speaker-card-body p:last-child {
  margin-bottom: 0;
}

.speaker-card-body ul,
.speaker-card-body ol {
  margin: 0;
  padding-left: 20px;
}

.speaker-card-body li {
  margin-bottom: 6px;
}

.speaker-card-body pre {
  margin: 8px 0;
  padding: 10px;
  background: var(--code-bg);
  color: var(--code-ink);
  border-radius: 8px;
  font: 12px/1.4 var(--mono);
  overflow-x: auto;
}

.speaker-card-body code {
  font-family: var(--mono);
  font-size: 0.9em;
  background: rgba(0, 0, 0, 0.06);
  padding: 2px 5px;
  border-radius: 4px;
}

.speaker-empty {
  color: var(--muted);
  font-style: italic;
}

/* Adjust slides layout on wide screens when speaker panel is open */
@media (min-width: 1080px) {
  body.speaker-panel-open .slide {
    right: clamp(340px, 32vw, 500px);
    transition: right 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  }
}
"""

if not re.search(old_css_pattern, css_text):
    print("Error: Could not find old .notes pattern in css/deck.css")
else:
    css_text = re.sub(old_css_pattern, new_css.strip(), css_text, count=1)
    CSS_PATH.write_text(css_text, encoding="utf-8")
    print("Updated css/deck.css successfully!")

# 2. Update js/deck.js
js_text = JS_PATH.read_text(encoding="utf-8").replace("\r\n", "\n")

old_chrome_block = """  const chrome = document.createElement("div");
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
  document.body.appendChild(notes);"""

new_chrome_and_speaker_block = """  const chrome = document.createElement("div");
  chrome.className = "chrome";
  chrome.innerHTML = `
    <div class="progress" id="progress"></div>
    <button class="nav-btn" id="home" type="button">Курс</button>
    <button class="nav-btn" id="prev" type="button">←</button>
    <button class="nav-btn" id="next" type="button">→</button>
    <button class="nav-btn" id="fs" type="button">Экран</button>
    <button class="nav-btn nav-btn-info" id="info" type="button" title="Материал для лектора (i)" aria-label="Материал для лектора">i</button>
    <span class="hint">стрелки · пробел · F экран · I лектору</span>
    <span class="counter" id="counter"></span>
  `;
  document.body.appendChild(chrome);

  const speakerPanel = document.createElement("aside");
  speakerPanel.className = "speaker-panel";
  speakerPanel.id = "speaker-panel";
  speakerPanel.setAttribute("aria-label", "Материал для лектора");
  speakerPanel.innerHTML = `
    <div class="speaker-panel-header">
      <div class="speaker-panel-title">
        <span class="speaker-panel-badge">i</span>
        <span>Материал для лектора</span>
      </div>
      <button class="speaker-panel-close" id="speaker-close" type="button" title="Закрыть панель (Esc)">✕</button>
    </div>
    <div class="speaker-panel-content" id="speaker-content"></div>
  `;
  document.body.appendChild(speakerPanel);

  function toggleSpeakerPanel(force) {
    notesOn = typeof force === "boolean" ? force : !notesOn;
    speakerPanel.classList.toggle("is-open", notesOn);
    document.body.classList.toggle("speaker-panel-open", notesOn);
    const infoBtn = document.getElementById("info");
    if (infoBtn) infoBtn.classList.toggle("is-active", notesOn);
    if (notesOn) {
      updateSpeakerPanel();
    }
  }

  function updateSpeakerPanel() {
    const s = slides[index];
    if (!s) return;
    const speakerContent = document.getElementById("speaker-content");
    if (!speakerContent) return;

    let html = `
      <div class="speaker-slide-meta">
        <div class="speaker-slide-num">Слайд ${index + 1} из ${slides.length}</div>
        <h3 class="speaker-slide-heading">${escapeHtml(s.title || "Без названия")}</h3>
        ${s.subtitle ? `<div class="speaker-slide-sub">${escapeHtml(s.subtitle)}</div>` : ""}
      </div>
    `;

    // 1. Spoken lecture notes
    const lectureNotes = s.notes ? renderMarkdown(s.notes) : "";
    html += `
      <div class="speaker-card speaker-card-primary">
        <div class="speaker-card-header">
          <span class="speaker-card-icon">🎙️</span>
          <strong>Что рассказать аудитории</strong>
        </div>
        <div class="speaker-card-body">
          ${lectureNotes ? lectureNotes : '<p class="speaker-empty">Для этого слайда лектор комментирует тезисы на экране своими словами.</p>'}
        </div>
      </div>
    `;

    // 2. Key slide points
    if (s.body) {
      html += `
        <div class="speaker-card">
          <div class="speaker-card-header">
            <span class="speaker-card-icon">📋</span>
            <strong>Тезисы на слайде</strong>
          </div>
          <div class="speaker-card-body">
            ${renderMarkdown(s.body)}
          </div>
        </div>
      `;
    }

    // 3. Pedagogical tip based on content type
    let tip = "";
    if (s.type === "practice") {
      tip = "<strong>Интерактив / Практика:</strong> Дайте студентам 1–2 минуты самостоятельно проанализировать код или ответить на вопрос. Выслушайте 2–3 гипотезы из зала, затем объясните правильное решение.";
    } else if (s.image) {
      tip = `<strong>Схема / Иллюстрация:</strong> Прокомментируйте визуальные связи${s.imageCaption ? ` («${escapeHtml(s.imageCaption)}»)` : ""}. Обратите внимание аудитории на направление стрелок и ключевые сущности.`;
    } else if (s.type === "section") {
      tip = "<strong>Вводный слайд раздела:</strong> Обозначьте дорожную карту блока. Объясните, какую конкретную практическую пользу принесут эти знания в коммерческой разработке.";
    } else if (s.body && (s.body.includes("```kotlin") || s.body.includes("```xml"))) {
      tip = "<strong>Разбор кода:</strong> Обратите внимание аудитории на ключевые строки реализации, выделите антипаттерны или преимущества предложенной архитектуры.";
    } else if (s.type === "homework") {
      tip = "<strong>Домашнее задание:</strong> Чётко проговорите критерии приёмки, дедлайн и правила оформления Pull Request. Напомните про скриншоты и тесты.";
    }

    if (tip) {
      html += `
        <div class="speaker-card speaker-card-tip">
          <div class="speaker-card-header">
            <span class="speaker-card-icon">💡</span>
            <strong>Методический акцент</strong>
          </div>
          <div class="speaker-card-body">
            <p>${tip}</p>
          </div>
        </div>
      `;
    }

    speakerContent.innerHTML = html;
  }"""

if old_chrome_block not in js_text:
    print("Error: Could not find old_chrome_block in js/deck.js")
else:
    js_text = js_text.replace(old_chrome_block, new_chrome_and_speaker_block, 1)

old_go_block = """    const n = slides[index].notes || "";
    notes.innerHTML = n ? `<strong>Заметки.</strong> ${escapeHtml(n)}` : "Заметок нет.";
    history.replaceState(null, "", `#${index + 1}`);"""

new_go_block = """    if (notesOn) {
      updateSpeakerPanel();
    }
    history.replaceState(null, "", `#${index + 1}`);"""

if old_go_block not in js_text:
    print("Error: Could not find old_go_block in js/deck.js")
else:
    js_text = js_text.replace(old_go_block, new_go_block, 1)

old_listeners = """  document.getElementById("next").addEventListener("click", next);
  document.getElementById("prev").addEventListener("click", prev);
  document.getElementById("home").addEventListener("click", () => {
    location.href = data.hub || "../../index.html";
  });
  document.getElementById("fs").addEventListener("click", () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else document.exitFullscreen();
  });"""

new_listeners = """  document.getElementById("next").addEventListener("click", next);
  document.getElementById("prev").addEventListener("click", prev);
  document.getElementById("home").addEventListener("click", () => {
    location.href = data.hub || "../../index.html";
  });
  document.getElementById("fs").addEventListener("click", () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else document.exitFullscreen();
  });
  document.getElementById("info").addEventListener("click", () => toggleSpeakerPanel());
  document.getElementById("speaker-close").addEventListener("click", () => toggleSpeakerPanel(false));"""

if old_listeners not in js_text:
    print("Error: Could not find old_listeners in js/deck.js")
else:
    js_text = js_text.replace(old_listeners, new_listeners, 1)

old_keys = """    } else if (e.key === "f" || e.key === "F" || e.key === "а" || e.key === "А") {
      document.getElementById("fs").click();
    } else if (e.key === "n" || e.key === "N" || e.key === "т" || e.key === "Т") {
      notesOn = !notesOn;
      notes.classList.toggle("is-on", notesOn);
    } else if (e.key === "Escape") {
      notesOn = false;
      notes.classList.remove("is-on");
    }"""

new_keys = """    } else if (e.key === "f" || e.key === "F" || e.key === "а" || e.key === "А") {
      document.getElementById("fs").click();
    } else if (
      e.key === "i" || e.key === "I" || e.key === "ш" || e.key === "Ш" ||
      e.key === "n" || e.key === "N" || e.key === "т" || e.key === "Т"
    ) {
      toggleSpeakerPanel();
    } else if (e.key === "Escape") {
      toggleSpeakerPanel(false);
    }"""

if old_keys not in js_text:
    print("Error: Could not find old_keys in js/deck.js")
else:
    js_text = js_text.replace(old_keys, new_keys, 1)

JS_PATH.write_text(js_text, encoding="utf-8")
print("Updated js/deck.js successfully!")
