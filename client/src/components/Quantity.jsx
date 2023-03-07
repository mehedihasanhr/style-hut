const Quantity = ({
  qnt = 1,
  setQnt,
  className = '',
  controllerClassName = '',
  displayClassName = 'w-14',
}) => {
  return (
    <div
      className={`flex items-center p-0 border border-gray-200 w-fit ${className}`}
    >
      {/* quantity decrease button */}
      <button
        aria-labelledby="removeQuantity"
        onClick={() => setQnt(qnt > 1 ? qnt - 1 : 1)}
        disabled={qnt === 1}
        className={`w-10 h-fill py-2 outline-none border-none margin-0 cursor-default hover:bg-gray-200 disabled:opacity-50 disabled:bg-gray-100 ${controllerClassName}`}
      >
        -
      </button>

      {/*
       ** display quantity
       ** set min value to 1
       ** set value to qnt
       ** on change set qnt to the value
       */}
      <input
        type="number"
        min="1"
        value={qnt.toString()}
        onChange={(e) =>
          setQnt(
            Number(e.target.value) > 0
              ? Number(e.target.value)
              : 1,
          )
        }
        className={`py-2 text-center border-y-0 border-r border-l border-gray-200 appearance-none ${displayClassName}`}
      />

      {/* quantity increase button */}
      <button
        aria-labelledby="addQuantity"
        onClick={() => setQnt(qnt + 1)}
        className={`w-10 h-fill py-2 outline-none border-none margin-0 hover:bg-gray-200 cursor-default  ${controllerClassName}`}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
