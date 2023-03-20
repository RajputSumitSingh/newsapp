import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';



export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API
  state = {
    progress: 0,
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {

    return (
      <>
        <div>
          <Router>
            <Navbar />

            <LoadingBar
              height = {3}
              color='#f11946'
              progress={this.state.progress}
            />


            <Switch>
              <Route exact  path='/'><News apiKey = {this.apiKey} key="general" country='us' category="general" setProgress={this.setProgress} /></Route>
              <Route exact  path='/About'><News apiKey = {this.apiKey} key="About" country="us" category="About" setProgress={this.setProgress} /></Route>
              <Route exact  path='/Sports'><News apiKey = {this.apiKey} key="Sports" country="us" category="Sports" setProgress={this.setProgress} /></Route>
              <Route exact  path='/Entertainment'><News apiKey = {this.apiKey} key="Entertainment" country="us" category="Entertainment" setProgress={this.setProgress} /></Route>
              <Route exact  path='/Business'><News apiKey = {this.apiKey} key="Business" country="us" category="Business" setProgress={this.setProgress} /></Route>
              <Route exact  path='/General'><News apiKey = {this.apiKey} key="General" country="us" category="General" setProgress={this.setProgress} /></Route>
              <Route exact  path='/Science'><News apiKey = {this.apiKey} setProgress={this.setProgress} key="Science" country="us" category="Science" /></Route>
              <Route exact  path='/Technology'><News apiKey = {this.apiKey} setProgress={this.setProgress} key="Technology" country="us" category="Technology" /></Route>
              <Route exact  path='/Health'><News apiKey = {this.apiKey} setProgress={this.setProgress} key="Health" country="us" category="Health" /></Route>
            </Switch>
          </Router>

        </div>
      </>
    )
  }
}
