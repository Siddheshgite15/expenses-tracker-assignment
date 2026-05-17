/**
 * FilterPanel Component
 * Provides filtering and search functionality
 */

function FilterPanel({
    categories,
    selectedCategory,
    onCategoryChange,
    searchQuery,
    onSearchChange,
}) {

    return (
        <div className="filter-panel">
            <div className="filter-group">
                <label htmlFor="category-filter">🏷️ Filter by Category:</label>
                <select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="filter-select"
                >
                    <option value="All">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="search-input">🔍 Search Transactions:</label>
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="search-input"
                />
                {searchQuery && (
                    <button
                        className="clear-search"
                        onClick={() => onSearchChange("")}
                        title="Clear search"
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}

export default FilterPanel;
