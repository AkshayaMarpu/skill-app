module.exports=(io)=>{


io.on(

"connection",

(socket)=>{


console.log(

"Connected"

);



socket.on(

"sendMessage",

(data)=>{


io.emit(

"receiveMessage",

data

);


}

);


socket.on(

"disconnect",

()=>{


console.log(

"Disconnected"

);


}


);


}


);


};