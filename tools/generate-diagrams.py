# -*- coding: utf-8 -*-
"""Generate high-quality SVG diagrams for Lecture 05."""
from pathlib import Path

ROOT = Path(r"c:\Users\kolxz2Aorus\IdeaProjects\android-teaching")
CONCEPTS = ROOT / "assets" / "concepts"
CONCEPTS.mkdir(parents=True, exist_ok=True)

# 1. XML View Hierarchy Tree
svg_view_hierarchy = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520" width="100%" height="100%">
  <defs>
    <linearGradient id="rootGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <linearGradient id="groupGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#1D4ED8"/>
    </linearGradient>
    <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.15"/>
    </filter>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748B"/>
    </marker>
  </defs>

  <rect width="100%" height="100%" fill="#F8FAFC" rx="16"/>

  <!-- Title Badge -->
  <rect x="30" y="24" width="230" height="34" rx="8" fill="#E2E8F0"/>
  <text x="42" y="46" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#334155">ИЕРАРХИЯ VIEW &amp; VIEWGROUP</text>

  <!-- Connectors -->
  <!-- Root to LinearLayout -->
  <path d="M 400 120 L 400 170" stroke="#94A3B8" stroke-width="2.5" fill="none" marker-end="url(#arrow)"/>
  
  <!-- LinearLayout to Children -->
  <path d="M 400 230 L 220 280" stroke="#94A3B8" stroke-width="2.5" fill="none" marker-end="url(#arrow)"/>
  <path d="M 400 230 L 580 280" stroke="#94A3B8" stroke-width="2.5" fill="none" marker-end="url(#arrow)"/>

  <!-- Sub-branch ConstraintLayout -->
  <path d="M 580 340 L 490 395" stroke="#94A3B8" stroke-width="2.5" fill="none" marker-end="url(#arrow)"/>
  <path d="M 580 340 L 670 395" stroke="#94A3B8" stroke-width="2.5" fill="none" marker-end="url(#arrow)"/>

  <!-- Root Node (DecorView) -->
  <g filter="url(#shadow)">
    <rect x="290" y="60" width="220" height="60" rx="12" fill="url(#rootGrad)"/>
    <text x="400" y="88" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">Window / DecorView</text>
    <text x="400" y="108" font-family="monospace" font-size="12" fill="#94A3B8" text-anchor="middle">&lt;FrameLayout&gt; корень</text>
  </g>

  <!-- Level 1 Node: LinearLayout -->
  <g filter="url(#shadow)">
    <rect x="290" y="170" width="220" height="60" rx="12" fill="url(#groupGrad)"/>
    <text x="400" y="198" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">ViewGroup: LinearLayout</text>
    <text x="400" y="218" font-family="monospace" font-size="12" fill="#DBEAFE" text-anchor="middle">orientation="vertical"</text>
  </g>

  <!-- Level 2 Node: TextView (Leaf) -->
  <g filter="url(#shadow)">
    <rect x="110" y="280" width="220" height="60" rx="12" fill="url(#leafGrad)"/>
    <text x="220" y="308" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF" text-anchor="middle">View: TextView</text>
    <text x="220" y="328" font-family="monospace" font-size="12" fill="#D1FAE5" text-anchor="middle">@+id/titleText</text>
  </g>

  <!-- Level 2 Node: ConstraintLayout (ViewGroup) -->
  <g filter="url(#shadow)">
    <rect x="470" y="280" width="220" height="60" rx="12" fill="url(#groupGrad)"/>
    <text x="580" y="308" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF" text-anchor="middle">ViewGroup: ConstraintLayout</text>
    <text x="580" y="328" font-family="monospace" font-size="12" fill="#DBEAFE" text-anchor="middle">@+id/cardContainer</text>
  </g>

  <!-- Level 3 Node: ImageView (Leaf) -->
  <g filter="url(#shadow)">
    <rect x="390" y="395" width="180" height="55" rx="12" fill="url(#leafGrad)"/>
    <text x="480" y="423" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle">View: ImageView</text>
    <text x="480" y="441" font-family="monospace" font-size="11" fill="#D1FAE5" text-anchor="middle">@+id/avatarImage</text>
  </g>

  <!-- Level 3 Node: Button (Leaf) -->
  <g filter="url(#shadow)">
    <rect x="600" y="395" width="180" height="55" rx="12" fill="url(#leafGrad)"/>
    <text x="690" y="423" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle">View: Button</text>
    <text x="690" y="441" font-family="monospace" font-size="11" fill="#D1FAE5" text-anchor="middle">@+id/actionButton</text>
  </g>

  <!-- Footer Legend -->
  <rect x="30" y="475" width="16" height="16" rx="4" fill="#3B82F6"/>
  <text x="54" y="488" font-family="system-ui, sans-serif" font-size="12" fill="#475569">ViewGroup (контейнер)</text>
  <rect x="230" y="475" width="16" height="16" rx="4" fill="#10B981"/>
  <text x="254" y="488" font-family="system-ui, sans-serif" font-size="12" fill="#475569">View (листовой визуальный элемент)</text>
