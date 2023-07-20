import { useContext, useEffect, useLayoutEffect } from "react";
import { MainContext } from "@/store";
import Link from "next/link";
import Head from "next/head";
import { db } from "../plugins/firebase";
import { collection, getDocs } from "firebase/firestore";

import TodoList from "@/components/todoList";
import Navbar from "@/components/navbar";
import styles from "@/styles/Home.module.scss";

export default function Home({ data }) {
  useLayoutEffect(() => {
    dispatch({ type: "SET_DATABASE", payload: data });
  }, []);

  const { state, dispatch } = useContext(MainContext);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="The final Todo-App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {state.username ? (
        <main className={`${styles.Home}`}>
          <TodoList />
        </main>
      ) : (
        <div className={styles.login}>
          <h1>Per favore autenticarsi</h1>
          <Link href="/login">Login</Link>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const data = [];
  const querySnapshot = await getDocs(collection(db, "todos-list"));

  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  return {
    props: {
      data,
    },
  };
}
