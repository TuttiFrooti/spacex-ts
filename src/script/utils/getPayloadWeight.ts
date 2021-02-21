export const constructPayloadWeight = (weightKg: string, weightLb: string) => {
  let payloadWeightKg = weightKg ? `${weightKg}kg` : null;
  let payloadWeightLb = weightLb ? `${weightLb}lbs` : null;

  if (payloadWeightKg && payloadWeightLb) {
    return `${payloadWeightKg} / ${payloadWeightLb}`;
  } else if (payloadWeightKg && !payloadWeightLb) {
    return payloadWeightKg;
  } else if (!payloadWeightKg && payloadWeightLb) {
    return payloadWeightLb;
  } else {
    return "Unknown";
  }
};