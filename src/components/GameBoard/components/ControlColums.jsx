function ControlColumns() {
  const cols = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="gameboard__controls">
      {cols.map((col) => (
        <div key={col} className="gameboard__controls__col"></div>
      ))}
    </div>
  );
}

export default ControlColumns;
