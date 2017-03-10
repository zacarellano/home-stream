import React, { Component } from 'react'
import { ref } from '../config/firebase'
import Home from '../components/Home'

class HomeContainer extends Component {
  constructor() {
    super()
    this.state = {
      isSaved: false,
      photo: null
    }
    this.saveListing = this.saveListing.bind(this)
  }
  componentDidMount() {
    this.pickRandomPhoto()
    this.checkIfSaved()
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !this.state.isSaved
  }
  pickRandomPhoto() {
    this.setState({ photo: Math.round(Math.random()) })
  }
  checkIfSaved() {
    const userId = localStorage.getItem('userId')
    const homeId = this.props.listing.mlsId
    console.log(homeId, userId)
    ref.once('value', (snapshot) => {
      if (snapshot.hasChild(`users/${userId}/homes/${homeId}`)) {
        this.setState({ isSaved: true })
      }
    })
  }
  saveListing() {
    const userId = localStorage.getItem('userId')
    const homeId = this.props.listing.mlsId
    ref.child(`users/${userId}/homes/${homeId}`)
      .set(this.props.listing)
      .then(() => this.setState({ isSaved: true }))
  }
  render() {
    return <Home {...this.state} {...this.props} saveListing={this.saveListing} />
  }
}

export default HomeContainer