</svg>"""

# 2. View Lifecycle: Measure -> Layout -> Draw
svg_phases = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <defs>
    <linearGradient id="p1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <linearGradient id="p2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#2563EB"/>
    </linearGradient>
    <linearGradient id="p3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <filter id="shadow2" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.12"/>
    </filter>
    <marker id="arrow2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569"/>
    </marker>
  </defs>

  <rect width="100%" height="100%" fill="#F8FAFC" rx="16"/>

  <text x="400" y="55" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#0F172A" text-anchor="middle">3 фазы отрисовки View-дерева</text>
  <text x="400" y="80" font-family="system-ui, sans-serif" font-size="14" fill="#64748B" text-anchor="middle">Выполняются рекурсивно сверху вниз на каждый кадр анимации</text>

  <!-- Step 1: Measure -->
  <g filter="url(#shadow2)">
    <rect x="50" y="130" width="200" height="230" rx="16" fill="#FFFFFF" stroke="#FDE68A" stroke-width="2"/>
    <rect x="50" y="130" width="200" height="50" rx="16" fill="url(#p1)"/>
    <text x="150" y="162" font-family="system-ui, sans-serif" font-size="18" font-weight="800" fill="#FFFFFF" text-anchor="middle">1. Measure</text>
    <text x="150" y="210" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#B45309" text-anchor="middle">Замер размеров</text>
    <text x="70" y="245" font-family="system-ui, sans-serif" font-size="13" fill="#475569">• onMeasure()</text>
    <text x="70" y="275" font-family="system-ui, sans-serif" font-size="13" fill="#475569">• MeasureSpec</text>
    <text x="70" y="305" font-family="system-ui, sans-serif" font-size="13" fill="#475569">• Вычисление</text>
    <text x="82" y="325" font-family="system-ui, sans-serif" font-size="13" fill="#475569">ширины и высоты</text>
  </g>

  <!-- Arrow 1 to 2 -->
  <path d="M 265 245 L 295 245" stroke="#475569" stroke-width="3" fill="none" marker-end="url(#arrow2)"/>

  <!-- Step 2: Layout -->
  <g filter="url(#shadow2)">
    <rect x="300" y="130" width="200" height="230" rx="16" fill="#FFFFFF" stroke="#BFDBFE" stroke-width="2"/>
    <rect x="300" y="130" width="200" height="50" rx="16" fill="url(#p2)"/>
    <text x="400" y="162" font-family="system-ui, sans-serif" font-size="18" font-weight="800" fill="#FFFFFF" text-anchor="middle">2. Layout</text>
    <text x="400" y="210" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#1D4ED8" text-anchor="middle">Позиционирование</text>
    <text x="320" y="245" font-family="system-ui, sans-serif" font-size="13" fill="#475569">• onLayout()</text>
    <text x="320" y="275" font-family="system-ui, sans-serif" font-size="13" fill="#475569">• Координаты</text>
    <text x="332" y="295" font-family="monospace" font-size="12" fill="#1E293B">left, top, right, bottom</text>
    <text x="320" y="325" font-family="system-ui, sans-serif" font-size="13" fill="#475569">• Раскладка детей</text>
  </g>

  <!-- Arrow 2 to 3 -->
  <path d="M 515 245 L 545 245" stroke="#475569" stroke-width="3" fill="none" marker-end="url(#arrow2)"/>

  <!-- Step 3: Draw -->
  <g filter="url(#shadow2)">
    <rect x="550" y="130" width="200" height="230" rx="16" fill="#FFFFFF" stroke="#A7F3D0" stroke-width="2"/>
    <rect x="550" y="130" width="200" height="50" rx="16" fill="url(#p3)"/>
    <text x="650" y="162" font-family="system-ui, sans-serif" font-size="18" font-weight="800" fill="#FFFFFF" text-anchor="middle">3. Draw</text>
    <text x="650" y="210" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#047857" text-anchor="middle">Отрисовка</text>
    <text x="570" y="245" font-family="system-ui, sans-serif" font-size="13" fill="#475569">• onDraw(Canvas)</text>
    <text x="570" y="275" font-family="system-ui, sans-serif" font-size="13" fill="#475569">• Рендеринг линий,</text>
    <text x="582" y="295" font-family="system-ui, sans-serif" font-size="13" fill="#475569">текста, картинок</text>
    <text x="570" y="325" font-family="system-ui, sans-serif" font-size="13" fill="#475569">• Вывод на экран</text>
  </g>

  <!-- Frame budget warning -->
  <rect x="180" y="390" width="440" height="46" rx="10" fill="#FEF2F2" stroke="#F87171" stroke-width="1.5"/>
  <text x="400" y="418" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#B91C1C" text-anchor="middle">⚠️ Бюджет на все 3 фазы: не более 16 мс (для 60 FPS)</text>
</svg>"""

