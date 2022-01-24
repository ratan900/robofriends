// import { robots } from "./robots";
import CardList from "../Components/CardList";
import { connect } from "react-redux";
import SearchBox from "../Components/SearchBox";
import { Component } from "react/cjs/react.development";
import Scroll from "../Components/Scroll";
import ErrorBoundry from "../Components/ErrorBoundry";
// import { useEffect, useState } from "react";
import { setSearchField, requestRobots } from "../Action";

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    isPending: state.requestRobots.isPending,
    robots: state.requestRobots.robots,
    error: state.requestRobots.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots()),
  };
};

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     robots: [],
  //     // searchfield: "",
  //   };
  // }
  // onSearchChange = (event) => {
  //   this.setState({ searchfield: event.target.value });
  // };
  componentDidMount() {
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((users) => {
    //     this.setState({ robots: users });
    //   });
    // // this.setState({ robots: robots });
    this.props.onRequestRobots();
  }
  render() {
    // const { robots } = this.state;
    const { searchField, onSearchChange, robots, isPending } = this.props;
    const filterRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    return isPending ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">Robo Friends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filterRobots}></CardList>
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

// function App() {
//   // constructor() {
//   //   super();
//   //   this.state = {
//   //     robots: [],
//   //     searchfield: "",
//   //   };
//   // }
//   const [robots, setRobots] = useState([]);
//   const [searchfield, setSearchField] = useState("");
//   const onSearchChange = (event) => {
//     setSearchField(event.target.value);
//   };
//   // componentDidMount() {
//   //   fetch("https://jsonplaceholder.typicode.com/users")
//   //     .then((response) => {
//   //       return response.json();
//   //     })
//   //     .then((users) => {
//   //       this.setState({ robots: users });
//   //     });
//   //   // this.setState({ robots: robots });
//   // }
//   useEffect(() => {
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => {
//         return response.json();
//       })
//       .then((users) => {
//         setRobots(users);
//       });
//   }, []);

//   const filterRobots = robots.filter((robot) => {
//     return robot.name.toLowerCase().includes(searchfield.toLowerCase());
//   });
//   return !robots.length ? (
//     <h1>Loading</h1>
//   ) : (
//     <div className="tc">
//       <h1 className="f1">Robo Friends</h1>
//       <SearchBox searchChange={onSearchChange} />
//       <Scroll>
//         <ErrorBoundry>
//           <CardList robots={filterRobots}></CardList>;
//         </ErrorBoundry>
//       </Scroll>
//     </div>
//   );
// }
// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
