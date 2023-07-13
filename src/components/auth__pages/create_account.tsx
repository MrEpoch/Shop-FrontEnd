import { useRef, useState } from "react";
import { CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CreateAccount } from "../../API_requests.ts";
import { useAccount } from "../../Account_context.tsx";
import { Link } from "react-router-dom";
import { useTheme } from "../../Theme_context.tsx";
import { ThemeType } from "../../Types.tsx";

export default function Create_account() {
    
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const postalRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();
    
    const { Fill_user_account } = useAccount();
    const { theme } = useTheme() as ThemeType;

    async function New_account() {
        setError("");
        setLoading(true);

        if (nameRef.current === null || passwordRef.current === null || passwordConfirmRef.current === null || emailRef.current === null || phoneRef.current === null || addressRef.current === null || cityRef.current === null || postalRef.current === null || countryRef.current === null) {
            setLoading(false);
            setError("Something went wrong");
            return;
        }
        
        if (passwordRef.current.value !== passwordConfirmRef.current.value) { setLoading(false); setError("Passwords do not match"); return; }
        if (nameRef.current.value.trim() === "") { setLoading(false); setError("Username cannot be empty"); return; }
        if (passwordRef.current.value.trim() === "") { setLoading(false); setError("Password cannot be empty"); return; }
        if (nameRef.current.value.length > 20) { setLoading(false); setError("Username cannot be longer than 20 characters"); return; }
        if (passwordRef.current.value.length > 50) { setLoading(false); setError("Password cannot be longer than 20 characters"); return; }
        if (nameRef.current.value.length < 5) { setLoading(false); setError("Username cannot be shorter than 5 characters"); return; }
        if (passwordRef.current.value.length < 10) { setLoading(false); setError("Password cannot be shorter than 10 characters"); return; }
        if (emailRef.current.value.trim() === "") { setLoading(false); setError("Email cannot be empty"); return; }
        if (phoneRef.current.value.trim() === "") { setLoading(false); setError("Phone cannot be empty"); return; }
        if (addressRef.current.value.trim() === "") { setLoading(false); setError("Address cannot be empty"); return; }
        if (cityRef.current.value.trim() === "") { setLoading(false); setError("City cannot be empty"); return; }
        if (postalRef.current.value.trim() === "") { setLoading(false); setError("Postal code cannot be empty"); return; }
        if (countryRef.current.value.trim() === "") { setLoading(false); setError("Country cannot be empty"); return; }

        try {
            const user = await CreateAccount(nameRef.current.value, passwordRef.current.value, emailRef.current.value, parseInt(phoneRef.current.value), addressRef.current.value, cityRef.current.value, parseInt(postalRef.current.value), countryRef.current.value);
            await Fill_user_account(user);
            navigate("/");
        } catch (e) { 
            setLoading(false);
            setError("Username already exists");
            return;
        }
    }

    return (
        <>
        {loading ? (<div className="loading__container"><CircularProgress /></div>) : 
            (<section className={`login__page ${theme ? "dark__theme__LIGHTER DARK_INPUTS" : ""}`}>
                {error !== "" ? (<Alert severity="error" onClose={() => setError("")} style={{ position: "absolute", top: 33 }} className="error__auth">{error}</Alert>) : (<></>)}
                <div className={`login__page__form ${theme ? "dark__theme__container" : ""}`}>
                    <h1 className="title">Create Account</h1>
                    <div className="field">
                        <label className="label">Full Name</label>
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
                    <div className="field">
                        <label className="label">Confrim Password</label>
                        <div className="control">
                            <input ref={passwordConfirmRef} className="input" type="password" placeholder="Confirm Password" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input ref={passwordRef} className="input" type="email" placeholder="Email" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Phone</label>
                        <div className="control">
                            <input ref={passwordRef} className="input" type="text" placeholder="Phone" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Address</label>
                        <div className="control">
                            <input ref={passwordRef} className="input" type="text" placeholder="Address" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">City</label>
                        <div className="control">
                            <input ref={passwordRef} className="input" type="text" placeholder="City" />
                        </div>
                    </div>
                     <div className="field">
                        <label className="label">Postal code</label>
                        <div className="control">
                            <input ref={passwordRef} className="input" type="text" placeholder="Postal code" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Country</label>
                        <div className="control">
                            <input ref={passwordRef} className="input" type="text" placeholder="Country" />
                        </div>
                    </div>
                    <button className="button is-primary" onClick={New_account}>Sign up</button>
                </div>
                <Link className={`shop__auth-link ${theme ? "shop__auth-link__DARK" : ""}`} to="/login">Already have account?</Link>
            </section>
            )
        }
        </>
    )
}
