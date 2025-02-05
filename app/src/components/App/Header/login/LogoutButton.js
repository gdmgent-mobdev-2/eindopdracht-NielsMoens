import { useAuth } from "../../../Auth/AuthProvider";
import Button from "../../../Design/Button";

const LogoutButton = () => {
  const { logout, user } = useAuth();

  return (
    <Button onClick={logout} color="outline-dark">
      Sign out {user.name}
    </Button>
  );
};

export default LogoutButton;
