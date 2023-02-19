import {
  Card,
  Text,
  Button,
  Row,
  Container,
  Spacer,
  Col,
} from "@nextui-org/react";
import { MdLocationOn } from "react-icons/md";
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
            <Row align="center">
              <MdLocationOn />
              <Spacer x={0.15} />
              <Text b>123 Testing Avenue</Text>
            </Row>
            <Text>
              Dolore amet irure do proident commodo est aliqua consectetur
              deserunt. Dolore duis quis sunt voluptate esse consectetur aliqua
              adipisicing. Reprehenderit deserunt irure in. Mollit amet non
              deserunt eiusmod. Labore commodo velit dolore culpa quis fugiat.
              Excepteur magna ea tempor aliqua ut consequat excepteur cillum.
              Labore ullamco duis mollit exercitation nulla aliqua nisi.
            </Text>
          </Col>
        </Container>
      </Card.Body>
      <Card.Divider />
      <Card.Footer>
        <Row justify="space-between">
          <Row></Row>
          <Button.Group size="sm" disabled>
            <Button>👎</Button>
            <Button>👍</Button>
          </Button.Group>
        </Row>
      </Card.Footer>
    </Card>
  );
}
