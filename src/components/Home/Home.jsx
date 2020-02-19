import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from "react";
import styles from "./Home.module.scss";

function Home() {


  const [map, setMap] = useState(null)
  const mapContainer = useRef(null)

  useEffect(() => {

    mapboxgl.accessToken =
      "pk.eyJ1Ijoibmljb2xhc2NhIiwiYSI6ImNqdjNlZHY2czFzbGs0M280ZXg5bHE3ZnQifQ.qvyAeDcAJiswn2VLP320Tw"
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        center: [-175.73219158277513, 1.2417133592737315],
        style: "mapbox://styles/nicolasca/ck6tbrrb22qtw1in0q0n92vdb",
        zoom: 1.5,
      })
      // Add zoom and rotation controls to the map.
      map.addControl(new mapboxgl.NavigationControl(), "top-left")

      map.on("load", () => {
        setMap(map)
        map.resize()
      })
    }

    if (!map) {
      initializeMap({ setMap, mapContainer })
    }

  }, [map]);

  return (
    // <div className={styles.MainPage + " container"}>
    //   <div className={styles.Description}>
    //     <h3>PAFF</h3>
    //     <p>{text}</p>
    //   </div>
    //   <div className={styles.MapPriana}>
    //     <img src={logo} alt="" />
    //   </div>
    // </div>

    <div className={styles.MainMap}>
      <div
        className="Map"
        style={{ height: "100vh", width: "100%" }}
        ref={el => (mapContainer.current = el)}
      />
    </div>
  );
}

export default Home;
