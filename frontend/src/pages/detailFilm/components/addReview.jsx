import { useState } from "react";
import { createReview } from "../../../service/review";
import Button from "../../../components/button";


const AddReview = (props) => {
    const { id } = props;
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(1);
    const [newReview, setNewReview] = useState("");

    const handleAddReview = async (e) => {
        e.preventDefault();

        try {
            const data = {
              film_id: Number(id), 
              komentar: newReview,
              rating: Number(rating)
            };
            
            const response = await createReview(data, localStorage.getItem("token"));
            
            setMessage(response.data.data.message);
            setNewReview("");
          } catch (error) {
          // console.log(error);
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-3xl font-semibold mb-4">Tambah Review</h2>
            <form onSubmit={handleAddReview} className="space-y-4">
            <textarea
                type="text"
                placeholder="Your Comment"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="w-full p-2 border rounded text-lg"
                rows="4"
            > </textarea>

            <div className="flex flex-col gap-2">
                <label className="mt-2 text-xl font-semibold">Rating</label>
                <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-60 p-2 border rounded"
                >
                <option value="" disabled>Pilih rating</option>
                {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                    {i + 1}
                    </option>
                ))}
                </select>
            </div>

            <Button
                type="submit"
                className="rounded text-lg">
                Tambah Review
            </Button>
            {message && <p>{message}</p>}
            </form>
        </div>
    )
}

export default AddReview;