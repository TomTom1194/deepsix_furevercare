import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import storiesData from "../../../Data/Animalshelter/successStory.json";

export default function StoryDetail() {
  const { id } = useParams();
  const [story, setStory] = useState(null);

  useEffect(() => {
    const found = storiesData.find((s) => s.id === parseInt(id));
    setStory(found);
  }, [id]);

  if (!story) {
    return (
      <div className="container my-5">
        <h3>Story not found</h3>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Title */}
      <h2 className="mb-3">{story.title}</h2>

      {/* Author + Date */}
      <p className="text-muted">
        By {story.author} • {new Date(story.date).toLocaleDateString()}
      </p>

      {/* Content 1 + Image 1 */}
      <div className="row my-4 align-items-center">
        <div className="col-md-6">
          <p className="story-content">{story.content1}</p>
        </div>
        <div className="col-md-6">
          <img
            src={story.image1}
            alt={story.title + " before"}
            className="img-fluid rounded shadow-sm"
          />
        </div>
      </div>

      {/* Content 2 + Image 2 */}
      <div className="row my-4 align-items-center">
        <div className="col-md-6 order-md-2">
          <p className="story-content">{story.content2}</p>
        </div>
        <div className="col-md-6 order-md-1">
          <img
            src={story.image2}
            alt={story.title + " after"}
            className="img-fluid rounded shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
