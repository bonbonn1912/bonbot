import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { authenticateUser } from "../../Functions/authUser";
import LoadingCircle from "../Buttons/LoadingCircle";

interface Props {
  isAuthenticatedElement: React.ReactElement;
  alternativeElement: React.ReactElement;
}

const RouteWrapper = ({
  isAuthenticatedElement,
  alternativeElement,
}: Props) => {
  console.log("WrouteWrapper getting called");
  const { auth, setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    authenticateUser()
      .then((user) => {
        setAuth(user);
        setLoading(false);
      })
      .catch((err) => {
        setAuth(null);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <LoadingCircle />;
  } else {
    return auth ? isAuthenticatedElement : alternativeElement;
  }
};

export default RouteWrapper;
