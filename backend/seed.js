const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const Member = require('./models/Member');
const Event = require('./models/Event');
const Announcement = require('./models/Announcement');
const Bus = require('./models/Bus');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

const seedData = async () => {
  try {
    console.log('🔥 Clearing old data...');
    await Member.deleteMany();
    await Event.deleteMany();
    await Announcement.deleteMany();
    await Bus.deleteMany();

    // Members
    console.log('📥 Inserting Members...');
    const roles = ['President', 'Vice President', 'Secretary', 'Member'];
    const members = Array.from({length:50}, (_, i) => ({
      name: `Member ${i+1}`,
      rollNumber: `CS${1000+i+1}`,
      email: `member${i+1}@example.com`,
      phone: `9876543${(1000+i+1).toString().slice(-4)}`,
      department: 'CSE',
      year: ((i % 4) + 1),
      role: roles[i % roles.length]
    }));
    await Member.insertMany(members);

    // Events
console.log('📥 Inserting Events...');
const events = Array.from({ length: 20 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i); // i days from today
  date.setHours(10, 0, 0, 0);       // 10:00:00 AM
  return {
    title: `Event ${i + 1}`,
    date,                             // ✅ valid Date object
    location: `Hall ${i + 1}`
  };
});



    // Announcements
    console.log('📥 Inserting Announcements...');
    const announcements = Array.from({length:15}, (_, i) => ({
      title: `Announcement ${i+1}`
    }));
    await Announcement.insertMany(announcements);

    // Buses
    console.log('📥 Inserting Buses...');
    const buses = Array.from({length:10}, (_, i) => ({
      routeName: `Route ${i+1}`,
      departureTime: `07:${i < 10 ? '0'+i : i} AM`,
      note: `Bus note ${i+1}`
    }));
    await Bus.insertMany(buses);

    console.log('✅ Seed completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

