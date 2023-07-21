import { Chat, ChatMessage } from "../models/index.js";

async function create(req, res) {
  const { participant_id_one, participant_id_two } = req.body;
  
  const foundOne = await Chat.findOne({
    participant_one: participant_id_one,
    participant_two: participant_id_two,
  });

  const foundTwo = await Chat.findOne({
    participant_one: participant_id_two,
    participant_two: participant_id_one,
  });

  if (foundOne || foundTwo) {
    res.status(200).send({ msg: "Ya tienes un chat con este usuario" });
    return;
  }

  const chat = new Chat({
    participant_one: participant_id_one,
    participant_two: participant_id_two,
  });


    chat.save()
    .then((chatStorage) => {
        res.status(201).send(chatStorage);
    })
    .catch((error) => {
        res.status(400).send({ msg: "Error al crear el chat" });
    });
}

async function getAll(req, res) {
  const { user_id } = req.user;
    
  Chat.find({ $or: [{ participant_one: user_id }, { participant_two: user_id }] })
  .populate("participant_one")
  .populate("participant_two")
  .exec()
  .then(async (chats) => {
    const arrayChats = [];
    for await (const chat of chats) {
      const response = await ChatMessage.findOne({ chat: chat._id }).sort({
        createdAt: -1,
      });

      arrayChats.push({
        ...chat._doc,
        last_message_date: response?.createdAt || null,
      });
    }

    res.status(200).send(arrayChats);
  })
  .catch((error) => {
    res.status(400).send({ msg: "Error al obtener los chats" });
  });
}

async function deleteChat(req, res){
    const chat_id = req.params.id;
    

    try{
        const  response = await Chat.findByIdAndDelete(chat_id);
        if(!response){
            res.status(400).send({message: "Error al eliminar el chat"});
        }else {
            res.status(200).send("Chat eliminado");
        }
    } catch {
        res.status(500).send({ message: "Error del servidor"});
    }    
}


async function getChat(req, res){
    const chat_id = req.params.id;
    
    try{
        const  response = await Chat.findById(chat_id)
        .populate("participant_one")
        .populate("participant_two");
        if(!response){
            res.status(400).send({message: "Error al obtener el chat"});
        }else {
            res.status(200).send(response);
        }
    } catch {
        res.status(500).send({ message: "Error del servidor"});
    }
}



export const ChatController = {
  create,
  getAll,
  deleteChat,
  getChat,
};
