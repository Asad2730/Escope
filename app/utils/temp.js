// import { io   } from "socket.io-client";

// useEffect(() => {
    
  //   const url = `${web_socket_url}/ws`;
  //   const socketIO = io(url); 
  //   socketIO.on('connect', () => console.log('Connected to Socket.IO server'));

  //   socketIO.on('message', (message) => {
  //     console.log('Received message from server:', message);
  //     setReceivedMessage(message);
  //   });
   
    
  //   socketIO.on('error',(er)=>console.log('error from server',er));
  //   socketIO.on('connect_error',(er)=>console.log('connect Error from server',er));
    
  //   // socketIO.io.on("open",(ev)=>console.log("open",ev)) 
  //   // socketIO.io.on("packet",(ev)=>console.log('packet',ev))
  //   // socketIO.io.on("ping",(ev)=>console.log('ping',ev))
  //   // socketIO.io.on("error",(err)=>console.log('err is ',err))
    
  //   setSocket(socketIO);

  //   return () => {
  //     console.log('Cleaning up Socket.IO connection');
  //     socketIO.disconnect();
  //   };
  // }, []);


  //   const sendMessage = () => {
  //    switch (socket) {
  //     case null:
  //       {
  //         const messageObject = {
  //           senderID: 123,
  //           receiverID: 456,
  //           content: msg.message.value,
  //         };
  //         // Convert the message object to a JSON string before sending
  //         socket.emit(JSON.stringify(messageObject));
  //       }
  //       break;
  //     default:
  //       console.log("socket is null", socket);
  //       break;
  //   }
  // }

export const temp_data = [
    {
        id: 0,
        to: "Hi, I need experienced UI/UX designer",
        from: "Hi, I am interested!",
      },
]