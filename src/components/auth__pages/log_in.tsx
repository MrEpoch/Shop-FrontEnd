import "./auth__pages.css";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn as LogInAPI } from "../../API_requests.ts";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useAccount } from "../../Account_context.tsx";
import { ThemeType } from "../../Types.tsx";
import { useTheme } from "../../Theme_context.tsx";

export default function LogIn() {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { Fill_user_account } = useAccount();
  const { theme } = useTheme() as ThemeType;

  const navigate = useNavigate();

  async function LogIn() {
    if (nameRef.current === null || passwordRef.current === null) {
      setLoading(false);
      setError("Invalid values");
      return;
    }
    setLoading(true);

    if (nameRef.current.value.trim() === "") {
      setLoading(false);
      setError("Username cannot be empty");
      return;
    }
    if (passwordRef.current.value.trim() === "") {
      setLoading(false);
      setError("Password cannot be empty");
      return;
    }
    if (nameRef.current.value.length > 20) {
      setLoading(false);
      setError("Username cannot be longer than 20 characters");
      return;
    }
    if (passwordRef.current.value.length > 50) {
      setLoading(false);
      setError("Password cannot be longer than 20 characters");
      return;
    }
    if (nameRef.current.value.length < 5) {
      setLoading(false);
      setError("Username cannot be shorter than 5 characters");
      return;
    }
    if (passwordRef.current.value.length < 10) {
      setLoading(false);
      setError("Password cannot be shorter than 10 characters");
      return;
    }

    try {
      const user = await LogInAPI(
        nameRef.current.value,
        passwordRef.current.value,
      );
      await Fill_user_account(user);
      navigate("/user");
      return;
    } catch (e) {
      setLoading(false);
      setError("Incorrect username or password");
      return;
    }
  }

  return (
    <>
      {loading ? (
        <div className="loading__container">
          <CircularProgress />
        </div>
      ) : (
        <section
          className={`login__page ${
            theme ? "dark__theme__LIGHTER DARK_INPUTS" : ""
          }`}
        >
          {error !== "" ? (
            <Alert
              severity="error"
              onClose={() => setError("")}
              style={{
                position: "fixed",
                zIndex: 10,
                right: "1%",
                bottom: "0%",
              }}
              className="error__auth"
            >
              {error}
            </Alert>
          ) : (
            <></>
          )}          <div
            className={`login__page__form ${
              theme ? "dark__theme__container" : ""
            }`}
          >
            <h2 className="title">Log In</h2>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  ref={nameRef}
                  className="input"
                  type="text"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  ref={passwordRef}
                  className="input"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <button className="button is-primary" onClick={LogIn}>
              Log In
            </button>
          </div>
          <Link
            className={`shop__auth-link ${
              theme ? "shop__auth-link__DARK" : "w"
            }`}
            to="/signup"
          >
            Don't have an account?
          </Link>
        </section>
      )}
    </>
  );
}
