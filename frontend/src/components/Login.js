import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { NavBar } from "./NavBar";
import {
  Button,
  Header,
  Image,
  Modal,
  Form,
  Input,
  Label
} from "semantic-ui-react";

export function Login(props) {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const openModal = () => {
    dispatch({ type: "TOGGLE_MODAL", payload: true });
  };
  const closeModal = () => {
    dispatch({ type: "TOGGLE_MODAL", payload: false });
  };

  let modalStatus = useSelector(state => state.modal);

  const updateUsername = e =>
    setState({
      ...state,
      username: e.target.value
    });

  const updatePassword = e =>
    setState({
      ...state,
      password: e.target.value
    });

  // let errorMessage = () => {
  //   <p>Please include both a username and password</p>;
  // };

  // const completeFormCheck = () => {
  //   if (state.username == null || state.password == null) {
  //     errorMessage();
  //   } else {
  //     dispatch();
  //   }
  // };

  // const handleOpen = () => setState({ modalOpen: true });
  // const handleClose = () => setState({ modalOpen: false });

  const handleSignUp = e => {
    fetch("http://localhost:3000/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: state.username,
        password: state.password
      })
    })
      .then(res => res.json)
      .then(closeModal());
  };

  let usernameVerification = true;
  let passwordVerification = true;

  const handleMissingUsername = usernameVerification => {
    return usernameVerification ? null : <p style={{ color: "red" }}>TEST</p>;
  };

  return (
    <div className="login-background" style={{ height: "100vh" }}>
      <NavBar />
      <div style={{ margin: "auto", padding: "10em" }}>
        <Header as="h1" style={{ color: "white" }}>
          Login
        </Header>
        <div style={{ margin: "10px" }}>
          <label
            style={{ fontSize: "20px", color: "white", marginRight: "15px" }}
          >
            Username
          </label>
          <Input value={state.username} type="text" onChange={updateUsername} />
          {() => handleMissingUsername()}
        </div>
        <div>
          <label
            style={{ fontSize: "20px", color: "white", marginRight: "15px" }}
          >
            Password
          </label>
          <Input
            type="password"
            value={state.password}
            onChange={updatePassword}
          />
          {passwordVerification ? null : <p style={{ color: "red" }}>TEST</p>}
        </div>
        {/* <Link to={"/beerlist"}> */}
        <Button
          style={{ margin: "10px" }}
          type="submit"
          onClick={e => {
            console.log(state.username === "");
            console.log(state.password === "");
            if (state.username === "" && state.password === "") {
              usernameVerification = false;
              passwordVerification = false;
              return usernameVerification, passwordVerification;
            } else if (state.username === "") {
              passwordVerification = false;
              return passwordVerification;
            } else if (state.password === "") {
              usernameVerification = false;
              return usernameVerification;
            } else {
              dispatch({
                type: "LOGIN",
                username: state.username,
                password: state.password
              });
              props.history.push("/beerlist");
            }
          }}
          // onClose={state.close}
          onClose={() => modalStatus}
        >
          Submit
        </Button>
        {/* </Link> */}
        <h2 style={{ color: "white" }}>New user?</h2>
        <h3 style={{ color: "yellow", marginTop: "5px" }}>
          <Link onClick={() => openModal()} style={{ color: "seaGreen" }}>
            Create an account
          </Link>
        </h3>
      </div>

      <Modal
        size="fullscreen"
        onClose={() => closeModal()}
        open={modalStatus}
        // onClose={state.modalClose}
      >
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Username</label>
              <Input
                placeholder="Username"
                value={state.username}
                type="text"
                onChange={updateUsername}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input
                value={state.password}
                type="text"
                onChange={updatePassword}
                placeholder="Password"
              />
            </Form.Field>
            <Modal.Actions>
              <Button type="submit" onClick={e => handleSignUp(e)}>
                Submit
              </Button>
            </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
}
