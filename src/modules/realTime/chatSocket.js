const teamModel = require("../Team/teamModel.js");
const chatModel = require("../chats/teamChatModel.js");

const setupChatSocket = (io, socket) => {
  socket.on("join-team-chat", async (teamId) => {
    try {
      if (!teamId) {
        return socket.emit("socket-error", {
          message: "Team Id not found",
        });
      }

      const team = await teamModel.findById(teamId);
      if (!team) {
        return socket.emit("socket-error", {
          message: "Team not found",
        });
      }

      const isMember = team.members.some(
        (member) => member.user.toString() === socket.user.id.toString(),
      );

      if (!isMember) {
        return socket.emit("socket-error", {
          message: "User is not a member of this team",
        });
      }

      const room = `team:${teamId}`;
      socket.join(room);

      const message = "Joined Team Successfully";
      const eventName = "joined-team-chat";
      const data = { teamId, room, message };

      socket.emit(eventName, data);
    } catch (error) {
      socket.emit("socket-error", {
        message: error.message,
      });
    }
  });
  socket.on("send-team-message", async (teamId, content) => {
    try {
      if (!teamId) {
        return socket.emit("socket-error", {
          message: "Team Id is not found",
        });
      }

      const team = await teamModel.findById(teamId);
      if (!team) {
        return socket.emit("socket-error", {
          message: "Team not found",
        });
      }


      const isMember = team.members.some(
        (member) => member.user.toString() === socket.user.id.toString(),
      );
      if (!isMember) {
        return socket.emit("socket-error", {
          message: "You are not the member of team",
        });
      }

      if(!content || content.trim() === ""){
        return socket.emit("socket-error",{
          message:"Content is not found"
        })
      }
      const chat = await chatModel.create({
        organization: team.organization,
        team: teamId,
        sender: socket.user.id,
        content: content.trim()
      })


      await chat.populate("sender","name email")
      const room = `team:${teamId}`
      io.to(room).emit("receive-team-message", chat);
    } catch (error) {
      socket.emit("socket-error", {
        message: error.message,
      });
    }
  });
};

module.exports = setupChatSocket;
