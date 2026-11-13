/* Final de recorrido · Avatares del equipo.
   Estilo "Micah" de Micah Lanier (CC BY 4.0), servido por DiceBear. Se piden en PNG
   chico (32 px) y se agrandan con image-rendering: pixelated para que se vean 8 bits. */

const AV_BASE = "https://api.dicebear.com/9.x/micah/png?size=32&hair=full&baseColor=f1c3a5&mouth=smile&eyes=smiling" +
  "&facialHairProbability=0&glassesProbability=0&earringsProbability=0";
const AVATARS = [
  { hair: "5c3550", shirt: "5b3f8c", bg: "24185c" },
  { hair: "2e1d17", shirt: "5f6b3c", bg: "0c3c24" },
  { hair: "6b4a32", shirt: "b0703a", bg: "4c2808" }
];
function avatarSVG(i) {
  const a = AVATARS[i];
  const src = AV_BASE + "&hairColor=" + a.hair + "&shirtColor=" + a.shirt + "&backgroundColor=" + a.bg;
  return '<img class="avatar" src="' + src + '" alt="" width="56" height="56" loading="eager" decoding="async">';
}
