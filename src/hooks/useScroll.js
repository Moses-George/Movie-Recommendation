import { useState, useCallback } from "react";

const useScroll = () => {

    const [isScrolling, setIsScrolling] = useState(false);

    const handleMouseOver = useCallback(() => {
        setIsScrolling(true);
    }, []);

    const handleMouseOut = useCallback(() => {
        setIsScrolling(false);
    }, []);

    return {isScrolling, handleMouseOver, handleMouseOut}
}

export default useScroll;