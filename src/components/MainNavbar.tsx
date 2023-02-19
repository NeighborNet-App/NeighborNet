import MainLogo from "@/components/MainLogo";
import Link from "next/link";
import React from "react";
import { MdLockOutline, MdLockOpen } from "react-icons/md";
import { useState } from "react";
import {
  Button,
  Modal,
  Navbar,
  Text,
  Input,
  Spacer,
  Dropdown,
  Avatar,
  Row,
  useTheme,
} from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";

interface MainNavbarProps {
  currentPage: string;
}

export default function MainNavbar(props: MainNavbarProps) {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  // For Popup
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  return (
    <Navbar variant={"sticky"}>
      <Navbar.Brand>
        <Link href={"/"} passHref legacyBehavior>
          <Row align="center">
            <MainLogo size={48} />
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
              <Button size="xs" flat auto color="primary" onPress={handler}>
                {" "}
                Login{" "}
              </Button>
              <Modal
                closeButton
                blur
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
              >
                <Modal.Header>
                  <Text id="modal-title" size={18}>
                    {" "}
                    Login{" "}
                  </Text>
                </Modal.Header>
                <Modal.Body>
                  <Input
                    bordered
                    color="primary"
                    fullWidth
                    placeholder="Email"
                  />
                  <Input.Password
                    bordered
                    color="primary"
                    placeholder="Password"
                    visibleIcon={<MdLockOpen fill="currentColor" />}
                    hiddenIcon={<MdLockOutline fill="currentColor" />}
                  />
                  <Button>Login</Button>
                </Modal.Body>
              </Modal>
              <Spacer x={0.45} />
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
            onAction={(actionKey) => console.log({ actionKey })}
          >
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as:
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
    </Navbar>
  );
}
