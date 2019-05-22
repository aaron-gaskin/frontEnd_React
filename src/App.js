import React from 'react';

const api = 'https://itunes.apple.com/search?entity=album&term=';
let query = 'bastille';

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
                Artist: {hit.artistName} | Album: <a href={hit.collectionViewUrl} target='_blank' rel='noopener noreferrer'>{hit.collectionName}</a> | Year: {hit.releaseDate.substring(0,4)}
                <img src={hit.artworkUrl100} alt={hit.collectionName}/>
              </li>
            )}
          </ul>
        </div>
      );

    }
  }
}

export default App;
