import { useState, useEffect, useCallback } from "react";

function useHeight(elementRef) {
  const [height, setHeight] = useState(null);

  const updateHeight = useCallback(() => {
    if (elementRef && elementRef.current) {
      const { height } = elementRef.current.getBoundingClientRect();
      setHeight( height);
      
    }
  }, [elementRef]);

  useEffect(() => {
    updateHeight();
    window.addEventListener("transitionstart", updateHeight);
    return () => {
      window.removeEventListener("transitionstart", updateHeight);
    };
  }, [updateHeight]);
  return [height];
}

export default useHeight;