import Header from "../components/Header";
import Carousell from "../components/Carousell";
import Search from "../components/Search";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div>
      <Header title="AUCOVA" />
      <Search />

      <Carousell />

      <Link className="position-absolute end-0" to="/dispatch">
        Read More
      </Link>
    </div>
  );
}
