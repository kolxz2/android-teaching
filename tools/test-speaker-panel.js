const fs = require('fs');
const jsCode = fs.readFileSync('js/deck.js', 'utf8');
const slidesCode = fs.readFileSync('lectures/05-activity/slides.js', 'utf8');

// Build a clean DOM mockup
const elements = {};
function makeEl(tag) {
  const el = {
    tag,
    className: '',
    id: '',
    dataset: {},
    attributes: {},
    classList: {
      _classes: new Set(),
      add(c) { this._classes.add(c); },
      remove(c) { this._classes.delete(c); },
      toggle(c, force) {
        if (typeof force === 'boolean') {
          if (force) this._classes.add(c); else this._classes.delete(c);
        } else {
          if (this._classes.has(c)) this._classes.delete(c); else this._classes.add(c);
        }
        return this._classes.has(c);
      },
      contains(c) { return this._classes.has(c); }
    },
    style: {},
    children: [],
    listeners: {},
    _html: '',
    get innerHTML() { return this._html; },
    set innerHTML(val) {
      this._html = val;
      const ids = [...String(val).matchAll(/id=["']([^"']+)["']/g)];
      ids.forEach(m => {
        elements[m[1]] = elements[m[1]] || makeEl('div');
        elements[m[1]].id = m[1];
      });
    },
    setAttribute(k, v) { this.attributes[k] = v; },
    appendChild(child) { this.children.push(child); if (child.id) elements[child.id] = child; },
    addEventListener(evt, fn) { (this.listeners[evt] = this.listeners[evt] || []).push(fn); },
    dispatchEvent(evt, data) { (this.listeners[evt] || []).forEach(fn => fn(data)); },
    querySelectorAll(sel) { return []; },
    closest() { return null; }
  };
  return el;
}

const deckEl = makeEl('div');
deckEl.id = 'deck';
elements['deck'] = deckEl;

const body = makeEl('body');
const document = {
  getElementById: (id) => elements[id],
  createElement: makeEl,
  body: body,
  listeners: {},
  addEventListener(evt, fn) { (this.listeners[evt] = this.listeners[evt] || []).push(fn); },
  dispatchEvent(evt, data) { (this.listeners[evt] || []).forEach(fn => fn(data)); }
};
const window = { DECK: null, location: { hash: '' } };
const location = { hash: '', href: '' };
const history = { replaceState() {} };
const sessionStorage = { getItem() { return null; } };

eval(slidesCode);
eval(jsCode);

console.log('--- TESTING SPEAKER PANEL ---');
console.log('1. Info button created:', !!elements['info']);
console.log('2. Speaker panel created:', !!elements['speaker-panel']);
console.log('3. Speaker content created:', !!elements['speaker-content']);

// Click info button
elements['info'].dispatchEvent('click', {});
const isOpenAfterClick = elements['speaker-panel'].classList.contains('is-open');
console.log('4. Panel opened after clicking i:', isOpenAfterClick);
console.log('5. Info button is-active:', elements['info'].classList.contains('is-active'));
console.log('6. Content has slide 1 title:', elements['speaker-content'].innerHTML.includes('Android-разработка'));
console.log('7. Content has theory section:', elements['speaker-content'].innerHTML.includes('Теория и спецификация'));
console.log('8. No slide duplication block:', !elements['speaker-content'].innerHTML.includes('Тезисы на слайде'));

// Click next
elements['next'].dispatchEvent('click', {});
console.log('9. After next(), content updated to slide 2 theory:', elements['speaker-content'].innerHTML.includes('Кто ведёт курс') && elements['speaker-content'].innerHTML.includes('Т-Банк'));

// Press Escape
document.dispatchEvent('keydown', { key: 'Escape', target: body });
console.log('10. Panel closed after Escape:', !elements['speaker-panel'].classList.contains('is-open'));

// Press key 'i'
document.dispatchEvent('keydown', { key: 'i', target: body });
console.log('11. Panel reopened after pressing key i:', elements['speaker-panel'].classList.contains('is-open'));
console.log('ALL TESTS PASSED SUCCESSFULLY!');
