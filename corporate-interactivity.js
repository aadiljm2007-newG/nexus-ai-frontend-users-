document.addEventListener('DOMContentLoaded', () => {

    // 1. Password Visibility Toggle
    const togglePasswordBtns = document.querySelectorAll('button:has(span:contains("visibility"))');
    // For wider browser support without :has
    const allBtns = document.querySelectorAll('button');
    allBtns.forEach(btn => {
        if (btn.innerText.includes('visibility') || btn.innerHTML.includes('visibility')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const parent = btn.closest('.relative');
                if (parent) {
                    const input = parent.querySelector('input');
                    const span = btn.querySelector('span');
                    if (input && span) {
                        if (input.type === 'password') {
                            input.type = 'text';
                            span.innerText = 'visibility_off';
                        } else {
                            input.type = 'password';
                            span.innerText = 'visibility';
                        }
                    }
                }
            });
        }
    });

    // 2. Generic Form Validation and Redirection
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate all inputs in this form
            let isValid = true;
            const inputs = form.querySelectorAll('input:not([type="hidden"]), select, textarea');
            
            // clear old errors
            form.querySelectorAll('.js-error-msg').forEach(el => el.remove());
            inputs.forEach(input => {
                input.style.borderColor = '';
            });

            inputs.forEach(input => {
                // If it's a generic text/email/password required check
                if (input.hasAttribute('required') && input.value.trim() === '') {
                    isValid = false;
                    input.style.borderColor = 'red';
                    
                    const errorMsg = document.createElement('p');
                    errorMsg.className = 'js-error-msg text-[10px] text-red-500 mt-1 font-bold';
                    errorMsg.innerText = 'This field is required.';
                    input.parentElement.appendChild(errorMsg);
                } else if (input.type === 'email' && input.value.trim() !== '' && !input.value.includes('@')) {
                    isValid = false;
                    input.style.borderColor = 'red';
                    
                    const errorMsg = document.createElement('p');
                    errorMsg.className = 'js-error-msg text-[10px] text-red-500 mt-1 font-bold';
                    errorMsg.innerText = 'Please enter a valid email.';
                    input.parentElement.appendChild(errorMsg);
                }
            });

            if (isValid) {
                // Simulate submit/loading
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn ? submitBtn.innerText : '';
                if (submitBtn) {
                    submitBtn.innerText = 'PROCESSING...';
                    submitBtn.style.opacity = '0.7';
                    submitBtn.disabled = true;
                }

                setTimeout(() => {
                    const action = form.getAttribute('action');
                    if (action) {
                        window.location.href = action;
                    } else {
                        if (submitBtn) {
                            submitBtn.innerText = 'SUCCESS';
                            submitBtn.style.backgroundColor = '#10b981'; // emerald
                        }
                    }
                }, 800);
            }
        });
    });

    // 3. Toggles (Dark/Light mode & Setting switches)
    const toggles = document.querySelectorAll('.js-toggle');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const track = toggle.querySelector('.custom-toggle');
            const ball = toggle.querySelector('.custom-toggle-ball');
            if (track && ball) {
                const isCurrentlyOff = ball.style.left === '0.5rem' || ball.style.left === '2px' || ball.classList.contains('left-0.5');
                
                if (isCurrentlyOff) {
                    // Turn it on
                    ball.classList.remove('left-0.5');
                    ball.classList.add('right-0.5');
                    track.style.backgroundColor = '#000'; // obsidian active
                    if(document.documentElement.classList.contains('dark')) track.style.backgroundColor = '#fff';
                } else {
                    // Turn it off
                    ball.classList.remove('right-0.5');
                    ball.classList.add('left-0.5');
                    track.style.backgroundColor = ''; 
                }
            }
        });
    });

    // 4. Theme Button logic
    const themeBtns = document.querySelectorAll('.js-theme-btn');
    themeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const theme = btn.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            // Update styling to show which is active
            themeBtns.forEach(b => {
                b.style.backgroundColor = 'transparent';
                b.style.boxShadow = 'none';
            });
            btn.style.backgroundColor = 'var(--bg-active, rgba(255,255,255,0.1))'; // fallback
            if(theme==='light') btn.style.backgroundColor = '#ffffff';
            else btn.style.backgroundColor = '#27272a';
            btn.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        });
    });

    // 5. Active Sidebar highlight dynamically
    const navItems = document.querySelectorAll('.nav-item');
    const currentUrl = window.location.pathname.split('/').pop() || 'index.html';
    
    // Remove active class from all
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href === currentUrl) {
            item.classList.add('active', 'bg-zinc-100/50', 'dark:bg-zinc-900/50', 'text-zinc-900', 'font-bold');
            item.classList.remove('text-zinc-400', 'hover:text-zinc-900');
        } else {
            item.classList.remove('active', 'bg-zinc-100/50', 'dark:bg-zinc-900/50', 'text-zinc-900', 'font-bold');
            item.classList.add('text-zinc-400', 'hover:text-zinc-900');
        }
    });

    // 6. OTP Auto-focus jumping
    const otpInputs = document.querySelectorAll('input[maxlength="1"]');
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });

});
