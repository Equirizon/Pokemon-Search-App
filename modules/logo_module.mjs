const logoAnimation = (display = 'block', width = '7rem') => {
    try {
        if (!document || !document.body) {
            throw new Error('Document or body element is not available. Ensure this script runs in a browser environment.');
        }
        if (display instanceof String || width instanceof String) {
            throw new TypeError('Invalid argument type: "display" and "width" must be strings.');
        }
        if (/\s/.test(display) || /\s/.test(width)) {
            throw new Error(`The "display" and "width" parameters cannot have empty strings. Received "${width.replace(/\s/g, '•')}".`);
        }
        const unitsRegex = /^\d+(?:.\d+)?(?:px|em|rem)$/i 
        if (!unitsRegex.test(width)) {
            throw new TypeError(`Invalid width argument. Ensure the width includes valid CSS units (Available units: px, em, rem). Received: ${width}.`);
        }
        const widthValue = parseFloat(width);
        if (isNaN(widthValue) || widthValue <= 0) {
            throw new TypeError(`Invalid width value. Received: "${width}".`);
        }
    } catch (error) {
        document.body.insertAdjacentHTML('afterbegin', `<div style="color: red;">Logo failed to load.</div>`);
        console.error('Error initializing logo module:', error);
        return;
    }
    
    const injectLogoHTML = () => {
        if (!document.querySelector('header')) {
            console.warn('Header element not found. Creating and adding <header> to <body>.');
            const header = document.createElement('header');
            document.body.insertAdjacentElement('afterbegin', header);
        }

        if (!document.querySelector('.my-logo-module')) {
            console.warn('Class "my-logo-module" not found. Adding <img> element to the header.');
            const header = document.querySelector('header');
            const logoDiv = document.createElement('div');
            logoDiv.id = 'div-logo';
            logoDiv.innerHTML = `
                <a href="https://github.com/Equirizon" target="_blank">
                <img src="assets/Folder Icon 1.5.png" alt="logo" class="my-logo-module" />
                </a>
            `;
            header.insertAdjacentElement('afterbegin', logoDiv);
        } else {
            console.info('Logo element already exists inside <header>. No additional changes made.');
            console.warn('make sure to include "assets/Folder Icon 1.5.png" in root directory');
        }
        
        const logo = document.querySelector('.my-logo-module');
        addHoverListeners(logo);
    };

    const injectStyles = () => {
        if (!document.getElementById('logo-style')) {
            const logo = document.createElement('style');
            logo.id = 'logo-style';
            logo.textContent = 
                `
                .my-logo-module {
                    display: ${display};
                    width: ${width};
                    height: auto;
                    margin: auto;
                    transition: all 0.2s ease-out, filter 500ms cubic-bezier(0.4, 0, 1, 1);
                }
                .hover-logo-style {
                    transform: scale(1.02);
                    animation: hue-rotate-my-logo 1s ease-out infinite alternate;
                }
                    .hover-logo-style:active {
                    transform: scale(0.95);
                }
                a[href="https://github.com/Equirizon"] {
                    position: relative;
                    display: block;
                    width: min-content;
                    margin: auto;
                }
                @keyframes hue-rotate-my-logo {
                    0% {
                        filter: hue-rotate(0deg);
                    }
                    100% {
                        filter: hue-rotate(20deg);
                    }
                }
                `;
            document.head.appendChild(logo);
        }
    };
    
    const addHoverListeners = (logo) => {
        if (logo) {
            logo.addEventListener('mouseenter', () => {
                logo.classList.add('hover-logo-style');
            });
            
            logo.addEventListener('mouseleave', () => {
                gradientAnimation(logo);
                logo.classList.remove('hover-logo-style');
            });
        } else {
            console.error('logo does not exist');
        }
    };
    
    const gradientAnimation = (logo) => {
        const hover = document.querySelector('.hover-logo-style');
        const computedStyle = window.getComputedStyle(hover);
        const hue = computedStyle.filter;
        logo.style.setProperty('filter', hue);
        setTimeout(() => {
            logo.style.setProperty('filter', 'hue-rotate(0deg)');
        }, 1);
    };
    
    injectLogoHTML();
    injectStyles();
};

export default logoAnimation;