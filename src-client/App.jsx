import './app.css';
import { Outlet } from 'react-router-dom';
import PrimaryPage from './layouts/PrimaryLayout';

function DeliveryStatsApp() {
    return (
        <PrimaryPage>
            <Outlet />
        </PrimaryPage>
    )
}

export default DeliveryStatsApp;
