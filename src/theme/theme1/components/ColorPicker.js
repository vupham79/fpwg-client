import React from 'react';
import { SwatchesPicker,  SketchPicker, GithubPicker, TwitterPicker } from 'react-color';

export default class ColorPickerComponent extends React.Component {

    state = {
        background: '#fff',
      };
    
      handleChangeComplete = (color) => {
        this.setState({ background: color.hex });
      };
    
      render() {
        return (
          
          <TwitterPicker 
            width={220}
            color={ this.state.background }
            onChangeComplete={ this.handleChangeComplete }
          />
        );
      }
}