import { useDeckStore } from "./card-deck/card-deck-store/card-deck.store";

const funFacts = [
  "Tu oublies la majorité de ce que tu vis… en quelques heures. La courbe de l’oubli d’Ebbinghaus montre qu’on perd jusqu’à 70 % d’une information en 24 h si on ne la révise pas.",
  "La mémoire n’est pas une caméra : elle réécrit le passé. Chaque fois que tu te souviens d’un événement, tu le reconstruis, et tu modifies légèrement le souvenir.",
  "On peut se souvenir de choses… qui n’ont jamais existé. Le cerveau peut créer des faux souvenirs très convaincants, même chez des personnes sûres d’elles.",
  "Ton cerveau se souvient mieux des échecs que des réussites. C’est un biais évolutif : retenir les erreurs augmentait les chances de survie.",
  "Les odeurs sont les “cheat codes” de la mémoire. Le bulbe olfactif est directement connecté aux zones émotionnelles et mnésiques → d’où les souvenirs ultra-vivants déclenchés par une odeur.",
  "Tu te souviens mieux de la première et de la dernière chose d’une liste. Effets de primauté et récence. Le milieu ? Sacrifié.",
  "La mémoire de travail est minuscule. En moyenne, on ne peut garder que 4 éléments en tête à la fois (pas 7, ça c’était une vieille estimation).",
  "Les émotions “taguent” les souvenirs. Plus une expérience est chargée émotionnellement, plus elle est mémorisée durablement — même si les détails deviennent faux.",
  "Tu te souviens mieux des choses absurdes. Le cerveau adore l’incongru. Une girafe en smoking ? Mieux retenue qu’un numéro de téléphone.",
  "Dormir, c’est sauvegarder. Pendant le sommeil profond, le cerveau “transfère” les souvenirs du stockage temporaire vers le stockage long terme.",
  "On peut apprendre pendant le sommeil… mais seulement des sons. Pas de cours de maths en dormant, mais on peut associer des sons à des odeurs ou des émotions.",
  "La mémoire musculaire n’est pas dans les muscles. C’est une forme d’apprentissage moteur… stockée dans le cerveau et la moelle épinière.",
  "Les souvenirs d’enfance avant 3 ans sont presque tous faux. C’est l’amnésie infantile : le cerveau n’était pas encore prêt pour la mémoire autobiographique.",
  "Tu oublies plus vite ce qui t’ennuie que ce qui t’énerve.",
  "Lire dans une autre langue améliore la mémorisation.",
  "Se parler à soi-même à voix haute améliore la mémoire de 20 à 30 %.",
];

