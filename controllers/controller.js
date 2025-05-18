const fs = require("fs").promises;
const path = require('path');
const dirPath = path.join(__dirname, '..', 'db', 'fqa.json');

const getAll = async (req, res) => {
  const dataRead = await fs.readFile(dirPath, "utf-8");
  const data = JSON.parse(dataRead);

  res.status(200).json({
    status: "OK",
    data,
  });
};

const newItem = async (req, res) => {
  const dataRead = await fs.readFile(dirPath, "utf-8");
  const prevData = JSON.parse(dataRead);
  const newDB = [...prevData, { ...req.body }];

  fs.writeFile(dirPath, JSON.stringify(newDB, null, 2), "utf-8");
  res.status(201).json({
    status: "Ok",
    data: newItem,
  });
};

const getOne = async (req, res) => {
  const dataRead = await fs.readFile(dirPath, "utf-8");
  const data = JSON.parse(dataRead);

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
  const dataRead = await fs.readFile(dirPath, "utf-8");
  const data = JSON.parse(dataRead);

  const id = req.params.id;
  const newData = data.filter((el) => el.id != id);

  if (data.length == newData.length) {
    return res.status(404).json({
      status: "Failed",
      data: "Element not found",
    });
  }

  fs.writeFile(dirPath, JSON.stringify(newData, null, 2), "utf-8");
  res.status(200).json({
    status: "Ok",
  });
};

const alterItem = async (req, res) => {
  const dataRead = await fs.readFile(dirPath, "utf-8");
  const data = JSON.parse(dataRead);
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

  fs.writeFile(dirPath, JSON.stringify(newData, null, 2), "utf-8");
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