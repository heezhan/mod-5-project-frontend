import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'semantic-ui-react';

class PlaylistCard extends React.Component {
    render() {
        const { id, title, created_at } = this.props.playlist 

        let parseDate = () => {
            let slicedDate = created_at.slice(0,10)
            let slicedDateArray = slicedDate.split("-")
            return slicedDateArray[1] + "." + slicedDateArray[2] + "." + slicedDateArray[0]
        }

        return (
            <div>
                <div className="playlist-card">
                    <h2>
                        <Header>
                            <Header.Content>
                                <Link className="text-color" to={`/playlists/${id}`}>
                                    {title} 
                                </Link>
                                <Header.Subheader className="text-color">
                                    <b>✿ {parseDate()}</b>
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </h2>
                </div>
                <br/>
            </div>
        )
    }
}

export default PlaylistCard