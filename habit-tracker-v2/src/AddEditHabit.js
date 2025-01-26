import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import icons from '../data/icons';
import './AddEditHabit.css';

const AddEditHabit = ({ habits, addHabit, editHabit }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const editingHabit = id ? habits.find((h) => h.id === parseInt(id)) : null;

  const [form, setForm] = useState(
    editingHabit || {
      id: Date.now(),
      title: '',
      description: '',
      color: '#44C6BB',
      icon: '',
      isFavorite: false,
      startDate: '',
      endDate: '',
      progress: {},
    }
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingHabit) {
      editHabit(form);
    } else {
      addHabit(form);
    }
    navigate('/');
  };

  return (
    <form className="add-edit-form" onSubmit={handleSubmit}>
      <h2>{editingHabit ? 'Edit Habit' : 'Add New Habit'}</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleInputChange}
        required
      ></textarea>
      <label>Pick a color:</label>
      <input
        type="color"
        name="color"
        value={form.color}
        onChange={handleInputChange}
      />
      <label>Pick an icon:</label>
      <div className="icon-picker">
        {icons.map((icon) => (
          <div
            key={icon.name}
            className={`icon ${form.icon === icon.name ? 'selected' : ''}`}
            style={{ borderColor: form.color }}
            onClick={() => setForm({ ...form, icon: icon.name })}
          >
            {icon.icon}
          </div>
        ))}
      </div>
      <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={handleInputChange}
        required
      />
      <input
        type="date"
        name="endDate"
        value={form.endDate}
        onChange={handleInputChange}
        required
      />
      <button type="submit">{editingHabit ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default AddEditHabit;

