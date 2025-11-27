import { useEffect } from "react";
import AppDash from "../../../../Backend/Dashboard/AppDash";
function Dashboard() {
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    fetch(`${apiUrl}/dashboard`).then((res) => res.json());
  }, []);

  return (
    <div>
      <AppDash />
    </div>
  );
}

export default Dashboard;
