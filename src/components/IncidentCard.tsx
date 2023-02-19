import {
    Card,
    Text,
    Button,
    Row,
    Container,
    Spacer,
    Col,
  } from "@nextui-org/react";
  import { MdLocationOn, MdCalendarToday } from "react-icons/md";
  import UserProfile from "./UserProfile";
  
  export default function IncidentCard() {
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
                INCIDENT
              </Text>
              <Spacer y={-.5} />
              <Row align="center">
                <MdLocationOn />
                <Text b>123 Testing Avenue, Santa Monica</Text>
              </Row>
              <Spacer y={0} />
              <Row align="center">
                <MdCalendarToday />
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
            </Col>
          </Container>
        </Card.Body>
        <Card.Divider />
      </Card>
    );
  }