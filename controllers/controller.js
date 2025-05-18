const path = require('path');
const dirPath = path.join(__dirname, '..', 'db', 'fqa.json');
const {readNewFile, writeNewFile} = require('../utils/ReadNWriteFiles.js')

const getAll = async (req, res) => {
  const data = await readNewFile(dirPath)
  res.status(200).json({
    status: "OK",
    data,
  });
};

const newItem = async (req, res) => {
  const data = await readNewFile(dirPath)
  const newData = [...prevData, { ...req.body }];

  writeNewFile(dirPath, newData)
  res.status(201).json({
    status: "Ok",
    data: newItem,
  });
};

const getOne = async (req, res) => {
  const data = await readNewFile(dirPath)

  const id = req.params.id;
  const element = data.find((el) => el.id == id);

  if (!element) {
    return res.status(404).json({
      status: "Failed",
      data: "Element not found",
    });
  }

  res.status(200).json({
    status: "Ok",
    data: element,
  });
};

const deleteItem = async (req, res) => {
  const data = await readNewFile(dirPath)

  const id = req.params.id;
  const newData = data.filter((el) => el.id != id);

  if (data.length == newData.length) {
    return res.status(404).json({
      status: "Failed",
      data: "Element not found",
    });
  }

  writeNewFile(dirPath, newData)
  res.status(200).json({
    status: "Ok",
  });
};

const alterItem = async (req, res) => {
  const data = await readNewFile(dirPath)
  const id = req.params.id;

  const element = data.find((el) => el.id == id);

  if (!element) {
    return res.status(404).json({
      status: "Failed",
      data: "Element not found",
    });
  }

  const newData = data.map((el) =>
    el.id == id ? Object.assign(el, req.body) : el
  );

  writeNewFile(dirPath, newData)
  res.status(200).json({
    status: "Ok",
  });
};

module.exports = {
    getAll,
    getOne,
    newItem,
    alterItem,
    deleteItem
}