import Head from "next/head";
import React from "react";
import MainNavbar from "@/components/MainNavbar";
import {
  Input,
  Textarea,
  Modal,
  Button,
  Container,
  Navbar,
  Text,
  Spacer,
} from "@nextui-org/react";
import { firestore } from "./../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import FeedCard from "@/components/FeedCard";

export default function Feed() {
  const feedRef = firestore.collection("feed");
  const query = feedRef.orderBy("creationDate").limit(50);

  const [feedList] = useCollectionData(query, { idField: "id" });

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
          <Container gap={28}>
            <Spacer y={1} />
            <Text h1>Neighborhood Feed</Text>
            <Button auto color="primary" onPress={handler}>
              {" "}
              Create Event{" "}
            </Button>
            <Modal
              closeButton
              blur
              aria-labelledby="modal-title"
              open={visible}
              onClose={closeHandler}
            >
              <Modal.Header>
                <Text id="modal-title" size={18}>
                  {" "}
                  Create Event{" "}
                </Text>
              </Modal.Header>

              <Modal.Body>
                <Input bordered color="primary" fullWidth placeholder="Title" />
                <Textarea bordered color="primary" placeholder="Description" />
                <Input
                  bordered
                  color="primary"
                  fullWidth
                  placeholder="Location"
                />
                <Input bordered fullWidth label="Time" type="time" />
                <Input bordered label="Date" type="date" />
              </Modal.Body>
            </Modal>
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
                  </>
                );
              })}
          </Container>
        </div>
      </main>
    </>
  );
}
