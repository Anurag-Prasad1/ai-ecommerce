function AIExampleChips({
  examples,
  onSelect,
}) {
  return (
    <div className="ai-example-chips">
      {examples.map(
        (example) => (
          <button
            key={example}
            type="button"
            className="ai-chip"
            onClick={() =>
              onSelect(example)
            }
          >
            {example}
          </button>
        )
      )}
    </div>
  );
}

export default AIExampleChips;