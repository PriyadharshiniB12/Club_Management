// const Bus = require("../models/Bus");

// // Add new bus timing
// exports.addBus = async (req, res) => {
//   try {
//     const { routeName, departureTime, note } = req.body;
//     const newBus = new Bus({ routeName, departureTime, note });
//     await newBus.save();
//     res.status(201).json(newBus);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get all bus timings
// exports.getBuses = async (req, res) => {
//   try {
//     const buses = await Bus.find().sort({ departureTime: 1 });
//     res.json(buses);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete a bus timing
// exports.deleteBus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Bus.findByIdAndDelete(id);
//     res.json({ message: "Bus deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

const Bus = require("../models/Bus");

// @desc Add new bus timing
exports.addBus = async (req, res) => {
  try {
    const { routeName, departureTime, note } = req.body;

    if (!routeName || !departureTime) {
      return res.status(400).json({ message: "routeName and departureTime are required" });
    }

    const newBus = new Bus({ routeName, departureTime, note });
    await newBus.save();

    return res.status(201).json(newBus);
  } catch (err) {
    console.error("Add Bus Error:", err);
    return res.status(500).json({ message: "Failed to add bus timing" });
  }
};

// @desc Get all bus timings
exports.getBuses = async (req, res) => {
  try {
    const buses = await Bus.find().sort({ departureTime: 1 });
    return res.json(buses);
  } catch (err) {
    console.error("Get Buses Error:", err);
    return res.status(500).json({ message: "Failed to fetch bus timings" });
  }
};

// @desc Delete a bus timing
exports.deleteBus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Bus ID is required" });

    const bus = await Bus.findByIdAndDelete(id);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    return res.json({ message: "Bus deleted successfully" });
  } catch (err) {
    console.error("Delete Bus Error:", err);
    return res.status(500).json({ message: "Failed to delete bus timing" });
  }
};
