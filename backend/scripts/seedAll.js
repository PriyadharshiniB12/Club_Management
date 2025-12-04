require('dotenv').config();
const mongoose = require('mongoose');
const Member = require('../models/Member');
const Event = require('../models/Event');
const Announcement = require('../models/Announcement');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing data
    await Member.deleteMany();
    await Event.deleteMany();
    await Announcement.deleteMany();
    console.log('🧹 Cleared existing data');

    // Dummy Members
    const members = [
      { name: 'Priya', rollNumber: 'CS101', email: 'priya@example.com', role: 'President' },
      { name: 'Rahul',  rollNumber: 'CS102', email: 'rahul@example.com', role: 'Vice President' },
      { name: 'Anjali', rollNumber: 'CS103', email: 'anjali@example.com', role: 'Secretary' },
      { name: 'Arun', rollNumber: 'CS104', email: 'arun@example.com', role: 'Member' },
      { name: 'Sara', rollNumber: 'CS105', email: 'sara@example.com', role: 'Member' },
      { name: 'Vikram', rollNumber: 'CS106', email: 'vikram@example.com', role: 'Member' }
    ];
    await Member.insertMany(members);
    console.log('👥 Dummy members inserted');

    // Dummy Events
    const now = new Date();
    const events = Array.from({ length: 6 }).map((_, i) => ({
      title: `Event ${i + 1}`,
      description: `This is description for event ${i + 1}`,
      datetime: new Date(now.getFullYear(), now.getMonth() - i, 10),
      venue: 'Auditorium'
    }));
    await Event.insertMany(events);
    console.log('📅 Dummy events inserted');

    // Dummy Announcements
    const announcements = [
      { title: 'Welcome to New Members', content: 'Let’s welcome our new batch of members!' },
      { title: 'Hackathon Coming Soon', content: 'Prepare for the annual Hackathon event.' },
      { title: 'Monthly Meeting', content: 'Join the club meeting this Friday at 5PM.' }
    ];
    await Announcement.insertMany(announcements);
    console.log('📢 Dummy announcements inserted');

    mongoose.disconnect();
    console.log('✅ Seeding completed and disconnected');
  } catch (err) {
    console.error('❌ Error during seeding:', err);
  }
};

seedData();
