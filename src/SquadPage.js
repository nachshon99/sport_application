import React from "react";
import axios from "axios";

class SquadPage extends React.Component{
    state = {
        leagueSquad: []
    }

    getData = (props) => {
        if(this.props.id !== 'none'){
            axios.get('https://app.seker.live/fm1/squad/1/120' /* + props.id + '/1'*/)
                .then((response) => {
                    return (
                        response.data.map((item) => {
                            const itemToInsert = {
                                id: item.id,
                                firstName: item.firstName,
                                lastName: item.lastName,

                            }
                        })
                    )
                })
        }
    }

    render() {
        return(
            <div>
                Squad page
                {this.getData(this.props)}
            </div>
        )
    }

}

export default SquadPage;