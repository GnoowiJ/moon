import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AdminRoot from './AdminRoot';
import AdminHome from './admin/pages/AdminHome';
import CheckInOut from './admin/pages/CheckInOut';
import ReservationStatus from './admin/pages/ReservationStatus';
import ReservationDetail from './admin/pages/ReservationDetail';
import RoomBlock from './admin/pages/RoomBlock';
import RoomPrice from './admin/pages/RoomPrice';
import Gallerymanage from './admin/pages/Gallerymanage';
import Popupmanage from './admin/pages/Popupmanage';
import HistoryDetail from './admin/pages/HistoryDetail.jsx';
import ManageAdminAccount from './admin/pages/ManageAdminAccount.jsx';

export default function AdminApp() {
  const [keyword, setKeyword] = useState('');

  const router = createBrowserRouter([
    {
      path: '/admin',
      element: <AdminRoot keyword={keyword} setKeyword={setKeyword} />,
      children: [
        { path: '/admin', element: <AdminHome /> },
        { path: '/admin/manageadmin', element: <ManageAdminAccount /> },
        { path: '/admin/checkinout', element: <CheckInOut /> },
        { path: '/admin/reservation/status', element: <ReservationStatus /> },
        {
          path: '/admin/reservation/detail/:rev_id',
          element: <ReservationDetail />,
        },
        {
          path: '/admin/reservation/history/:rev_id',
          element: <HistoryDetail />,
        },
        { path: '/admin/roomblock', element: <RoomBlock /> },
        { path: '/admin/roomprice', element: <RoomPrice /> },
        { path: '/admin/gallerymanage', element: <Gallerymanage /> },
        { path: '/admin/popupmanage', element: <Popupmanage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
