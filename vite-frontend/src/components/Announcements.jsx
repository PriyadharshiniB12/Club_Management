import React, { useEffect, useState } from 'react';
import {
fetchAnnouncements,
createAnnouncement,
deleteAnnouncement,
updateAnnouncement,
} from '../services/announcementService';

function Announcements() {
const [announcements, setAnnouncements] = useState([]);
const [title, setTitle] = useState('');
const [editingId, setEditingId] = useState(null);

useEffect(() => {
loadAnnouncements();
}, []);

const loadAnnouncements = async () => {
const data = await fetchAnnouncements();
setAnnouncements(data);
};

const handleAddOrUpdate = async (e) => {
e.preventDefault();
if (editingId) {
await updateAnnouncement(editingId, { title });
setEditingId(null);
} else {
await createAnnouncement({ title });
}
setTitle('');
loadAnnouncements();
};

const handleEdit = (announcement) => {
setTitle(announcement.title);
setEditingId(announcement._id);
};

const handleDelete = async (id) => {
await deleteAnnouncement(id);
loadAnnouncements();
};

return (
<div>
<h2>📢 Announcements</h2>
<form onSubmit={handleAddOrUpdate}>
<input
type="text"
value={title}
placeholder="Enter announcement..."
onChange={(e) => setTitle(e.target.value)}
/>
<button type="submit">{editingId ? 'Update' : 'Add'}</button>
</form>
<ul>
{announcements.map((a) => (
<li key={a._id}>
{a.title}
<button onClick={() => handleEdit(a)}>Edit</button>
<button onClick={() => handleDelete(a._id)}>Delete</button>
</li>
))}
</ul>
</div>
);
}

export default Announcements;