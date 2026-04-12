import os
from bs4 import BeautifulSoup
import glob

# Constants
TAILWIND_SCRIPT_URL = "https://cdn.tailwindcss.com?plugins=forms,container-queries"
FONTS_HTML = """
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
"""

TAILWIND_CONFIG = """
<script id="tailwind-config">
    tailwind.config = {
        darkMode: "class",
        theme: {
        extend: {
            colors: {
            "surface": "#f9f9fb",
            "on-primary-fixed": "#ffffff",
            "inverse-surface": "#2f3132",
            "primary": "#000000",
            "secondary": "#5f5e5e",
            "tertiary-fixed": "#5e5e63",
            "outline-variant": "#c6c6c6",
            "on-tertiary-fixed": "#ffffff",
            "tertiary-fixed-dim": "#46464b",
            "tertiary": "#3a3b40",
            "secondary-fixed": "#c8c6c5",
            "on-secondary-container": "#1c1b1b",
            "on-primary-fixed-variant": "#e2e2e2",
            "outline": "#777777",
            "on-secondary": "#ffffff",
            "tertiary-container": "#747479",
            "surface-dim": "#d9dadc",
            "surface-container-highest": "#e2e2e4",
            "surface-container-high": "#e8e8ea",
            "on-primary-container": "#ffffff",
            "secondary-fixed-dim": "#adabaa",
            "surface-variant": "#e2e2e4",
            "on-primary": "#e2e2e2",
            "surface-container-lowest": "#ffffff",
            "primary-container": "#3b3b3b",
            "background": "#f9f9fb",
            "inverse-on-surface": "#f0f0f2",
            "secondary-container": "#d6d4d3",
            "on-tertiary-container": "#ffffff",
            "on-background": "#1a1c1d",
            "on-error": "#ffffff",
            "inverse-primary": "#c6c6c6",
            "on-secondary-fixed-variant": "#3c3b3b",
            "surface-container-low": "#f3f3f5",
            "on-secondary-fixed": "#1c1b1b",
            "primary-fixed-dim": "#474747",
            "on-surface-variant": "#474747",
            "error": "#ba1a1a",
            "primary-fixed": "#5e5e5e",
            "on-surface": "#1a1c1d",
            "surface-container": "#eeeef0",
            "on-error-container": "#410002",
            "error-container": "#ffdad6",
            "on-tertiary": "#e3e2e7",
            "on-tertiary-fixed-variant": "#e3e2e7",
            "surface-tint": "#5e5e5e",
            "surface-bright": "#f9f9fb"
            },
            borderRadius: {
            DEFAULT: "0.125rem",
            lg: "0.25rem",
            xl: "0.5rem",
            full: "0.75rem"
            },
            fontFamily: {
            headline: ["Space Grotesk"],
            body: ["Inter"],
            label: ["Inter"]
            }
        }
        }
    }
</script>
"""

CANVAS_HTML = '<canvas id="canvas-mesh" style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;"></canvas>'

CANVAS_SCRIPT = """
<script id="mesh-script">
    const canvas = document.getElementById('canvas-mesh');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let mouse = { x: -1000, y: -1000 };

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        resize();

        const gridSize = 45;
        const centralForce = 220;
        const mouseForce = 150;

        function applyPhysics(x, y) {
            let px = x;
            let py = y;
            
            const dxM = px - mouse.x;
            const dyM = py - mouse.y;
            const distM = Math.sqrt(dxM * dxM + dyM * dyM);
            
            if (distM < mouseForce) {
                // Liquid lens topographical push against mouse
                const power = Math.pow((mouseForce - distM) / mouseForce, 2);
                px += dxM * power * 1.5;
                py += dyM * power * 1.5;
            }
            
            return { x: px, y: py };
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.lineWidth = 1;

            for (let x = 0; x <= width; x += gridSize) {
                ctx.beginPath();
                for (let y = 0; y <= height; y += 4) {
                    const pos = applyPhysics(x, y);
                    if (y === 0) ctx.moveTo(pos.x, pos.y);
                    else ctx.lineTo(pos.x, pos.y);
                }
                ctx.stroke();
            }

            for (let y = 0; y <= height; y += gridSize) {
                ctx.beginPath();
                for (let x = 0; x <= width; x += 4) {
                    const pos = applyPhysics(x, y);
                    if (x === 0) ctx.moveTo(pos.x, pos.y);
                    else ctx.lineTo(pos.x, pos.y);
                }
                ctx.stroke();
            }
            requestAnimationFrame(draw);
        }
        draw();
    }
</script>
"""

MAIN_NAVBAR_HTML = """
<header class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10">
    <div class="flex justify-between items-center px-8 py-5 w-full max-w-screen-2xl mx-auto">
        <a href="nexus_ai_login_refined_grid_cursor.html" class="flex items-center gap-2">
            <span class="text-2xl font-bold tracking-tighter text-black uppercase font-headline">NEXUS AI</span>
        </a>
        <div class="flex items-center gap-8">
            <nav class="hidden md:flex gap-6">
                <a class="text-xs font-label uppercase tracking-widest text-primary hover:opacity-70 transition-opacity font-bold" href="nexus_ai_login_refined_grid_cursor.html">Gateway</a>
                <a class="text-xs font-label uppercase tracking-widest text-secondary hover:text-primary transition-opacity font-bold" href="help_center_hub.html">Help Center</a>
                <a class="text-xs font-label uppercase tracking-widest text-secondary hover:text-primary transition-opacity font-bold" href="system_status_dashboard.html">System Status</a>
                <a class="text-xs font-label uppercase tracking-widest text-secondary hover:text-primary transition-opacity font-bold" href="settings_profile_unified.html">Settings</a>
            </nav>
            <a href="nexus_ai_user_account_unified_background.html" class="material-symbols-outlined text-black cursor-pointer hover:opacity-70 transition-opacity">account_circle</a>
        </div>
    </div>
</header>
"""

