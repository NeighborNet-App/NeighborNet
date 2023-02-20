import { User as UserUI, Text, Popover } from "@nextui-org/react";

import User from "@/types/User";
import { userAgent } from "next/server";

export default function UserProfile(props: User) {
  return (
    <Popover isBordered>
      <Popover.Trigger>
        <UserUI
          zoomed
          pointer
          src={props.avatarUrl ? props.avatarUrl : "https://i.pravatar.cc/150?u=a048581f4e29026701d"}
          name={props.fullName}
        />
      </Popover.Trigger>
      <Popover.Content>
        <Text css={{ p: "$10" }}>User profile goes here</Text>
      </Popover.Content>
    </Popover>
  );
}
