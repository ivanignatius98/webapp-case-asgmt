
import { useRef } from 'react';

const Tooltip = ({ children, tooltipText, orientation = "bottom", showPointer = true, additionalContainerClass = "", show = true }) => {
  const tipRef = useRef(null);

  const handleShow = () => {
    if (tipRef.current != null) {
      tipRef.current.style.opacity = "1";
    }
  }
  const handleHide = () => {
    if (tipRef.current != null) {
      tipRef.current.style.opacity = "0";
    }
  }
  const containerPosition = {
    right: 'top-[25%] left-full ml-2',
    left: 'top-[25%] right-full mr-2',
    top: 'bottom-[85%] left-[50%] translate-x-[-50%] -translate-y-2',
    bottom: 'top-[85%] left-[50%] translate-x-[-50%] translate-y-2',
  }
  const pointerPosition = {
    right: 'left-[-6px]',
    left: 'right-[-6px]',
    top: 'top-full left-[50%] translate-x-[-50%] -translate-y-2',
    bottom: 'bottom-full left-[50%] translate-x-[-50%] translate-y-2'
  }
  const classContainer = `w-max absolute z-10 ${containerPosition[orientation]} bg-gray-600 text-white text-[10px] px-2 py-1 rounded flex items-center transition-all duration-150 pointer-events-none`
  const pointerClasses = `bg-gray-600 h-3 w-3 absolute z-10 ${pointerPosition[orientation]} rotate-45 pointer-events-none`

  return (
    <div
      className={`relative flex items-center ${additionalContainerClass}`}
      onMouseEnter={handleShow}
      onMouseLeave={handleHide}
      onClick={handleHide}
    >
      {children}
      {show ?
        <div
          className={classContainer}
          style={{ opacity: 0 }}
          ref={tipRef}
        >
          {showPointer ? <div className={pointerClasses} /> : null}
          {tooltipText}
        </div>
        : null}
    </div>
  );
}
export default Tooltip;
