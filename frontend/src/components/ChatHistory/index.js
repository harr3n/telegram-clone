import React, { useRef, useEffect} from "react";
import styled from "styled-components";
import ChatMessage from "../ChatMessage";
import { useParams } from "react-router";
import useScrollAtBottom from "../../lib/useScrollAtBottom"

const StyledChatHistory = styled.ul`
  margin: 0 0 0 1rem;
  padding: 0;
  overflow: scroll;
  display: flex;
  flex-direction: column;

  li:first-child {
    margin-top: auto;
  }
`;

const ChatHistory = ({ data, fetchMore, loading }) => {
  const chatHistory = useRef(null);
  const loader = useRef(null);
  const { scrollAtBottom, scrollRef } = useScrollAtBottom()
  const { id } = useParams();

  useEffect(() => {
    if (scrollAtBottom) chatHistory.current.scrollTop = chatHistory.current.scrollHeight;
  }, [data, scrollAtBottom]);

  useEffect(() => {
    chatHistory.current.scrollTop = chatHistory.current.scrollHeight;
  }, [id, chatHistory]);

  useEffect(() => {
    if (!chatHistory || !chatHistory.current) return;
    if (!loader || !loader.current) return;

    const options = {
      root: chatHistory.current,
      rootMargin: "0px",
      threshold: 0.1
    };

    const element = chatHistory.current.children[10];

    const observer = new IntersectionObserver(([entry]) => {
      const pageInfo = data.messages.pageInfo;

      if (entry.isIntersecting && pageInfo.hasPreviousPage) {
        fetchMore({
          variables: { chatId: id, before: pageInfo.startCursor },
          updateQuery: (prev, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.messages.edges;
            const pageInfo = fetchMoreResult.messages.pageInfo;
            chatHistory.current.scrollTop = element.scrollHeight;

            return newEdges.length
              ? {
                  messages: {
                    __typename: prev.messages.__typename,
                    edges: [...newEdges, ...prev.messages.edges],
                    pageInfo
                  }
                }
              : prev;
          }
        });
      }
    }, options);

    element && observer.observe(element);

    return () => element && observer.unobserve(element);
  }, [chatHistory, loader, data, fetchMore, id]);

  return (
    <StyledChatHistory ref={chatHistory}>
      <li ref={loader}>{loading ? "loading..." : null}</li>
      {data &&
        data.messages.edges.map(({ node }) => (
          <ChatMessage id={node.id} key={node.id} message={node} forwardRef={scrollRef} />
        ))}
    </StyledChatHistory>
  );
};

export default ChatHistory;
