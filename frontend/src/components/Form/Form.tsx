import { useState } from "react";
import { Message } from "../../interfaces";
import cl from "./Form.module.css";

interface Props {
  create: (message: Message) => void;
}

export default function Form({ create }: Props) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.MouseEvent) => {
    e.preventDefault();
    create({ message, name });
    setMessage("");
  };

  return (
    <form className={cl.container}>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" onClick={submit}>
        send
      </button>
    </form>
  );
}
