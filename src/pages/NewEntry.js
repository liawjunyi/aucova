import React, { useState } from "react";
import HeaderEntry from "../components/HeaderEntry";
import NewEntry2 from "../components/NewEntry2";

function NewEntry() {
  const [state, setState] = useState(1);
  const [category, setCategory] = useState({});
  return (
    <div>
      <HeaderEntry title="New Entry" handleNext={() => setState(2)} />
      {state === 1 && (
        <>
          <div>What will you add to your porfolio today?</div>

          <div className="categories-container">
            <div
              className="category"
              onClick={(e) => {
                console.log(e);
                setCategory(e.target);
                setState(2);
              }}
            >
              <img src="/jewellery1.jpg" value="rings"></img>
              <p>Rings</p>
            </div>
            <div className="category">
              <img src="/jewellery1.jpg"></img>
              <p>Earrings</p>
            </div>
            <div className="category">
              <img src="/jewellery1.jpg"></img>
              <p>Pendants/Necklaces</p>
            </div>
            <div className="category">
              <img src="/jewellery1.jpg"></img>
              <p>Bracelets/Bangles</p>
            </div>
            <div className="category">
              <img src="/jewellery1.jpg"></img>
              <p>Brooches</p>
            </div>
            <div className="category">
              <img src="/jewellery1.jpg"></img>
              <p>Others</p>
            </div>
          </div>
        </>
      )}
      {state === 2 && <NewEntry2 category={category} />}
    </div>
  );
}

export default NewEntry;