export function getRandomFunFact() {
  const pool = [...funFacts];
  const { config } = useDeckStore.getState();
  if (config.includeCats) {
    pool.push(...catFunFacts);
  }
  if (config.includeAquatic) {
    pool.push(...aquaticFunFacts);
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

const catFunFacts = [
  "Les chats retiennent des événements pendant des années, surtout ceux liés à la nourriture, aux dangers et… aux humains qui les traitent bien (ou mal). Ils ne sont pas rancuniers, mais ils n’oublient pas.",
  "Un chat retiendra plus facilement comment ouvrir une porte que où est rangé son jouet. C’est littéralement un cerveau optimisé pour les bêtises.",
  "Les chats reconnaissent les humains par la voix, l’odeur et les routines, pas par le visage. Donc si ton chat te regarde comme un inconnu quand tu changes de parfum, c’est normal.",
  "Un bruit de sac plastique qui les a surpris une fois ? Ils éviteront cet endroit pendant des semaines. Leur cerveau est câblé pour la survie, pas pour la dignité.",
  "Les chats n’ont pas de montre, mais ils ont une mémoire temporelle basée sur la lumière, les routines, et les micro-habitudes humaines. C’est pour ça qu’ils savent à la minute près quand c’est l’heure de manger.",
  "Un chat peut apprendre à ouvrir une poignée, activer un robinet, ou comprendre comment fonctionne un distributeur… juste en te regardant une ou deux fois. Et ensuite, c’est fini pour ta tranquillité.",
  "Comme les humains, les chats consolident leurs souvenirs pendant le sommeil paradoxal. Donc oui : ton chat rêve probablement de toi… ou de chasser un pigeon géant.",
  "Les chats reconnaissent l’odeur et la voix d’un ancien humain après de longues séparations. C’est l’un des rares points où leur mémoire émotionnelle est très forte.",
  "Ils construisent une carte mentale de leur territoire : obstacles, hauteurs, chemins rapides, zones sûres. C’est pour ça qu’ils peuvent se déplacer dans le noir sans rien renverser… sauf quand ils veulent attirer ton attention.",
  "Un chat stressé retient moins bien. Un chat en confiance retient beaucoup mieux. C’est scientifiquement prouvé : les câlins améliorent la mémoire féline.",
];

const aquaticFunFacts = [
  "Le mythe des “3 secondes de mémoire” est totalement faux. Les poissons rouges peuvent se souvenir d’un événement pendant plusieurs mois.",
  "Les poissons rouges peuvent apprendre à reconnaître leur humain, distinguer des formes, des couleurs, et même venir quand on les appelle (conditionnement sonore).",
  "Les poissons-archers, ceux qui tirent des jets d’eau pour faire tomber des insectes, peuvent reconnaître des visages humains avec une précision étonnante.",
  "Les labres nettoyeurs (petits poissons de récif) se souviennent pendant au moins 24 heures des clients qu’ils ont “arnaqués” (en mordillant au lieu de nettoyer). Ils évitent ensuite ces clients pour ne pas perdre leur réputation.",
  "Les saumons mémorisent l’odeur exacte de leur rivière natale et peuvent la retrouver des années plus tard, après des milliers de kilomètres.",
  "Les poulpes ont une mémoire à court et long terme, et peuvent résoudre des puzzles, ouvrir des bocaux, et même se souvenir de la solution plusieurs jours plus tard.",
  "Ils reconnaissent les humains individuellement et peuvent aimer ou détester certains soigneurs.",
  "Un poulpe peut apprendre en observant un autre poulpe — un comportement rare chez les animaux.",
  "Leur mémoire est distribuée : deux tiers de leurs neurones sont dans leurs bras, qui peuvent apprendre des choses indépendamment du cerveau central.",
  "Les dauphins ont la plus longue mémoire sociale connue chez les animaux : ils peuvent reconnaître le “sifflement signature” d’un ancien compagnon 20 ans plus tard.",
  "Ils se souviennent des alliances, des conflits, et des individus fiables ou non — un vrai Game of Thrones sous-marin.",
  "Les requins peuvent mémoriser des routes, des zones de chasse et des signaux visuels pendant des semaines.",
  "Certains requins de récif apprennent à reconnaître des plongeurs spécifiques et reviennent vers eux régulièrement.",
  "Les coquillages n’ont pas de cerveau, donc pas de mémoire au sens classique.",
  "Les escargots de mer (Aplysie) peuvent apprendre à associer un stimulus à une récompense ou une punition. Leur mémoire peut durer des jours, malgré un système nerveux minuscule.",
  "Les huîtres et moules n’ont pas de mémoire cognitive, mais elles ont une mémoire biologique : elles ajustent leur rythme d’ouverture/fermeture en fonction de cycles lumineux ou de marées passées.",
  "Les crabes peuvent se souvenir d’un danger pendant au moins 24 heures et modifier leur comportement.",
  "Les écrevisses montrent des réactions proches de l’anxiété après un stress, et leur mémoire du danger influence leur comportement futur.",
  "Des études montrent que certains poissons peuvent distinguer Bach de Stravinsky, et s’en souvenir.",
  "Certains poissons apprennent à associer une mélodie à un repas, et reviennent quand on rejoue la musique.",
];
