from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
JS_PATH = ROOT / "js" / "deck.js"
CSS_PATH = ROOT / "css" / "deck.css"

# 1. Update js/deck.js
js_text = JS_PATH.read_text(encoding="utf-8").replace("\r\n", "\n")

# Add heading and blockquote support in renderMarkdown
old_markdown_loop = """      if (!line.trim()) {
        i += 1;
        continue;
      }

      const para = [];
      while (
        i < lines.length &&
        lines[i].trim() &&
        !/^\\s*[-|]/.test(lines[i]) &&
        !lines[i].trim().startsWith("```") &&
        !/^\\s*\\d+\\.\\s+/.test(lines[i])
      ) {
        para.push(lines[i]);
        i += 1;
      }
      flushPara(para);"""

new_markdown_loop = """      if (!line.trim()) {
        i += 1;
        continue;
      }

      if (/^#{1,4}\\s+/.test(line.trim())) {
        const m = line.trim().match(/^(#{1,4})\\s+(.+)$/);
        const level = Math.min(6, m[1].length + 2); // # -> h3, ## -> h4, ### -> h5
        html += `<h${level} class="speaker-theory-heading">${inline(m[2])}</h${level}>`;
        i += 1;
        continue;
      }

      if (/^\\s*>\\s+/.test(line)) {
        const quote = [];
        while (i < lines.length && /^\\s*>\\s+/.test(lines[i])) {
          quote.push(lines[i].replace(/^\\s*>\\s+/, ""));
          i += 1;
        }
        html += `<blockquote class="speaker-quote">${quote.map(q => inline(q)).join("<br>")}</blockquote>`;
        continue;
      }

      const para = [];
      while (
        i < lines.length &&
        lines[i].trim() &&
        !/^\\s*[-|>]/.test(lines[i]) &&
        !/^#{1,4}\\s+/.test(lines[i].trim()) &&
        !lines[i].trim().startsWith("```") &&
        !/^\\s*\\d+\\.\\s+/.test(lines[i])
      ) {
        para.push(lines[i]);
        i += 1;
      }
      flushPara(para);"""

if old_markdown_loop in js_text:
    js_text = js_text.replace(old_markdown_loop, new_markdown_loop, 1)
    print("Added heading and blockquote support to renderMarkdown")
else:
    print("Warning: old_markdown_loop not found in js/deck.js")

# Update speaker panel template and updateSpeakerPanel function
old_speaker_block = """  const speakerPanel = document.createElement("aside");
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

new_speaker_block = """  const speakerPanel = document.createElement("aside");
  speakerPanel.className = "speaker-panel";
  speakerPanel.id = "speaker-panel";
  speakerPanel.setAttribute("aria-label", "Теория и документация к слайду");
  speakerPanel.innerHTML = `
    <div class="speaker-panel-header">
      <div class="speaker-panel-title">
        <span class="speaker-panel-badge">📖</span>
        <span>Теория и документация</span>
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

    // Deep theory and technical dossier (from s.theory or fallback s.notes)
    const content = s.theory || s.notes || "";
    if (content) {
      html += `
        <div class="speaker-card speaker-card-theory">
          <div class="speaker-card-body">
            ${renderMarkdown(content)}
          </div>
        </div>
      `;
    } else {
      html += `
        <div class="speaker-card">
          <div class="speaker-card-body">
            <p class="speaker-empty">Теоретический конспект для этого слайда дополняется.</p>
          </div>
        </div>
      `;
    }

    speakerContent.innerHTML = html;
  }"""

if old_speaker_block in js_text:
    js_text = js_text.replace(old_speaker_block, new_speaker_block, 1)
    print("Updated updateSpeakerPanel in js/deck.js")
else:
    print("Warning: old_speaker_block not found in js/deck.js")

JS_PATH.write_text(js_text, encoding="utf-8")

# 2. Update css/deck.css
css_text = CSS_PATH.read_text(encoding="utf-8").replace("\r\n", "\n")

old_css_panel = """/* Speaker Notes Drawer (Right Side Panel) */
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
}"""

new_css_panel = """/* Speaker Notes Drawer (Right Side Panel) */
.speaker-panel {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 72px;
  width: clamp(400px, 38vw, 620px);
  background: var(--surface);
  border-left: 1px solid var(--line);
  box-shadow: -10px 0 36px rgba(26, 28, 30, 0.16);
  z-index: 20;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}"""

if old_css_panel in css_text:
    css_text = css_text.replace(old_css_panel, new_css_panel, 1)
    print("Updated .speaker-panel width in css/deck.css")

old_css_shift = """/* Adjust slides layout on wide screens when speaker panel is open */
@media (min-width: 1080px) {
  body.speaker-panel-open .slide {
    right: clamp(340px, 32vw, 500px);
    transition: right 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  }
}"""

new_css_shift = """/* Adjust slides layout on wide screens when speaker panel is open */
@media (min-width: 1080px) {
  body.speaker-panel-open .slide {
    right: clamp(400px, 38vw, 620px);
    transition: right 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  }
}

.speaker-card-theory {
  background: #ffffff;
  border: 1px solid var(--line);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
}

.speaker-theory-heading {
  margin: 18px 0 8px;
  font-size: 15px;
  font-weight: 750;
  color: var(--blue);
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 6px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  padding-bottom: 4px;
}

.speaker-card-body .speaker-theory-heading:first-child {
  margin-top: 0;
}

.speaker-quote {
  margin: 10px 0;
  padding: 8px 14px;
  border-left: 3px solid var(--green);
  background: #f0fdf4;
  color: #166534;
  font-size: 13.5px;
  border-radius: 0 8px 8px 0;
  line-height: 1.5;
}"""

if old_css_shift in css_text:
    css_text = css_text.replace(old_css_shift, new_css_shift, 1)
    print("Updated wide screen shift and theory styles in css/deck.css")

CSS_PATH.write_text(css_text, encoding="utf-8")
print("Engine updates complete!")
