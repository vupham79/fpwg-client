import React, { Component} from 'react';
import { FacebookProvider, Profile } from 'react-facebook';
 
export default class UserProfileFacebook extends Component {
  handleChange = (response) => {
    console.log(response);
  } 
 
  render() {
    return (
      <FacebookProvider appId="742131839643879">
        <Profile>
          {({ loading, profile }) => (
            <div>
              {profile.picture}
              {profile.name} 
            </div>
          )}
        </Profile>
      </FacebookProvider>    
    );
  }
}