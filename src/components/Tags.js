import React from "react";

const Tags = ({ tags }) => {
  return (
    <div>
      <div className="tags">
        {tags?.length?tags?.map((tag, index) => (
          <p className="tag" key={index}>
              {tag}
          </p>
        )):<div>No Tags available</div>}
      </div>
    </div>
  );
};

export default Tags;