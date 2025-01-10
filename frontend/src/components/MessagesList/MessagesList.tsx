import { useEffect, useRef } from "react";
import { Message } from "../../interfaces";
import MessageItem from "../MessagesItem/MessagesItem";
import cl from "./MessageList.module.css";

interface Props {
  messages: Message[];
}

export default function MessageList({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className={cl.container}>
      {messages.map((message: Message) => (
        <MessageItem key={Math.random()} message={message} />
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
}
