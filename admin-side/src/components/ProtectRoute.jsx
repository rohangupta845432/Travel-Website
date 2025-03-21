import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectRoute({ children }) {
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  useEffect(() => {
    if (!auth.isAdminLogin) {
      navigate("/login");
    }
  }, [auth.isLogin, navigate]);

  return <>{children}</>;
}

export default ProtectRoute;
