import React from 'react';
import { SwatchesPicker,  SketchPicker, GithubPicker, ChromePicker } from 'react-color';

export default class OverlayComponent extends React.Component {

    state = {
        background: '#fff',
      };
    
      handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
      };
    
      render() {
        return (
          
          <ChromePicker 
            width={220}
            color={ this.state.background }
            onChangeComplete={ this.handleChangeComplete }
          />
        );
      }
}