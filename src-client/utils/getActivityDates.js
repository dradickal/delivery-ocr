export async function getActivityDates() {
    let data = {
        activityDates: []
    };
    try {
        const response = await fetch('http://localhost:3001/activity/date');
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const body = await response.json();
        data = body.data;
    } catch (error) {
        console.error(error.message);
    }
    
    return data;
}