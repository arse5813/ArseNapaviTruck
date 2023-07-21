import { User, Group, GroupMessage } from "../models/index.js";
import { getFilePath } from "../utils/index.js";

function create(req, res) { 
   
  const { user_id } = req.user;
  const group = new Group(req.body);

  group.creator = user_id;
  group.participants = JSON.parse(req.body.participants);
  group.participants = [...group.participants, user_id];

  if (req.files.image) {
    const imagePath = getFilePath(req.files.image);
    group.image = imagePath;
  }

  group.save()
    .then(groupStorage => {
      res.status(201).send(groupStorage);
    })
    .catch(error => {
      res.status(500).send({ msg: "Error del servidor" });
    });
  

}

async function getAll(req, res) {
  const { user_id } = req.user;

  const groups = await Group.find({ participants: user_id })
  .populate("creator")
  .populate("participants")
  .exec();

  const arrayGroups = [];
  for await (const group of groups) {
    const response = await GroupMessage.findOne({ group: group._id }).sort({
      createdAt: -1,
    });

    arrayGroups.push({
      ...group._doc,
      last_message_date: response?.createdAt || null,
    });
  }

  res.status(200).send(arrayGroups);
}

async function getGroup(req, res) {
  const group_id = req.params.id;

  try {
    const groupStorage = await Group.findById(group_id).populate("participants");

    if (!groupStorage) {
      res.status(400).send({ msg: "No se ha encontrado el grupo" });
    } else {
      res.status(200).send(groupStorage);
    }
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
}

async function updateGroup(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  const group = await Group.findById(id);

  if (name) group.name = name;

  if (req.files.image) {
    const imagePath = getFilePath(req.files.image);
    group.image = imagePath;
  }

  try {
    const updatedGroup = await Group.findByIdAndUpdate(id, group, { new: true });

    if (!updatedGroup) {
      res.status(400).send({ msg: "No se ha encontrado el grupo" });
    } else {
      res.status(200).send({ image: updatedGroup.image, name: updatedGroup.name });
    }
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
  }
}

async function exitGroup(req, res) {
  const { id } = req.params;
  const { user_id } = req.user;

  const group = await Group.findById(id);

  const newParticipants = group.participants.filter(
    (participant) => participant.toString() !== user_id
  );

  const newData = {
    ...group._doc,
    participants: newParticipants,
  };

  await Group.findByIdAndUpdate(id, newData);

  res.status(200).send({ msg: "Salida exitosa" });
}

async function addParticipants(req, res) {
  const { id } = req.params;
  const { users_id } = req.body;

  const group = await Group.findById(id);
  const users = await User.find({ _id: users_id });

  console.log(users_id);

  const arrayObjectIds = [];
  users.forEach((user) => {
    arrayObjectIds.push(user._id);
  });

  const newData = {
    ...group._doc,
    participants: [...group.participants, ...arrayObjectIds],
  };

  await Group.findByIdAndUpdate(id, newData);

  res.status(200).send({ msg: "Participantes añadidos correctamente" });
}

async function banParticipant(req, res) {
  const { group_id, user_id } = req.body;

  const group = await Group.findById(group_id);

  const newParticipants = group.participants.filter(
    (participant) => participant.toString() !== user_id
  );

  const newData = {
    ...group._doc,
    participants: newParticipants,
  };

  await Group.findByIdAndUpdate(group_id, newData);

  res.status(200).send({ msg: "Baneo con existo" });
}


export const GroupController = {
  create,
  getAll,
  getGroup,
  updateGroup,
  exitGroup,
  addParticipants,
  banParticipant,
};
