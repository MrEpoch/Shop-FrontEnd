import "./auth__pages.css";
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { LogIn as LogInAPI } from "../../API_requests.ts";
import Alert from "@mui/material/Alert";
import CircularProgress from '@mui/material/CircularProgress';

export default function LogIn() {
    
    const nameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    async function LogIn() {
        if (nameRef.current === null || passwordRef.current === null) {
            setLoading(false);
            setError("Something went wrong");
            return;
        }
        setLoading(true);

        if (nameRef.current.value.trim() === "") { setLoading(false); setError("Username cannot be empty"); return; }
        if (passwordRef.current.value.trim() === "") { setLoading(false); setError("Password cannot be empty"); return; }
        if (nameRef.current.value.length > 20) { setLoading(false); setError("Username cannot be longer than 20 characters"); return; }
        if (passwordRef.current.value.length > 50) { setLoading(false); setError("Password cannot be longer than 20 characters"); return; }
        if (nameRef.current.value.length < 5) { setLoading(false); setError("Username cannot be shorter than 5 characters"); return; }
        if (passwordRef.current.value.length < 10) { setLoading(false); setError("Password cannot be shorter than 10 characters"); return; }

        try {
            await LogInAPI(nameRef.current.value, passwordRef.current.value);
            navigate("/")
            return
        } catch (e) {
            setLoading(false);
            setError("Incorrect username or password");
            return;
        }
    }

    return (
        <>
        {loading ? (<div className="loading__container"><CircularProgress /></div>) : 
            (<section className="login__page">
                {error !== "" ? (<Alert severity="error" 
                    onClose={() => {
                        setError("");
                    }}
                    style={{ position: "absolute", top: 33 }}
                className="error__auth">{error}</Alert>) : (<></>)}
                <div className="login__page__form">
                    <h2 className="title">Log In</h2>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input ref={nameRef} className="input" type="text" placeholder="Name" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input ref={passwordRef} className="input" type="password" placeholder="Password" />
                        </div>
                    </div>
                    <button className="button is-primary" onClick={LogIn}>Log In</button>
                </div>
            </section>
            )
        }
        </>
    )
}
