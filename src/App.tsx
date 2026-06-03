import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { Header } from "./layouts/Header";
// import { DashBoard } from "./pages/DashBoard";
// import { Workout } from "./pages/Workout";
// import { Exercise } from "./pages/Exercise";
import { Weight } from "./pages/Weight";
import { Analytics } from "./pages/Analytics";

import type { TrainingMenu } from "./types/TrainingMenu";
import "react-calendar/dist/Calendar.css";
import "./App.css";
import { ProfileSetting } from "./pages/ProfileSetting";

function App() {
  const [menus, setMenus] = useState<TrainingMenu[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMenus = async () => {
      const { data, error } = await supabase.from("training_menu").select("*");

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      setMenus(data ?? []);
      setIsLoading(false);
    };

    fetchMenus();
  }, []);

  return (
    <>
      <Header />
      {/* <DashBoard />? */}
      {/* <Workout /> */}
      {/* <Exercise/> */}
      {/* <Weight/> */}
      {/* <Analytics/> */}
      <ProfileSetting/>
    </>
  );
}

export default App;