# 3. Double State Problem in Imperative UI
svg_double_state = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <defs>
    <linearGradient id="dataGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#1E40AF"/>
    </linearGradient>
    <linearGradient id="viewGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="100%" stop-color="#991B1B"/>
    </linearGradient>
    <filter id="shadow3" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.15"/>
    </filter>
  </defs>

  <rect width="100%" height="100%" fill="#F8FAFC" rx="16"/>

  <text x="400" y="48" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#0F172A" text-anchor="middle">Проблема двойного состояния (Double State)</text>
  <text x="400" y="74" font-family="system-ui, sans-serif" font-size="14" fill="#64748B" text-anchor="middle">Рассинхронизация между моделью в памяти и состоянием View в UI</text>

  <!-- Left Card: Business State -->
  <g filter="url(#shadow3)">
    <rect x="70" y="115" width="280" height="260" rx="16" fill="#FFFFFF" stroke="#DBEAFE" stroke-width="2"/>
    <rect x="70" y="115" width="280" height="50" rx="16" fill="url(#dataGrad)"/>
    <text x="210" y="146" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">Источник 1: Модель данных</text>
    
    <rect x="90" y="185" width="240" height="42" rx="8" fill="#F1F5F9"/>
    <text x="105" y="211" font-family="monospace" font-size="13" fill="#1E293B">var isLoading = false</text>

    <rect x="90" y="240" width="240" height="42" rx="8" fill="#F1F5F9"/>
    <text x="105" y="266" font-family="monospace" font-size="13" fill="#1E293B">var error: String? = null</text>

    <rect x="90" y="295" width="240" height="42" rx="8" fill="#F1F5F9"/>
    <text x="105" y="321" font-family="monospace" font-size="13" fill="#1E293B">var count = 5</text>
  </g>

  <!-- Right Card: View Internal State -->
  <g filter="url(#shadow3)">
    <rect x="450" y="115" width="280" height="260" rx="16" fill="#FFFFFF" stroke="#FEE2E2" stroke-width="2"/>
    <rect x="450" y="115" width="280" height="50" rx="16" fill="url(#viewGrad)"/>
    <text x="590" y="146" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">Источник 2: Состояние View</text>
    
    <rect x="470" y="185" width="240" height="42" rx="8" fill="#FEF2F2" stroke="#FCA5A5"/>
    <text x="485" y="211" font-family="monospace" font-size="13" fill="#991B1B">progressBar.visibility = VISIBLE</text>

    <rect x="470" y="240" width="240" height="42" rx="8" fill="#F1F5F9"/>
    <text x="485" y="266" font-family="monospace" font-size="13" fill="#1E293B">errorText.text = "Ошибка 404"</text>

    <rect x="470" y="295" width="240" height="42" rx="8" fill="#F1F5F9"/>
    <text x="485" y="321" font-family="monospace" font-size="13" fill="#1E293B">counterTextView.text = "4"</text>
  </g>

  <!-- Middle Conflict Indicator -->
  <circle cx="400" cy="245" r="28" fill="#EF4444"/>
  <text x="400" y="254" font-family="system-ui, sans-serif" font-size="26" font-weight="900" fill="#FFFFFF" text-anchor="middle">≠</text>

  <!-- Bottom Notice -->
  <rect x="70" y="405" width="660" height="45" rx="10" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1.5"/>
  <text x="400" y="432" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#92400E" text-anchor="middle">💥 Забыли вызвать сеттер в одной ветке if/else — интерфейс навсегда расходится с данными!</text>
