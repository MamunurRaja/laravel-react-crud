// import React from "react";
// import { useParams } from "react-router";

// class ProjectView extends React.Component {
//     constructor(props) {
//         super(props);
//     }
    
//     state = {  }
        
//     componentDidMount() {
        
//         // console.log(this.props.match.params.id);
//         console.log(id);
//     }
    
//     render() { 
//         const id=useParams();
//         return ( 
//             <>
//             <div className="container">
//             <h2>This is a project View page</h2>
//             </div>
            
//             </>
//          );
//     }
// }
 
// export default ProjectView;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, Button, Badge, Spinner } from "react-bootstrap";
import Axios from "axios";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

const ProjectView = () => {
    const {id}=useParams();
    const [resProject, setResProject]=useState(null);
    const [resTasks, setResTasks]=useState(null);
    const [isloading, setIsloading]=useState(true);
    useEffect(()=>{
      console.log('in the use effect');
      Axios.get('http://localhost:8000/api/projects/'+id)
      .then((res)=>{
          console.log(res.data.data.tasks);
          setResProject(res.data.data);
          setResTasks(res.data.data.tasks);
          setIsloading(false);
      })
    },[])

    return ( 
        <>
        {isloading && (<div className="text-center mt-5">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>)}
        <div className="container mt-3">
           <div className="header-part">
              <div className="float-left">            
                  {resProject && <h2> {resProject.name}{" "}
                    <Badge variant="primary">{resProject.tasks_count}</Badge>
                  </h2>}
              </div>
              <div className="float-right">
                     <Link to={`/createProject`} className="btn btn-info">+ Create New Task</Link>
                     {/* <Button variant="success" className="mr-2"> Edit</Button> */}
             </div>
             <div className="clearfix"></div>
           </div>
           {resTasks && resTasks.map((task)=>(
                     <Card key={task.id} className='mb-3' >
                         <Card.Header>{task.name}</Card.Header>
                            <Card.Body>
                                 <Card.Title>{task.status}</Card.Title>
                             <Card.Text>{task.description}</Card.Text>
                           </Card.Body>
                     </Card>

           ))}
           
           
        </div>
        
        </>
     );
}
 
export default ProjectView;