import React from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import { MyContext } from "../../Context/Mycontext";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/ChatLogics";

const ScrollableChat = ({ messages }) => {
  const { user } = MyContext();
  const decodeTokenUserId = (token) => {
    try {
      if (!token) return "";
      const payload = JSON.parse(atob(token.split(".")[1] || ""));
      return String(payload?.id || payload?._id || "");
    } catch {
      return "";
    }
  };

  const currentUserId = String(
    user?._id || user?.id || user?.UserId || decodeTokenUserId(user?.token) || ""
  );

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div
            style={{
              display: "flex",
              justifyContent:
                String(m?.sender?._id) === currentUserId ? "flex-end" : "flex-start",
            }}
            key={m._id}
          >
            {(isSameSender(messages, m, i, currentUserId) ||
              isLastMessage(messages, i, currentUserId)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  String(m?.sender?._id) === currentUserId ? "#2B6CB0" : "#90CDF4"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, currentUserId),
                marginTop: isSameUser(messages, m, i) ? 3 : 10,
                borderRadius: "20px",
                padding: "8px 14px",
                maxWidth: "75%",
                wordBreak: "break-word",
                color: String(m?.sender?._id) === currentUserId ? "white" : "#1A202C",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
