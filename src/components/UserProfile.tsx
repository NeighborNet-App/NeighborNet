import {
  User as UserUI,
  Row,
  Text,
  Popover,
  Image,
  Col,
} from "@nextui-org/react";

import User from "@/types/User";
import { userAgent } from "next/server";

export default function UserProfile(props: User) {
  return (
    <Popover isBordered>
      <Popover.Trigger>
        <UserUI
          zoomed
          pointer
          src={
            props.avatarUrl
              ? props.avatarUrl
              : "https://i.pravatar.cc/150?u=a048581f4e29026701d"
          }
          name={props.fullName}
        />
      </Popover.Trigger>
      <Popover.Content>
        <Col css={{ p: "$10" }}>
          <Image
            width={180}
            height={180}
            src={props.avatarUrl ?? ""}
            alt="Default Image"
            objectFit="cover"
            css={{ borderRadius: "50%" }}
          />
          <Row justify="center" gap={0}>
            <Text h2>{props.fullName}</Text>
          </Row>
        </Col>
      </Popover.Content>
    </Popover>
  );
}
