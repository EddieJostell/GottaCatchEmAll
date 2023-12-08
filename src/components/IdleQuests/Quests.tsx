export interface Quest {
  questName: string;
  aboutQuest: string;
  completionPercentage: number;
  reward: {
    coins: number;
  };
  timer: number;
}

export const quests: Quest[] = [
  {
    questName: "Obsidian Fieldlands",
    aboutQuest: "Find Berries",
    completionPercentage: 5,
    reward: {
      coins: 5,
    },
    timer: 11000,
  },
  {
    questName: "Mystic Mountains",
    aboutQuest: "Discover Hidden Treasures",
    completionPercentage: 80,
    reward: {
      coins: 8,
    },
    timer: 6000,
  },
  {
    questName: "Eddies Bedroom",
    aboutQuest: "Find Arceus",
    completionPercentage: 50,
    reward: {
      coins: 100,
    },
    timer: 51000,
  },
  {
    questName: "Fortress",
    aboutQuest: "Find Arceus",
    completionPercentage: 50,
    reward: {
      coins: 100,
    },
    timer: 51000,
  },
];
