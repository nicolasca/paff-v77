const ordres = [
  {
    "faction": "Commun",
    "nom": "Mouvement",
    "description": "Vous pouvez déplacer de 0 à 2 unités adjacentes de votre armées. Si ces unités sont engagés en combat, elle subissent autant de dégât que de classe d'armure des unités ennemis avec lesquelles elles étaient engagées.",
    "limite": 3,
    "recuperable": 1
  },
  {
    "faction": "Commun",
    "nom": "Défense",
    "description": "Vous pouvez désignez de 0 à 2 de vos unités adjacentes qui défendront lors de ce tour (Une unité qui défend encaisse 1 dégâts en moins par attaque ou par tir (hors artillerie), inflige 1 dégât en moins par attaque et ne peut pas tirer jusqu'à la fin du tour).",
    "limite": 3,
    "recuperable": 1
  },
  {
    "faction": "Commun",
    "nom": "Renforcement",
    "description": "Vous pouvez, pour 0 à 2 de vos unités non engagées en combat, transférez des points de R vers des unités identiques adjacentes (engagées en combat ou non), jusqu'à la limite de point de R de l'unité. Attention: vous ne pouvez pas transférez ainsi des points de R vers plusieurs unités adjacentes, juste un rapport de 1 pour 1.",
    "limite": 3,
    "recuperable": 1
  },
  {
    "faction": "Commun",
    "nom": "Tir",
    "description": "Vous pouvez faire tirer de 0 à 2 unités adjacentes de votre armées (hors artilleries).",
    "limite": 5,
    "recuperable": 0
  },
  {
    "faction": "Commun",
    "nom": "Tir Artillerie",
    "description": "Vous pouvez faire tirer de 0 à 2 unités adjacentes de type Artillerie de votre armées.",
    "limite": 2,
    "recuperable": 0
  },
  {
    "faction": "Commun",
    "nom": "Réserve",
    "description": "Vous pouvez faire rentrer sur votre zone Arrière (ou zone Base sur une colonne où vous avez déjà une unité en zone Arrière) des unités de type troupe, tir ou cavalerie de votre réserve d'un coût total inférieur ou égal à 3 points de recrutement. Ces unités doivent rentrer sur des emplacements adjacents.",
    "limite": 2,
    "recuperable": 0
  },
  {
    "faction": "Commun",
    "nom": "Mouvement total",
    "description": "Vous pouvez déplacer autant d'unités de votre armées (non engagées en combat) que vous souhaitez.",
    "limite": 1,
    "recuperable": 0
  },
  {
    "faction": "Peaux-vertes",
    "nom": "Tir Gobelin en mêlée",
    "description": "Vous pouvez faire tirer autant de vos unités d'Archers Gobelins que vous souhaitez dans un combat incluant l'une de vos Troupes de Gobelins et au moins une unité adverse. Votre unité et l'une des unités adverses engagées en combat de votre choix subissent le tir (s'ils sont à portés).",
    "limite": 1,
    "recuperable": 0
  },
  {
    "faction": "Peaux-vertes",
    "nom": "Course effrenée",
    "description": "Vous pouvez déplacez d'un emplacement supplémentaire de 0 à 2 de vos unités adjacentes qui se sont déjà déplacé ce tour-ci.",
    "limite": 1,
    "recuperable": 0
  },
  {
    "faction": "Peaux-vertes",
    "nom": "Rage verte",
    "description": "Vous pouvez désigner autant d'unité que vous avez de shaman dans votre armée, ces unités infligent 1 dégât supplémentaire en attaque lors de ce tour.",
    "limite": 1,
    "recuperable": 0
  },
  {
    "faction": "Peaux-vertes",
    "nom": "Charge féroce",
    "description": "Vous pouvez déplacez de 0 à 2 de vos unités adjacentes qui peuvent charger immédiatement. Le combat est alors résolu durant la phase de programmation et non durant la phase de combat.",
    "limite": 1,
    "recuperable": 0
  },
  {
    "faction": "Peaux-vertes",
    "nom": "Grosse invokation",
    "description": "Vous pouvez sélectionnez une unité ennemie sur le champ de bataille, infligez à cette unité les dégâts suivant I:2 / II:1 / III:1/5 par unité de Shaman rallié que vous avez sur le champ de bataille. Puis, lancez un dé 6 pour chaque shaman ayant participé, sur un résultat de 3-, défaussez l'unité de shaman.",
    "limite": 1,
    "recuperable": 0
  },
  {
    "faction": "Sephosi",
    "nom": "Repli stratégique",
    "description": "Vous pouvez déplacer de 0 à 2 de vos unités adjacentes engagées en combat sans subir de dégâts.",
    "limite": 1,
    "recuperable": 0
  },
  {
    "faction": "Sephosi",
    "nom": "Tir concentré Sephosien",
    "description": "Vous pouvez faire tirer de 0 à 2 unités adjacentes de votre armées (hors artilleries) sur une même unité adverse, cette unité subira 1 dégât supplémentaire par tir.",
    "limite": 1,
    "recuperable": 0
  },
  {
    "faction": "Sephosi",
    "nom": "Pour la Sephosi !",
    "description": "Toutes vos unités en fuite réussissent automatiquement leur test de moral.",
    "limite": 1,
    "recuperable": 0
  },
  {
    "faction": "Sephosi",
    "nom": "Défense total",
    "description": "Vous pouvez désignez autant d'unités que vous souhaitez qui défendront lors de tour.",
    "limite": 1,
    "recuperable": 0
  },
  {
    "faction": "Sephosi",
    "nom": "Tir artillerie total",
    "description": "Vous pouvez faire tirer autant d'unité de type Artillerie de votre armées que vous souhaitez.",
    "limite": 1,
    "recuperable": 0
  },
  {
    "faction": "Gaeli",
    "nom": "Protection des Esprits",
    "description": "Vous pouvez désigner de 0 à 2 de vos unités adjacentes qui ont chacunes au moins une unité d'Esprit des bois adjacente. Jsuqu'à la fin du tour, tous les dégâts infligés à ces unités le sont sur les unités d'Esprit des Bois adjacentes (jusq'au maximum de points de R restants aux Esprits des Bois).",
    "limite": 1,
    "recuperable": 0
  },
  {
    "faction": "Gaeli",
    "nom": "Tir long Gaelien",
    "description": "Vous pouvez désigner de 0 à 2 de vos unités adjacentes d'Archers longs Gaeliens, ces unités effectuent un tir à portée 4 au lieu de 3.",
    "limite": 1,
    "recuperable": 0
  },
  {
    "faction": "Gaeli",
    "nom": "Transe mortelle",
    "description": "Vous pouvez désigner de 0 à 2 de vos unités adjacentes de Sorl Caleit. Tout les dégâts que ces unité vont recevoir au tir lors de ce tour ne leur seront imputés qu'à la fin de ce tour.",
    "limite": 1,
    "recuperable": 0
  },
  {
    "faction": "Gaeli",
    "nom": "Sacrifice Druidique",
    "description": "Vous pouvez désigner de 0 à 2 de vos unités adjacentes de Druide, ces unités peuvent se déplacer et effectuer un tir à portée 1 infligeant 3 dégâts à l'unité ciblée. Après le tir, défaussez les unités de Druides concernées.",
    "limite": 1,
    "recuperable": 0
  },
  {
    "faction": "Gaeli",
    "nom": "Invocation des Vents",
    "description": "Jouez cet ordre si vous avez au moins une unité de Druide rallié sur le champ. Les unités ennemies et alliées infligent 2 dégâts de moins quand elles tirent, jusqu'à la fin du tour.",
    "limite": 1,
    "recuperable": 0
  },
  {
    "faction": "Liches",
    "nom": "Renforcement totale",
    "description": "Vous pouvez autant d'unités non engagées en combat que vous souhaitez, transférez des points de R vers des unités identiques adjacentes (engagées en combat ou non), jusqu'à la limite de point de R de l'unité. Attention: vous ne pouvez pas transférez ainsi des points de R vers plusieurs unités adjacentes, juste un rapport de 1 pour 1.",
    "limite": 1,
    "recuperable": 0
  },
  {
    "faction": "Liches",
    "nom": "Invocation de Squelette",
    "description": "Vous pouvez désigner un emplacement vide à portée 4 d'une de vos unités de Liches, Seigneur Liche ou Roi Liche et déployer une unité de Guerrier Squelettes depuis votre réserve. Cette unité ne peut pas bouger jusqu'à la fin du tour mais peut combattre et charger.",
    "limite": 1,
    "recuperable": 0
  },
  {
    "faction": "Liches",
    "nom": "Réserve inépuisable",
    "description": "Vous pouvez déployer jusqu'à 2 unités de Guerriers Squelettes depuis votre réserve à portée 1 d'une de vos unités de Liches, Seigneur Liche ou Roi Liche.",
    "limite": 1,
    "recuperable": 0
  },
  {
    "faction": "Liches",
    "nom": "Sortilège de renforcement",
    "description": "Vous pouvez sélectionner de 0 à 3 unités de Guerriers Squelettes à portée 1 d'une de vos unités de Liches, Seigneur Liche ou Roi Liche. Ces unités récupèrent 1 points de R, sans pouvoir dépasser leur limite de point de R.",
    "limite": 1,
    "recuperable": 0
  },
  {
    "faction": "Liches",
    "nom": "Sortilège d'affaiblissement",
    "description": "Vous pouvez désigner l'une de vos unités de Liches, Seigneur Liche ou Roi Liche et la faire tirer. Au lieu de subir les dégâts ou effets du tir, l'unité visée est considérée comme ayant une classe d'armure inférieur d'un cran à ce qu'elle a jusqu'à la fin du tour. (Si elle était à I, l'unité reste à I).",
    "limite": 1,
    "recuperable": 0
  }
]