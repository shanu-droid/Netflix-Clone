import './App.css';
import Row from './Row'
import requests from './request'
import Banner from './Banner'
import Nav from './Nav'


function App() {
  return (
    <div className="app">
      <Nav/>
      <Banner/>
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
      <Row title="Trending Now" fetchUrl={requests.fetchTrending}/>
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated}/>
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}/>
      <Row title="Comedy Movie" fetchUrl={requests.fetchComedyMovies}/>
      <Row title="Horror Movie" fetchUrl={requests.fetchHorrorMovies}/>
      <Row title="Romance Movie" fetchUrl={requests.fetchRomanceMovies}/>
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries}/>
    </div>
  );
}

export default App;