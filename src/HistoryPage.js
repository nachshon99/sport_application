import React from "react";
import axios from "axios";

class HistoryPage extends React.Component{
    state = {
        leagueHistory: []
    }

    getData = (props) => {
        if(props.id !== 'none'){
            axios.get("https://app.seker.live/fm1/history/" + props.id)
                .then((response) => {
                        response.data.map((item) => {
                            /*const itemToInsert = {
                                id: item.id,
                                round: item.round

                            }
                            this.state.leaguesTeams.push(itemToInsert);*/
                        })
                    }
                )
        }

    }

    render() {
        return(
            <div>
                {this.getData(this.props)}
                <table border={1}>
                    <tr style={{color: "blue"}}>
                        {
                            this.state.leagueHistory.map((team) => {
                                return(
                                    <div onClick={() => {alert("OK")}}>
                                        <th>{team.id}</th>
                                        <th>{team.round}</th>
                                    </div> //write function to onClick
                                )
                            })
                        }
                    </tr>
                </table>
            </div>

        )
    }


}
export default HistoryPage;