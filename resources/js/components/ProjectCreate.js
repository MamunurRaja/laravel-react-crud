// import React, { useEffect, useState } from "react";
// import { Card, Button, Badge, Spinner, Form } from "react-bootstrap";
// const ProjectCreate = () => {
//     const [name,setName]=useState('');
//     const [description,setDescription]=useState('');
//     const status=1;
//     const user_id=2;
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const project = { name, description, status, user_id };
           
//         fetch('http://localhost:8000/api/projects', {
//           method: 'POST',
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(project)
//         }).then((res) => {
//           console.log(res);
          
//         })
//       }
//     return ( 
//         <div className="container">
//             <Card className="mt-3">
//                 <Card.Body>
//                     <Form onSubmit={handleSubmit}>
//                       <Form.Group controlId="name">
//                           <Form.Label>Project Name</Form.Label>
//                             <Form.Control
//                                 type="text"
                                
//                                 placeholder="Enter Project Name"
//                                 value={name}
//                                 name="name"
//                                 onChange={(e)=>setName(e.target.value)}
//                             />
//                       </Form.Group>

//                       <Form.Group controlId="description">
//                            <Form.Label>Project Description</Form.Label>
//                              <Form.Control
//                                 type="text"
//                                 placeholder="Enter Project Description"
//                                 as="textarea"
//                                 rows="5"
//                                 name="description"
//                                 value={description}
//                                 onChange={(e)=>setDescription(e.target.value)}
//                            />
//                         </Form.Group>
//                         <Button variant="primary" type="submit">
//                                Save Project
//                         </Button>
//                     </Form>
//                 </Card.Body>
//             </Card>
//         </div>
//      );
// }
 
// export default ProjectCreate;

import React from "react";
import { useEffect, useState } from "react";
import { Card, Button, Badge, Spinner, Form } from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route, Link, withRouter} from "react-router-dom";
import { storeNewProject } from "./data/ProjectService";
import {useHistory} from 'react-router-dom';


class ProjectCreate extends React.Component {
    
    state = { 
        name:'',
        description:'',
        isLoading:false,
        errors:{}
     }

     componentDidMount() {}
      
      changeInput=(e)=>{
           this.setState({
               [e.target.name]:e.target.value
            }
           )
     }

     submitForm=async(e)=>{
          e.preventDefault();
          const {history}=this.props;
          this.setState({
              isLoading:true
          })
          const postBody = {
            name: this.state.name,
            description: this.state.description,
            user_id:1,
            status:0
          };
          const response=await storeNewProject(postBody);
          
          if (response.success) {
              alert('Data Saved Successfully');
              this.setState({
                  name:'',
                  description:'',
                  isLoading:false
              })
              history.push('/');
              
          }else{
            console.log(response.error);
            this.setState({
                isLoading:false,
                errors:response.error
            })
          }
     }

    render() { 
        
          return ( 
            <div className='container'>
                <div className="header-part mt-3">
                         <div className="float-left">
                               <h2>New Project</h2>
                          </div>
                             <div className="float-right">
                                    <Link to={`/projects`} className="btn btn-info">See All Project</Link>
                              </div>
                              <div className="clearfix"></div>
                </div>
                <Card className='mt-1'>
                    <Card.Body>
                    <Form onSubmit={this.submitForm}>
                         <Form.Group controlId="name">
                              <Form.Label>Project Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Project Name"
                                        value={this.state.name}
                                        name="name"
                                        onChange={(e) => this.changeInput(e)}
                                   />
                              </Form.Group>
                              {this.state.errors==='please Enter the name field' && (
                                      <p className="text-danger">Enter your Name</p>
                                 )}
                              <Form.Group controlId="description">
                                     <Form.Label>Project Description</Form.Label>
                                          <Form.Control
                                                 type="text"
                                                 placeholder="Enter Project Description"
                                                 as="textarea"
                                                 rows="5"
                                                 name="description"
                                                value={this.state.description}
                                                onChange={(e) => this.changeInput(e)}
                                            />
                                     </Form.Group>
                                     {this.state.errors==='please Enter the description field' && (
                                      <p className="text-danger">Enter Description</p>
                                 )}
                                     {this.state.isLoading && (
                                    <Button variant="primary" type="button" disabled>
                                       <Spinner animation="border" role="status">
                                           <span className="sr-only">Loading...</span>
                                     </Spinner>{" "}Saving...
                                  </Button>
                                    )}

                                {!this.state.isLoading && (
                                     <Button variant="primary" type="submit">
                                     Save Project
                                    </Button>
                                  )}
                              
                     </Form>

                    </Card.Body>
                </Card>
                 
            </div>
         );
    }
}
 
export default withRouter(ProjectCreate);