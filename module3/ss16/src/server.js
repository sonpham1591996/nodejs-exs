const { createServer } = require("http");
const { Server } = require("socket.io");
const fs = require("fs");
const path = require("path");
const { log } = require("console");

const map = new Map();
map.set("ROOM_TECHNOLOGY", [
  {
    topicId: 1,
    topic: "The best framework/library for FE developer?",
    choices: [
      {
        value: "ReactJS",
        votes: 0,
        id: 1,
      },
      {
        value: "VueJS",
        votes: 0,
        id: 2,
      },
      {
        value: "Angular",
        votes: 0,
        id: 3,
      },
    ],
  },
  {
    topicId: 2,
    topic: "The best language for IT developer?",
    choices: [
      {
        value: "Java",
        votes: 0,
        id: 1,
      },
      {
        value: "C#",
        votes: 0,
        id: 2,
      },
      {
        value: "JavaScript",
        votes: 0,
        id: 3,
      },
      {
        value: "Python",
        votes: 0,
        id: 4,
      },
    ],
  },
]);

map.set("COURSES", [
  {
    topicId: 1,
    topic: "Which online course do you like?",
    choices: [
      {
        value: "NodeJS",
        votes: 0,
        id: 1,
      },
      {
        value: "ReactJS",
        votes: 0,
        id: 2,
      },
      {
        value: "Java",
        votes: 0,
        id: 3,
      },
    ],
  },
]);

const httpServer = createServer(function (req, res) {
  fs.readFile(
    path.resolve(__dirname, "./views/index.html"),
    function (err, data) {
      if (err) {
        res.write("500 Internal Server Error");
        return res.end();
      }
      res.writeHead(200, { "Content-Type": "text/html" });

      let listRooms = "";

      for (let room of Array.from(map.keys())) {
        listRooms += `
            <div onclick="onSelectedRoom('${room}')">
              ${room}
            </div>
        `;
      }

      res.write(
        data
          .toString()
          .replace("{listRooms}", listRooms)
          .replace("{listTopics}", "")
      );
      return res.end();
    }
  );
});

const io = new Server(httpServer);

/* lắng nghe kết nối socket từ phía client */
io.on("connection", (socket) => {
  console.log("a user connected: " + socket.id);

  socket.on("switchRoom", (roomName) => {
    const currentRoom = Array.from(socket.rooms).filter(
      (r) => r !== socket.id
    )[0];
    if (currentRoom) {
      socket.leave(currentRoom);
    }
    socket.join(roomName);
    const topics = map.get(roomName);
    if (topics) {
      socket.emit("renderTopics", topics);
    }
  });

  socket.on("vote", (data) => {
    if (data) {
      let selectedVote;
      const currentRoom = Array.from(socket.rooms).filter(
        (r) => r !== socket.id
      )[0];
      const topics = map.get(currentRoom);
      for (let topic of topics) {
        if (topic.topicId === data.topicId) {
          for (let c of topic.choices) {
            if (c.id === data.choiceId) {
              c.votes++;
              selectedVote = {
                id: c.id,
                vote: c.votes,
              };
              break;
            }
          }
          break;
        }
      }
      if (selectedVote) {
        socket.broadcast.to(currentRoom).emit("upToDateVote", {
          topicId: data.topicId,
          choice: selectedVote,
        });
        socket.emit("upToDateVote", {
          topicId: data.topicId,
          choice: selectedVote,
        });
      }
    }
  });
});

httpServer.listen(8080, "localhost", function () {
  console.log("listening on http://localhost:8080");
});
