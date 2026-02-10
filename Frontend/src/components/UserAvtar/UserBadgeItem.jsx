import { Box, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      backgroundColor="purple.500"
      color="white"
      cursor="pointer"
      display="flex"
      alignItems="center"
      onClick={handleFunction}
    >
      <Text mr={1}>
        {user.name}
      </Text>
      <CloseIcon boxSize={3} />
    </Box>
  );
};

export default UserBadgeItem;
