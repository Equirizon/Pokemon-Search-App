/**
 * Applies a shine animation effect to a button or a collection of buttons.
 * The animation includes a gradient background and scaling effects on hover and active states.
 * 
 * @param {Element|NodeList} button - The button element or a NodeList of buttons to apply the animation to.
 * @param {string} [base='#303030'] - The base color of the gradient in hexadecimal format (e.g., "#RRGGBB").
 * @param {string} [shine='#aaaaaa'] - The shine color of the gradient in hexadecimal format (e.g., "#RRGGBB").
 * @param {string} [color='#ffffff'] - The text color of the button in hexadecimal format (e.g., "#RRGGBB").
 * 
 * @throws {Error} Throws an error if the "button" argument is not provided or is not a valid Element or NodeList.
 * @throws {Error} Throws an error if any of the color arguments are not valid hexadecimal color codes.
 * 
 * @example
 * // Apply animation to a single button
 * const button = document.querySelector('#myButton');
 * buttonAnimation(button, '#333333', '#bbbbbb', '#ffffff');
 * 
 * @example
 * // Apply animation to multiple buttons
 * const buttons = document.querySelectorAll('.myButtons');
 * buttonAnimation(buttons, '#444444', '#cccccc', '#ffffff');
 */
const buttonAnimation = (button, base = '#303030', shine = '#aaaaaa', color = '#ffffff') => {
    try {
        applyButtonShineStyles(); 

        const colorRegex = /^#(?:[a-f0-9]{6})$/i;
        const argumentsArray = [base, shine, color];
    
        if (!button) {
            throw new Error('The "button" argument is required');
        }
        argumentsArray.forEach((arg, i) => {        
            if (!colorRegex.test(arg)) {
                throw new Error(`Expected a valid hex color code (e.g., #RRGGBB), but received '${argumentsArray[i]}'`);
            }
        });
    } catch (error) {
        console.error('Argument error:', error.message);
        return;
    }

    const injectStyles = () => {
        if (!document.getElementById('button-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'button-animation-styles';
            style.textContent = `
                .button-shine-animation-module {
                    background: linear-gradient(150deg, ${base} 0%, ${base} 35%, ${shine} 50%, ${base} 65%);
                    background-size: 300% 300%;
                    background-position: 100% 100%;
                    color: ${color};
                }
                .button-shine-animation-module:hover {
                    transform: scale(1.05);
                }
                .button-shine-animation-module:active {
                    transform: scale(1);
                }
                .active-shine-anim {
                    background: linear-gradient(150deg, ${base} 0%, ${base} 35%, ${shine} 50%, ${base} 65%);
                    background-size: 300% 300%;
                    animation: button-shine-module-animation 400ms ease-in reverse forwards;
                }
                @keyframes button-shine-module-animation {
                    0% {
                        background-position: 0% 0%;
                    }
                    100% {
                        background-position: 100% 100%;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };

    injectStyles();
    
    function applyButtonShineStyles() {
        const addClass = (btn) => {
            btn.classList.add('button-shine-animation-module');
        };

        const addAnimation = (btn) => {
            btn.addEventListener('mousedown', () => {
                btn.classList.add('active-shine-anim');
                setTimeout(() => {
                    btn.classList.remove('active-shine-anim');
                }, 400);
            });
        };

        if (button instanceof NodeList) {
            console.info('Button style module: applied styles using "querySelectorAll".');
            button.forEach((btn) => addAnimation(btn));
            button.forEach((btn) => addClass(btn));
        } else if (button instanceof Element) {
            console.info('Button style module: applied styles using "getElementById" or "querySelector".');
            addClass(button);
            addAnimation(button);
        } else {
            throw new Error('The "button" argument must be a valid element or NodeList.');
        }
    }
};
    
export default buttonAnimation;