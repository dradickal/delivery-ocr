import "./activityDateList.scss";
import { useEffect } from "react";
import ActivityDateCard from "./ActivityDateCard";

function mapActivityDates(activityDates) {
    return activityDates.map(
        (activity, index) => (<ActivityDateCard activity={activity} key={activity.date} />)
    );
}

function ActivityDateList({ activityDates }) {
    let dateList = mapActivityDates(activityDates);

    useEffect(() => {
        dateList = mapActivityDates(activityDates);
    },[activityDates])

    return (
        <section className="activityDates">
            <ul className="activityDatesList">
                {dateList}
            </ul>
        </section>
    )
}

export default ActivityDateList