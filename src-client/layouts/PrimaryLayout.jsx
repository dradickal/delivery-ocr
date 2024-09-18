import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/pro-regular-svg-icons";
import { NavLink } from "react-router-dom";

const linkStateClass = ({ isActive, isPending }) => (
    isActive
      ? "active"
      : isPending
      ? "pending"
      : ""
);
  

function PrimaryLayout({children}) {

    return (
        <>
            <section className="sidebar">
                <h1><FontAwesomeIcon icon={faMapLocationDot}/>Delivery Stats</h1>
                <nav>
                    <NavLink to='dashboard' className={linkStateClass}>Dashboard</NavLink>
                    <NavLink to='manage-data' className={linkStateClass}>Manage Data</NavLink>
                    <NavLink to='upload' className={linkStateClass}>Image Upload</NavLink>
                </nav>
            </section>
            <main>
                {children}
            </main>
        </>
    )
}

export default PrimaryLayout;