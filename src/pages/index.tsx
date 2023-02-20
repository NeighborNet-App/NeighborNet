import Head from "next/head";
import MainNavbar from "@/components/MainNavbar";
import { Container, Row, Text, Spacer } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { useCollection } from "@nandorojo/swr-firestore";
import FeedItem from "@/types/FeedItem";

export default function Home() {
  const {
    data: feedList,
    loading,
    error: feedListError,
    add,
    mutate
  } = useCollection<FeedItem>(
    "feed",
    {
      orderBy: ["creationDate", "desc"],
      listen: true,

    }
  );
  const imageSize = 150;
  return (
    <>
      <Head>
        <title>Home | NeighborNet</title>
        <meta name="description" content="Our neighborhood social web app is the ultimate solution to keep you informed, involved, and safe in your community by keeping you informed on events and incidents." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Container md>
            <Spacer y={2} />
            <Image
              width={imageSize}
              height={imageSize}
              src="logo.svg"
              alt="Main Logo"
            />
            <Row justify="center">
              <Text h1>Welcome to NeighborNet</Text>
            </Row>
            <Row justify="center" align="center">
              <Text size="$xl">
                {
                  " Introducing our neighborhood social web app, the ultimate solution for keeping you in the loop on all the latest happenings in your local community. Our web app is the perfect tool for discovering new and exciting events taking place in your neighborhood, from parties and fundraisers to volunteer opportunities and community gatherings. We will keep you up to date on everything that is going on, so you never miss out on an opportunity to connect with your neighbors and make new friends. But that is not all, our web app also provides real-time updates on incidents and safety alerts in your area, so you can stay informed and stay safe. Use our web app today and start exploring all the exciting things happening in your community!"
                }
              </Text>
            </Row>
          </Container>
        </div>
      </main>
    </>
  );
}
