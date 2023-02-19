import { User, Text, Popover } from "@nextui-org/react";

export default function UserProfile() {
  return (
    <Popover isBordered>
      <Popover.Trigger>
        <User
          zoomed
          pointer
          src="https://i.pravatar.cc/150?u=a048581f4e29026701d"
          name="William Howard"
        />
      </Popover.Trigger>
      <Popover.Content>
        <Text css={{ p: "$10" }}>User profile goes here</Text>
      </Popover.Content>
    </Popover>
  );
}
