import { Message } from "../../interfaces";
import cl from "./MessagesItem.module.css";

interface Props {
  message: Message;
}

export default function MessageItem({ message }: Props) {
  return (
    <div className={cl.container}>
      <div className={cl.name}>{message.name}</div>
      <div className={cl.content}>{message.message}</div>
    </div>
  );
}
