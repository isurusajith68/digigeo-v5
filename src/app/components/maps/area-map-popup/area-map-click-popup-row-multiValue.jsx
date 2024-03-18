
 "use client"

const AreaMapClickPopupRowMultiValue = ({label, value   }) => {
  return (
    <div className="flex ">
      <span className="w-48 p-1 block">{label}</span>
      <div className="flex-col p-1 w-64">
        {value.map(
          (v) =>
            v && (
              <span key="v" className="w-64 block pl-2 pt-1 pb-1 pr-1">
                {v}
              </span>
            )
        )}
      </div>
    </div>
  );
}

export default AreaMapClickPopupRowMultiValue