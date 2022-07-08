let quizConfig = [];
let score = 0;
let currentImage = 0;

(function () {
    setup();
})();

function setup() {
    generateQuizConfig('tooth', 10, quizConfig);
    generateQuizConfig('popcorn', 10, quizConfig);
    shuffleArray(quizConfig);
    const quizImage = document.getElementById('quiz-image');
    quizImage.src = quizConfig[0].image;
    document.getElementById('random-figure').innerText = 'Figure ' + (currentImage + 1);
}

function generateQuizConfig(keyword, iterations, config) {
    for (let i = 1; i <= iterations; i++) {
        config.push({answer: keyword, image: `assets/${keyword}${i}.png`, originalImage: `assets/${keyword}${i}.png`})
    }
}

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function answerSelect(answer) {
    if (answer === quizConfig[currentImage].answer) {
        score++;
    }
    nextQuestion();
}

function nextQuestion() {
    if ((currentImage + 1) === quizConfig.length) {
        finishQuiz();
        return;
    }

    currentImage++;
    const quizImage = document.getElementById('quiz-image');
    quizImage.src = quizConfig[currentImage].image;
    document.getElementById('random-figure').innerText = 'Figure ' + (currentImage + 1);
}

function finishQuiz() {
    document.querySelectorAll('button').forEach(elem => {
        elem.disabled = true;
    })

    let result = '';
    if (score <= 3) {
        result = 'Quite a bad result';
    } else if (score <= 7) {
        result = 'Somewhat a bad result';
    } else if (score <= 12) {
        result = 'Wouldn\'t want to consider you to check my teeth';
    } else if (score <= 15) {
        result = 'A satisfactory result';
    } else if (score <= 18) {
        result = 'You could be a food technician';
    } else if (score <= 19) {
        result = 'Not good enough for a dentist';
    } else if (score === 20) {
        result = 'You could be a dentist!';
    }
    document.getElementById('result-text').innerText = 'Result: ' + result + ' Score: ' + score + '/20';
}
