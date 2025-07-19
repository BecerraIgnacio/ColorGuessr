
function randomHexColor() {
    const n = Math.floor(Math.random() * 0x1000000);
    return '#' + n.toString(16).padStart(6, '0').toUpperCase();
}

function getRGBComponents(hexColor) {
    return {
        r: parseInt(hexColor.slice(1, 3), 16),
        g: parseInt(hexColor.slice(3, 5), 16),
        b: parseInt(hexColor.slice(5, 7), 16)
    };
}

function mostrarError(mensaje) {
    const errorBox = document.getElementById('errorMessage');
    errorBox.textContent = mensaje;
    errorBox.classList.remove('hidden');

    setTimeout(() => {
        errorBox.classList.add('hidden');
    }, 5000);
}

window.addEventListener('DOMContentLoaded', () => {
    let targetColor = randomHexColor();

    const colorDiv = document.getElementById('colorHalf');
    const whiteDiv = document.getElementById('whiteHalf');
    const guessButton = document.getElementById('guessButton');
    const guessInput = document.getElementById('guessInput');
    const overlay = document.getElementById('overlay');
    const playAgainButton = document.getElementById('playAgainButton');
    const playAgainCenter = document.getElementById('playAgainCenter');
    const seeColorsButton = document.getElementById('seeColorsButton');
    const controls = document.getElementById('controls');
    const buttonsBox = document.querySelector('.buttons');
    const labelReal = document.getElementById('labelColorReal');
    const labelUser = document.getElementById('labelColorUser');
    const realColor = document.getElementById('realColor');
    const userColor = document.getElementById('userColor');
    const scoreRed = document.getElementById('scoreRed');
    const scoreGreen = document.getElementById('scoreGreen');
    const scoreBlue = document.getElementById('scoreBlue');
    const scoreTotal = document.getElementById('scoreTotal');

    function resetGameState() {
        targetColor = randomHexColor();
        colorDiv.style.backgroundColor = targetColor;
        whiteDiv.style.backgroundColor = '#FFFFFF';
        guessInput.value = '';
        overlay.classList.add('hidden');
        labelReal.style.display = 'none';
        labelUser.style.display = 'none';
        controls.style.display = 'flex';
    }

    function mostrarResultados(colorReal, colorIngresado) {
        const realRGB = getRGBComponents(colorReal);
        const guessRGB = getRGBComponents(colorIngresado);
        const diffR = Math.abs(realRGB.r - guessRGB.r);
        const diffG = Math.abs(realRGB.g - guessRGB.g);
        const diffB = Math.abs(realRGB.b - guessRGB.b);
        const scoreR = 255 - diffR;
        const scoreG = 255 - diffG;
        const scoreB = 255 - diffB;
        const total = scoreR + scoreG + scoreB;
        realColor.textContent = colorReal;
        userColor.textContent = colorIngresado.toUpperCase();
        scoreRed.textContent = scoreR;
        scoreGreen.textContent = scoreG;
        scoreBlue.textContent = scoreB;
        scoreTotal.textContent = total;
    }

    function mostrarEtiquetas(hexReal, hexIngresado) {
        labelReal.textContent = hexReal;
        labelUser.textContent = hexIngresado.toUpperCase();
        labelReal.style.display = 'inline-block';
        labelUser.style.display = 'inline-block';
    }

    function ocultarEtiquetas() {
        labelReal.style.display = 'none';
        labelUser.style.display = 'none';
    }

    colorDiv.style.backgroundColor = targetColor;
    overlay.classList.add('hidden');

    guessButton.addEventListener('click', () => {
        const inputColor = guessInput.value.trim();
        if (/^#([0-9A-Fa-f]{6})$/.test(inputColor)) {
            whiteDiv.style.backgroundColor = inputColor;
            overlay.classList.remove('hidden');
            mostrarResultados(targetColor, inputColor);
        } else {
            mostrarError('Por favor, ingresá un color hexadecimal válido (ej: #AABBCC).');
        }
    });

    playAgainButton.addEventListener('click', () => {
        resetGameState();
        buttonsBox.style.display = 'flex';
        playAgainCenter.classList.add('hidden');
    });

    playAgainCenter.addEventListener('click', () => {
        resetGameState();
        buttonsBox.style.display = 'flex';
        playAgainCenter.classList.add('hidden');
    });

    seeColorsButton.addEventListener('click', () => {
        overlay.classList.add('hidden');
        buttonsBox.style.display = 'none';
        controls.style.display = 'none';
        playAgainCenter.classList.remove('hidden');
        mostrarEtiquetas(targetColor, guessInput.value);
    });
});
