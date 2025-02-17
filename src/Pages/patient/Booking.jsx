import React, { useState } from "react";

const Booking = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    doctor: "",
    date: "",
    detail: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/book-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Appointment booked successfully!");
        setFormData({
          email: "",
          fullName: "",
          doctor: "",
          date: "",
          detail: "",
        });
      } else {
        setMessage(data.error || "Failed to book appointment.");
      }
    } catch (error) {
      setMessage("Error booking appointment.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E4FDE1]">
      <div className="bg-[#0D3A4E] text-white p-8 rounded-lg w-[450px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Booking Form</h2>
        {message && <p className="mb-3 text-green-400">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="p-2 rounded-md w-full bg-[#0D3A4E] border border-white focus:ring-2 focus:ring-[#E4FDE1]"
            />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="p-2 rounded-md w-full bg-[#0D3A4E] border border-white focus:ring-2 focus:ring-[#E4FDE1]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              placeholder="Doctor name"
              required
              className="p-2 rounded-md w-full bg-[#0D3A4E] border border-white focus:ring-2 focus:ring-[#E4FDE1]"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="p-2 rounded-md w-full bg-[#0D3A4E] border border-white focus:ring-2 focus:ring-[#E4FDE1]"
            />
          </div>
          <textarea
            name="detail"
            value={formData.detail}
            onChange={handleChange}
            placeholder="Enter detail"
            className="p-2 rounded-md w-full bg-[#0D3A4E] border border-white focus:ring-2 focus:ring-[#E4FDE1] h-20"
          />
          <button
            type="submit"
            className="bg-[#E4FDE1] text-[#0D3A4E] px-5 py-2 rounded-md w-full font-bold hover:bg-white transition"
          >
            BOOK
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
