import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'

import HomePage from './pages/HomePage'
import PatientsPage from './pages/PatientsPage'
import AboutPage from './pages/AboutPage'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'patients', element: <PatientsPage /> },
			{ path: 'about', element: <AboutPage /> },
		],
	},
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
)
