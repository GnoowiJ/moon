import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import "./css/style.css";
import "./css/home.css";
import "./css/outsideview.css";
import "./css/guestroom.css";
import "./css/gallery.css";
import "./css/information.css";
import Root from "./Root.jsx";
import Home from "./pages/Home.jsx";
import Room from "./pages/guestroom/Room.jsx"
import OutSideView from "./pages/OutSideView.jsx";
import Cafe from "./pages/guestroom/Cafe.jsx";
import Reservation from "./pages/reservations/Reservation.jsx";
import ReservationCheck from "./pages/reservations/ReservationCheck.jsx";
import Gallery from "./pages/Gallery.jsx";
import Guestroomlocation from "./pages/guestroom/Guestroomlocation.jsx";
import Inforeserve from "./pages/information/Inforeserve.jsx";
import Infolocation from "./pages/information/Infolocation.jsx";
import Infonearby from "./pages/information/Infonearby.jsx";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/room/:rid", element: <Room /> },
        { path: "/gallery", element: <Gallery /> },
        /* information path */
        { path: "/information", element: <Inforeserve /> },
        { path: "/information/reserve", element: <Inforeserve /> },
        { path: "/information/location", element: <Infolocation /> },
        { path: "/information/nearbytravel", element: <Infonearby /> },
        /* information end */
        // reservation path
        { path: "/reservation", element: <Reservation /> },
        { path: "/reservation/check", element: <ReservationCheck /> },
        // reservation end
        { path: "/guestroomlocation", element: <Guestroomlocation /> },
        { path: "/outsideview", element: <OutSideView /> },

        { path: "/cafe", element: <Cafe /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
