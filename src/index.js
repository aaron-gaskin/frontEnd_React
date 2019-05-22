/*  Name: Aaron Gaaskin
    Date: 5/21/19
    Purpose: Using the 'iTunes Search API', show the albums of a desired artist
*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';


//Search component
//Searches through albums in the iTunes store for matching artists the user searches for
//Search bar url: https://stackoverflow.com/questions/51134564/how-to-show-information-from-api-when-using-search-box-in-reactjs
class Search extends React.Component {
    token = null;   //value to verify the use of the latest result
    state = {
        query: '',
        hits: [],
    };

    //if the input in the search bar changes, update the outputted data
    onChange = data => {
        const { value } = data.target;
        this.setState({
            query: value,
        });
        this.newSearch(value);
    };
    
    //search through the iTunes API, grab all hits, then convert to JSON
    newSearch = query => {
        const url = `https://itunes.apple.com/search?entity=album&term=${query}`;
        const token = {};
        this.token = token;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if(this.token === token) {
                    this.setState({ hits: data.results });
                }
            });
    };

    //initial search through API
    componentDidMount() {
        this.newSearch('Marshmello');
    }

    //output data in html format
    render () {
        return (
            <div className='Search bar with auto refresh'>
                {/* Search bar code */}
                <input
                    type='text'
                    className='Search bar'
                    placeholder='Search...'
                    onChange={this.onChange}
                    ng-model='query'
                />
                {/* Take the search results and display them */}
                {this.state.hits.map(hit => (
                    <ul key={hit.trackID}>
                        <li>
                            Artist: {hit.artistName} | Album: <a href={hit.collectionViewUrl} target='_blank' rel='noopener noreferrer'>{hit.collectionName}</a> | Year: {hit.releaseDate.substring(0,4)}
                            <img src={hit.artworkUrl100} alt={hit.collectionName}/>
                        </li>
                    </ul>
                ))}
                {/* <div className='App Component'>
                    <App value={this.state.hits}/>
                </div> */}
            </div>
        )
    }
}

export default Search

ReactDOM.render(<Search />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
