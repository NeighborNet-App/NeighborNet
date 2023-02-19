import FeedCard from "@/components/FeedCard";
import { auth, firestore } from "@/firebase";
import {
  Button,
  Container,
  Input,
  Loading,
  Modal,
  Row,
  Spacer,
  Text,
  Textarea,
  useInput,
} from "@nextui-org/react";
import Head from "next/head";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Feed() {
  const feedRef = firestore.collection("feed");
  const query = feedRef.orderBy("creationDate", "desc").limit(50);

  const [feedList] = useCollectionData(query, { idField: "id" });
  const [user] = useAuthState(auth);

  // Popup
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  return (
    <>
      <Head>
        <title>Your Feed | NeighborNet</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Container sm>
            <Spacer y={1} />
            <Text h1>Neighborhood Feed</Text>
            <EventModal open={visible} close={closeHandler} />
            {user ? (
              <Button auto color="primary" onPress={handler}>
                {" "}
                New Post{" "}
              </Button>
            ) : (
              <Text h3 color="primary">
                Log in to Post
              </Text>
            )}
            <Spacer y={1} />
            {feedList &&
              feedList.map((item) => {
                return (
                  <>
                    <FeedCard
                      key={item["id"]}
                      creationDate={item["creationDate"]}
                      title={item["title"]}
                      description={item["description"]}
                      authorId={item["authorId"]}
                    />
                    <Spacer y={1} />
                  </>
                );
              })}
          </Container>
        </div>
      </main>
    </>
  );
}

interface EventModalProps {
  open: boolean;
  close: () => void;
}

function EventModal(props: EventModalProps) {
  function handleSubmit() {
    setDisableSubmit(true);
    setTimeout(function () {
      uploadDocument();
    }, 1000);
  }

  function uploadDocument() {
    firestore
      .collection("feed")
      .add({
        title: titleValue,
        description: descriptionValue,
        creationDate: Date.now(),
        authorId: auth.currentUser?.getIdToken.toString(),
      })
      .then((docRef) => {
        props.close();
        setTimeout(function () {
          setDisableSubmit(false);
        }, 750);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        setTimeout(function () {
          setDisableSubmit(false);
        }, 750);
      });
  }

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

  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={props.open}
      onClose={props.close}
      width="600px"
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          New Post
        </Text>
      </Modal.Header>

      <Modal.Body>
        <Input
          {...titleBindings}
          bordered
          color="primary"
          fullWidth
          label="Title"
        />
        <Textarea
          {...descriptionBindings}
          autoComplete="address-line1"
          bordered
          color="primary"
          fullWidth
          label="Description"
        />
        <Input bordered color="primary" fullWidth label="Location (Optional)" />
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
        <Spacer y={0} />
        <Button
          disabled={
            titleValue.length < 4 ||
            descriptionValue.length < 4 ||
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
      </Modal.Body>
    </Modal>
  );
}
