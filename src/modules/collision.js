export const collision = (coord) => {
    if (coord == 0) {
        return true;
    } 
    throw new Error("Place occupied");
}