//IMPORTS
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import {useState,useEffect, Fragment} from 'react'
import {Container} from 'react-bootstrap'
import NavBar from '../components/NavBar'
import {UserProvider} from '../userContext'
import Head from 'next/head'

function MyApp({ Component, pageProps }){

  //USERCONTEXT 
  const [user,setUser] = useState({

      email: null,
      isAdmin: null

  })

  useEffect(()=>{

      setUser({
          email: localStorage.getItem('email'),
          isAdmin: localStorage.getItem('isAdmin') === "true"
      })
  },[])


  const unsetUser = () => {

    //clear the localStorage
    localStorage.clear()

    //set the values of our state back to its initial value
    setUser({

      email: null,
      isAdmin: null

    })
  }

 

  return(
      <Fragment>
        <UserProvider value={{user,setUser,unsetUser}}>

          <Head>

            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap" rel="stylesheet" />


            <title>Login</title>

          </Head>

            <NavBar />
              <Container>
                <Component  {...pageProps} /> 
              </Container>
        </UserProvider>
      </Fragment>
    )
}

export default MyApp