</svg>"""

# 4. Declarative Formula: UI = f(State)
svg_formula = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 440" width="100%" height="100%">
  <defs>
    <linearGradient id="stateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#2563EB"/>
    </linearGradient>
    <linearGradient id="funGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8B5CF6"/>
      <stop offset="100%" stop-color="#6D28D9"/>
    </linearGradient>
    <linearGradient id="uiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <filter id="shadow4" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.12"/>
    </filter>
    <marker id="arrow4" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748B"/>
    </marker>
  </defs>

  <rect width="100%" height="100%" fill="#F8FAFC" rx="16"/>

  <text x="400" y="55" font-family="system-ui, sans-serif" font-size="28" font-weight="800" fill="#0F172A" text-anchor="middle">Формула Декларативного UI</text>
  <text x="400" y="85" font-family="system-ui, sans-serif" font-size="20" font-weight="700" fill="#6D28D9" text-anchor="middle">UI = f ( State )</text>

  <!-- State Block -->
  <g filter="url(#shadow4)">
    <rect x="60" y="140" width="190" height="180" rx="16" fill="url(#stateGrad)"/>
    <text x="155" y="180" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#FFFFFF" text-anchor="middle">State</text>
    <text x="155" y="205" font-family="system-ui, sans-serif" font-size="13" fill="#DBEAFE" text-anchor="middle">Неизменяемые данные</text>
    <rect x="80" y="225" width="150" height="70" rx="8" fill="rgba(255,255,255,0.15)"/>
    <text x="155" y="250" font-family="monospace" font-size="12" fill="#FFFFFF" text-anchor="middle">data class State(</text>
    <text x="155" y="268" font-family="monospace" font-size="12" fill="#FFFFFF" text-anchor="middle">  val balance: Long,</text>
    <text x="155" y="286" font-family="monospace" font-size="12" fill="#FFFFFF" text-anchor="middle">  val loading: Bool</text>
  </g>

  <!-- Arrow 1 -->
  <path d="M 265 230 L 310 230" stroke="#64748B" stroke-width="3.5" fill="none" marker-end="url(#arrow4)"/>

  <!-- Function f Block -->
  <g filter="url(#shadow4)">
    <rect x="325" y="140" width="190" height="180" rx="16" fill="url(#funGrad)"/>
    <text x="420" y="180" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#FFFFFF" text-anchor="middle">Функция f</text>
    <text x="420" y="205" font-family="system-ui, sans-serif" font-size="13" fill="#EDE9FE" text-anchor="middle">@Composable функция</text>
    <rect x="345" y="225" width="150" height="70" rx="8" fill="rgba(255,255,255,0.15)"/>
    <text x="420" y="252" font-family="monospace" font-size="12" fill="#FFFFFF" text-anchor="middle">@Composable</text>
    <text x="420" y="270" font-family="monospace" font-size="12" fill="#FFFFFF" text-anchor="middle">fun Screen(state) {</text>
    <text x="420" y="288" font-family="monospace" font-size="12" fill="#FFFFFF" text-anchor="middle">  Text(state.balance)</text>
  </g>

  <!-- Arrow 2 -->
  <path d="M 530 230 L 575 230" stroke="#64748B" stroke-width="3.5" fill="none" marker-end="url(#arrow4)"/>

  <!-- UI Output Block -->
  <g filter="url(#shadow4)">
    <rect x="590" y="140" width="160" height="180" rx="16" fill="url(#uiGrad)"/>
    <text x="670" y="180" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#FFFFFF" text-anchor="middle">UI</text>
    <text x="670" y="205" font-family="system-ui, sans-serif" font-size="13" fill="#D1FAE5" text-anchor="middle">Пиксели на экране</text>
    <rect x="610" y="225" width="120" height="70" rx="8" fill="rgba(255,255,255,0.15)"/>
    <text x="670" y="265" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle">Баланс: 500 ₽</text>
  </g>

  <!-- Bottom Note -->
  <rect x="120" y="360" width="560" height="42" rx="10" fill="#EDE9FE"/>
  <text x="400" y="386" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#5B21B6" text-anchor="middle">✨ Вы меняете ТОЛЬКО State. Фреймворк сам вызывает f() и перерисовывает экран.</text>
</svg>"""

