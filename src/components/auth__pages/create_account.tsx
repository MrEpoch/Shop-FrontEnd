import React, { useRef, useState } from "react";
import {
  CircularProgress,
  Alert,
  Autocomplete,
  TextField,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CreateAccount } from "../../API_requests.ts";
import { useAccount } from "../../Account_context.tsx";
import { Link } from "react-router-dom";
import { useTheme } from "../../Theme_context.tsx";
import { AccountContextType, ThemeType } from "../../Types.tsx";

import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from "postcode-validator";
import { countries, CountryType } from "./countries";

export default function Create_account(): React.JSX.Element {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLInputElement | null>(null);
  const cityRef = useRef<HTMLInputElement | null>(null);
  const postalRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [country, setCountry] = useState<CountryType>(countries[0]);
  const [isCountry, setIsCountry] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const { Fill_user_account } = useAccount() as AccountContextType;
  const { theme } = useTheme() as ThemeType;

  async function New_account(): Promise<void> {
    setError("");
    setLoading(true);

    if (!isCountry) {
      setLoading(false);
      setError("Country cannot be empty");
      return;
    }

    if (
      nameRef.current === null ||
      passwordRef.current === null ||
      passwordConfirmRef.current === null ||
      emailRef.current === null ||
      phoneRef.current === null ||
      addressRef.current === null ||
      cityRef.current === null ||
      postalRef.current === null
    ) {
      setLoading(false);
      setError("Invalid values");
      return;
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setLoading(false);
      setError("Passwords do not match");
      return;
    }
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
    if (emailRef.current.value.trim() === "") {
      setLoading(false);
      setError("Email cannot be empty");
      return;
    }
    if (phoneRef.current.value.trim() === "") {
      setLoading(false);
      setError("Phone cannot be empty");
      return;
    }
    if (addressRef.current.value.trim() === "") {
      setLoading(false);
      setError("Address cannot be empty");
      return;
    }
    if (cityRef.current.value.trim() === "") {
      setLoading(false);
      setError("City cannot be empty");
      return;
    }
    if (postalRef.current.value.trim() === "") {
      setLoading(false);
      setError("Postal code cannot be empty");
      return;
    }

    if (phoneRef.current.value.length < 14) {
      setLoading(false);
      setError("Invalid phone number");
      return;
    }

    if (postcodeValidatorExistsForCountry(country.code) === false) {
      if (postcodeValidator(postalRef.current.value, country.code) === false) {
        setLoading(false);
        setError("Postal code is not valid");
        return;
      }
    }

    try {
      const user = await CreateAccount(
        nameRef.current.value,
        passwordRef.current.value,
        emailRef.current.value,
        phoneRef.current.value,
        addressRef.current.value,
        cityRef.current.value,
        postalRef.current.value,
        country.label,
      );
      Fill_user_account(user);
      navigate("/");
      return;
    } catch (e) {
      setLoading(false);
      setError("Username already exists");
      return;
    }
  }

  return (
    <>
      {loading ? (
        <div className="load_all">
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
          )}
          <div
            className={`login__page__form ${
              theme ? "dark__theme__container" : ""
            }`}
          >
            <h1 className="title">Create Account</h1>
            <div className="field">
              <label className="label">Full Name</label>
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
            <div className="field">
              <label className="label">Confrim Password</label>
              <div className="control">
                <input
                  ref={passwordConfirmRef}
                  className="input"
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  ref={emailRef}
                  className="input"
                  type="email"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Phone</label>
              <div className="control">
                <input
                  ref={phoneRef}
                  className="input"
                  type="text"
                  placeholder="Phone"
                />
              </div>
            </div>
            <div className="field">
              <Autocomplete
                onChange={(_, newValue) => {
                  if (newValue) {
                    setCountry(newValue);
                    setIsCountry(true);
                  }
                }}
                className="shop__acc-create__country-select"
                placeholder="Country"
                options={countries}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label} ({option.code}) +{option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
              />
            </div>
            <div className="field">
              <label className="label">Address</label>
              <div className="control">
                <input
                  ref={addressRef}
                  className="input"
                  type="text"
                  placeholder="Address"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">City</label>
              <div className="control">
                <input
                  ref={cityRef}
                  className="input"
                  type="text"
                  placeholder="City"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Postal code</label>
              <div className="control">
                <input
                  ref={postalRef}
                  className="input"
                  type="text"
                  placeholder="Postal code"
                />
              </div>
            </div>
            <button className="button is-primary" onClick={New_account}>
              Sign up
            </button>
          </div>
          <Link
            className={`shop__auth-link ${
              theme ? "shop__auth-link__DARK" : ""
            }`}
            to="/login"
          >
            Already have account?
          </Link>
        </section>
      )}
    </>
  );
}


