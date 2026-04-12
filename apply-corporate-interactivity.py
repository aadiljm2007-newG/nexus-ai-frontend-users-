import glob
from bs4 import BeautifulSoup

def apply_interactivity():
    html_files = glob.glob("*.html")
    updated_count = 0
    
    for filepath in html_files:
        with open(filepath, "r", encoding="utf-8") as f:
            html_content = f.read()
            
        soup = BeautifulSoup(html_content, "html.parser")
        if not soup.body:
            continue
            
        # Check if corporate-interactivity.js is already referenced
        has_script = False
        for script in soup.find_all("script"):
            if script.get("src") == "corporate-interactivity.js":
                has_script = True
                break
                
        if not has_script:
            # Create script tag
            new_script = soup.new_tag("script", src="corporate-interactivity.js")
            soup.body.append(new_script)
            
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(str(soup))
                
            updated_count += 1
            
    print(f"Added corporate-interactivity.js to {updated_count} HTML files.")

if __name__ == "__main__":
    apply_interactivity()
