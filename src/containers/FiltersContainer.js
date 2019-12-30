import React from 'react'
import { Button } from 'semantic-ui-react'

class FiltersContainer extends React.Component {
    render() {
        return (
            <div>
                < br />
                < Button
                    basic inverted 
                    content="Episodes"
                    name="episodes"
                    active={this.props.activeFilter === "episodes"}
                    onClick={this.props.handleFilterClick}
                />
                < Button 
                    basic inverted
                    content="Podcasts"
                    name="podcasts"
                    active={this.props.activeFilter === "podcasts"}
                    onClick={this.props.handleFilterClick}
                />
            </div>
        )
    }
}

export default FiltersContainer