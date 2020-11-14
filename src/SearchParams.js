import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from './Results';


export default function SearchParams() {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [pets, setPets] = useState([]);

  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });

    setPets(animals || []);
  }

  useEffect(() => {
    (async () => {
      setBreed("");
      setBreeds([]);
      try {
        const { breeds } = await pet.breeds(animal);
        setBreeds(breeds.map(({ name }) => name));
      } catch (e) {
        console.error(e);
      }
    })();
  }, [animal, setBreed]);
  return (
    <div className={"search-params"}>
      <form onSubmit={(e) => {
        e.preventDefault();
        requestPets();
      }}>
        <label htmlFor={"location"}>
          Location
          <input
            id={"location"}
            value={location}
            placeholder={"Location"}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
}
