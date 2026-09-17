/**
 * Organisations listed in the supplied content.
 *
 * Logos are displayed ONLY when `logo` is set to an approved asset for which
 * permission is available. Otherwise the name is rendered typographically.
 */
export type Organisation = { name: string; logo?: { src: string; width: number; height: number } };

export const organisationsCopy = {
  headline: ["Trusted by", "organisations across industries"],
};

export const organisations: Organisation[] = [
  "Hyundai",
  "Royal Enfield",
  "Apollo Tyres",
  "Michelin India",
  "L&T Construction",
  "Bosch",
  "Danfoss",
  "Wipro",
  "TCS",
  "Cognizant",
  "Tech Mahindra",
  "Apollo Hospitals",
  "Rela Hospital",
  "HDFC Bank",
  "Indian Bank",
  "UCO Bank",
  "Tata Consumer Products",
  "Murugappa Group",
  "Gulf Oil",
].map((name) => ({ name }));
