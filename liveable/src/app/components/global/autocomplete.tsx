export default function Autocomplete({ suggestions }: { suggestions: string[] }) {
  return (
    <ul>
      {suggestions.map((suggestion, index) => (
        <li key={index}>{suggestion}</li>
      ))}
    </ul>
  );
}