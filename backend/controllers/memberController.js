// const Member = require('../models/Member');

// // @desc    Get all members
// exports.getAllMembers = async (req, res) => {
//   try {
//     const members = await Member.find();
//     res.status(200).json(members);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Add new member
// exports.createMember = async (req, res) => {
//   const { name, rollNumber, email, phone, department, year } = req.body;
//   try {
//     const newMember = new Member({
//       name,
//       rollNumber,
//       email,
//       phone,
//       department,
//       year,
//     });
//     await newMember.save();
//     res.status(201).json(newMember);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

const Member = require('../models/Member');

// @desc Get all members (with optional search & pagination)
exports.getAllMembers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', department, year, role } = req.query;
    const query = {};

    if (search) {
      const re = new RegExp(search, 'i'); // case-insensitive search
      query.$or = [{ name: re }, { email: re }, { rollNumber: re }, { phone: re }];
    }

    if (department) query.department = department;
    if (year) query.year = Number(year);
    if (role) query.role = role;

    const skip = (Number(page) - 1) * Number(limit);

    const [total, members] = await Promise.all([
      Member.countDocuments(query),
      Member.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit))
    ]);

    return res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      members
    });
  } catch (error) {
    console.error("Get Members Error:", error);
    return res.status(500).json({ message: "Failed to fetch members" });
  }
};

// @desc Add new member
exports.createMember = async (req, res) => {
  try {
    const { name, rollNumber, email, phone, department, year, role, avatarUrl } = req.body;

    if (!name || !rollNumber || !email) {
      return res.status(400).json({ message: "Name, rollNumber, and email are required" });
    }

    // Prevent duplicate email or roll number
    const exists = await Member.findOne({ $or: [{ email }, { rollNumber }] });
    if (exists) return res.status(409).json({ message: "Member with this email or roll number already exists" });

    const newMember = new Member({
      name,
      rollNumber,
      email,
      phone,
      department,
      year,
      role,
      avatarUrl
    });

    await newMember.save();
    return res.status(201).json(newMember);
  } catch (error) {
    console.error("Create Member Error:", error);
    return res.status(500).json({ message: "Failed to create member" });
  }
};

// @desc Get single member by ID
exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    return res.json(member);
  } catch (error) {
    console.error("Get Member Error:", error);
    return res.status(500).json({ message: "Failed to fetch member" });
  }
};

// @desc Update member
exports.updateMember = async (req, res) => {
  try {
    const updates = req.body;

    // Check for duplicate email/rollNumber on update
    if (updates.email || updates.rollNumber) {
      const conflict = await Member.findOne({
        $or: [{ email: updates.email }, { rollNumber: updates.rollNumber }],
        _id: { $ne: req.params.id }
      });
      if (conflict) return res.status(409).json({ message: "Email or roll number already used by another member" });
    }

    const updatedMember = await Member.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!updatedMember) return res.status(404).json({ message: "Member not found" });

    return res.json(updatedMember);
  } catch (error) {
    console.error("Update Member Error:", error);
    return res.status(500).json({ message: "Failed to update member" });
  }
};

// @desc Delete member
exports.deleteMember = async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);
    if (!deletedMember) return res.status(404).json({ message: "Member not found" });

    return res.json({ message: "Member deleted successfully" });
  } catch (error) {
    console.error("Delete Member Error:", error);
    return res.status(500).json({ message: "Failed to delete member" });
  }
};
