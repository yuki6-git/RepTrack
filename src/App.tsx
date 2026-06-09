import "react-calendar/dist/Calendar.css";
import "./App.css";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { AppRoutes } from "./routes/AppRoutes";
import type { TrainingMenus } from "./types/TrainingMenu";

function App() {
  const [menus, setMenus] = useState<TrainingMenus[]>([]);
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
      
      <AppRoutes/>
     
    </>
  );
}

export default App;
