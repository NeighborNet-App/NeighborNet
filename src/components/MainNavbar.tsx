import MainLogo from "@/components/MainLogo";
import Link from "next/link";
import {
  Button,
  Navbar,
  Text,
  Spacer,
  Dropdown,
  Avatar,
  Row,
} from "@nextui-org/react";

interface MainNavbarProps {
  currentPage: string;
}

export default function MainNavbar(props: MainNavbarProps) {
  const collapseItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log In",
  ];
  return (
    <Navbar variant={"sticky"}>
      <Navbar.Brand>
        <Link href={"/"} passHref legacyBehavior>
          <Row align="center">
            <MainLogo />
            <Spacer x={0.33} />
            <Text b color="inherit" hideIn="xs">
              NeighborNet
            </Text>
          </Row>
        </Link>
      </Navbar.Brand>

      <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
        <Link href={"/feed"} passHref legacyBehavior>
          <Navbar.Link isActive={props.currentPage == "feed"}>Feed</Navbar.Link>
        </Link>
        <Link href={"/incidents"} passHref legacyBehavior>
          <Navbar.Link isActive={props.currentPage == "incidents"}>
            Incidents
          </Navbar.Link>
        </Link>
        <Link href={"/map"} passHref legacyBehavior>
          <Navbar.Link isActive={props.currentPage == "map"}>Map</Navbar.Link>
        </Link>
      </Navbar.Content>
      <Navbar.Content>
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Row align="center">
              <Text b>William Howard </Text>
              <Spacer x={0.45} />
              <Dropdown.Trigger>
                <Avatar
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </Dropdown.Trigger>
            </Row>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            color="primary"
            onAction={(actionKey) => console.log({ actionKey })}>
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as :
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                zoey@example.com
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
              My Profile
            </Dropdown.Item>
            <Dropdown.Item key="system">My Posts</Dropdown.Item>
            <Dropdown.Item key="help_and_feedback" withDivider>
              Help & Feedback
            </Dropdown.Item>
            <Dropdown.Item key="logout" withDivider color="error">
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem
            key={item}
            activeColor="primary"
            css={{
              color: index === collapseItems.length - 1 ? "$error" : "",
            }}
            isActive={index === 2}
          ></Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
