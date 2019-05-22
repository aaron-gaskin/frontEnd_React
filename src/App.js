import React from 'react';

const api = 'https://itunes.apple.com/search?entity=album&term=';
const query = 'marshmello';

class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      hits: [],
    };
  }


  componentDidMount() {   //runs after render method then updates it
    fetch(api + query)
      .then(res => res.json())  //change response from api to json
      .then(data => this.setState({ isLoaded: true, hits: data.results}));
  }


  render() {    //responsible for producing output

    const {isLoaded, hits} = this.state;

    if(!isLoaded) {
      return <div>Loading...</div>
    } 
    
    else {

      return(
        <div className = 'App'>
          <ul>
            {hits.map(hit => 
              <li key={hit.trackID}>
                <a href={hit.url}>{hit.collectionName}</a>
              </li>
            )}
          </ul>
        </div>
      );

    }
  }
}

export default App;
