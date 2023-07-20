import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { MainContext } from "@/store";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/plugins/firebase";
import styles from "../styles/Login.module.scss";

export default function Login() {
  const router = useRouter();
  const { dispatch } = useContext(MainContext);
  const [input, setInput] = useState("");

  const onHandleInput = (e) => setInput(e.target.value);
  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_USERNAME", payload: input });
    router.push("/");
  };

  const onHandleGoogleAuth = async () => {
    const res = await signInWithPopup(auth, provider);

    dispatch({ type: "SET_USERNAME", payload: res.user.email });
  };

  return (
    <form className={styles.Login} onSubmit={onHandleSubmit}>
      <h1>Login</h1>
      <input
        type="text"
        value={input}
        onChange={onHandleInput}
        placeholder="Username ..."
      />
      <input type="submit" value="Login" />
      <button onClick={onHandleGoogleAuth}>Accedi con Google</button>
    </form>
  );
}
