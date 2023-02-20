import FeedCard from "@/components/FeedCard";
import { auth } from "@/pages/_app";
import FeedItem from "@/types/FeedItem";
import { useCollection } from "@nandorojo/swr-firestore";
import { Container, Spacer, Text } from "@nextui-org/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const DynamicComponentWithNoSSR = dynamic(
  () => import("@/components/EventModal"),
  { ssr: false }
);

export default function Feed() {
  const [user] = useAuthState(auth);
  const {
    data: feedList,
    add,
    error: feedListError,
    isValidating,
    mutate,
  } = useCollection<FeedItem>("feed", {
    orderBy: ["creationDate", "desc"],
    listen: true,
  });

  // Popup
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  function test() {
    console.log("OnSuccess Triggered");
    console.log(`Loading State ${isValidating}`);
  }

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

            {user ? (
              <DynamicComponentWithNoSSR
                open={visible}
                add={add}
                close={closeHandler}
              />
            ) : (
              <Text h3 color="primary">
                Log in to Post
              </Text>
            )}
            <Spacer y={1} />
            {feedList ? (
              feedList.map((item) => {
                return (
                  <FeedCard
                    key={item.id}
                    id={item.id}
                    item={{
                      creationDate: item.creationDate,
                      title: item.title,
                      description: item.description,
                      authorId: item.authorId,
                      author: item.author,
                      eventType: item.eventType,
                      imageUrl: item.imageUrl
                    }}
                  />
                );
              })
            ) : (
              <Text>test</Text>
            )}
          </Container>
        </div>
      </main>
    </>
  );
}
