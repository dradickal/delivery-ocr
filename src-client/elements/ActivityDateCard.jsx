import "./activityDateCard.scss";

const DAYOFWEEK = new Map([
    [0, {short: "Sun", long: "Sunday"}],
    [1, {short: "Mon", long: "Monday"}],
    [2, {short: "Tue", long: "Tuesday"}],
    [3, {short: "Wed", long: "Wednesday"}],
    [4, {short: "Thu", long: "Thursday"}],
    [5, {short: "Fri", long: "Friday"}],
    [6, {short: "Sat", long: "Saturday"}]
]);

const MONTH = new Map([
    [0, {short: "Jan", long: "January"}],
    [1, {short: "Feb", long: "February"}],
    [2, {short: "Mar", long: "March"}],
    [3, {short: "Apr", long: "April"}],
    [4, {short: "May", long: "May"}],
    [5, {short: "Jun", long: "June"}],
    [6, {short: "Jul", long: "July"}],
    [7, {short: "Aug", long: "August"}],
    [8, {short: "Sept", long: "September"}],
    [9, {short: "Oct", long: "October"}],
    [10, {short: "Nov", long: "November"}],
    [11, {short: "Dec", long: "December"}]
]);

function parseDate(date) {
    const d = new Date(date);
    return {
        date: d.getDate(),
        day: DAYOFWEEK.get(d.getDay()),
        month: MONTH.get(d.getMonth()),
        year: d.getFullYear(),
        string: d.toDateString(),
    }
}

function getService() {
    return { short: "GH" };
}

function ActivityDateCard({ activity }) {
    const { date, serviceId, processed, waiting } = activity;
    const fDate = parseDate(date);
    const fService = getService(serviceId);


    return (
        <li className="activityDateCard" data-service={fService.short}>
            <header>
                <span className={"service " + fService.short}>{fService.short}</span>
                <span className="day">{fDate.day.long}</span>
            </header>
            <section>
                <ul className="date">
                    <li className="m">{fDate.month.short}</li>
                    <li className="d">{fDate.date}</li>
                    <li className="y">{fDate.year}</li>
                </ul>
                <p>Processed: {activity.processed}</p>
                <p>Waiting: {activity.waiting}</p>
            </section>
        </li>
    );
}

export default ActivityDateCard;