# 5. Smart Recomposition in Compose
svg_recomposition = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <defs>
    <filter id="shadow5" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.12"/>
    </filter>
    <marker id="arrow5" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748B"/>
    </marker>
  </defs>

  <rect width="100%" height="100%" fill="#F8FAFC" rx="16"/>

  <text x="400" y="48" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#0F172A" text-anchor="middle">Умная Рекомпозиция (Smart Recomposition)</text>
  <text x="400" y="74" font-family="system-ui, sans-serif" font-size="14" fill="#64748B" text-anchor="middle">Compose перезапускает только те Composable-функции, чьи параметры изменились</text>

  <!-- Connectors -->
  <path d="M 400 160 L 220 220" stroke="#94A3B8" stroke-width="2.5" fill="none" marker-end="url(#arrow5)"/>
  <path d="M 400 160 L 580 220" stroke="#94A3B8" stroke-width="2.5" fill="none" marker-end="url(#arrow5)"/>
  <path d="M 580 280 L 490 340" stroke="#94A3B8" stroke-width="2.5" fill="none" marker-end="url(#arrow5)"/>
  <path d="M 580 280 L 670 340" stroke="#94A3B8" stroke-width="2.5" fill="none" marker-end="url(#arrow5)"/>

  <!-- Root: MainScreen -->
  <g filter="url(#shadow5)">
    <rect x="290" y="100" width="220" height="60" rx="12" fill="#1E293B"/>
    <text x="400" y="128" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF" text-anchor="middle">@Composable MainScreen</text>
    <text x="400" y="148" font-family="monospace" font-size="11" fill="#94A3B8" text-anchor="middle">var count by remember</text>
  </g>

  <!-- Node 1: Header (SKIPPED) -->
  <g filter="url(#shadow5)">
    <rect x="110" y="220" width="220" height="60" rx="12" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
    <text x="220" y="248" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#334155" text-anchor="middle">@Composable Header</text>
    <text x="220" y="268" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#059669" text-anchor="middle">⚡ SKIPPED (не изменился)</text>
  </g>

  <!-- Node 2: BodyContainer -->
  <g filter="url(#shadow5)">
    <rect x="470" y="220" width="220" height="60" rx="12" fill="#3B82F6"/>
    <text x="580" y="248" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF" text-anchor="middle">@Composable Body</text>
    <text x="580" y="268" font-family="monospace" font-size="11" fill="#DBEAFE" text-anchor="middle">Column { ... }</text>
  </g>

  <!-- Node 3: CounterText (RECOMPOSED) -->
  <g filter="url(#shadow5)">
    <rect x="390" y="340" width="180" height="65" rx="12" fill="#EF4444"/>
    <text x="480" y="368" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle">CounterText(count)</text>
    <text x="480" y="390" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#FEF08A" text-anchor="middle">🔄 RECOMPOSED</text>
  </g>

  <!-- Node 4: StaticButton (SKIPPED) -->
  <g filter="url(#shadow5)">
    <rect x="600" y="340" width="180" height="65" rx="12" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>
    <text x="690" y="368" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#334155" text-anchor="middle">Button(onClick)</text>
    <text x="690" y="390" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#059669" text-anchor="middle">⚡ SKIPPED</text>
  </g>

  <!-- Footer Legend -->
  <rect x="130" y="430" width="540" height="34" rx="8" fill="#F1F5F9"/>
  <text x="400" y="452" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#475569" text-anchor="middle">Результат: перерисовывается ровно 1 узел дерева из 5. Экран остаётся быстрым и плавным.</text>
