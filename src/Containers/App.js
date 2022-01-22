// import { robots } from "./robots";
import CardList from "../Components/CardList";
import SearchBox from "../Components/SearchBox";
import { Component } from "react/cjs/react.development";
import Scroll from "../Components/Scroll";
import ErrorBoundry from "../Components/ErrorBoundry";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: "",
    };
  }
  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        this.setState({ robots: users });
      });
    // this.setState({ robots: robots });
  }
  render() {
    const { robots, searchfield } = this.state;
    const filterRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    return !robots.length ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">Robo Friends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filterRobots}></CardList>;
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;
