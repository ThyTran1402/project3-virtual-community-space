import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import Events from './pages/Events'
import './App.css'

const NotFound = () => (
    <div className='page-message'>
        <h2>Page not found</h2>
        <Link to='/' role='button'>Back to the plaza</Link>
    </div>
)

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/locations/:slug',
      element: <LocationEvents />
    },
    {
      path: '/events',
      element: <Events />
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return (
    <div className='app'>

      <header className='main-header'>
        <Link to='/' className='site-title'><h1>UnityGrid Plaza</h1></Link>

        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
          <Link to='/events' role='button'>Events</Link>
        </div>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App
