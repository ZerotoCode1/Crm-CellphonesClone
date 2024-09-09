"use client";
import { AdvancedMarker, APIProvider, Map, MapControl } from "@vis.gl/react-google-maps";
import React from "react";
import PinCustom from "../Pin";

const GoogleMap = () => {
  const handleShowDetail = (item: any) => {};
  return (
    <div>
      <APIProvider apiKey={"AIzaSyDTBpN6GF2yCrwMs6DfVPcY7R6YpOEN6Vg"} language="Vi">
        <Map
          mapTypeControl={true}
          fullscreenControl={true}
          zoomControl={true}
          clickableIcons={true}
          mapId={"bf51a910020fa25c"}
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={{ lat: 21.028511, lng: 105.804817 }}
          defaultZoom={15}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          //   onClick={handleChangePosition}
        >
          <AdvancedMarker
            // ref={markerRef}
            position={{ lat: 21.028511, lng: 105.804817 }}
            // onClick={() => handleShowDetail(item?.id)}
          >
            <PinCustom
              img={"https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg"}
              name={"252 Hoàng Quốc Việt"}
            />
          </AdvancedMarker>
        </Map>
        {/* <MapControl position={ControlPosition.TOP}>
          <div className="autocomplete-control">
            <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
          </div>
        </MapControl>
        <MapHandler place={selectedPlace} marker={marker} /> */}
      </APIProvider>
    </div>
  );
};

export default GoogleMap;
