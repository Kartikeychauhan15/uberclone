import React from 'react';

const LocationSearchPanel = ({
  suggestions,
  setVehiclePanel,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion);
    } else if (activeField === 'destination') {
      setDestination(suggestion);
    }
    // Optionally, you can manage vehicle panel and panel state here
    // setVehiclePanel(true);
    // setPanelOpen(false);
  };

  // Ensure suggestions is an array and has at least one item
  const validSuggestions = Array.isArray(suggestions) ? suggestions : [];

  return (
    <div>
      {/* Display fetched suggestions */}
      {validSuggestions.length > 0 ? (
        validSuggestions.map((elem, idx) => (
          <div
            key={idx}
            onClick={() => handleSuggestionClick(elem)}
            className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        ))
      ) : (
        <p>No suggestions available</p>
      )}
    </div>
  );
};

export default LocationSearchPanel;
