import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, fetchUserById } from "../../api/authApi";

type Props = {
  children: React.ReactNode;
};

export const AuthGuard = (props: Props) => {
  const { children } = props;

  const [isChecking, setIsChecking] = useState(true);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await getCurrentUser();

      if (error || !data.user) {
        setRedirectPath("/login");
        setIsChecking(false);
        return;
      }

      const { data: user, error: userError } = await fetchUserById(data.user.id);

      if (userError) {
        setRedirectPath("/login");
        setIsChecking(false);
        return;
      }

      if (!user) {
        setRedirectPath("/register");
        setIsChecking(false);
        return;
      }

      setIsChecking(false);
    };

    checkAuth();
  }, []);

  if (isChecking) {
    return <p>読み込み中...</p>;
  }

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};