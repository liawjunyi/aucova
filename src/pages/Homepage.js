import Header from "../components/Header";

export default function Homepage() {
  return (
    <div>
      <Header />

      <form class="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}