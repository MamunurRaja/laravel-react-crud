import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './Footer';
import Header from './Header';
import Nav from './Nav';
import ProjectList from './ProjectList';

function Home() {
    return (
        <div>
            <Header/>
                     
            <Footer/>
        </div>
    );
}

export default Home;

if (document.getElementById('root')) {
    ReactDOM.render(<Home />, document.getElementById('root'));
}