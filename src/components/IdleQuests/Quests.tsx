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
      coins: 10,
    },
    timer: 11000,
  },
  {
    questName: "Eddies Bedroom",
    aboutQuest: "Find Arceus",
    completionPercentage: 50,
    reward: {
      coins: 15,
    },
    timer: 11000,
  },
  {
    questName: "Fortress",
    aboutQuest: "Find Developer",
    completionPercentage: 55,
    reward: {
      coins: 20,
    },
    timer: 11000,
  },
];
