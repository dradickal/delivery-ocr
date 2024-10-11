import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import PageHeader from "./layouts/PageHeader";
import ActivityDateList from "./elements/ActivityDateList";


function ManageData() {
    const { activityDates } = useLoaderData();

    return (
        <>
            <PageHeader title="Manage Data" />
            <ActivityDateList activityDates={activityDates} />
        </>
    );
}

export default ManageData;