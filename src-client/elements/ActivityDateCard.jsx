
function ActivityDateCard({ activity }) {

    return (
        <ul>
            <li>Date: {activity.date}</li>
            <li>Service: {activity.serviceId}</li>
            <li>Processed: {activity.processed}</li>
            <li>Waiting: {activity.waiting}</li>
        </ul>
    );
}

export default ActivityDateCard;