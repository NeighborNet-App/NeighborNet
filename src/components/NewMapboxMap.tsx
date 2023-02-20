import FeedItem from "@/types/FeedItem";
import { useCollection } from "@nandorojo/swr-firestore";
import { Map, Marker, Popup, PopupEvent } from "react-map-gl";
import { IoLocationSharp } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import {
  Col,
  Row,
  Button,
  useTheme,
  Text,
  Image,
  Spacer,
  Card,
} from "@nextui-org/react";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function NewMapboxMap() {
  const [popupInfo, setPopupInfo] = useState<FeedItem | null>(null);
  const { type, isDark } = useTheme();
  const token =
    "pk.eyJ1IjoibGVvc20wNyIsImEiOiJjbGVicjdueHgxMmoxM25xZ2JqZWVkbTFjIn0.nv1GEej-EtMR1ouVUYVM_w";

  const { data: locationList } = useCollection<FeedItem>("feed", {
    where: ["address", "!=", false],
    listen: true,
  });

  const closeItem = (e: PopupEvent) => {
    setPopupInfo(null);
  };
  return (
    <Map
      initialViewState={{
        longitude: -118.4912,
        latitude: 34.0195,
        zoom: 12.5,
      }}
      style={{ width: "100vw", height: "91.5vh" }}
      mapStyle={
        isDark
          ? "mapbox://styles/mapbox/dark-v11"
          : "mapbox://styles/mapbox/light-v11"
      }
      mapboxAccessToken={token}
      projection={"globe"}
    >
      {locationList ? (
        locationList.map((item) => {
          return (
            <Marker
              key={item.id}
              longitude={item.address?.longitude}
              latitude={item.address?.latitude}
              anchor="center"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setPopupInfo(item);
              }}
            >
              <h1>
                <IoLocationSharp
                  color={item.eventType == "incident" ? "" : ""}
                  className="popIcon"
                />
              </h1>
            </Marker>
          );
        })
      ) : (
        <></>
      )}

      {popupInfo && (
        <Popup
          closeButton={false}
          longitude={popupInfo.address?.longitude ?? 0}
          latitude={popupInfo.address?.latitude ?? 0}
          maxWidth="400px"
          onClose={closeItem}
          style={{ marginTop: "-15px", marginBottom: "10px"}}
        >
          <div style={{ color: "black" }}>
            <Card variant="shadow" css={{ width: "400px" }}>
              <Card.Header>
                <Col>
                  <Text h3>{popupInfo.title}</Text>
                  <Text>{popupInfo.description}</Text>
                </Col>
              </Card.Header>
              <Card.Body css={{ p: 0 }}>
                {popupInfo.imageUrl ? (
                  <Card.Image
                    src={popupInfo.imageUrl}
                    objectFit="cover"
                    width="100%"
                    height={250}
                    alt="Card image background"
                  />
                ) : (
                  <></>
                )}
              </Card.Body>
              {popupInfo.imageUrl ? (
                <Card.Footer
                  isBlurred
                  css={{
                    position: "absolute",
                    bgBlur: "#2e2e2e99",
                    borderTop:
                      "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                    bottom: 0,
                    zIndex: 1,
                  }}
                >
                  <Row justify="space-between" align="center">
                    <Text css={{color:"#ffffff"}}>{popupInfo.address?.streetAddress}</Text>
                    {popupInfo.eventType == "incident" ? (
                      <Button flat auto rounded color="warning">
                        <Text
                          css={{ color: "inherit" }}
                          size={12}
                          weight="bold"
                          transform="uppercase"
                        >
                          Incident
                        </Text>
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Row>
                </Card.Footer>
              ) : (
                <Card.Footer
                  isBlurred
                  css={{
                    borderTop:
                      "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                    bottom: 0,
                    zIndex: 1,
                  }}
                >
                  <Row justify="space-between" align="center">
                    <Text>{popupInfo.address?.streetAddress}</Text>
                    {popupInfo.eventType == "incident" ? (
                      <Button flat auto rounded color="warning">
                        <Text
                          css={{ color: "inherit" }}
                          size={12}
                          weight="bold"
                          transform="uppercase"
                        >
                          Incident
                        </Text>
                      </Button>
                    ) : (
                      <></>
                    )}
                  </Row>
                </Card.Footer>
              )}
            </Card>
          </div>
        </Popup>
      )}
    </Map>
  );
}
