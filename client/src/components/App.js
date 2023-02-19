import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/authReducer";
import Header from "./Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Main components</div>,
  },
  {
    path: "/test",
    element: <div>Hello world!</div>,
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  console.log(user);
  return (
    <div className="container">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
