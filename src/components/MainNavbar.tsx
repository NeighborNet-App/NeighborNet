import MainLogo from "@/components/MainLogo";
import { auth } from "@/pages/_app";
import FeedItem from "@/types/FeedItem";
import User from "@/types/User";
import { useCollection, useDocument } from "@nandorojo/swr-firestore";
import {
  Avatar,
  Button,
  Dropdown,
  Input,
  Loading,
  Modal,
  Navbar,
  Row,
  Spacer,
  Text,
  useInput,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { MdEmail, MdLock } from "react-icons/md";
import ImageUploading, { ImageListType } from "react-images-uploading";

export default function MainNavbar() {
  const router = useRouter();
  // For Popup
  const [profileVisible, setProfileVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    setProfileVisible(false);
    console.log("closed");
  };
  const [user] = useAuthState(auth);

  function signOut() {
    auth.signOut();
  }
  const {
    data: userData,
    update: updateUserData,
    error: userDataError,
  } = useDocument<User>(`users/${auth.currentUser?.uid}`);

  const [images, setImages] = React.useState([]);
  const maxNumber = 1;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  return (
    <Navbar variant={"sticky"}>
      <Navbar.Brand>
        <Navbar.Toggle showIn={"xs"} aria-label="toggle navigation" />
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
        <Link href={"/map"} passHref legacyBehavior>
          <Navbar.Link isActive={router.pathname == "/map"}>Map</Navbar.Link>
        </Link>
      </Navbar.Content>
      <LoginModal visible={visible} setVisible={setVisible} />
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={profileVisible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Edit Profile
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Row justify="center">
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <button
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Click or Drop here
                  </button>
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image.dataURL} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <button onClick={() => onImageUpdate(index)}>
                          Update
                        </button>
                        <button onClick={() => onImageRemove(index)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </Row>

          <Input
            bordered
            fullWidth
            color="primary"
            size="lg"
            label="Username"
            initialValue={userData?.fullName}
          />
        </Modal.Body>
      </Modal>
      <Navbar.Content>
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Row align="center">
              {user ? (
                <>
                  <Text b>{userData?.fullName}</Text>
                  <Spacer x={0.45} />
                  <Dropdown.Trigger>
                    <Avatar
                      size="md"
                      src={
                        userData?.avatarUrl
                          ? userData.avatarUrl
                          : "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                      }
                    />
                  </Dropdown.Trigger>
                </>
              ) : (
                <>
                  {router.pathname != "/setup" ? (
                    <Link href={"/setup"}>Sign Up</Link>
                  ) : (
                    <Text></Text>
                  )}
                  <Spacer x={0.5} />
                  <Button auto onPress={handler}>
                    Login
                  </Button>
                </>
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
              } else if (actionKey.toString() == "editProfile") {
                setProfileVisible(true);
              }
            }}
          >
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as:
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                {userData?.fullName}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="editProfile" withDivider>
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
        <Navbar.CollapseItem key={"home"}>
          <Link color="inherit" href="/">
            Home
          </Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem key={"feed"}>
          <Link color="inherit" href="/feed">
            Feed
          </Link>
        </Navbar.CollapseItem>
        <Navbar.CollapseItem key={"map"}>
          <Link color="inherit" href="/map">
            Map
          </Link>
        </Navbar.CollapseItem>
      </Navbar.Collapse>
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
      .then((_item: any) => {
        setLoading(false);
        closeHandler();
      })
      .catch((error: any) => {
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
              <div>Sign in</div>
            )}
          </Button>
        </Row>
        <Spacer y={0.5} />
      </Modal.Body>
    </Modal>
  );
}
