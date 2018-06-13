// Timer
const buttons = document.querySelectorAll('[data-time]');

const  timer = (function () {
    let countDown,
        timerDisplay,
        endTime,
        alarmSound,
        form = document.forms['customForm'],
        stopBtn,
        pauseBtn,
        pauseSeconds;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let inputText = form.elements['minutes'];
        start((parseInt(inputText.value * 60)));
    });

    function init(settings) {
        timerDisplay = document.querySelector(settings.timeLeftSelector);
        endTime = document.querySelector(settings.timeEndSelector);
        stopBtn = document.querySelector('.timer__button.stop');
        pauseBtn = document.querySelector('.timer__button.pause');

        if (settings.alarmSound){
            alarmSound = new Audio(settings.alarmSound);
        }

        stopBtn.addEventListener('click', () => {
            stop();
        });

        pauseBtn.addEventListener('click', (e) => {
           pauseBtn.classList.toggle('toggle');
           if(e.target.classList.contains('toggle')){
               clearInterval(countDown);
               pauseBtn.textContent = 'PLAY >';
           } else {
               pauseBtn.textContent = 'PAUSE ||';
               start(+pauseSeconds);
           }
        });
        return this;
    }

    function start(seconds) {
        if (!timerDisplay || !endTime)
            return console.log('Please init module first');

        if(!seconds || typeof seconds !== 'number')
            return console.log('Please provide seconds');

        // reset timer
        clearInterval(countDown);

        //reset sound
        alarmSound.pause();
        alarmSound.currentTime = 0;

        pauseBtn.classList.add('show');
        pauseBtn.textContent = 'PAUSE ||';

        const now = Date.now();
        const then = now + seconds * 1000;

        displayTimeLeft(seconds);
        displayEndTime(then);

        countDown = setInterval(() => {
           const secondsLeft = Math.round((then - Date.now()) / 1000);

           displayTimeLeft(secondsLeft);

           if (secondsLeft <= 0) {
               clearInterval(countDown);
               playSound();
               return;
           }
        }, 1000);
    }

    function displayTimeLeft(seconds) {
        pauseSeconds = seconds;

        let day = Math.floor(seconds / 1440 / 60);
        let hour = Math.floor(seconds % 86400 / 60 / 60);
        let minutes = Math.floor (seconds % 3600 / 60);
        const reminderSeconds = seconds % 60;
        let days;
        let daysVal = (day).toString();
        let result = +daysVal[daysVal.length - 1];
        let result2 = daysVal.slice(daysVal.length - 2 , daysVal.length) ;
        let display;


        if( result === 2 || result === 3 || result === 4) {
            days = 'дня';
        }

        if( result === 5 || result === 6 || result === 7 || result === 8 || result === 9 || result === 0 || (parseInt(result2) > 10 && parseInt(result2) < 20)) {
            days = 'дней';
        }
        if (result2 < 2){
            days = 'день';
        }

        if(!days){
            days ='день'
        }

        if(seconds < 3600){
            display =`${minutes < 10 ? '0' : ''}${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
        }
        if(seconds >= 3600){
            display = `${hour < 10 ? '0' : ''}${hour}:${minutes < 10 ? '0' : ''}${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
        }
        if(seconds >= 86400) {
            display = `${day} ${days} ${hour < 10 ? '0' : ''}${hour}:${minutes < 10 ? '0' : ''}${minutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
        }

        document.title = display;

        timerDisplay.textContent = display;
    }

    function displayEndTime(timestamp) {
        let end = new Date(timestamp);

        end = end.toLocaleString();

        endTime.textContent = `Таймер сработает - ${end}`;
    }

    function stop() {
        clearInterval(countDown);
        alarmSound.pause();
        alarmSound.currentTime = 0;
        endTime.textContent = 'Установите таймер';
        document.title = 'STOP';
        timerDisplay.textContent = '00:00';
        pauseBtn.classList.remove('show');
    }

    function playSound() {
        alarmSound.play();
    }

    return {
        init,
        start,
        stop
    }
}());


// Init Timer
timer.init({
    timeLeftSelector: '.display__time-left',
    timeEndSelector: '.display__end-time',
    alarmSound: 'audio/bell.mp3'
}).start(1800);

// Start timer by click

function startTimer(e) {
    const seconds = parseInt(this.dataset.time);
    timer.start(seconds);
};


buttons.forEach(btn => btn.addEventListener('click', startTimer));


