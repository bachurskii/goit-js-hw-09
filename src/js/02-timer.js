import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const text = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('button[data-start]');
const divTimer = document.querySelector('.timer');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      buttonStart.disabled = true;
    } else {
      buttonStart.disabled = false;
    }
  },
};

flatpickr(text, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

buttonStart.addEventListener('click', () => {
  let timer = setInterval(() => {
    let countDownTime = new Date(text.value) - new Date();
    buttonStart.disabled = true;
    if (countDownTime >= 0) {
      let times = convertMs(countDownTime);
      days.textContent = addLeadingZero(times.days);
      hours.textContent = addLeadingZero(times.hours);
      minutes.textContent = addLeadingZero(times.minutes);
      seconds.textContent = addLeadingZero(times.seconds);
      if (countDownTime <= 10000) {
        divTimer.style.color = 'tomato';
      }
    } else {
      Notiflix.Notify.success('Countdown successful');
      divTimer.style.color = 'black';
      clearInterval(timer);
    }
  }, 1000);
});
