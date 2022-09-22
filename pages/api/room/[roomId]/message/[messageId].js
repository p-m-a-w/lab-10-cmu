import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;
  const rooms = readDB();
  if (req.method === "DELETE") {
    const room = rooms.find(room => room.roomId === roomId);
    if (room != null) {
      const message = room.messages.find(message => messageId === message.messageId);
      if (message != null) {
        room.messages = room.messages.filter(message => message.messageId !== messageId);
        writeDB(rooms);
        return res.status(200).send(JSON.stringify({
          ok: true,
        }))
      } else {
        return res.status(404).send(JSON.stringify({
          ok: false,
          message: 'Invalid message id',
        }))
      }
    } else {
      return res.status(404).send(JSON.stringify({
        ok: false,
        message: 'Invalid room id',
      }))
    }
  }
}
