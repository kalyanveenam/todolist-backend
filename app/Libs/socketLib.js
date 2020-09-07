
let verifyClaim = require("./tokenLib");
let socketio = require("socket.io");
let tokenLibs= require('./tokenLib');

let setService=(server)=>{
    let onlineUsers=[];
let io=socketio.listen(server);

let myio=io.of('')
myio.on('connection',(socket)=>{
console.log(' emitting verify user');
socket.emit("verifyUser", "");
socket.on('set-user',(authToken)=>{
console.log(authToken);
    tokenLibs.verifyTokenWithoutSecret(authToken,(user,err,)=>{
        if(user){
            console.log(user);
            let currentUser=user;
            socket.userId=currentUser._id;
            socket.name=currentUser.name;
            let fullName=`${currentUser.name}`
            console.log(`${fullName} is online`);
            socket.emit(currentUser._id,`${fullName} is online`)
            myio.emit('userOnline',`${fullName} is now online`)
      let userObj= {userId:currentUser._id,name:fullName}
onlineUsers.push(userObj);
console.log(onlineUsers)
myio.emit('userlist', onlineUsers)


        }
        else{
            socket.emit('auth-error',{status:500,error:'Please provide valid token '})
        }
    })
})
socket.on('disconnect', () => { 
    console.log('user is disconnected');
 let removeUserId=   onlineUsers.map(function(user){return user.userId}).indexOf(socket.userId)
onlineUsers.splice(removeUserId,1)
console.log(onlineUsers)
myio.emit('userOffline',`${socket.name} has gone offline`)
myio.emit('userlist', onlineUsers)

  })
})
}
module.exports={setService: setService}