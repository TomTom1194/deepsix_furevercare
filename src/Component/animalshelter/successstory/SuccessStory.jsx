import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import storiesData from "../../../Data/Animalshelter/successStory.json";

export default function SuccessStory() {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const shuffled = [...storiesData].sort(() => 0.5 - Math.random());
    setStories(shuffled.slice(0, 4));
  }, []);

  if (stories.length === 0) return null;

  const mainStory = stories[0];
  const subStories = stories.slice(1);

  return (
    <div className="container my-5" id="success-story">
      <div className="row mb-4">
        {/* Main Story */}
        <div className="col-md-12">
          <div
            className="card shadow-sm card-hover h-150"
            onClick={() => navigate(`/animalshelter/story/${mainStory.id}`)}
            style={{ cursor: "pointer" }}
          >
            {/* Desktop: chia 2 cột */}
            <div className="d-none d-md-flex row g-0">
              <div className="col-md-6">
                <img
                  src={mainStory.image2}
                  alt={mainStory.title}
                  className="img-fluid rounded-start"
                  style={{ objectFit: "contain", height: "100%" }}
                />
              </div>
              <div className="col-md-6 d-flex flex-column justify-content-center p-3">
                <h3>{mainStory.title}</h3>
                <p className="text-muted">
                  By {mainStory.author} •{" "}
                  {new Date(mainStory.date).toLocaleDateString()}
                </p>
                <p className="text-truncate-3">{mainStory.content2}</p>
              </div>
            </div>

            {/* Mobile: hiển thị như subStory */}
            <div className="d-block d-md-none">
              <div
                className="card shadow-sm card-hover h-100"
                style={{ cursor: "pointer" }}
              >
                <img
                  src={mainStory.image2}
                  alt={mainStory.title}
                  className="card-img-top"
                  style={{ objectFit: "contain", height: "200px" }}
                />
                <div className="card-body">
                  <h6 className="card-title">{mainStory.title}</h6>
                  <p className="card-text">{mainStory.content2}</p>
                  <small className="text-muted">
                    {mainStory.author} •{" "}
                    {new Date(mainStory.date).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Stories */}
      <div className="row">
        {subStories.map((story) => (
          <div key={story.id} className="col-md-4 mb-3">
            <div
              className="card shadow-sm card-hover h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/animalshelter/story/${story.id}`)}
            >
              <img
                src={story.image2}
                alt={story.title}
                className="card-img-top"
                style={{ objectFit: "contain", height: "200px" }}
              />
              <div className="card-body">
                <h6 className="card-title">{story.title}</h6>
                <p className="card-text text-truncate">{story.content2}</p>
                <small className="text-muted">
                  {story.author} • {new Date(story.date).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
