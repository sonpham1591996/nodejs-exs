const { createServer } = require("http");
const { Server } = require("socket.io");
const fs = require("fs");
const path = require("path");

const LIST_TOPICS = [
  {
    topicId: 1,
    topic: "Should dogs be allowed to fly?",
    choices: [
      {
        value: "Yes",
        votes: 2,
        id: 1,
      },
      {
        value: "No",
        votes: 7,
        id: 2,
      },
      {
        value: "Perhaps",
        votes: 17,
        id: 3,
      },
    ],
  },
  {
    topicId: 2,
    topic: "Should developers use IDEs",
    choices: [
      {
        value: "Yes",
        votes: 2,
        id: 1,
      },
      {
        value: "No",
        votes: 7,
        id: 2,
      },
      {
        value: "I really don't care",
        votes: 17,
        id: 3,
      },
    ],
  },
];

const httpServer = createServer(function (req, res) {
  fs.readFile(
    path.resolve(__dirname, "./views/index.html"),
    function (err, data) {
      if (err) {
        res.write("500 Internal Server Error");
        return res.end();
      }
      res.writeHead(200, { "Content-Type": "text/html" });

      let topicString = "";

      for (let topic of LIST_TOPICS) {
        topicString += `
            <div class="card">
                <div class="header">
                    => ${topic.topic}
                </div>
                <div class="content">
                    ${topic.choices
                      .map((choice) => {
                        return `
                            <div class="choice border py-4 flex">
                                <input type="radio" class="topic_${topic.topicId}" name="topic_${topic.topicId}" value="${choice.id}" />
                                <div class="ml-2">
                                    ${choice.value}
                                </div>
                                <div id="topic_${topic.topicId}_choice_${choice.id}" class="ml-auto">
                                    ${choice.votes}
                                </div>
                            </div>
                        `;
                      })
                      .join("")}
                </div>
                <div class="footer">
                      <button id="btn_topic_${topic.topicId}" 
                        type="button" class="btn-vote" onClick="onVote(${
                          topic.topicId
                        })">
                        Vote
                      </button>
                </div>
            </div>
        `;
      }

      res.write(data.toString().replace("{listTopic}", topicString));
      return res.end();
    }
  );
});

const io = new Server(httpServer);

/* lắng nghe kết nối socket từ phía client */
io.on("connection", (socket) => {
  console.log("a user connected: " + socket.id);

  socket.on("vote", (data) => {
    if (data) {
      let selectedVote;
      for (let topic of LIST_TOPICS) {
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
        socket.broadcast.emit("upToDateVote", {
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
