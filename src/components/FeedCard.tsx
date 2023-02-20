import {
  Card,
  Text,
  Button,
  Row,
  Container,
  Spacer,
  Col,
  Dropdown,
  Image,
  Grid,
} from "@nextui-org/react";
import {
  MdLocationOn,
  MdCalendarToday,
  MdThumbUp,
  MdThumbDown,
} from "react-icons/md";
import { BsFillPencilFill } from "react-icons/bs";
import UserProfile from "./UserProfile";
import FeedItem from "@/types/FeedItem";
import { auth } from "@/pages/_app";
import { db } from "@/pages/_app";

interface FeedCardInterface {
  id: string;
  item: FeedItem;
}

export default function FeedCard(props: FeedCardInterface) {
  function convertDate(input: number | undefined): string {
    const date = new Date(input ?? 0);
    return `${date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })} • ${date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  }

  function removePost() {
    db.doc(`feed/${props.id}`).delete();
  }

  return (
    <>
      <Card>
        <Card.Header>
          <Row justify={"space-between"} align="center">
            <UserProfile
              fullName={props.item.author.fullName}
              avatarUrl={props.item.author.avatarUrl}
            ></UserProfile>
            <>
              {props.item.eventType == "incident" ? (
                <Text color={"error"} b>
                  Incident
                </Text>
              ) : (
                <></>
              )}
              {auth.currentUser?.uid == props.item.authorId ? (
                <Dropdown>
                  <Dropdown.Button light>
                    <BsFillPencilFill />
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Static Actions"
                    onAction={(actionKey) => {
                      if (actionKey.toString() == "delete") {
                        removePost();
                      }
                    }}
                  >
                    <Dropdown.Item key="edit">Edit Post</Dropdown.Item>
                    <Dropdown.Item key="delete" withDivider color="error">
                      Delete Post
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <></>
              )}
            </>
          </Row>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ py: "$10" }}>
          <Container>
            <Col>
              <Text h3 b>
                {props.item.title}
              </Text>
              {props.item.address != null ? (
                <Row align="center">
                  <MdLocationOn />
                  <Spacer x={0.35} />
                  <Text b>{props.item.address.streetAddress}</Text>
                </Row>
              ) : (
                <></>
              )}
              {props.item.eventTime != null ? (
                <Row align="center">
                  <MdCalendarToday />
                  <Spacer x={0.35} />
                  <Text>{convertDate(props.item.eventTime)}</Text>
                </Row>
              ) : (
                <></>
              )}
              <Container>
                {props.item.imageUrl ? (
                  <Row gap={2}>
                    <Col>
                      <Image
                        css={{ borderRadius: "10px" }}
                        src={props.item.imageUrl}
                        alt="Default Image"
                      />
                    </Col>
                    <Col>
                      <Text>{props.item.description}</Text>
                    </Col>
                  </Row>
                ) : (
                  <Text>{props.item.description}</Text>
                )}
              </Container>
              <Spacer y={0.4} />
            </Col>
          </Container>
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
          <Row align="center" justify="space-between">
            <Row>
              <Spacer x={0.5} />
              <Text css={{ opacity: "0.33" }} size={"$sm"} color="">
                {convertDate(props.item.creationDate)}
              </Text>
            </Row>
            <Button.Group color="primary" size="sm" flat>
              <Button>
                <MdThumbDown />
              </Button>
              <Button>
                <MdThumbUp />
              </Button>
            </Button.Group>
          </Row>
        </Card.Footer>
      </Card>
      <Spacer y={1} />
    </>
  );
}
