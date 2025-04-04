const CategoryFilter = ({ categories, onSelectCategory }) => {
  return (
    <div className="d-flex overflow-auto p-3">
      <button
        className="btn btn-outline-primary mx-2"
        onClick={() => onSelectCategory("")}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          className="btn btn-outline-primary mx-2"
          onClick={() => onSelectCategory(category.name)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
