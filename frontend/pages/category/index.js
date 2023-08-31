//IMPORTS
import {Fragment, useState,useEffect} from 'react'
import {Form, Button,Card} from 'react-bootstrap'
import Description from '../../components/Description'
import Head from 'next/head'
import Swal from 'sweetalert2'



export default function Category(){

  //STATES
  const [type, setType] = useState("")
  const [description, setDescription] = useState("")
  const [activeDescription, setActiveDescription] = useState([])
  const [allDescription, setAllDescription] = useState([])

    

      //FORM SUBMIT FUNCTION
      function submitCategory(e){
        e.preventDefault()

            let token = localStorage.getItem("token");

        fetch('https://enigmatic-escarpment-37058.herokuapp.com/api/category',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({

            type: type,
            description: description

          })
        })
        .then(res => res.json())
        .then(data => {
          
          if(data){
            Swal.fire({

              icon: "success",
              title: "Successfully Added The Category",
              text: "Thank you using budget tracker"

          })  

          }else{
            Swal.fire({

            icon: "error",
            title: "Something is wrong",
            text: "error"

          })
          }
        })
        setType("")
        setDescription("")

      }


      //get all active categories
      useEffect(() => {
        fetch('https://enigmatic-escarpment-37058.herokuapp.com/api/category')
        .then(res => res.json())
        .then(data => {

           setActiveDescription(data)
        })

      },[])
   
      //get all categories
      useEffect(() => {
        fetch('https://enigmatic-escarpment-37058.herokuapp.com/api/category/all')
        .then(res => res.json())
        .then(data => {
          
            setAllDescription(data)
        })

      },[])

      const descriptionCards = activeDescription.map(element => {
         return(
         <Card className="text-center my-3 cardHighlight">
            <Card.Body>
              <Card.Title>{element.description}</Card.Title>
              <Card.Text>Category type: {element.type}</Card.Text>
            </Card.Body> 
          </Card>      
        )
      })


  return(
    <Fragment>
    <div>
      <Head>
          <title>Category</title>
      </Head>
    </div>


    <h1 className="text-center mt-3">Add Category</h1>

      <Form onSubmit={e => submitCategory(e)}>
        <Form.Group  className="">

          <Form.Label>Source of account</Form.Label>
          <select className="form-control form-control-md" value={type} onChange={e => setType(e.target.value)}>
            <option disabled></option>
             <option>Income</option>
            <option>Expense</option>
          </select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Description of account</Form.Label>
          <Form.Control type="text" placeholder="Enter the description" value={description} onChange={e => setDescription(e.target.value)} required />
        </Form.Group>
        <Button type="submit" variant="primary" className="btn btn-block mb-5">Submit</Button>
      </Form>

      <h1 className="text-center">Category Overview</h1>
      {descriptionCards}
    </Fragment>
      

    )

}