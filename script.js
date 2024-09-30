const dateOfBirth = document.getElementById('date-of-birth');
const todaysDate = document.getElementById('todays-date');
const calculateButton = document.getElementById('calculate-button');
const header = document.querySelector('h1');
const result = document.getElementById('result');

const todayDate = new Date();
const todayDay = todayDate.getDate();
const todayMonth = todayDate.getMonth() + 1;
const todayYear = todayDate.getFullYear();

todaysDate.valueAsDate = todayDate;

dateOfBirth.value = "2003-04-12";
//dateOfBirth.setAttribute('onfocus', "this.max=new Date().toISOString().split('T')[0]");

const updateValue = (id, value) => {
    const idElement = document.getElementById(id);
    if (!isNaN(value) && value >= 1000) {
        idElement.innerHTML = value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    } else {
        idElement.innerHTML = value;
    }
}

const showResult = () => {
    header.style.setProperty('margin-top', '0px')
    result.style.setProperty('display', 'block');
}

const CalculateAge = () => {
    const dateBirth = dateOfBirth.valueAsDate;

    const date = todaysDate.valueAsDate;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();


    if (date < dateBirth) {
        alert('Date of Birth should be less or equal to Today\'s date!');
        return;
    }

    const dayBirth = dateBirth.getDate();
    const monthBirth = dateBirth.getMonth() + 1;
    const yearBirth = dateBirth.getFullYear();

    const nextBirthday = new Date(dateBirth);
    nextBirthday.setFullYear(year) > todaysDate.valueAsDate ? nextBirthday.setFullYear(year) : nextBirthday.setFullYear(year + 1);

    const isBirthdayThisYear = nextBirthday.getFullYear() === year;

    const ageYears = isBirthdayThisYear ? year - yearBirth - 1 : year - yearBirth;
    updateValue('age-years', ageYears);
    updateValue('total-years', ageYears);

    let ageMonths = isBirthdayThisYear ? month - monthBirth + 12 : month - monthBirth;
    if (dayBirth > day) {
        ageMonths -= 1;
    }
    updateValue('age-month', ageMonths);

    let tempDate = new Date(dateBirth);
    tempDate.setFullYear(year);
    tempDate.setMonth(ageMonths + monthBirth - 1);

    let ageDays = Math.floor((date.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24));
    if (isBirthdayThisYear) {
        ageDays = 365 + ageDays;
    }
    updateValue('age-days', ageDays);

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const nextBirthdayWeekDay = weekday[nextBirthday.getDay()];
    updateValue('week-day', nextBirthdayWeekDay);

    let nextMonth = isBirthdayThisYear ? monthBirth - month : 12 - month + monthBirth;
    if (dayBirth < day) {
        nextMonth -= 1;
    }
    updateValue('next-month', nextMonth);

    tempDate = new Date (nextBirthday);
    tempDate.setMonth(monthBirth - 2);
    tempDate.setDate(day);
    console.log(nextBirthday, tempDate);
    const nextDays = Math.floor((nextBirthday.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24));
    updateValue('next-days', nextDays);

    const totalMonths = ageMonths + ageYears * 12;
    updateValue('total-month', totalMonths);

    const totalDays = Math.floor((date.getTime() - dateBirth.getTime()) / (1000 * 60 * 60 * 24));
    updateValue('total-days', totalDays);

    const totalWeeks = Math.floor(totalDays / 7);
    updateValue('total-weeks', totalWeeks);

    const totalHours = Math.floor((date.getTime() - dateBirth.getTime()) / (1000 * 60 * 60));
    updateValue('total-hours', totalHours);

    const totalMinutes = Math.floor((date.getTime() - dateBirth.getTime()) / (1000 * 60));
    updateValue('total-minutes', totalMinutes);

    showResult();
}

calculateButton.addEventListener('click', (event) => {
    event.preventDefault();
    !dateOfBirth.value || !todaysDate.value ? alert('Enter date!') : CalculateAge();
})