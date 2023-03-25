import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';



const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API

  const [progress, setProgress] = useState(0);


    return (
      <>
        <div>
          <Router>
            <Navbar />

            <LoadingBar
              height = {3}
              color='#f11946'
              progress={progress}
            />


            <Switch>
              <Route exact  path='/'><News apiKey = {apiKey} key="general" country="us" category="general" setProgress={setProgress} /></Route>
              <Route exact  path='/About'><News apiKey = {apiKey} key="About" country="us" category="About" setProgress={setProgress} /></Route>
              <Route exact  path='/Sports'><News apiKey = {apiKey} key="Sports" country="us" category="Sports" setProgress={setProgress} /></Route>
              <Route exact  path='/Entertainment'><News apiKey = {apiKey} key="Entertainment" country="us" category="Entertainment" setProgress={setProgress} /></Route>
              <Route exact  path='/Business'><News apiKey = {apiKey} key="Business" country="us" category="Business" setProgress={setProgress} /></Route>
              <Route exact  path='/General'><News apiKey = {apiKey} key="General" country="us" category="General" setProgress={setProgress} /></Route>
              <Route exact  path='/Science'><News apiKey = {apiKey} setProgress={setProgress} key="Science" country="us" category="Science" /></Route>
              <Route exact  path='/Technology'><News apiKey = {apiKey} setProgress={setProgress} key="Technology" country="us" category="Technology" /></Route>
              <Route exact  path='/Health'><News apiKey = {apiKey} setProgress={setProgress} key="Health" country="us" category="Health" /></Route>
            </Switch>
          </Router>

        </div>
      </>
    )
}

export default App;
