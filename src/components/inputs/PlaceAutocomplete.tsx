"use client";

import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { FC, useEffect, useRef, useState } from "react";

type PlaceAutocompleteProps = {
  id: string;
  value: string;
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
};

export const PlaceAutocomplete:FC<PlaceAutocompleteProps> = ({ id, value, onPlaceSelect }) => {
  const places = useMapsLibrary("places");
  const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address", "address_components"]
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="autocomplete-container">
      {value && <p><small>Dirección actual: {value}</small></p>}
      <input id={id} ref={inputRef}/>
    </div>
  );
}