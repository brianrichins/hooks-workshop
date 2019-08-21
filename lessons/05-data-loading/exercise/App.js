import React, { useState, useEffect } from 'react'

import { onAuthStateChanged } from 'app/utils'
import LoggedIn from 'app/LoggedIn'
import LoggedOut from 'app/LoggedOut'

function useAuth() {
  const [auth, setAuth] = useState(null)
  const [authAttempted, setAuthAttempted] = useState(false)
  
  useEffect(() => {
      return onAuthStateChanged(auth => {
        setAuthAttempted(true)
        setAuth(auth)
      })  //becomes the cleanup event
    }, [])

    return { auth, authAttempted }
}
  
export default function App() {
  const { auth, authAttempted } = useAuth()

  return authAttempted ? (
    <div className="Layout">
      {auth ? <LoggedIn auth={auth} /> : <LoggedOut />}
    </div>
  ) : <p>Authenticating...</p>
}
