import {
  Card,
  Text,
  Button,
  Row,
  Container,
  Spacer,
  Col,
} from "@nextui-org/react";
import { MdLocationOn, MdCalendarToday, MdThumbUp, MdThumbDown } from "react-icons/md";
import UserProfile from "./UserProfile";

export default function FeedCard() {
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
              Post Title
            </Text>
            <Spacer y={-.5} />
            <Row align="center">
              <MdLocationOn />
              <Spacer x={0.35} />
              <Text b>123 Testing Avenue, Santa Monica</Text>
            </Row>
            <Spacer y={0} />
            <Row align="center">
              <MdCalendarToday />
              <Spacer x={0.35} />
              <Text>Feb 28 • 4:00 PM</Text>
            </Row>
            <Spacer y={.4} />
            <Text>
              Dolore amet irure do proident commodo est aliqua consectetur
              deserunt. Dolore duis quis sunt voluptate esse consectetur aliqua
              adipisicing. Reprehenderit deserunt irure in. Mollit amet non
              deserunt eiusmod. Labore commodo velit dolore culpa quis fugiat.
              Excepteur magna ea tempor aliqua ut consequat excepteur cillum.
              Labore ullamco duis mollit exercitation nulla aliqua nisi.
            </Text>
            {/* <Spacer y = {.2} /> */}
            {/* <Text> Age : ____, Recipients ___/____, Cost ___ </Text> */}
          </Col>
        </Container>
      </Card.Body>
      <Card.Divider />
      <Card.Footer>
        <Row align="center" justify="space-between">
          <Row> Feb 14 </Row>
          {/* <Button.Group size = "sm" disabled> */}
          {/* <Button>YES</Button> */}
          {/* <Button>NO</Button> */}
          {/* </Button.Group> */}
          <Button.Group color="primary" size="sm" flat>
            <Button><MdThumbDown /></Button>
            <Button><MdThumbUp /></Button>
          </Button.Group>
        </Row>
      </Card.Footer>
    </Card>
  );
}
