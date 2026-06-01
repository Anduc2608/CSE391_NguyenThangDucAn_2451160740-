import { useState } from "react";
import { portfolioItems } from "../data/portfolio";

function Portfolio() {
  const [filter, setFilter] = useState("all");

  const categories = ["all", "web", "mobile", "design"];
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
     <section id="portfolio" className="portfolio">
      <div className="container">
        <h2 className="section-title text-center">My Portfolio</h2>
        <p className="section-subtitle text-center">Recent projects I've worked on</p>
         <div className="filter-buttons">
          {categories.map((category) => (
            <button key={category} className="filter-btn" onClick={() => handleFilterChange(category)}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
     </section>
  );
}

export default Portfolio;