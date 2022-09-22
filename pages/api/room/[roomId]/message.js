import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  const { roomId } = req.query;
  const response = {
    ok: true,
    message: {},
  };
  let code = 200;

  const rooms = readDB();
  const room = rooms.find(room => room.roomId === roomId);
  if (req.method === "GET") {
    if (room != null) {
      response.message = room.messages;
    } else {
      code = 404;
      response.ok = false;
      response.message = 'Invalid room id';
    }
  } else if (req.method === "POST") {
    const text = req.body.text;
    if (room != null && typeof (text) === 'string') {
      const newId = uuidv4();
      response.message = {
        messageId: newId,
        text: text,
      };
      room.messages.push(response.message);
    } else if (room == null) {
      code = 404;
      response.ok = false;
      response.message = 'Invalid room id';
    } else {
      code = 400;
      response.ok = false;
      response.message = 'Invalid text input';
    }
  }
  writeDB(rooms);
  return res.status(code).send(JSON.stringify(response));
}
