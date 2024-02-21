
import Sidebar from "./Sidebar";
import Body from "./Body";

const Dashboard = () => {
    return (
        <div className="dashboard flex">
            <div className="dashboardContainer flex">
                <Sidebar />
                <Body />
            </div>
        </div>
    );
}

export default Dashboard;
