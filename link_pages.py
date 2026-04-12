import os
from bs4 import BeautifulSoup
import glob

html_files = glob.glob("*.html")

SIDEBAR_MAPPING = {
    "Profile": "settings-profile.html",
    "AI Behavior": "settings-ai-behavior.html",
    "Voice & Interaction": "settings-voice-interaction.html",
    "System Permissions": "settings-system-permissions.html",
    "Automation Settings": "settings-automation.html",
    "Integrations": "settings-integrations.html",
    "Notifications": "settings-notifications.html",
    "Appearance": "settings-appearance.html",
    "Privacy & Security": "settings-security-privacy.html",
    "Advanced": "settings-advanced.html"
}

TEXT_LINK_MAPPING = {
    "Create a new account": "create-account.html",
    "Forgot?": "forgot-password.html",
    "Forgot Password": "forgot-password.html",
    "Log in to Core": "login.html",
    "Back to Login": "login.html",
    "Return to login": "login.html",
    "Login": "login.html",
    "Terms": "terms-and-conditions.html",
    "Terms & Conditions": "terms-and-conditions.html",
    "Terms of Neural Access": "terms-and-conditions.html",
    "Privacy": "privacy-policy.html",
    "Nexus Privacy Protocols": "privacy-policy.html",
    "Help": "help-center.html",
    "Help Center": "help-center.html",
    "System Status": "system-status.html",
    "Gateway": "login.html",
    "API Docs": "api-documentation.html",
    "Support": "contact-us.html"
}

FORM_ACTION_MAPPING = {
    "login.html": "user-account.html",
    "create-account.html": "otp-verification.html",
    "forgot-password.html": "otp-verification.html",
    "otp-verification.html": "reset-password.html",
    "reset-password.html": "success.html"
}

# General function to clean up string matching
def clean_text(text):
    if not text:
        return ""
    return text.strip().replace("\n", " ").replace("\r", " ")

for filepath in html_files:
    with open(filepath, "r", encoding="utf-8") as f:
        html_content = f.read()
    
    soup = BeautifulSoup(html_content, "html.parser")
    is_settings = "settings-" in filepath
    is_success = "success" in filepath
    
    # 1. Update anchor tags based on text payload matching
    for a_tag in soup.find_all("a"):
        text = clean_text(a_tag.text)
        
        # Check explicit text maps
        for key, target_html in TEXT_LINK_MAPPING.items():
            if key.lower() in text.lower():
                a_tag["href"] = target_html
                break
        
        # Check sidebar mappings (especially useful on settings pages)
        for key, target_html in SIDEBAR_MAPPING.items():
            if key.lower() == text.lower() or (key.lower() in text.lower() and is_settings):
                a_tag["href"] = target_html
                break
                
        # Handle success screen specific button
        if is_success and "Proceed" in text:
            a_tag["href"] = "user-account.html"
            
        # Handle logout icons in settings
        icon_span = a_tag.find("span", string="logout")
        if icon_span or "logout" in text.lower():
            a_tag["href"] = "login.html"

    # 2. Add logout to button containing "logout" icon
    for btn in soup.find_all("button"):
        if "logout" in btn.text.lower() or btn.find("span", string="logout"):
            # Change button to anchor tags or add onclick since it's a static site
            btn["onclick"] = "window.location.href='login.html'"

    # 3. Update form actions to simulate a logical flow
    file_basename = os.path.basename(filepath)
    if file_basename in FORM_ACTION_MAPPING:
        target_action = FORM_ACTION_MAPPING[file_basename]
        for form in soup.find_all("form"):
            form["action"] = target_action
            
    # 4. Handle edge cases for buttons acting as links (e.g. Dashboard access)
    if "success" in file_basename:
        for btn in soup.find_all("button"):
            if "dashboard" in btn.text.lower() or "continue" in btn.text.lower():
                btn["onclick"] = "window.location.href='user-account.html'"

    # Rewrite the file
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(str(soup))
        
print("Successfully linked all pages according to logical schema.")

