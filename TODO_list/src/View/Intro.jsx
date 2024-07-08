import React, { useEffect } from 'react';
import introPng from '../assets/sticky-note.png';
import './Intro.css';

function Intro() {
    useEffect(() => {
        const splashScreen = document.querySelector('.splash-screen');
        if (splashScreen) {
            splashScreen.addEventListener('click', () => {
                splashScreen.style.opacity = 0;
                setTimeout(() => {
                    splashScreen.classList.add('hidden');
                }, 610);
            });
        }

        return () => {
            if (splashScreen) {
                splashScreen.removeEventListener('click', () => {
                    splashScreen.style.opacity = 0;
                    setTimeout(() => {
                        splashScreen.classList.add('hidden');
                    }, 610);
                });
            }
        };
    }, []);

    return (
        <div className='splash-screen'>
            <img className='splash-img' src={introPng} alt='Intro' />
        </div>
    );
}

export default Intro;
