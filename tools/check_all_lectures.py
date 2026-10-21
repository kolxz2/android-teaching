import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
lectures_dir = ROOT / "lectures"

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
lectures_dir = ROOT / "lectures"

for p in sorted(lectures_dir.glob("*/slides.js")):
    js_code = f"""
    const fs = require('fs');
    const content = fs.readFileSync('{p.as_posix()}', 'utf8');
    global.window = {{}};
    eval(content);
    console.log(global.window.DECK ? global.window.DECK.slides.length : 0);
    """
    try:
        res = subprocess.check_output(["node", "-e", js_code], text=True).strip()
        count = f"{res} slides"
    except Exception as e:
        count = f"ERR: {e}"
    print(f"{p.parent.name:25s}: {count}")
