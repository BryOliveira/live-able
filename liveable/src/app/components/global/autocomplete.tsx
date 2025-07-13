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