</svg>"""

# 6. Unidirectional Data Flow (UDF)
svg_udf = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <defs>
    <linearGradient id="vmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <linearGradient id="uiBoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#1D4ED8"/>
    </linearGradient>
    <filter id="shadow6" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.12"/>
    </filter>
    <marker id="arrowDown" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#10B981"/>
    </marker>
    <marker id="arrowUp" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#F59E0B"/>
    </marker>
  </defs>

  <rect width="100%" height="100%" fill="#F8FAFC" rx="16"/>

  <text x="400" y="48" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#0F172A" text-anchor="middle">Архитектурный паттерн: UDF</text>
  <text x="400" y="74" font-family="system-ui, sans-serif" font-size="14" fill="#64748B" text-anchor="middle">Unidirectional Data Flow — Однонаправленный поток данных</text>

  <!-- Top Box: ViewModel -->
  <g filter="url(#shadow6)">
    <rect x="200" y="100" width="400" height="90" rx="16" fill="url(#vmGrad)"/>
    <text x="400" y="138" font-family="system-ui, sans-serif" font-size="18" font-weight="800" fill="#FFFFFF" text-anchor="middle">ViewModel / Держатель состояния</text>
    <text x="400" y="162" font-family="monospace" font-size="13" fill="#94A3B8" text-anchor="middle">Single Source of Truth (Единый источник истины)</text>
  </g>

  <!-- Arrow DOWN: State -->
  <path d="M 280 200 L 280 280" stroke="#10B981" stroke-width="4" fill="none" marker-end="url(#arrowDown)"/>
  <rect x="150" y="225" width="120" height="30" rx="6" fill="#D1FAE5"/>
  <text x="210" y="245" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#065F46" text-anchor="middle">STATE (вниз) ↓</text>

  <!-- Arrow UP: Events -->
  <path d="M 520 280 L 520 200" stroke="#F59E0B" stroke-width="4" fill="none" marker-end="url(#arrowUp)"/>
  <rect x="530" y="225" width="130" height="30" rx="6" fill="#FEF3C7"/>
  <text x="595" y="245" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#92400E" text-anchor="middle">EVENTS (вверх) ↑</text>

  <!-- Bottom Box: Composable UI -->
  <g filter="url(#shadow6)">
    <rect x="200" y="295" width="400" height="90" rx="16" fill="url(#uiBoxGrad)"/>
    <text x="400" y="333" font-family="system-ui, sans-serif" font-size="18" font-weight="800" fill="#FFFFFF" text-anchor="middle">@Composable UI Экран</text>
    <text x="400" y="357" font-family="system-ui, sans-serif" font-size="13" fill="#DBEAFE" text-anchor="middle">Stateless представление (только отображение данных)</text>
  </g>

  <!-- Summary text -->
  <rect x="100" y="415" width="600" height="38" rx="8" fill="#F1F5F9"/>
  <text x="400" y="439" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#334155" text-anchor="middle">UI отображает данные и шлёт события кликов. Логика обновляет State. Цикл замкнут.</text>
</svg>"""

