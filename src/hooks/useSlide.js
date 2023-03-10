import { useState } from "react";

const useSlide = (data) => {

    const [scrollX, setScrollX] = useState(-400);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(Math.round(window.innerWidth / 2));

        if (x > 0) {
            x = 0;
        }

        setScrollX(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);

        let movie_card_width = 207;

        let listWidth = data.length * movie_card_width;

        if ((window.innerWidth - listWidth) > x) {
            x = (window.innerWidth - listWidth);
        }

        setScrollX(x)
    }

    return {scrollX, handleLeftArrow, handleRightArrow};
}

export default useSlide;