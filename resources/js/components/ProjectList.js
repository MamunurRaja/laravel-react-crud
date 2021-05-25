import React from "react";
import { Card, Button, Badge, Spinner } from "react-bootstrap";
import Axios from "axios";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import ProjectCreate from './ProjectCreate';


class ProjectList extends React.Component {
  state = {
    projectList: [],
    isLoading: true,
  };

 componentDidMount() {
    Axios.get("http://localhost:8000/api/projects").then(res=>{
        const project=res.data.data;
        this.setState({
           projectList:project,
           isLoading:false,
        });     
    });
 }
  render() {
    
    return (
        <> 
          <div className='container mt-2'>
            <div className="header-part">
              <div className="float-left">            
                  <h2> Project List{" "}
                    <Badge variant="primary">{this.state.projectList.length}</Badge>
                  </h2> 
              </div>
              <div className="float-right">
                     <Link to={`/createProject`} className="btn btn-info">+ Create New</Link>
                     {/* <Button variant="success" className="mr-2"> Edit</Button> */}
             </div>
             <div className="clearfix"></div>
            </div>

           {this.state.isLoading && (<div className="text-center mt-5">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>)}
           {
               this.state.projectList.map((project, index) =>(
                <Card key={index} className='mb-3' >
                <Card.Header>{project.name}{" "}
                   <Badge variant="primary">{project.tasks_count}</Badge>
                </Card.Header>
                 <Card.Body>
                    <Card.Title>
                    {project.status===0 ? <h2>Incomplete</h2> : <h2>Complete</h2>}
                      </Card.Title>
                      <Card.Text>
                          {project.description}
                     </Card.Text>
                     <Link to={`/viewProject/${project.id}`}><Button variant="primary" className="mr-2">
                       View  </Button></Link>
                       
                       
                     
                     <Button variant="success" className="mr-2"> Edit</Button>
                     <Button variant="danger" className="mr-2">Delete</Button>
                </Card.Body>
              </Card>
               ))
           }
           
           </div>
        </>
    );
  }
}

export default ProjectList;

// const ProjectList = () => {
//     const [data,setData]=useState(null);
//     const [isLoading,setIsLoading]=useState(true);

//     useEffect(()=>{
//         fetch('http://localhost:8000/api/projects')
//         .then(res=>{
//             return res.json();
//         }).then(pro=>{
//             setData(pro.data);     
//             setIsLoading(false);    
//         })
//     },[]);
    
//     return ( 
//         <div className='container p-4'>
//             <h2>Project Lists</h2>
//             {isLoading && <h2>Loading...........</h2>}
//             {data && data.map((project)=>(
//                  <Card className='mb-3' key={project.id}>
//                  <Card.Header>Featured</Card.Header>
//                    <Card.Body>
//                        <Card.Title>{project.name}</Card.Title>
//                          <Card.Text>
//                               {project.description}
//                         </Card.Text>
//                            <Button variant="primary">Go somewhere</Button>
//                   </Card.Body>
//              </Card>

//             ))}
       
//         </div>
        
//      );
// }
 
// export default ProjectList;