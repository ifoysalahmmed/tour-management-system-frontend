import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state || "");

  useEffect(() => {
    if (!email) {
      navigate("/login", { replace: true });
    }
  }, [email]);

  return (
    <div>
      <h1>Welcome to the Verify component</h1>
      <p>Email: {email}</p>
    </div>
  );
};

export default Verify;
