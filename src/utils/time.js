const timeAgo = (currentTime) => {

    const date = (currentTime instanceof Date) ? currentTime : new Date(currentTime);

    const formatter = new Intl.RelativeTimeFormat('en');

    const ranges = {
        years: 3600*24*365,
        months: 3600*24*30,
        weeks: 3600*24*7,
        days: 3600*24,
        hours: 3600,
        minutes: 60,
        seconds: 1
    };

    const secondsElapsed = (date.getTime() - Date.now()) / 1000;

    for (let key in ranges) {
        if (ranges[key] < Math.abs(secondsElapsed)) {
            const delta = secondsElapsed / ranges[key];
            return formatter.format(Math.round(delta), key);
        };
    };
    // const sec = (currentTime / 1000);
    // const min = (currentTime / (1000 * 60)).toFixed(0);
    // const hrs = (currentTime / (1000 * 60 * 60)).toFixed(0);
    // const days = (currentTime / (1000 * 60 * 60 * 24)).toFixed(0);
    // const weeks = (currentTime / (1000 * 60)).toFixed(0);
    // const months = (currentTime / (1000 * 60)).toFixed(0);
    // const years = (currentTime / (1000 * 60)).toFixed(0);
};

export default timeAgo;