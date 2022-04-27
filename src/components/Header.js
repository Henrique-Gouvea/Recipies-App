import react from "react";

function Header() {
  return (
    <header>
      <h1 data-testid="page-title"> Page Title </h1>
      <button type="button" data-testid="profile-top-btn">
        Profile
      </button>
      <br />
      <button type="button" data-testid="search-top-btn">
        Search
      </button>
    </header>
  );
}

export default Header;
