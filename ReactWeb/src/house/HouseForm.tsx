import React, { useState } from "react";
import toBase64 from "../toBase64";
import { House } from "../types/house";

//*This component needs 2 props: house instance and the 
//*the function to be called
type Args = {
  house: House;
  submitted: (house: House) => void; //*as a param we will supply a filled-up house
};

//*We destructure the house object and callback function.
//*{ house, submitted }: Args -  means destructure the prop it in 
//*type called "args"
const HouseForm = ({ house, submitted }: Args) => {

  //*Props are just used here to communicate between components.
  //*We are not using them as component state.
  //* useState({ ...house }) means the spread will use the values
  //* we get from the prop.
  //*JavaScript's spread operator allows us to literally spread all key/value pairs 
  //*of an object to another object. This can also be done in React's JSX. 
  //*To do that use spread operator '...' to pass all the object's key/value pairs as 
  //*attribute/value pairs to a JSX element in this case "houseState"
  const [houseState, setHouseState] = useState({ ...house });


  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    submitted(houseState);
  };

  const onFileSelected = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    e.preventDefault();
    e.target.files &&
      e.target.files[0] &&
      setHouseState({
        ...houseState,
        photo: await toBase64(e.target.files[0]),
      });
  };

  return (
    //*Note we have  a FORM tag
    <form className="mt-2">
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          className="form-control"
          placeholder="Address"
          value={houseState.address} //*meaning the value of the input, in other words 
                                     //*the text visible in the input, is the value address 
                                     //*property of the houseState
          onChange={(e) => //* first the handler gets an object "e" containing information about the event. 
            //* 1. setHouseState() is called. And as a parameter a new house instance has to be supplied.
            //*    (e.g houseState)   
            //* 2. then spread operator is applied to houseState (...houseState). We are copying all 
            //*    properties and values (KV pair) from the "house"
            //* 3. address: e.target.value = we are overwriting the address property of the house
            //*    with the value of the input box
            //* e.target.value = contains the value of the input box
                  
            setHouseState({ ...houseState, address: e.target.value }) 
          }
        />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="country">Country</label>
        <input
          type="text"
          className="form-control"
          placeholder="Country"
          value={houseState.country}
          onChange={(e) =>
            setHouseState({ ...houseState, country: e.target.value })
          }
        />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          placeholder="Description"
          value={houseState.description}
          onChange={(e) =>
            setHouseState({ ...houseState, description: e.target.value })
          }
        />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          className="form-control"
          placeholder="Price"
          value={houseState.price}
          onChange={(e) =>
            setHouseState({ ...houseState, price: parseInt(e.target.value) })
          }
        />
      </div>
      {/* <div className="form-group mt-2">
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="file"
          className="form-control"
          onChange={onFileSelected}
        />
      </div>
      <div className="mt-2">
        <img src={houseState.photo}></img>
      </div> */}
      <button
        className="btn btn-primary mt-2"
        disabled={!houseState.address || !houseState.country}
        onClick={onSubmit}
      >
        Submit
      </button>
    </form>
  );
};

export default HouseForm;