FOOTER_HTML = """
<footer class="relative z-20 w-full border-t border-outline-variant/10 bg-surface mt-auto">
    <div class="flex flex-col md:flex-row justify-between items-center px-12 py-10 w-full max-w-screen-2xl mx-auto">
        <div class="font-label text-[10px] tracking-widest uppercase text-secondary">
            © 2024 NEXUS AI ECOSYSTEM
        </div>
        <nav class="flex gap-8 mt-6 md:mt-0">
            <a class="font-label text-[10px] tracking-widest uppercase text-secondary hover:text-primary transition-colors duration-300" href="terms_conditions_nexus_ai.html">Terms & Conditions</a>
            <a class="font-label text-[10px] tracking-widest uppercase text-secondary hover:text-primary transition-colors duration-300" href="api_documentation.html">API Docs</a>
            <a class="font-label text-[10px] tracking-widest uppercase text-secondary hover:text-primary transition-colors duration-300" href="privacy_policy_nexus_ai.html">Privacy</a>
        </nav>
    </div>
</footer>
"""

html_files = glob.glob("*.html")

for filepath in html_files:
    with open(filepath, "r", encoding="utf-8") as f:
        html_content = f.read()
    
    soup = BeautifulSoup(html_content, "html.parser")
    
    is_settings = "settings_" in filepath
    
    # 1. Update Head
    if soup.head:
        # Remove old tailwind scripts and fonts
        for script in soup.head.find_all("script"):
            if "tailwindcss" in (script.get("src") or "") or script.get("id") == "tailwind-config":
                script.extract()
        for link in soup.head.find_all("link"):
            if "fonts.googleapis.com" in (link.get("href") or ""):
                link.extract()
        
        # Append standard scripts
        head_appends = BeautifulSoup(
            f'<script src="{TAILWIND_SCRIPT_URL}"></script>\n{FONTS_HTML}\n{TAILWIND_CONFIG}',
            "html.parser"
        )
        for el in head_appends:
            soup.head.append(el)

    # 2. Update Body Background Canvas
    if soup.body:
        # Standardize body class for design system
        soup.body["class"] = "font-body bg-background text-on-surface min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-white"
        
        # Remove old canvas and associated scripts
        for canvas in soup.find_all("canvas"):
            canvas.extract()
        
        for script in soup.body.find_all("script"):
            if "canvas" in script.text or "getContext('2d')" in script.text or "requestAnimationFrame" in script.text or script.get("id") == "mesh-script":
                script.extract()
        
        # Insert Canvas at the top of body
        canvas_soup = BeautifulSoup(CANVAS_HTML, "html.parser").canvas
        soup.body.insert(0, canvas_soup)
        
        # Insert Script at the end of body
        script_soup = BeautifulSoup(CANVAS_SCRIPT, "html.parser").script
        soup.body.append(script_soup)
        
        # 3. Update Header and Footer (if not settings page)
        if not is_settings:
            # Replace old header
            old_header = soup.find("header")
            new_header = BeautifulSoup(MAIN_NAVBAR_HTML, "html.parser").header
            if old_header:
                old_header.replace_with(new_header)
            else:
                # If no header, insert after canvas
                soup.body.insert(1, new_header)
                
            # Replace old footer
            old_footer = soup.find("footer")
            new_footer = BeautifulSoup(FOOTER_HTML, "html.parser").footer
            if old_footer:
                old_footer.replace_with(new_footer)
            else:
                # If no footer, insert at end before scripts
                soup.body.insert(len(soup.body.contents)-1, new_footer)
            
            # Make sure main element has good padding to clear the header
            main = soup.find("main")
            if main:
                main_classes = main.get("class", [])
                if isinstance(main_classes, list):
                    main_classes_str = " ".join(main_classes)
                else:
                    main_classes_str = main_classes
                if "pt-" not in main_classes_str:
                    try:
                        main["class"] = main_classes + ["pt-24", "pb-12"]
                    except:
                        pass
        else:
            # Settings page updates
            # Find the header element inside settings pages because they have the sidebar layout
            old_header = soup.find("header")
            if old_header:
                # Add transition and ensure it responds nicely
                current_classes = old_header.get("class", [])
                if isinstance(current_classes, list):
                    # add base classes if missing
                    base_classes = ["fixed", "top-0", "right-0", "left-64", "z-40", "flex", "items-center", "justify-between", "px-8", "bg-surface/80", "backdrop-blur-md", "h-16", "border-b", "border-outline-variant/10"]
                    old_header["class"] = base_classes
            
            # Find aside and ensure it has correct styling
            aside = soup.find("aside")
            if aside:
                aside["class"] = ["fixed", "left-0", "top-0", "h-full", "flex", "flex-col", "bg-surface/80", "backdrop-blur-xl", "w-64", "border-r", "border-outline-variant/10", "z-50"]

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(str(soup))
        
print("Successfully standardized 26 UI files.")
