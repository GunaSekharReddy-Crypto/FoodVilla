import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// Function to generate the Cloudinary image URL
const getImageUrl = (cloudinaryId) => {
  if (!cloudinaryId) return "https://via.placeholder.com/264x288?text=No+Image";
  return `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryId}`;
};

function ItemDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data for item details, replace this with an actual API call if available
  const mockItemDetails = {
    id: id,
    text: `Item ${id}`,
    cloudinaryId: "",
    description: "Detailed description about the selected item.",
  };

  return (
    <div>
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Back
      </button>

      <div className="border p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-2">{mockItemDetails.text}</h2>
        {mockItemDetails.cloudinaryId ? (
          <img
            src={getImageUrl(mockItemDetails.cloudinaryId)}
            alt={mockItemDetails.text}
            className="w-64 h-64 object-cover rounded mb-4"
          />
        ) : (
          <img
            src="https://via.placeholder.com/264x288?text=No+Image"
            alt="No Image"
            className="w-64 h-64 object-cover rounded mb-4"
          />
        )}
        <p>{mockItemDetails.description}</p>
      </div>
    </div>
  );
}

export default ItemDetailPage;
