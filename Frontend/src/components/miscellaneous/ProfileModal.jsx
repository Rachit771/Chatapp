import { ViewIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";

const ProfileModal = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button
        id="open-profile-modal"
        style={{ display: "none" }}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>

          <ModalCloseButton />

          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
          <Avatar
          size="2xl"
          name={user?.name || "User"}
          src={user?.pic}
           mb={4}
          />


            <Text fontSize="30px" fontFamily="Work sans">
              Email: {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};


export default ProfileModal;
