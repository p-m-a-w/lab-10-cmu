import { readDB } from "../../backendLibs/dbLib";

export default function roomRoute(req, res) {
  const rooms = readDB();
  res.send(JSON.stringify({
    ok: true,
    rooms: rooms.map(room => {
      return {
        roomId: room.roomId,
        roomName: room.roomName,
      }
    }),
  }));
}
