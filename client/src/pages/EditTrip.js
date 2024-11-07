import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EditTrip.css";

const EditTrip = ({ api_url, data }) => {
  const { id } = useParams();
  const [post, setPost] = useState({
    id: 0,
    title: "",
    description: "",
    img_url: "",
    num_days: 0,
    start_date: "",
    end_date: "",
    total_cost: 0.0,
  });

  useEffect(() => {
    const fetchTripById = async (id) => {
      const response = await fetch(`${api_url}/api/trips/${id}`);
      const data = await response.json();
      return data; //attention, what if not return
    };

    const loadTrip = async () => {
      let result = data.filter((item) => item.id === parseInt(id))[0];
      if (!result) {
        const fetchedData = await fetchTripById(id);
        result = fetchedData;
      }
      if (result) {
        setPost({
          id: parseInt(result.id),
          title: result.title,
          description: result.description,
          img_url: result.img_url,
          num_days: parseInt(result.num_days),
          start_date: result.start_date.slice(0, 10),
          end_date: result.end_date.slice(0, 10),
          total_cost: result.total_cost,
        });
      }
    };
    loadTrip();
  }, [data, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updatePost = async (event) => {
    event.preventDefault();
    const url = `/api/trips/${post.id}`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", //
      },
      body: JSON.stringify(post), //
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) window.location.href = "/";
      else console.error("Failed to update trip");
    } catch (error) {
      console.log("err in update  Trip:", error.message);
    }
  };

  const deletePost = async (event) => {
    event.preventDefault();
    const url = `/api/trips/${post.id}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", //
      },
      body: JSON.stringify(post), //
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) window.location.href = "/";
      else console.error("Failed to delete trip");
    } catch (error) {
      console.log("err in delete  Trip:", error.message);
    }
  };

  return (
    <div>
      <form>
        <label>Title</label> <br />
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Description</label>
        <br />
        <textarea
          rows="5"
          cols="50"
          id="description"
          name="description"
          value={post.description}
          onChange={handleChange}
        ></textarea>
        <br />
        <label>Image URL </label>
        <br />
        <input
          type="text"
          id="img_url"
          name="img_url"
          value={post.img_url}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Number of Days</label>
        <br />
        <input
          type="number"
          id="num_days"
          name="num_days"
          value={post.num_days}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Start Date </label>
        <br />
        <input
          type="text"
          id="start_date"
          name="start_date"
          value={post.start_date}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>End Date </label>
        <br />
        <input
          type="text"
          id="end_date"
          name="end_date"
          value={post.end_date}
          onChange={handleChange}
        />
        <br />
        <br />
        <label>Total Cost</label>
        <br />
        <input
          type="text"
          id="total_cost"
          name="total_cost"
          value={post.total_cost}
          onChange={handleChange}
        />
        <br />
        <br />
        <input type="submit" value="Submit" onClick={updatePost} />
        <button className="deleteButton" onClick={deletePost}>
          Delete
        </button>
      </form>
    </div>
  );
};

export default EditTrip;
