export const truncateMissionName = (nameString: string) => {
  let name: string[] = nameString.split(" ");
  
  if (!!name[1] && name[1].length < 2) {
    if (!!parseInt(name[1])) {
      return `${name[0]} ${name[1]}`;
    } else {
      return name[0];
    }
  } else {
    return name[0];
  }
};