
const questlines = {
  // PRESTIGE 0 - Basic Junk Gameplay & Intro Tech
  prestige_0: {
    header: "The Awakening",
    description: "Welcome to the wasteland. Time to learn the basics of survival.",
    quests: [
      {
        id: 'first_click',
        name: 'Digital Archaeology',
        description: 'Click the junk pile to begin your descent into technological madness.',
        requirements: { junk: 1 },
        rewards: { junk: 50 },
        completed: false,
        oneTime: true
      },
      {
        id: 'hundred_junk',
        name: 'Hoarder\'s Apprentice',
        description: 'Accumulate 100 junk. Every empire starts with a single broken toaster.',
        requirements: { junk: 100 },
        rewards: { junk: 200 },
        completed: false,
        oneTime: true
      },
      {
        id: 'first_upgrade',
        name: 'Upgrade or Die',
        description: 'Purchase your first upgrade from the store. Progress demands sacrifice.',
        requirements: { purchaseAnyUpgrade: true },
        rewards: { junk: 500 },
        completed: false,
        oneTime: true
      },
      {
        id: 'thousand_junk',
        name: 'Junk Accumulator',
        description: 'Reach 1,000 junk. You\'re either dedicated or have questionable life choices.',
        requirements: { junk: 1000 },
        rewards: { junk: 1000 },
        completed: false,
        oneTime: true
      },
      {
        id: 'click_enhancer',
        name: 'Click Enhancement Initiative',
        description: 'Purchase the Click Enhancer. Make your clicks feel important.',
        requirements: { ownedItems: { 'Click Enhancer': 1 } },
        rewards: { junk: 2000 },
        completed: false,
        oneTime: true
      },
      {
        id: 'ten_thousand_junk',
        name: 'Digital Packrat',
        description: 'Amass 10,000 junk. Your hoarding skills are becoming legendary.',
        requirements: { junk: 10000 },
        rewards: { junk: 5000 },
        completed: false,
        oneTime: true
      },
      {
        id: 'multiple_upgrades',
        name: 'Upgrade Enthusiast',
        description: 'Own 3 different types of upgrades. Diversify your junk portfolio.',
        requirements: { upgradeTypes: 3 },
        rewards: { junk: 7500 },
        completed: false,
        oneTime: true
      },
      {
        id: 'fifty_thousand_junk',
        name: 'Junk Magnate',
        description: 'Collect 50,000 junk. You\'re starting to concern your neighbors.',
        requirements: { junk: 50000 },
        rewards: { junk: 10000 },
        completed: false,
        oneTime: true
      },
      {
        id: 'auto_clicker',
        name: 'Automation Dreams',
        description: 'Purchase an Auto Clicker. Let the machines do the work.',
        requirements: { ownedItems: { 'Auto Clicker V1': 1 } },
        rewards: { junk: 15000 },
        completed: false,
        oneTime: true
      },
      {
        id: 'hundred_thousand_junk',
        name: 'Junk Overlord',
        description: 'Reach 100,000 junk. Your collection defies several laws of physics.',
        requirements: { junk: 100000 },
        rewards: { junk: 25000 },
        completed: false,
        oneTime: true
      },
      {
        id: 'first_tech_unlock',
        name: 'Technological Awakening',
        description: 'Unlock your first technology in the Tech Tree. Knowledge is power.',
        requirements: { techUnlocked: 1 },
        rewards: { junk: 30000 },
        completed: false,
        oneTime: true
      },
      {
        id: 'crafting_materials',
        name: 'Resource Gatherer',
        description: 'Collect basic crafting materials: 5 Wires, 3 Metal Plates, 2 Gear Bits.',
        requirements: { 
          craftingInventory: { 
            'Wires': 5, 
            'Metal Plates': 3, 
            'Gear Bits': 2 
          } 
        },
        rewards: { junk: 20000 },
        completed: false,
        oneTime: true
      },
      {
        id: 'prestige_preparation',
        name: 'Ascension Candidate',
        description: 'Accumulate 500,000 junk. You\'re ready for something bigger.',
        requirements: { junk: 500000 },
        rewards: { 
          craftingInventory: { 'Scrap Core': 1, 'Wires': 10, 'Metal Plates': 5 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'first_prestige_crystal',
        name: 'Forge the Future',
        description: 'Craft your first Ascension Crystal. Transcend your current existence.',
        requirements: { 
          craftItem: 'Ascension Crystal',
          craftingInventory: { 
            'Scrap Core': 1, 
            'Wires': 10, 
            'Metal Plates': 5 
          }
        },
        rewards: { prestige: true },
        completed: false,
        oneTime: true
      }
    ]
  },

  // PRESTIGE 1 - Automation & Base Upgrades
  prestige_1: {
    header: "The Automation Age",
    description: "You've tasted power. Now learn to delegate to machines.",
    quests: [
      {
        id: 'post_prestige_start',
        name: 'Phoenix Rising',
        description: 'Begin your second iteration. You know things now.',
        requirements: { prestigeCount: 1 },
        rewards: { tronics: 50 },
        completed: false,
        oneTime: true
      },
      {
        id: 'tronics_clicker',
        name: 'Electric Dreams',
        description: 'Unlock the Tronics Clicker. Harness unstable energy.',
        requirements: { techUnlocked: 'First Node' },
        rewards: { tronics: 100 },
        completed: false,
        oneTime: true
      },
      {
        id: 'hundred_tronics',
        name: 'Energy Harvester',
        description: 'Generate 100 Tronics. Feel the power coursing through broken circuits.',
        requirements: { tronics: 100 },
        rewards: { tronics: 200 },
        completed: false,
        oneTime: true
      },
      {
        id: 'electro_store_access',
        name: 'High Voltage Shopping',
        description: 'Access the Electro Store. Where normal money isn\'t welcome.',
        requirements: { storeAccess: 'electrostore' },
        rewards: { tronics: 300 },
        completed: false,
        oneTime: true
      },
      {
        id: 'advanced_automation',
        name: 'Delegation Protocol',
        description: 'Purchase Auto Clicker V2. Because V1 wasn\'t clicking hard enough.',
        requirements: { ownedItems: { 'Auto Clicker V2': 1 } },
        rewards: { tronics: 500 },
        completed: false,
        oneTime: true
      },
      {
        id: 'drone_deployment',
        name: 'Aerial Supremacy',
        description: 'Deploy your first Junk Drone. Let them handle the heavy lifting.',
        requirements: { ownedItems: { 'Junk Drone': 1 } },
        rewards: { 
          tronics: 750,
          craftingInventory: { 'Capacitor': 2 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'thousand_tronics',
        name: 'Voltage Virtuoso',
        description: 'Accumulate 1,000 Tronics. You\'re starting to glow slightly.',
        requirements: { tronics: 1000 },
        rewards: { tronics: 1000 },
        completed: false,
        oneTime: true
      },
      {
        id: 'multiple_drones',
        name: 'Swarm Intelligence',
        description: 'Own 3 different drone types. Build your mechanical army.',
        requirements: { droneTypes: 3 },
        rewards: { 
          tronics: 1500,
          craftingInventory: { 'Gear Bits': 15 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'surge_experience',
        name: 'Ride the Lightning',
        description: 'Experience your first Tronics Surge. Embrace the chaos.',
        requirements: { tronicsSurgeTriggered: true },
        rewards: { tronics: 2000 },
        completed: false,
        oneTime: true
      },
      {
        id: 'ten_thousand_tronics',
        name: 'Electric Mogul',
        description: 'Reach 10,000 Tronics. Your power bills are now theoretical.',
        requirements: { tronics: 10000 },
        rewards: { 
          tronics: 5000,
          craftingInventory: { 'Encrypted Coil': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'advanced_crafting',
        name: 'Master Craftsman',
        description: 'Craft 5 different items. Your workshop is taking shape.',
        requirements: { itemsCrafted: 5 },
        rewards: { 
          tronics: 7500,
          craftingInventory: { 'Signal Mesh': 2 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'fifty_thousand_tronics',
        name: 'Voltage Overlord',
        description: 'Generate 50,000 Tronics. You\'ve achieved electrical enlightenment.',
        requirements: { tronics: 50000 },
        rewards: { 
          tronics: 20000,
          craftingInventory: { 'Surge Capacitor': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'automation_mastery',
        name: 'Efficiency Expert',
        description: 'Own 10 automation upgrades. Let the machines handle everything.',
        requirements: { automationUpgrades: 10 },
        rewards: { 
          tronics: 25000,
          craftingInventory: { 'Chrono Regulator': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'second_crystal_prep',
        name: 'Evolution Candidate',
        description: 'Prepare for your second ascension. Gather the required components.',
        requirements: { 
          tronics: 100000,
          craftingInventory: { 
            'Encrypted Coil': 1, 
            'Surge Capacitor': 1, 
            'Capacitor': 5 
          }
        },
        rewards: { 
          craftingInventory: { 'Glitched Scrap Core': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'second_ascension_crystal',
        name: 'Voltage Ascension',
        description: 'Craft an Enhanced Ascension Crystal. Evolve beyond mere automation.',
        requirements: { 
          craftItem: 'Enhanced Ascension Crystal',
          craftingInventory: { 
            'Glitched Scrap Core': 1, 
            'Encrypted Coil': 1, 
            'Surge Capacitor': 1 
          }
        },
        rewards: { prestige: true },
        completed: false,
        oneTime: true
      }
    ]
  },

  // PRESTIGE 2 - Crew Menu & Scratz Store
  prestige_2: {
    header: "The Human Element",
    description: "Machines are efficient, but humans bring chaos and creativity.",
    quests: [
      {
        id: 'crew_awakening',
        name: 'People Management',
        description: 'Unlock the Crew Menu. Time to deal with actual people.',
        requirements: { prestigeCount: 2 },
        rewards: { scratz: 100 },
        completed: false,
        oneTime: true
      },
      {
        id: 'first_recruitment',
        name: 'Talent Acquisition',
        description: 'Recruit your first crew member. Welcome to HR hell.',
        requirements: { crewMembers: 1 },
        rewards: { scratz: 200 },
        completed: false,
        oneTime: true
      },
      {
        id: 'scratz_store_access',
        name: 'Underground Economy',
        description: 'Access the Scratz Store. Where credits buy strange things.',
        requirements: { storeAccess: 'credstore' },
        rewards: { scratz: 300 },
        completed: false,
        oneTime: true
      },
      {
        id: 'recruitment_game_master',
        name: 'Interviewer Supreme',
        description: 'Successfully complete 5 recruitment mini-games. You can spot fakes now.',
        requirements: { recruitmentGamesWon: 5 },
        rewards: { 
          scratz: 500,
          craftingInventory: { 'Echo Helmet': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'mission_deployment',
        name: 'Field Operations',
        description: 'Send crew on their first mission. Cross your fingers.',
        requirements: { missionsCompleted: 1 },
        rewards: { scratz: 750 },
        completed: false,
        oneTime: true
      },
      {
        id: 'diverse_crew',
        name: 'Team Building',
        description: 'Recruit 3 crew members with different skill sets. Diversity is strength.',
        requirements: { 
          crewMembers: 3,
          skillDiversity: true 
        },
        rewards: { 
          scratz: 1000,
          craftingInventory: { 'Auto Toolkit': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'equipment_mastery',
        name: 'Gear Head',
        description: 'Equip your crew with 5 different items. Make them look professional.',
        requirements: { equipmentTypes: 5 },
        rewards: { 
          scratz: 1500,
          craftingInventory: { 'Reinforced Backpack': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'successful_missions',
        name: 'Mission Commander',
        description: 'Complete 10 successful missions. You\'re getting the hang of this.',
        requirements: { missionsCompleted: 10 },
        rewards: { 
          scratz: 2000,
          craftingInventory: { 'Luck Engine': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'crew_expansion',
        name: 'Small Army',
        description: 'Maintain a crew of 5 members. You need a bigger office.',
        requirements: { crewMembers: 5 },
        rewards: { 
          scratz: 2500,
          craftingInventory: { 'Compression Pack': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'scratz_accumulation',
        name: 'Credit Baron',
        description: 'Accumulate 10,000 Scratz. Your underground reputation grows.',
        requirements: { scratz: 10000 },
        rewards: { 
          scratz: 5000,
          craftingInventory: { 'Click Rig Mk1': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'mission_mastery',
        name: 'Operations Expert',
        description: 'Complete 25 missions. You run a tight ship.',
        requirements: { missionsCompleted: 25 },
        rewards: { 
          scratz: 7500,
          craftingInventory: { 'Junk Cell': 2 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'recruitment_excellence',
        name: 'Talent Scout Supreme',
        description: 'Win 20 recruitment games. You can read people like broken code.',
        requirements: { recruitmentGamesWon: 20 },
        rewards: { 
          scratz: 10000,
          craftingInventory: { 'Signal Mesh': 3 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'crew_optimization',
        name: 'Human Resources',
        description: 'Have all crew members fully equipped and trained.',
        requirements: { 
          crewFullyEquipped: true,
          crewMembers: 5 
        },
        rewards: { 
          scratz: 15000,
          craftingInventory: { 'Advanced Core': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'third_crystal_prep',
        name: 'Leadership Evolution',
        description: 'Prepare for your third ascension. Leaders need better tools.',
        requirements: { 
          scratz: 50000,
          craftingInventory: { 
            'Advanced Core': 1, 
            'Echo Helmet': 1, 
            'Auto Toolkit': 1 
          }
        },
        rewards: { 
          craftingInventory: { 'Leadership Matrix': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'third_ascension_crystal',
        name: 'Command Ascension',
        description: 'Craft a Leadership Crystal. Transcend mere management.',
        requirements: { 
          craftItem: 'Leadership Crystal',
          craftingInventory: { 
            'Leadership Matrix': 1, 
            'Advanced Core': 1, 
            'Echo Helmet': 1 
          }
        },
        rewards: { prestige: true },
        completed: false,
        oneTime: true
      }
    ]
  },

  // PRESTIGE 3 - Skills Menu
  prestige_3: {
    header: "Personal Growth",
    description: "Time to develop yourself. Even overlords need skills.",
    quests: [
      {
        id: 'skills_unlock',
        name: 'Self Improvement',
        description: 'Unlock the Skills Menu. Invest in yourself for once.',
        requirements: { prestigeCount: 3 },
        rewards: { electroShards: 50 },
        completed: false,
        oneTime: true
      },
      {
        id: 'first_skill_point',
        name: 'Learning Curve',
        description: 'Spend your first skill point. Knowledge is power.',
        requirements: { skillPointsSpent: 1 },
        rewards: { electroShards: 100 },
        completed: false,
        oneTime: true
      },
      {
        id: 'skill_tree_exploration',
        name: 'Branching Paths',
        description: 'Unlock 3 different skill branches. Diversify your abilities.',
        requirements: { skillBranches: 3 },
        rewards: { 
          electroShards: 200,
          craftingInventory: { 'Neural Mesh': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'electro_shard_generation',
        name: 'Shard Harvester',
        description: 'Generate 500 Electro Shards. Harness crystallized potential.',
        requirements: { electroShards: 500 },
        rewards: { 
          electroShards: 300,
          craftingInventory: { 'Power Amplifier': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'skill_mastery_basic',
        name: 'Competency Achieved',
        description: 'Reach level 5 in any skill. You\'re getting good at this.',
        requirements: { skillLevel: 5 },
        rewards: { 
          electroShards: 500,
          craftingInventory: { 'Focus Crystal': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'multiple_skill_investment',
        name: 'Well Rounded',
        description: 'Have points in 5 different skills. Jack of all trades.',
        requirements: { skillsInvested: 5 },
        rewards: { 
          electroShards: 750,
          craftingInventory: { 'Skill Enhancer': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'shard_accumulation',
        name: 'Crystal Collector',
        description: 'Accumulate 2,000 Electro Shards. Your potential crystallizes.',
        requirements: { electroShards: 2000 },
        rewards: { 
          electroShards: 1000,
          craftingInventory: { 'Memory Core': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'skill_synergy',
        name: 'Synergistic Growth',
        description: 'Reach level 3 in 3 different skills. Balanced development.',
        requirements: { 
          skillsAtLevel: { level: 3, count: 3 }
        },
        rewards: { 
          electroShards: 1250,
          craftingInventory: { 'Synergy Node': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'advanced_skill_mastery',
        name: 'Expert Level',
        description: 'Reach level 10 in any skill. True expertise.',
        requirements: { skillLevel: 10 },
        rewards: { 
          electroShards: 1500,
          craftingInventory: { 'Mastery Token': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'skill_point_accumulation',
        name: 'Point Hoarder',
        description: 'Spend 25 skill points total. Investment in yourself.',
        requirements: { skillPointsSpent: 25 },
        rewards: { 
          electroShards: 2000,
          craftingInventory: { 'Growth Matrix': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'shard_mastery',
        name: 'Crystal Tycoon',
        description: 'Generate 10,000 Electro Shards. You\'re drowning in potential.',
        requirements: { electroShards: 10000 },
        rewards: { 
          electroShards: 5000,
          craftingInventory: { 'Quantum Capacitor': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'skill_tree_completion',
        name: 'Renaissance Person',
        description: 'Have points in every available skill tree. Complete development.',
        requirements: { allSkillsInvested: true },
        rewards: { 
          electroShards: 7500,
          craftingInventory: { 'Enlightenment Core': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'master_of_skills',
        name: 'Skill Virtuoso',
        description: 'Reach level 15 in any skill. Legendary competence.',
        requirements: { skillLevel: 15 },
        rewards: { 
          electroShards: 10000,
          craftingInventory: { 'Perfection Matrix': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'fourth_crystal_prep',
        name: 'Transcendence Preparation',
        description: 'Prepare for your fourth ascension. Mastery demands elevation.',
        requirements: { 
          electroShards: 25000,
          craftingInventory: { 
            'Enlightenment Core': 1, 
            'Perfection Matrix': 1, 
            'Quantum Capacitor': 1 
          }
        },
        rewards: { 
          craftingInventory: { 'Transcendence Catalyst': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'fourth_ascension_crystal',
        name: 'Mastery Ascension',
        description: 'Craft a Mastery Crystal. Transcend all previous limitations.',
        requirements: { 
          craftItem: 'Mastery Crystal',
          craftingInventory: { 
            'Transcendence Catalyst': 1, 
            'Enlightenment Core': 1, 
            'Perfection Matrix': 1 
          }
        },
        rewards: { prestige: true },
        completed: false,
        oneTime: true
      }
    ]
  },

  // PRESTIGE 4 - Scraptagon
  prestige_4: {
    header: "Geometric Ascension",
    description: "The final frontier: where mathematics meets madness.",
    quests: [
      {
        id: 'scraptagon_unlock',
        name: 'Mathematical Revelation',
        description: 'Unlock the Scraptagon. Geometry was never this dangerous.',
        requirements: { prestigeCount: 4 },
        rewards: { quantumFlux: 100 },
        completed: false,
        oneTime: true
      },
      {
        id: 'first_geometric_iteration',
        name: 'Shape Shifter',
        description: 'Complete your first Scraptagon iteration. Reality bends.',
        requirements: { scraptagonIterations: 1 },
        rewards: { 
          quantumFlux: 200,
          craftingInventory: { 'Geometric Core': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'quantum_flux_generation',
        name: 'Flux Capacitor',
        description: 'Generate 500 Quantum Flux. Harness the impossible.',
        requirements: { quantumFlux: 500 },
        rewards: { 
          quantumFlux: 300,
          craftingInventory: { 'Reality Anchor': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'geometric_mastery',
        name: 'Shape Master',
        description: 'Complete 5 Scraptagon iterations. You understand the angles now.',
        requirements: { scraptagonIterations: 5 },
        rewards: { 
          quantumFlux: 500,
          craftingInventory: { 'Polygon Processor': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'dimensional_understanding',
        name: 'Higher Dimensions',
        description: 'Unlock advanced geometric patterns. See beyond the third dimension.',
        requirements: { advancedPatterns: true },
        rewards: { 
          quantumFlux: 750,
          craftingInventory: { 'Dimensional Key': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'flux_accumulation',
        name: 'Quantum Collector',
        description: 'Accumulate 2,000 Quantum Flux. You\'re bending spacetime.',
        requirements: { quantumFlux: 2000 },
        rewards: { 
          quantumFlux: 1000,
          craftingInventory: { 'Flux Stabilizer': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'geometric_efficiency',
        name: 'Efficiency Theorist',
        description: 'Optimize Scraptagon patterns for maximum yield.',
        requirements: { optimizedPatterns: 3 },
        rewards: { 
          quantumFlux: 1250,
          craftingInventory: { 'Optimization Matrix': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'iteration_mastery',
        name: 'Geometric Virtuoso',
        description: 'Complete 25 Scraptagon iterations. You are one with the shapes.',
        requirements: { scraptagonIterations: 25 },
        rewards: { 
          quantumFlux: 1500,
          craftingInventory: { 'Iteration Engine': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'quantum_mastery',
        name: 'Flux Master',
        description: 'Generate 10,000 Quantum Flux. Reality is your playground.',
        requirements: { quantumFlux: 10000 },
        rewards: { 
          quantumFlux: 5000,
          craftingInventory: { 'Quantum Matrix': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'perfect_geometry',
        name: 'Platonic Ideal',
        description: 'Achieve perfect efficiency in all geometric patterns.',
        requirements: { perfectPatterns: true },
        rewards: { 
          quantumFlux: 7500,
          craftingInventory: { 'Perfect Form': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'dimensional_transcendence',
        name: 'Beyond Mathematics',
        description: 'Unlock patterns that shouldn\'t exist. Break mathematical laws.',
        requirements: { impossiblePatterns: true },
        rewards: { 
          quantumFlux: 10000,
          craftingInventory: { 'Impossibility Core': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'iteration_legend',
        name: 'Geometric Legend',
        description: 'Complete 100 Scraptagon iterations. You\'ve transcended geometry.',
        requirements: { scraptagonIterations: 100 },
        rewards: { 
          quantumFlux: 15000,
          craftingInventory: { 'Legend Matrix': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'final_crystal_prep',
        name: 'Ultimate Preparation',
        description: 'Prepare for the ultimate ascension. Gather the impossible.',
        requirements: { 
          quantumFlux: 50000,
          craftingInventory: { 
            'Impossibility Core': 1, 
            'Perfect Form': 1, 
            'Legend Matrix': 1 
          }
        },
        rewards: { 
          craftingInventory: { 'Ultimate Catalyst': 1 }
        },
        completed: false,
        oneTime: true
      },
      {
        id: 'ultimate_ascension_crystal',
        name: 'Ultimate Ascension',
        description: 'Craft the Ultimate Crystal. Transcend everything.',
        requirements: { 
          craftItem: 'Ultimate Crystal',
          craftingInventory: { 
            'Ultimate Catalyst': 1, 
            'Impossibility Core': 1, 
            'Perfect Form': 1 
          }
        },
        rewards: { 
          prestige: true,
          unlocks: ['endgame_content'] 
        },
        completed: false,
        oneTime: true
      }
    ]
  }
};

// Quest validation functions
const validateQuestRequirements = (quest, gameState) => {
  const requirements = quest.requirements;
  
  // Basic resource requirements
  if (requirements.junk && gameState.junk < requirements.junk) return false;
  if (requirements.tronics && gameState.tronics < requirements.tronics) return false;
  if (requirements.scratz && gameState.scratz < requirements.scratz) return false;
  if (requirements.electroShards && gameState.electroShards < requirements.electroShards) return false;
  if (requirements.quantumFlux && gameState.quantumFlux < requirements.quantumFlux) return false;
  
  // Prestige requirements
  if (requirements.prestigeCount && gameState.prestigeCount < requirements.prestigeCount) return false;
  
  // Item ownership requirements
  if (requirements.ownedItems) {
    for (const [item, count] of Object.entries(requirements.ownedItems)) {
      if (!gameState.ownedItems[item] || gameState.ownedItems[item] < count) return false;
    }
  }
  
  // Crafting inventory requirements
  if (requirements.craftingInventory) {
    for (const [item, count] of Object.entries(requirements.craftingInventory)) {
      if (!gameState.craftingInventory[item] || gameState.craftingInventory[item] < count) return false;
    }
  }
  
  // Skill requirements
  if (requirements.skillLevel && gameState.maxSkillLevel < requirements.skillLevel) return false;
  if (requirements.skillPointsSpent && gameState.skillPointsSpent < requirements.skillPointsSpent) return false;
  if (requirements.skillsInvested && gameState.skillsInvested < requirements.skillsInvested) return false;
  
  // Crew requirements
  if (requirements.crewMembers && gameState.crewMembers < requirements.crewMembers) return false;
  if (requirements.missionsCompleted && gameState.missionsCompleted < requirements.missionsCompleted) return false;
  
  // Special action requirements
  if (requirements.purchaseAnyUpgrade && !gameState.hasPurchasedUpgrade) return false;
  if (requirements.techUnlocked && gameState.techUnlocked < requirements.techUnlocked) return false;
  if (requirements.craftItem && !gameState.hasCraftedItem) return false;
  
  return true;
};

const getAvailableQuests = (gameState) => {
  const currentPrestige = gameState.prestigeCount || 0;
  const availableQuests = [];
  
  // Get quests for current prestige tier
  const prestigeKey = `prestige_${currentPrestige}`;
  if (questlines[prestigeKey]) {
    questlines[prestigeKey].quests.forEach(quest => {
      if (!quest.completed && validateQuestRequirements(quest, gameState)) {
        availableQuests.push({
          ...quest,
          category: questlines[prestigeKey].header
        });
      }
    });
  }
  
  return availableQuests;
};

const completeQuest = (questId, gameState) => {
  const currentPrestige = gameState.prestigeCount || 0;
  const prestigeKey = `prestige_${currentPrestige}`;
  
  if (questlines[prestigeKey]) {
    const quest = questlines[prestigeKey].quests.find(q => q.id === questId);
    if (quest && validateQuestRequirements(quest, gameState)) {
      quest.completed = true;
      
      // Store completion in localStorage
      localStorage.setItem(`quest_${questId}`, 'true');
      
      return quest.rewards;
    }
  }
  
  return null;
};

const getQuestProgress = (gameState) => {
  const currentPrestige = gameState.prestigeCount || 0;
  const prestigeKey = `prestige_${currentPrestige}`;
  
  if (questlines[prestigeKey]) {
    const quests = questlines[prestigeKey].quests;
    const completedCount = quests.filter(q => q.completed).length;
    const totalCount = quests.length;
    
    return {
      completed: completedCount,
      total: totalCount,
      percentage: (completedCount / totalCount) * 100,
      header: questlines[prestigeKey].header
    };
  }
  
  return { completed: 0, total: 0, percentage: 0, header: 'Unknown' };
};

// Initialize quest completion status from localStorage
const initializeQuestStatus = () => {
  Object.values(questlines).forEach(category => {
    category.quests.forEach(quest => {
      if (localStorage.getItem(`quest_${quest.id}`) === 'true') {
        quest.completed = true;
      }
    });
  });
};

// Call initialization on load
initializeQuestStatus();

export {
  questlines,
  validateQuestRequirements,
  getAvailableQuests,
  completeQuest,
  getQuestProgress,
  initializeQuestStatus
};
