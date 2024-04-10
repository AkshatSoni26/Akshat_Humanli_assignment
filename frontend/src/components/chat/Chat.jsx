import React, { useEffect, useState } from "react";
import ClientComp from "./ClientComp.jsx";
import ServerComp from "./ServerComp.jsx";

import { getDatabase, ref, onValue } from "firebase/database";
import firebaseapp from "../../firebase.js";

const db = getDatabase(firebaseapp);

function Chat() {

  const [chats, setChats] = useState([]);
  const user_id = localStorage.getItem('@user')

  useEffect(() => {
    const starCountRef = ref(db, "chats/");
    const unsubscribe = onValue(
      starCountRef,
      (snapshot) => {
        const data = snapshot.val();

        const dataArray = Object.entries(data).map(([key, value]) => ({
          id: value.id,
          message: value.message,
          time: value.time,
          key: key,
        }));

        const sortedDataArray = dataArray.sort(
          (a, b) => parseFloat(a.time) - parseFloat(b.time)
        );

        setChats(sortedDataArray);

        console.log("data ====>", sortedDataArray);
        // Update your state or do something with the data here
      },
      (error) => {
        console.error("Error fetching data:", error);
      }
    );

    return () => {
      // Unsubscribe when component unmounts
      unsubscribe();
    };
  }, []); // Empty dependency array to run effect only once on component mount

  return (
    <div className="position-relative w-100 h-100 ">
      <div
        className="chat-contanier overflow-auto w-100 d-flex flex-column p-2"
        style={{ height: "80vh", position: "absolute" }}
      >
        {chats.map((chat, id) => (
          chat?.id == user_id  ? <ClientComp key={id} chat={chat} /> : <ServerComp key={id} chat={chat} />
        ))}

        <ClientComp />
      </div>
    </div>
  );
}

export default Chat;
