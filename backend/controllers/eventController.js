const Event = require('../models/Event');

// @desc Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    return res.json(events);
  } catch (error) {
    console.error("Get All Events Error:", error);
    return res.status(500).json({ message: "Failed to fetch events" });
  }
};


// @desc Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { title, date, location, description } = req.body;

    // Validation
    if (!title || !date || !location) {
      return res.status(400).json({ message: "title, date, and location are required" });
    }

    // Convert string date to Date object
    const eventDate = new Date(date);
    if (isNaN(eventDate)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    // Create new event
    const newEvent = new Event({
      title,
      datetime: eventDate, // your model field
      location,
      description
    });

    await newEvent.save();

    return res.status(201).json(newEvent);
  } catch (error) {
    console.error("Create Event Error:", error);
    return res.status(500).json({ message: "Failed to create event" });
  }
};


// @desc Update an event
exports.updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.json(updatedEvent);
  } catch (error) {
    console.error("Update Event Error:", error);
    return res.status(500).json({ message: "Failed to update event" });
  }
};

// @desc Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Delete Event Error:", error);
    return res.status(500).json({ message: "Failed to delete event" });
  }
};
