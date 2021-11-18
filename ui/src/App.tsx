import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import Navbar from './components/nav/Navbar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Container} from 'react-bootstrap';

function Home() {
    return (
        <>
            {Navbar()}
            <Container fluid id="main">
            </Container>
        </>
    );
}

function About() {
    return (
        <>
            {Navbar()}
            <Container className="pt-3" role="main">
                <p>
                    531 Calculator is an app that calculates your weights and warmups based off of your
                    percentages from the 5/3/1 weightlifting program.
                </p>
                <p>
                    For questions, issues, or if you want to contribute, take a look at the <a
                    href="https://github.com/ceruleanskis/531Calculator">Github repo</a>.
                </p>
                <p>
                    Written and maintained by Cole Ward.
                </p>
            </Container>
        </>
    );
}

function App() {
    document.title = "531 Calculator"
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}>
                    </Route>
                    <Route path="/about" element={<About/>}>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>

    );
}

export default App;
