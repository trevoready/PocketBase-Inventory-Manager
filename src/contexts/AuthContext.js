import React, { useContext, useEffect } from "react";
import client from "../pbconn";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState();

  async function signin(username, password) {
    return client.collection("users").authWithPassword(username, password);
  }

  async function logout() {
    return client.authStore.clear();
  }

  //once login is successful, refresh the user object
  useEffect(() => {
    if (client.authStore.model) {
      client.collection("users").authRefresh().then((user) => {
        setCurrentUser(user);
      }).catch((err) => {
        console.log(err);

        if (err.status === 401) {
          client.authStore.clear();
        }
      });
    }
  }, []);


  useEffect(() => {
    const unsubscribe = client.authStore.onChange(user => {
      console.log(client.authStore.model);
      setCurrentUser(client.authStore.model);
    }, true);
    return unsubscribe;
  }, []);
  const value = {
    currentUser,
    signin,
    logout
  };
  return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
}