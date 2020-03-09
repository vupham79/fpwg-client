import React from "react";
import CarouselImages from "../../components/carousel";
import New from "../../pages/new";
import EventPage from "../../pages/event";

class HomePage extends React.Component {
  render() {
    return (
      <>
        <CarouselImages />
        <New />
        <EventPage />
      </>
    );
  }
}

export default HomePage;
