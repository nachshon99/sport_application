import './App.css';
import React from "react";
import axios from "axios";
import {BrowserRouter,Routes,Route,NavLink} from "react-router-dom";
import TeamsPage from "./TeamsPage";
import HistoryPage from "./HistoryPage";
import HomePage from "./HomePage";
import RoundPage from "./RoundPage";
import SquadPage from "./SquadPage";
import TeamsHistoryPage from "./TeamsHistoryPage";

class App extends React.Component{
  state = {
      selectedOptions: "none",
      leagues: [],
      key: '',
      domainRouter: "https://app.seker.live/fm1",
      routers:{
          leaguesListRouter: "/leagues",
          teamRouter: "/teams/" /*+ leagueId*/ ,
          historyRouter: "/history/" /*+ leagueId*/,
          roundRouter: "/round/" /*+leagueId/round*/,
          squadRouter: "/squad/" /*+leagueId/teamId*/,
          teamHistoryRouter: "/history/" /*+ leagueId/teamId*/
      }
  }
  leagues2 =[];

  componentDidMount() {
      if (this.state.key !== ''){
          this.leagueChanged(this.state.key);
      }
      this.getLeagues();
      this.setState({})
  }

  getLeagues = () => {
      axios.get(this.state.domainRouter+this.state.routers.leaguesListRouter)
          .then((response) => {
              return(response.data.map((item) => {
                  const itemToInsert = {
                      id: item.id,
                      name: item.name
                  }
                  this.leagues2.push(itemToInsert)

                  this.setState({
                      leagues: this.leagues2
                  })
              }))
          }
      )
  }
  leagueEvent = (event) => {
      this.leagueChanged(event.target.value)
  }

  leagueChanged = (key) => {
      this.setState({
          selectedOptions: key,
          key: key
      })

  }

  clearLeague = (props) => {
      props.leagueTeams = [];
  }

  render() {
    return (
        <div>

            <BrowserRouter>
                <header>Sport Leagues</header>
                <NavLink to={"/"} className={"navLink"}>Home</NavLink>
                <NavLink to={"/teams"} className={"navLink"}>Teams</NavLink>
                <NavLink  to={"/history"} className={"navLink"}>History</NavLink>
                <NavLink  to={"/round"} className={"navLink"}>Round</NavLink>
                <NavLink  to={"/squad"} className={"navLink"}>Squad</NavLink>
                <NavLink  to={"/teamsHistory"} className={"navLink"}>Teams History</NavLink>

                <div>
                    <label>Please choose league</label>
                    <select value={this.state.selectedOptions} onChange={this.leagueEvent}>{this.state.selectedOptions}>
                        <option value={"none"}>None</option>
                        {
                            this.state.leagues.map((league) => {
                                return(
                                    <option value={league.id}>{league.name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <Routes>
                    <Route path={"/"} element={<HomePage />}/>
                    <Route path={"/teams"} element={<TeamsPage domainRouter={this.state.domainRouter} teamRouter={this.state.routers.teamRouter} id={this.state.key}/>}/>
                    <Route path={"/history"} element={<HistoryPage id={this.state.key}/>}/>
                    <Route path={"/round"} element={<RoundPage id={this.state.key}/>}/>
                    <Route path={"/squad"} element={<SquadPage domainRouter={this.state.domainRouter} squadRouter={this.state.routers.squadRouter} id={this.state.key}/>}/>
                    <Route path={"/teamsHistory"} element={<TeamsHistoryPage id={this.state.key}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
  }


}

export default App;
