import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import ErrorMsg from "../components/UI/ErrorMsg";
import { LOGIN_URL, SIGNUP_URL } from "../urls";
import LodingFroBtn from "../components/UI/LodingFroBtn";
import { useDispatch } from "react-redux";
import { authAction } from "../store/slices/auth-slice";
import useHttp from "../hooks/useHttp";
function SignUp() {
  const [isError, setIsError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoding, httpError, fetchData } = useHttp();
  useEffect(() => {
    setIsError(httpError);
  }, [httpError]);
  const submitHandler = async (e) => {
    e.preventDefault();

    if (email === "" || password === "" || confirmPassword === "") {
      setIsError("Email and password are required.");
      return;
    }
    if (password !== confirmPassword) {
      setIsError("Confirm Password and password is not same.");
      return;
    }
    const formData = { email, password };
    // console.log(formData);
    const handleSuccess = (data) => {
      dispatch(
        authAction.login({ userEmail: data.email, userToken: data.idToken })
      );
      navigate("/");
    };

    fetchData(
      SIGNUP_URL,
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
      },
      handleSuccess
    );
  };
  return (
    <Container fluid>
      <div className="login-div">
        <Form onSubmit={submitHandler}>
          <h2>SignUp</h2>

          {isError ? <ErrorMsg message={isError} /> : ""}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {isLoding ? <LodingFroBtn /> : ""} Submit
          </Button>
          <p>
            If you have account please <Link to="/login">Login</Link>
          </p>
        </Form>
      </div>
    </Container>
  );
}

export default SignUp;
