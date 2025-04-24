// import HomePage from "./pages/HomePage.jsx";
// import DiscoverContent from "./pages/DiscoverContent.jsx";
// import SignIn from "./pages/SignIn.jsx";
// import SignUP from "./pages/SignUp.jsx";
// import { UserAuthProvider } from "./context/Authentication.jsx";
// import { RouterProvider, createBrowserRouter } from "react-router";
// import ProtectedRoute from "./routes/ProtectedRoute.jsx";
// import ProfileSelection from "./pages/ProfileSelection.jsx";
// import MovieList from "./pages/MovieList.jsx";
// // import Review from "./pages/Review.jsx";
// // import NewAndPopular from "./pages/NewAndPopular.jsx";
// // import AdminHome from "./pages/admin/Home.jsx";
// // import DataManagement from "./pages/admin/DataManagement.jsx";
// // import Logs from "./pages/admin/Logs.jsx";
// import MovieDialog from "./pages/MovieDialog.jsx";
// import TvPage from "./pages/TvPage.jsx";
// // import AdminLayout from "./layout/adminLayout.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/profile-selection",
//     element: (
//       <ProtectedRoute>
//         <ProfileSelection />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/",
//     element: (
//       <ProtectedRoute>
//          <HomePage />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/home",
//     element: (
//       <ProtectedRoute>
//          <HomePage />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/browse",
//     element: (
//       <ProtectedRoute>
//         <DiscoverContent />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/movies",
//     element: (
//       <ProtectedRoute>
//         <MovieDialog />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/tv-shows",
//     element: (
//       <ProtectedRoute>
//         <TvPage />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "/my-list",
//     element: (
//       <ProtectedRoute>
//         <MovieList />
//       </ProtectedRoute>
//     ),
//   },
//   // {
//   //   path: "/review/:movieId",
//   //   element: (
//   //     <ProtectedRoute>
//   //       <Review />
//   //     </ProtectedRoute>
//   //   ),
//   // },
//   // {
//   //   path: "/new-and-popular",
//   //   element: (
//   //     <ProtectedRoute>
//   //       <NewAndPopular />
//   //     </ProtectedRoute>
//   //   ),
//   // },
//   // {
//   //   path: "/admin-dashboard",
//   //   element: (
//   //     <ProtectedRoute>
//   //       <AdminLayout />
//   //     </ProtectedRoute>
//   //   ),
//   //   children: [
//   //     {
//   //       index: true,
//   //       element: (
//   //         <ProtectedRoute>
//   //           <Logs />
//   //         </ProtectedRoute>
//   //       ),
//   //     },
//     //   {
//     //     path: "data-management",
//     //     element: (
//     //       <ProtectedRoute>
//     //         <DataManagement />
//     //       </ProtectedRoute>
//     //     ),
//     //   },
//     // ],
//   // },
//   {
//     path: "/signin",
//     element: <SignIn />,
//   },
//   {
//     path: "/signup",
//     element: <SignUP />,
//   },
// ]);

// function App() {
//   return (
//     <UserAuthProvider>
//       <RouterProvider router={router} />
//     </UserAuthProvider>
//   );
// }

// export default App;

import HomePage from "./pages/HomePage.jsx";
import DiscoverContent from "./pages/DiscoverContent.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import { UserAuthProvider } from "./context/Authentication.jsx";
import { RouterProvider, createBrowserRouter } from "react-router";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import ProfileSelection from "./pages/ProfileSelection.jsx";
import MovieList from "./pages/MovieList.jsx";
import TvPage from "./pages/TvPage.jsx";
import AdminLayout from "./layout/adminLayout.jsx";
import Logs from "./pages/admin/Logs.jsx";
import DataManagement from "./pages/admin/DataManagement.jsx";
import NewAndPopular from "./pages/NewAndPopular.jsx";
import Review from "./pages/Review.jsx";
import Movie from "./pages/Movies.jsx";

const router = createBrowserRouter([
  {
    path: "/profile-selection",
    element: (
      <ProtectedRoute>
        <ProfileSelection />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/browse",
    element: (
      <ProtectedRoute>
        <DiscoverContent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/movies",
    element: (
      <ProtectedRoute>
        <Movie />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tv-shows",
    element: (
      <ProtectedRoute>
        <TvPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/my-list",
    element: (
      <ProtectedRoute>
        <MovieList />
      </ProtectedRoute>
    ),
  },
  { 
    path: "/review/:movieId",
    element: (
      <ProtectedRoute>
        <Review />
      </ProtectedRoute>
    ),
  },
  {
    path: "/new-and-popular",
    element: (
      <ProtectedRoute>
        <NewAndPopular />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-dashboard",
    element: (
      <ProtectedRoute adminOnly>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute adminOnly>
            <Logs />
          </ProtectedRoute>
        ),
      },
      {
        path: "data-management",
        element: (
          <ProtectedRoute adminOnly>
            <DataManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "logs", 
        element: (
          <ProtectedRoute adminOnly>
            <Logs />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

function App() {
  return (
    <UserAuthProvider>
      <RouterProvider router={router} />
    </UserAuthProvider>
  );
}

export default App;