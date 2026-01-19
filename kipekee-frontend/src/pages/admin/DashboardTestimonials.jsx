import { useState } from "react";
import axios from "axios";

const DashboardTestimonials = ({ testimonials, fetchTestimonials }) => {
  const [form, setForm] = useState({ name: "", role: "", content: "" });
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("role", form.role);
    data.append("content", form.content);
    if (image) data.append("image", image);

    try {
      await axios.post("https://api.rutererealty.com/api/testimonials", data);
      alert("Review Added!");
      setForm({ name: "", role: "", content: "" });
      setImage(null);
      fetchTestimonials();
    } catch (err) {
      alert("Error adding review");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this review?")) {
      await axios.delete(`https://api.rutererealty.com/api/testimonials/${id}`);
      fetchTestimonials();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="bg-white p-8 rounded-xl shadow-lg h-fit">
        <h2 className="text-2xl font-bold text-brand-navy mb-6">
          Add New Review
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-brand-navy file:text-white hover:file:bg-brand-gold"
          />
          <input
            type="text"
            placeholder="Client Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-3 rounded w-full focus:outline-none focus:border-brand-gold"
          />
          <input
            type="text"
            placeholder="Role (e.g. Home Buyer)"
            required
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="border p-3 rounded w-full focus:outline-none focus:border-brand-gold"
          />
          <textarea
            placeholder="Review content..."
            required
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="border p-3 rounded w-full h-24 focus:outline-none focus:border-brand-gold"
          ></textarea>
          <button className="w-full bg-brand-gold text-white font-bold py-3 rounded hover:bg-yellow-600 transition uppercase tracking-widest text-sm">
            Post Review
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-brand-navy mb-6">
          Existing Reviews
        </h2>
        <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar space-y-4">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-4 rounded-xl shadow-md flex gap-4 items-start border border-gray-100"
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                {t.image_url ? (
                  <img
                    src={t.image_url}
                    className="w-full h-full object-cover"
                    alt="Client"
                  />
                ) : (
                  <div className="w-full h-full bg-brand-navy"></div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-brand-navy">
                  {t.name}{" "}
                  <span className="text-xs text-gray-400 font-normal">
                    ({t.role})
                  </span>
                </h4>
                <p className="text-sm text-gray-600 mt-1 italic">
                  "{t.content}"
                </p>
              </div>
              <button
                onClick={() => handleDelete(t.id)}
                className="text-red-500 hover:text-red-700 font-bold text-xs uppercase"
              >
                Delete
              </button>
            </div>
          ))}
          {testimonials.length === 0 && (
            <p className="text-gray-400">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardTestimonials;
