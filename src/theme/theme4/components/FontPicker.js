import React, { Component } from "react";
import FontPicker from "font-picker-react";
 
export default class FontPickerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFontFamily: "Open Sans",
        };
    }
 
    render() {
        return (
            <div>
                <FontPicker
                    apiKey="AIzaSyCHtgUPfrWDjiK-p3Uz1YrA9Smo-qJ_cL4"
                    sort="alphabet"
                    activeFontFamily={this.state.activeFontFamily}
                    onChange={nextFont =>
                        this.setState({
                            activeFontFamily: nextFont.family,
                        })
                    }
                />
                
            </div>
        );
    }
}