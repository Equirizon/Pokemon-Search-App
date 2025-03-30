import buttonShine from './modules/button_shine_module.mjs';
import myLogo from './modules/logo_module.mjs';

const hello = document.querySelectorAll('.hello div');
const btn = document.querySelectorAll('.btn');

hello.forEach(element => {
    element.style.display = 'none';
});

const helloWorld = (e) => {
    if (e.target.classList[0] === 'btn') {
        hello.forEach(element => {
            element.classList.toggle('hidden');
        });
        if ([...hello[0].classList].some((token) => token === 'hidden')) {
            setTimeout(() => {
                hello.forEach(element => {
                    element.style.display = 'none';
                });
            }, 200);
        } else {
            hello.forEach(element => {
                element.removeAttribute('style');
            });
        }
    }
};

document.addEventListener('click', (e) => {
    helloWorld(e);
});

buttonShine(btn, '#4b0082', '#8a2be2', '#ffffff');
myLogo('display','6.5rem');