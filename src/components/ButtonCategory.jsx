import React from "react";

function ButtonCategory({categories}) {
    return(
        <>
        <p></p>
        {categories?.slice(0,5)
        .map((cat) => (
          <button
            key={ cat.strCategory }
            type="submit"
            data-testid={ `${cat.strCategory}-category-filter` }
          >
            {cat.strCategory}
          </button>
        ))}
        </>
 )
}

export default ButtonCategory;
