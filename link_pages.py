import os
from bs4 import BeautifulSoup
import glob

html_files = glob.glob("*.html")

SIDEBAR_MAPPING = {
    "Profile": "settings_profile_unified.html",
    "AI Behavior": "settings_ai_behavior_unified.html",
    "Voice & Interaction": "settings_voice_interaction_unified.html",
    "System Permissions": "settings_system_permissions_unified.html",
    "Automation Settings": "settings_automation_unified.html",
    "Integrations": "settings_integrations_unified.html",
    "Notifications": "settings_notifications_unified.html",
    "Appearance": "settings_appearance_unified.html",
    "Privacy & Security": "settings_security_privacy_unified.html",
    "Advanced": "settings_advanced_unified.html"
}

TEXT_LINK_MAPPING = {
    "Create a new account": "nexus_ai_create_account_unified_background.html",
    "Forgot?": "nexus_ai_forgot_password_unified_background.html",
    "Forgot Password": "nexus_ai_forgot_password_unified_background.html",
    "Log in to Core": "nexus_ai_login_refined_grid_cursor.html",
    "Back to Login": "nexus_ai_login_refined_grid_cursor.html",
    "Return to login": "nexus_ai_login_refined_grid_cursor.html",
    "Login": "nexus_ai_login_refined_grid_cursor.html",
    "Terms": "terms_conditions_nexus_ai.html",
    "Terms & Conditions": "terms_conditions_nexus_ai.html",
    "Terms of Neural Access": "terms_conditions_nexus_ai.html",
    "Privacy": "privacy_policy_nexus_ai.html",
    "Nexus Privacy Protocols": "privacy_policy_nexus_ai.html",
    "Help": "help_center_hub.html",
    "Help Center": "help_center_hub.html",
    "System Status": "system_status_dashboard.html",
    "Gateway": "nexus_ai_login_refined_grid_cursor.html",
    "API Docs": "api_documentation.html",
    "Support": "contact_us_nexus_ai_clean_header.html"
}

FORM_ACTION_MAPPING = {
    "nexus_ai_login_refined_grid_cursor.html": "nexus_ai_user_account_unified_background.html",
    "nexus_ai_create_account_unified_background.html": "nexus_ai_otp_verification_unified_background.html",
    "nexus_ai_forgot_password_unified_background.html": "nexus_ai_otp_verification_unified_background.html",
    "nexus_ai_otp_verification_unified_background.html": "nexus_ai_reset_password_unified_background.html",
    "nexus_ai_reset_password_unified_background.html": "nexus_ai_success_screen_unified_background.html"
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
    is_settings = "settings_" in filepath
    is_success = "success_screen" in filepath
    
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
            a_tag["href"] = "nexus_ai_user_account_unified_background.html"
            
        # Handle logout icons in settings
        icon_span = a_tag.find("span", string="logout")
        if icon_span or "logout" in text.lower():
            a_tag["href"] = "nexus_ai_login_refined_grid_cursor.html"

    # 2. Add logout to button containing "logout" icon
    for btn in soup.find_all("button"):
        if "logout" in btn.text.lower() or btn.find("span", string="logout"):
            # Change button to anchor tags or add onclick since it's a static site
            btn["onclick"] = "window.location.href='nexus_ai_login_refined_grid_cursor.html'"

    # 3. Update form actions to simulate a logical flow
    file_basename = os.path.basename(filepath)
    if file_basename in FORM_ACTION_MAPPING:
        target_action = FORM_ACTION_MAPPING[file_basename]
        for form in soup.find_all("form"):
            form["action"] = target_action
            
    # 4. Handle edge cases for buttons acting as links (e.g. Dashboard access)
    if "success_screen" in file_basename:
        for btn in soup.find_all("button"):
            if "dashboard" in btn.text.lower() or "continue" in btn.text.lower():
                btn["onclick"] = "window.location.href='nexus_ai_user_account_unified_background.html'"

    # Rewrite the file
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(str(soup))
        
print("Successfully linked all pages according to logical schema.")
