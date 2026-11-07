import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function GoogleSuccess() {
    const { googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const processed = useRef(false);
    useEffect(() => {
        if (processed.current) return;
        processed.current = true;
        try {
            const hash = window.location.hash.substring(1);
            const params = new URLSearchParams(hash);
            const token = params.get("token");
            const userData = params.get("user");
            if (!token || !userData) {
                navigate("/login?googleError=1", { replace: true });
                return;
            }
            const user = JSON.parse(userData);
            googleLogin(token, user);
            if (user.role?.toLowerCase() === "admin") {
                navigate("/admin", { replace: true });
            } else {
                navigate("/", { replace: true });
            }
        } catch (error) {
            console.error("Google login processing error:", error);
            navigate("/login?googleError=1", { replace: true });
        }
    }, [googleLogin, navigate]);

    return (
        <div className="container text-center py-5">
            <h4>Completing Google Sign-In...</h4>
            <p>Please wait.</p>
        </div>
    );
}

export default GoogleSuccess;