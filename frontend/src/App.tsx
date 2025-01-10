import { useEffect, useState } from "react";
import { socket } from "./utils/socket";
import Form from "./components/Form/Form";
import { Message } from "./interfaces";
import MessageList from "./components/MessagesList/MessagesList";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    function onMessages(m: Message[]) {
      setMessages(m);
    }
    socket.on("messages", onMessages);
    return () => {
      socket.off("messages", onMessages);
    };
  }, []);

  const handleSend = ({ message, name }: Message) => {
    socket.emit("send", { message, name }, (err: Error) => console.log(err));
    setMessages([...messages, { message, name }]);
  };
  return (
    <>
      <h2>BubbleChat</h2>
      <Form create={handleSend} />
      <MessageList messages={messages} />
    </>
  );
}

export default App;
