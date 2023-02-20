import { auth } from "@/pages/_app";
import FeedItem from "@/types/FeedItem";
import User from "@/types/User";
import { useDocument } from "@nandorojo/swr-firestore";
import {
  Button,
  Col,
  Input,
  Loading,
  Row,
  Spacer,
  Text,
  Textarea,
  useInput,
  Checkbox,
  Collapse,
  Container,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { AddressAutofill, config } from "@mapbox/search-js-react";

interface EventModalProps {
  open: boolean;
  add: (data: FeedItem | FeedItem[]) => Promise<void> | null;
  close: () => void;
}

export default function EventModal(props: EventModalProps) {
  function handleSubmit() {
    setDisableSubmit(true);
    setTimeout(function () {
      uploadDocument();
    }, 250);
  }
  const {
    data: userData,
    update: updateUserData,
    error: userDataError,
  } = useDocument<User>(`users/${auth.currentUser?.uid}`);

  function uploadDocument() {
    props
      .add({
        creationDate: Date.now(),
        title: titleValue,
        description: descriptionValue,
        authorId: auth.currentUser!.uid,
        author: {
          fullName: userData!.fullName,
          avatarUrl: userData?.avatarUrl,
        },
        address:
          locationValue != ""
            ? {
                latitude: latitude,
                longitude: longitude,
                streetAddress: locationValue,
                city: city,
                country: country,
              }
            : undefined,
        eventType: isIncident ? "incident" : "regular",
      })
      ?.then(() => {
        props.close();
        resetFields()
        setTimeout(function () {
          setDisableSubmit(false);
        }, 750);
      });
  }

  const [isIncident, setIsIncident] = useState(true);

  const [disableSubmit, setDisableSubmit] = useState(false);

  const {
    value: titleValue,
    setValue: setTitleValue,
    reset: resetTitle,
    bindings: titleBindings,
  } = useInput("");

  const {
    value: descriptionValue,
    setValue: setDescriptionValue,
    reset: resetDescription,
    bindings: descriptionBindings,
  } = useInput("");

  const {
    value: dateValue,
    setValue: setDateValue,
    reset: resetDate,
    bindings: dateBindings,
  } = useInput("");

  const {
    value: timeValue,
    setValue: setTimeValue,
    reset: resetTime,
    bindings: timeBindings,
  } = useInput("");

  const {
    value: locationValue,
    setValue: setLocationValue,
    reset: resetLocation,
    bindings: locationBindings,
  } = useInput("");

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  //Mapbox
  const token =
    "pk.eyJ1IjoibGVvc20wNyIsImEiOiJjbGVicjdueHgxMmoxM25xZ2JqZWVkbTFjIn0.nv1GEej-EtMR1ouVUYVM_w";

  useEffect(() => {
    config.accessToken = token;
  }, []);

  const handleRetrieve = useCallback(
    (res: any) => {
      console.log(res.features[0].properties);
      setLocationValue(res.features[0].properties.feature_name);
      setLatitude(res.features[0].geometry.coordinates[1]);
      setLongitude(res.features[0].geometry.coordinates[0]);
      setCity(res.features[0].properties.address_level2);
      setCountry(res.features[0].properties.country);
    },
    [setLocationValue]
  );

  const resetFields = () => {
    resetTitle()
    resetDescription()
    resetLocation()
    setLatitude(0)
    setLongitude(0)
    setCity("")
    setCountry("")
    resetTime()
    resetDate()
  }

  return (
    <Collapse.Group bordered>
      <Collapse title={"New Post"}>
        <Container>
          <Checkbox
            isSelected={isIncident}
            color="primary"
            onChange={setIsIncident}
          >
            Is Incident?
          </Checkbox>
          <Input
            {...titleBindings}
            bordered
            color="primary"
            fullWidth
            label="Title (Required)"
          />
          <Textarea
            {...descriptionBindings}
            bordered
            color="primary"
            fullWidth
            label="Description (Required)"
          />
          <AddressAutofill accessToken={token} onRetrieve={handleRetrieve}>
            <Input
              {...locationBindings}
              bordered
              color="primary"
              fullWidth
              label="Location (Required)"
              name="address"
              placeholder="Address"
              type="text"
              autoComplete="address-line1"
            />
          </AddressAutofill>
          <Row>
            <Input
              {...dateBindings}
              bordered
              fullWidth
              color="primary"
              label="Date (Optional)"
              type="date"
            />
            <Spacer x={1} />
            <Input
              {...timeBindings}
              bordered
              fullWidth
              color="primary"
              label="Time (Optional)"
              type="time"
            />
          </Row>

          <Spacer y={1} />
          <Button
            disabled={
              titleValue.length < 4 ||
              descriptionValue.length < 4 ||
              locationValue.length < 3 ||
              disableSubmit
            }
            onPress={handleSubmit}
          >
            {disableSubmit ? (
              <Loading type="default" color="currentColor" size="sm" />
            ) : (
              <>Submit</>
            )}
          </Button>
        </Container>
      </Collapse>
    </Collapse.Group>
  );
}
