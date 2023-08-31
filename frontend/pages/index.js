//IMPORTS
import {Fragment, useState,useEffect,useContext} from 'react'
import {Form,Button, Card} from 'react-bootstrap'
import Swal from 'sweetalert2'
import Router from 'next/router'
import UserContext from '../userContext'
import {GoogleLogin} from 'react-google-login'


export default function Home() {

  //STATES
  const {user,setUser} = useContext(UserContext)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [isActive,setIsActive] = useState(true)


//USE EFFECT TO SEE IF ALL THE INPUT FIELDS HAVE VALUE BEFORE SUBMITTING
useEffect(()=>{

      if(email !== "" && password !== ""){

        setIsActive(true)

      } else {

        setIsActive(false)

      }

  },[email, password])


//LOGIN FUNCTION
function authenticate(e){

    e.preventDefault()

    fetch('https://enigmatic-escarpment-37058.herokuapp.com/api/users/login',{

        method: "POST",
        headers: {

          'Content-Type': 'application/json'

        },
        body: JSON.stringify({

          email: email,
          password: password

        })

    })
    .then(res => res.json())
    .then(data => {

        if(data.accessToken){

          localStorage.setItem("token", data.accessToken)
          fetch('https://enigmatic-escarpment-37058.herokuapp.com/api/users/details',{

            headers: {

              Authorization: `Bearer ${data.accessToken}`

            }

          })
          .then(res => res.json())
          .then(data => {

              // console.log(data)
              localStorage.setItem('email',data.email)
              localStorage.setItem('isAdmin',data.isAdmin)
              
              //after getting the user's details from the API server, we will set the global user state
              setUser({

                email: data.email,
                isAdmin: data.isAdmin
              })
          })


          Swal.fire({
              icon: "success",
              title: "Successfully Logged In.",
              text: "Thank you for logging in."
          })    

          /*
            Router component's push method will redirect the user to the endpoint given as an argument to the method.
          */

          Router.push('/record')

        } else {

          Swal.fire({
            icon: "error",
            title: "Unsuccessful Login",
            text: "User authentication has failed."
          })

        }

    })

    //set the input states into their initial value
    setEmail("")
    setPassword ("")
  }


  //GOOGLE LOGIN AUTHENTICATION
function authenticateGoogleToken(response){
    //google's response with our tokenId to be used to authenticate our google login user
    //response comes from google along with our user's details and token for authentication.
    // console.log(response)

    //send our google login user's token id to the API server for 
    //authentication and retrieval of our own App's token to be used for logging into our App.

    /*For Email Sending:

      Pass the accessToken from google to allow us the use of Google API to send an email to the google login user who logs on for the first time.
  
    */
    fetch('https://enigmatic-escarpment-37058.herokuapp.com/api/users/verify-google-id-token',{

      method: 'POST',
      headers: {

        'Content-Type': 'application/json'

      },
      body: JSON.stringify({

        tokenId: response.tokenId,
        accessToken: response.accessToken

      })

    })
    .then(res => res.json())
    .then(data => {
      
      //we will show alerts to show if the user logged in properly or if there are errors.
      if(typeof data.accessToken !== 'undefined'){

        //set the accessToken into our localStorage as token:
        localStorage.setItem('token', data.accessToken)

        //run a fetch request to get our user's details and update our global user state and save our user details into the localStorage:
        fetch('https://enigmatic-escarpment-37058.herokuapp.com/api/users/details',{

          headers: {

              'Authorization': `Bearer ${data.accessToken}`
          }

        })
        .then(res => res.json())
        .then(data => {

          localStorage.setItem('email', data.email)
          localStorage.setItem('isAdmin', data.isAdmin)

          //after getting the user's details, update the global user state:
          setUser({

            email: data.email,
            isAdmin: data.isAdmin

          })

          //Fire a sweetalert to inform the user of successful login:
          Swal.fire({

            icon: 'success',
            title: 'Successful Login'

          })

          Router.push('/record')
        })

      } else {

        //if data.accessToken is undefined, therefore, data contains a property called error instead.
        
        if(data.error === "google-auth-error"){

          //This error will be shown if somehow our user's google token has an error or is compromised.

          Swal.fire({

            icon: 'error',
            title: 'Google Authentication Failed'

          })

        } else if(data.error === "login-type-error"){

          //This error will be shown if our user has already created an account in our app using the register page but is trying to use google login to log into our app:

          Swal.fire({

            icon: 'error',
            title: 'Login Failed.',
            text: 'You may have registered through a different procedure.'

          })
        }
      }
    })
  }


  return (
      <Fragment>
        <h1 className="mt-5 text-center">Welcome to Expense Manager</h1>
        <h6 className=" text-center mb-5">This website is only for presentation purposes and can accomodate 1 user</h6>
        <Card className="mb-5 cardHighlight">
          <Card.Body >
            
            
          <Form onSubmit={e => authenticate(e)} className="mt-5">

              <Form.Group controlId="userEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} required/>
                </Form.Group>

             <Form.Group controlId="userPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} required/>
              </Form.Group>

              {
                isActive
                ? <Button type="submit" className="btn btn-block">Submit</Button>
                : <Button variant="primary" disabled className="btn-block">Submit</Button>
              }

          <GoogleLogin 

            clientId="1029086215343-bskfcs9t9db4d3hfgcm14bekqf32ogjg.apps.googleusercontent.com"
            buttonText="Login Using Google"
            onSuccess={authenticateGoogleToken}
            onFailure={authenticateGoogleToken}
            cookiePolicy={'single_host_origin'}
            className="w-100 text-center my-4 d-flex justify-content-center"

          />
             <a href="./register" class="btn btn-block text-primary"> Not yet registered? Sign Up </a>

           </Form>        
          </Card.Body>
        </Card>
      </Fragment>
  )
}
