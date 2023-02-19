import MainLogo from "@/components/MainLogo";
import Link from "next/link";
import React from "react";
import { MdLock, MdEmail } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";
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
  useInput,
  Loading,
} from "@nextui-org/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/router";

export default function MainNavbar() {
  const router = useRouter();
  // For Popup
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const [user] = useAuthState(auth);

  function signOut() {
    auth.signOut();
  }

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
          <Navbar.Link isActive={router.pathname == "/feed"}>Feed</Navbar.Link>
        </Link>
        <Link href={"/incidents"} passHref legacyBehavior>
          <Navbar.Link isActive={router.pathname == "/incidents"}>
            Incidents
          </Navbar.Link>
        </Link>
        <Link href={"/map"} passHref legacyBehavior>
          <Navbar.Link isActive={router.pathname == "/map"}>Map</Navbar.Link>
        </Link>
      </Navbar.Content>
      <LoginModal visible={visible} setVisible={setVisible} />
      <Navbar.Content>
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Row align="center">
              {user ? (
                <>
                  <Text b>{auth.currentUser?.email}</Text>
                  <Spacer x={0.45} />
                  <Dropdown.Trigger>
                    <Avatar
                      size="md"
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                  </Dropdown.Trigger>
                </>
              ) : (
                <Button onPress={handler}>Login</Button>
              )}
              <Spacer x={0.45} />
            </Row>
          </Navbar.Item>
          <Dropdown.Menu
            aria-label="User menu actions"
            color="primary"
            onAction={(actionKey) => {
              if (actionKey.toString() == "logout") {
                signOut();
              }
            }}
          >
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as:
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                {auth.currentUser?.email}
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

interface LoginModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
function LoginModal(props: LoginModalProps) {
  const closeHandler = () => {
    props.setVisible(false);
  };

  const {
    value: emailValue,
    reset: resetEmailField,
    bindings: emailBindings,
  } = useInput("");

  const {
    value: passwordValue,
    reset: resetPasswordField,
    bindings: passwordBindings,
  } = useInput("");
  const validateEmail = (value: string) => {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  const emailHelper = React.useMemo(() => {
    if (!emailValue)
      return {
        text: "",
        color: "",
      };
    const isValid = validateEmail(emailValue);
    return {
      text: isValid ? "" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [emailValue]);

  const passwordHelper = React.useMemo(() => {
    return {
      text:
        passwordValue.length >= 6 || passwordValue.length == 0
          ? ""
          : "Must be at least 6 characters",
    };
  }, [passwordValue]);

  const loginHandler = () => {
    setLoading(true);
    auth
      .signInWithEmailAndPassword(emailValue, passwordValue)
      .then((item) => {
        setLoading(false);
        closeHandler();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const [loading, setLoading] = useState(false);

  function inputsValid(): boolean {
    if (emailHelper.color == "success" && passwordValue.length >= 6) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      open={props.visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Welcome to{" "}
          <Text b size={18}>
            NeighborNet
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body autoMargin={false}>
        <Input
          {...emailBindings}
          clearable
          bordered
          shadow={false}
          onClearClick={resetEmailField}
          color={"primary"}
          helperColor={"error"}
          helperText={emailHelper.text}
          type="email"
          placeholder="Email"
          contentLeft={<MdEmail />}
          aria-label="Email Field"
        />
        <Spacer y={1.25} />
        <Input.Password
          {...passwordBindings}
          clearable
          bordered
          shadow={false}
          onClearClick={resetPasswordField}
          aria-label="Password Field"
          color="primary"
          placeholder="Password"
          helperText={passwordHelper.text}
          helperColor="error"
          visibleIcon={<HiEyeOff fill="currentColor" />}
          hiddenIcon={<HiEye fill="currentColor" />}
          contentLeft={<MdLock />}
        />
        <Spacer y={0.25} />
        <Row justify="flex-end">
          <Text size={14}>Forgot password?</Text>
        </Row>
        <Spacer y={1} />
        <Row justify={"center"}>
          <Button shadow disabled={!inputsValid()} onPress={loginHandler}>
            {loading ? (
              <Loading type="default" color="currentColor" size="sm" />
            ) : (
              <>Sign in</>
            )}
          </Button>
        </Row>
        <Spacer y={0.5} />
      </Modal.Body>
    </Modal>
  );
}
