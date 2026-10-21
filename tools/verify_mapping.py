import sys
sys.stdout.reconfigure(encoding='utf-8')
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
from tools.lecture5_theory_data import THEORY

deck_file = ROOT / "lectures" / "05-activity" / "slides.js"
content = deck_file.read_text(encoding="utf-8")
deck = json.loads(content.replace("window.DECK = ", "").rstrip(";\n"))

print(f"Total slides: {len(deck['slides'])}, total theory entries: {len(THEORY)}")
mismatches = 0
for i, s in enumerate(deck["slides"]):
    t = THEORY.get(i, "")
    title = s.get("title", "")
    lines = [l for l in t.split("\n") if l.strip() and not l.startswith("###")]
    snippet = lines[0] if lines else "NO TEXT"
    print(f"{i:2d}: [{title}] -> {snippet[:65]}")
