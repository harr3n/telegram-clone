import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import ChatMessage from "../ChatMessage";
import { useParams, useHistory } from "react-router";
import useScrollAtBottom from "../../lib/useScrollAtBottom";
import useEventListener from "../../lib/useEventListener"

const StyledChatHistory = styled.ul`
  margin: 0 0 0 1rem;
  padding: 0;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  -webkit-overflow-scrolling: touch;

  li:first-child {
    margin-top: auto;
  }
`;

const ChatHistory = ({ data, fetchMore, loading }) => {
  const chatHistory = useRef(null);
  const loader = useRef(null);
  const { scrollAtBottom, scrollRef } = useScrollAtBottom();
  const { id } = useParams();
  const history = useHistory();

  useEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
      history.push(`/chat`)
    }
  })

  useEffect(() => {
    if (scrollAtBottom)
      chatHistory.current.scrollTop = chatHistory.current.scrollHeight;
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
      threshold: 1
    };

    const element = chatHistory.current.children[10];

    const observer = new IntersectionObserver(async ([entry]) => {
      const pageInfo = data.messages.pageInfo;

      if (entry.isIntersecting && pageInfo.hasPreviousPage) {
        console.log("Intersected: fetching more...")
        try {
          await fetchMore({
            variables: { chatId: id, before: pageInfo.startCursor, last: 10 },
            updateQuery: (prev, { fetchMoreResult }) => {
              const newEdges = fetchMoreResult.messages.edges;
              const pageInfo = fetchMoreResult.messages.pageInfo;
  
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

        } catch(e) {
          
        }

        element.scrollIntoView();
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
          <ChatMessage id={node.id} key={node.id} message={node} />
        ))}
      <li ref={scrollRef}></li>
    </StyledChatHistory>
  );
};

export default ChatHistory;
