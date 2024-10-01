import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import PageHeader from "./layouts/PageHeader";
import ActivityDateCard from "./elements/ActivityDateCard";

function mapActivityDates(activityDates) {
    return activityDates.map(
        (activity, index) => (<ActivityDateCard activity={activity} key={activity.date} />)
    );
}

function ManageData() {
    const { activityDates } = useLoaderData();

    let dateList = mapActivityDates(activityDates);

    useEffect(() => {
        dateList = mapActivityDates(activityDates);
    },[activityDates])

    return (
        <>
            <PageHeader title="Manage Data" />
            <section>
                <h2>List of Activity Dates</h2>
                {dateList}
            </section>
        </>
    );
}

export default ManageData;