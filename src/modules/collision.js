export const collision = (coord) => {
  if (coord !== 0) {
      throw new Error("Place occupied");
  }
};
