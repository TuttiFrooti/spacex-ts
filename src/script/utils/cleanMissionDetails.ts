export const cleanMissionDetails = (details: string) => {
  if (details) {
    return details.slice(0, 60) + "...";
  } else {
    return "None";
  }
};
