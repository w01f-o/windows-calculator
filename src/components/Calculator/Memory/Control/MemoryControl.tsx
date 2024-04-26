const MemoryControl = () => {
  return (
    <div className="calculator__memory-control">
      <button className="calculator__memory-button calculator__memory-button_unactive">
        MC
      </button>
      <button className="calculator__memory-button calculator__memory-button_unactive">
        MR
      </button>
      <button className="calculator__memory-button">M+</button>
      <button className="calculator__memory-button">M-</button>
      <button className="calculator__memory-button">MS</button>
    </div>
  );
};

export default MemoryControl;
