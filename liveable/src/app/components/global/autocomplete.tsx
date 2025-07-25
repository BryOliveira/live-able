import React from "react";

/**
 * A server component that renders all of the autocomplete suggestions as a scrollable list. 
 * 
 * @param suggestions - an array of strings containing the results of a prefix trie's children given location or career queries.
 * @param onSelect - Callback function invoked when a suggestion is selected to autofill the input.
 * @returns A React node containing the available suggestions or an empty list if there are no available suggestions.
 */
export default function Autocomplete({ 
  suggestions, 
  onSelect 
}: { 
  suggestions: string[];
  onSelect?: (value: string) => void;
}): React.ReactNode {
  return (
    <ul>
      {suggestions.map((suggestion, index) => (
        <li 
          key={index} 
          onClick={() => onSelect?.(suggestion)}
          style={{ cursor: 'pointer' }}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
}