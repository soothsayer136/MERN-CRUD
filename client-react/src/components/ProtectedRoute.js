// import React from "react";
// import { Route, Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         localStorage.getItem("token") ? (
//           children
//         ) : (
//           <Navigate
//             to={{
//               pathname: "/",
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;
