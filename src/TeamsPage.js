import React from "react";
import axios from "axios";

class TeamsPage extends React.Component{
    state = {
        leaguesTeams: [],
    }



    getData = (props) => {
        if(this.props.id !== ''){
            axios.get(props.domainRouter + props.teamRouter + props.id)
                .then((response) => {
                        (response.data.map((item) => {
                            const itemToInsert = {
                                id: item.id,
                                name: item.name
                            }
                            this.state.leaguesTeams.push(itemToInsert);
                        }))
                    }
                )
        }
    }

    getPlayers = (props, teamId) => {
            axios.get(props.domainRouter + props.squadRouter + props.id + '/' + teamId)
                .then((response) => {
                        (response.data.map((item) => {
                            const itemToInsert = {
                                id: item.id,
                                name: item.name
                            }
                            this.state.leaguesTeams.push(itemToInsert);
                        }))
                    }
                )
    }

    showTeamDetails = (team) => {
        return(
            <div>
                {
                    axios.get(this.props.domainRouter + this.props.routers.squadRouter + this.props.id + team.id)
                        .then((response) => {
                            alert(response.data)
                        })
                }
            </div>
        )
    }

    setSite = () => {
        this.getData(this.props)
        return(
            <div>
                <table border={1}>
                    <tr style={{color: "black"}}>
                        {
                            this.state.leaguesTeams.map((team) => {
                                return(
                                    <div onClick={() => {alert(team.name); this.getPlayers(this.props, team.id)}}>
                                        <th>{team.id}</th>
                                        <th>{team.name}</th>
                                    </div> //write function to onClick
                                )
                            })
                        }
                    </tr>
                </table>
            </div>
        )
    }

    render() {
        return (
            this.setSite()
        )
    }
}
export default TeamsPage;