# 7. Interop Bridge: ComposeView & AndroidView
svg_interop = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480" width="100%" height="100%">
  <defs>
    <linearGradient id="xmlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#64748B"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>
    <linearGradient id="cmpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6"/>
      <stop offset="100%" stop-color="#1D4ED8"/>
    </linearGradient>
    <filter id="shadow7" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.12"/>
    </filter>
  </defs>

  <rect width="100%" height="100%" fill="#F8FAFC" rx="16"/>

  <text x="400" y="48" font-family="system-ui, sans-serif" font-size="22" font-weight="800" fill="#0F172A" text-anchor="middle">Двусторонняя интероперабельность (Interop)</text>
  <text x="400" y="74" font-family="system-ui, sans-serif" font-size="14" fill="#64748B" text-anchor="middle">Бесшовная интеграция Compose в старый XML и старых View в Compose</text>

  <!-- Left: Compose inside XML -->
  <g filter="url(#shadow7)">
    <rect x="60" y="110" width="310" height="280" rx="16" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
    <rect x="60" y="110" width="310" height="45" rx="16" fill="url(#xmlGrad)"/>
    <text x="215" y="139" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF" text-anchor="middle">Старый XML экран</text>

    <!-- Embedded ComposeView -->
    <rect x="90" y="180" width="250" height="180" rx="12" fill="#EFF6FF" stroke="#3B82F6" stroke-width="2" stroke-dasharray="6"/>
    <rect x="110" y="200" width="210" height="36" rx="8" fill="#3B82F6"/>
    <text x="215" y="223" font-family="monospace" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">&lt;ComposeView&gt;</text>
    
    <text x="215" y="270" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#1E40AF" text-anchor="middle">Новая фича на Compose</text>
    <text x="215" y="295" font-family="monospace" font-size="12" fill="#475569" text-anchor="middle">composeView.setContent {</text>
    <text x="215" y="315" font-family="monospace" font-size="12" fill="#475569" text-anchor="middle">  NewFeatureScreen()</text>
    <text x="215" y="335" font-family="monospace" font-size="12" fill="#475569" text-anchor="middle">}</text>
  </g>

  <!-- Right: XML View inside Compose -->
  <g filter="url(#shadow7)">
    <rect x="430" y="110" width="310" height="280" rx="16" fill="#FFFFFF" stroke="#BFDBFE" stroke-width="2"/>
    <rect x="430" y="110" width="310" height="45" rx="16" fill="url(#cmpGrad)"/>
    <text x="585" y="139" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF" text-anchor="middle">Новый Compose экран</text>

    <!-- Embedded AndroidView -->
    <rect x="460" y="180" width="250" height="180" rx="12" fill="#F8FAFC" stroke="#64748B" stroke-width="2" stroke-dasharray="6"/>
    <rect x="480" y="200" width="210" height="36" rx="8" fill="#475569"/>
    <text x="585" y="223" font-family="monospace" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle">AndroidView { ... }</text>
    
    <text x="585" y="270" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#334155" text-anchor="middle">Старая View библиотека</text>
    <text x="585" y="295" font-family="monospace" font-size="12" fill="#475569" text-anchor="middle">factory = { ctx -></text>
    <text x="585" y="315" font-family="monospace" font-size="12" fill="#475569" text-anchor="middle">  MapView(ctx)</text>
    <text x="585" y="335" font-family="monospace" font-size="12" fill="#475569" text-anchor="middle">}</text>
  </g>

  <!-- Footer note -->
  <rect x="100" y="415" width="600" height="38" rx="8" fill="#F1F5F9"/>
  <text x="400" y="439" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#334155" text-anchor="middle">Переход на Compose не требует остановки разработки: миграция идёт поэтапно.</text>
</svg>"""

(CONCEPTS / "xml-view-hierarchy.svg").write_text(svg_view_hierarchy, encoding="utf-8")
(CONCEPTS / "view-lifecycle-phases.svg").write_text(svg_phases, encoding="utf-8")
(CONCEPTS / "double-state-problem.svg").write_text(svg_double_state, encoding="utf-8")
(CONCEPTS / "declarative-ui-formula.svg").write_text(svg_formula, encoding="utf-8")
(CONCEPTS / "recomposition-smart-skipping.svg").write_text(svg_recomposition, encoding="utf-8")
(CONCEPTS / "udf-cycle.svg").write_text(svg_udf, encoding="utf-8")
(CONCEPTS / "interop-bridge.svg").write_text(svg_interop, encoding="utf-8")

print("Generated 7 SVG diagrams in assets/concepts/ successfully!")
