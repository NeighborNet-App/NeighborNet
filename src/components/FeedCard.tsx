import {
  Card,
  Text,
  Button,
  Row,
  Container,
  Spacer,
  Col,
} from "@nextui-org/react";
import {
  MdLocationOn,
  MdCalendarToday,
  MdThumbUp,
  MdThumbDown,
} from "react-icons/md";
import UserProfile from "./UserProfile";
import FeedItem from "@/types/FeedItem";

export default function FeedCard(props: FeedItem) {
  function convertDate(input: number): string {
    const date = new Date(input);
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

  return (
    <Card>
      <Card.Header>
        <UserProfile></UserProfile>
      </Card.Header>
      <Card.Divider />
      <Card.Body css={{ py: "$10" }}>
        <Container>
          <Col>
            <Text h3 b>
              {props.title}
            </Text>
            {props.address != null ? (
              <Row align="center">
                <MdLocationOn />
                <Spacer x={0.35} />
                <Text b>{props.address.streetAddress}</Text>
              </Row>
            ) : (
              <></>
            )}
            {props.eventTime != null ? (
              <Row align="center">
                <MdCalendarToday />
                <Spacer x={0.35} />
                <Text>{convertDate(props.eventTime)}</Text>
              </Row>
            ) : (
              <></>
            )}
            <Spacer y={0.4} />
            <Text>{props.description}</Text>
          </Col>
        </Container>
      </Card.Body>
      <Card.Divider />
      <Card.Footer>
        <Row align="center" justify="space-between">
          <Row>
            <Spacer x={0.5} />
            <Text css={{ opacity: "0.33" }} size={"$sm"} color="">
              {convertDate(props.creationDate)}
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
  );
}
