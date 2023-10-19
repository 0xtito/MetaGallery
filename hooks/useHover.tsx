import { useMemo, useState } from "react";

// Hook from @cc-bbohlender at https://github.com/coconut-xr
function useHover() {
  const [isHovered, setIsHovered] = useState(false);

  const hoverProps = useMemo(
    () => ({
      onPointerEnter: () => setIsHovered(true),
      onPointerLeave: () => setIsHovered(false),
    }),
    []
  );

  return { isHovered, setIsHovered, hoverProps };
}

export default useHover;
