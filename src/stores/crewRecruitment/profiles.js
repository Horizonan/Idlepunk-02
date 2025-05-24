const realProfiles = [
  {
    id: 'r1',
    name: 'Street Rat',
    age: 28,
    skills: ['Reactor calibration', 'Drone repair', 'Vacuum survival'],
    background: 'Former system engineer on Mars Orbital 7',
    workPermit: generateRandomWorkPermitDate(),
    isReal: true,
  },
  {
    id: 'r2',
    name: 'Mira Flux',
    age: 34,
    skills: ['Electromagnetic shielding', 'Data salvaging', 'Lockpick hacking'],
    background: 'Ex-salvager from the Europa wreck fields',
    workPermit: generateRandomWorkPermitDate(),
    isReal: true,
  },
  {
    id: 'r3',
    name: 'Juno Kryz',
    age: 42,
    skills: ['Cryo logistics', 'Thermal duct routing', 'Negotiation'],
    background: 'Managed deep cold cargo lanes between Saturn stations',
    workPermit: generateRandomWorkPermitDate(),
    isReal: true,
  },
  {
    id: 'r4',
    name: 'Ash Veyron',
    age: 31,
    skills: ['Hydraulic repair', 'Low-atmo drone piloting', 'Welding'],
    background: 'Ran maintenance for the Rust Coast recycler gangs',
    workPermit: generateRandomWorkPermitDate(),
    isReal: true,
  },
  {
    id: 'r5',
    name: 'Delta Nyx',
    age: 26,
    skills: ['Power relay optimization', 'Neural port interfacing'],
    background: 'Freelance engineer for off-grid communes in the Vanta Zone',
    workPermit: generateRandomWorkPermitDate(),
    isReal: true,
  },
  {
    id: 'r6',
    name: 'Tycho Draan',
    age: 37,
    skills: ['Zero-G repair', 'Magnetic bootsmithing', 'Thermal core diagnostics'],
    background: 'Former maintenance chief aboard Orbital Rig 47X',
    workPermit: generateRandomWorkPermitDate(),
    isReal: true,
  },
  {
    id: 'r7',
    name: 'Kael Strom',
    age: 29,
    skills: ['Logistics routing', 'Cargo repackaging', 'Stress threshold analysis'],
    background: 'Dock foreman at the Venus Forwarder Nexus',
    workPermit: generateRandomWorkPermitDate(),
    isReal: true,
  },
  {
    id: 'r8',
    name: 'Nyra Sol',
    age: 33,
    skills: ['Terraforming protocol tuning', 'Botanical cloning'],
    background: 'Station-grown ecologist from the Ganymede Arc Gardens',
    workPermit: generateRandomWorkPermitDate(),
    isReal: true,
  },
  {
    id: 'r9',
    name: 'Lex Ford',
    age: 40,
    skills: ['Heavy machinery operation', 'Low-orbit rigging', 'Welding'],
    background: 'Salvage mech pilot from the Belt Mining Zone',
    workPermit: generateRandomWorkPermitDate(),
    isReal: true,
  },
  {
    id: 'r10',
    name: 'Arden Pike',
    age: 35,
    skills: ['Security system maintenance', 'Manual override bypass', 'Baton training'],
    background: 'Security contractor for several Martian blacksites',
    workPermit: generateRandomWorkPermitDate(),
    isReal: true,
  },
  {
    id: 'r11',
    name: 'Isla Dren',
    age: 27,
    skills: ['Signal tracing', 'Deep net comms', 'Encryption decoding'],
    background: 'Communication specialist from the Moon’s Echo Array',
    workPermit: generateRandomWorkPermitDate(),
    isReal: true,
  },
  {
    id: 'r12',
    name: 'Reef Maddox',
    age: 30,
    skills: ['Heat sink engineering', 'Cooling gel infusion', 'Fan blade crafting'],
    background: 'Heat tech for a subterranean Mars cooling facility',
    workPermit: generateRandomWorkPermitDate(),
    isReal: true,
  },
  {
    id: 'r13',
    name: 'Orin Vyce',
    age: 44,
    skills: ['Trade dispute mediation', 'Logistical accounting', 'Low-pressure suits'],
    background: 'Worked disputes and transport taxes in the Outer Rim',
    workPermit: generateRandomWorkPermitDate(),
    isReal: true,
  },
  {
    id: 'r14',
    name: 'Nessa Lark',
    age: 38,
    skills: ['Solar panel optimization', 'Drone calibration'],
    background: 'Solar grid supervisor in the orbital farms of Mercury’s dark side',
    workPermit: generateRandomWorkPermitDate(),
    isReal: true,
  },
  {
    id: 'r15',
    name: 'Varn Tekk',
    age: 32,
    skills: ['Radiation scrubber tuning', 'Hazmat drone piloting'],
    background: 'Hazardous waste handler in the Jovian Recycle Zone',
    workPermit: generateRandomWorkPermitDate(),
    isReal: true,
  },
]

const fakeProfiles = [
  {
    id: 'f1',
    name: 'Xx_ReaL_DeaL_xX',
    age: 0,
    skills: ['Everything', 'Time Travel', 'Infinite Hacking'],
    background: 'Champion of VoidBall Zero & interdimensional traveler',
    workPermit: generateRandomWorkPermitDate(),
    isReal: false,
    flags: ['Birth year missing', 'Overpowered skillset'],
  },
  {
    id: 'f2',
    name: '!!!NULL!!!',
    age: -999,
    skills: ['404', '??', 'Glitch propagation'],
    background: 'Background data corrupted',
    workPermit: generateRandomWorkPermitDate(),
    isReal: false,
    flags: ['Impossible age', 'Invalid characters in name', 'Missing origin'],
  },
  {
    id: 'f3',
    name: 'King Cabbage',
    age: 117,
    skills: ['Cabbage Cultivation', 'Royal Decrees', 'Worship Coordination'],
    background: 'Sovereign ruler of the Underroot Vegi-Kingdom',
    workPermit: generateRandomWorkPermitDate(),
    isReal: false,
    flags: ['Non-existent nation', 'Agricultural cult affiliations'],
  },
  {
    id: 'f4',
    name: 'Admin_Admin_Admin',
    age: 99,
    skills: ['Root Access', 'Firewall punching', 'Full System Override'],
    background: 'Totally legit employee of the system, promise',
    workPermit: generateRandomWorkPermitDate(),
    isReal: false,
    flags: ['Suspicious name', 'Impersonating admin', 'System override claim'],
  },
  {
    id: 'f5',
    name: 'Echo Echo Echo',
    age: null,
    skills: ['Echoing', 'More echoing', 'Unknown'],
    background: 'Last seen reflected in an audio chamber experiment',
    workPermit: generateRandomWorkPermitDate(),
    isReal: false,
    flags: ['Name repetition anomaly', 'Age missing', 'No employment record'],
  },
  {
    id: 'f6',
    name: 'Captain Smileyface ☺',
    age: 999,
    skills: ['Emotion override', 'Charm blast', 'Toxic positivity'],
    background: 'Graduated top of his class from Happiness Enforcement Academy',
    workPermit: generateRandomWorkPermitDate(),
    isReal: false,
    flags: ['Emojis in name', 'Unverifiable institution'],
  },
  {
    id: 'f7',
    name: 'Blobbo',
    age: 1,
    skills: ['Ooze relocation', 'Slime hacking', 'Surface squish'],
    background: 'Once lived in a vent. May still be living in a vent.',
    workPermit: generateRandomWorkPermitDate(),
    isReal: false,
    flags: ['Biological status unclear', 'No documented work history'],
  },
  {
    id: 'f8',
    name: '404_Person_Not_Found',
    age: '???',
    skills: ['Recursive denial', 'Ghost process', 'Identity cloaking'],
    background: 'Profile generated by error handler subroutine',
    workPermit: generateRandomWorkPermitDate(),
    isReal: false,
    flags: ['Glitched ID', 'No background data', 'System loop detected'],
  },
  {
    id: 'f9',
    name: 'Chairman Spoons',
    age: 73,
    skills: ['Cutlery combat', 'Tea diplomacy', 'Formality escalation'],
    background: 'Banned from twelve diplomatic missions for "excessive etiquette"',
    workPermit: generateRandomWorkPermitDate(),
    isReal: false,
    flags: ['Surreal skillset', 'Non-functional occupation'],
  },
  {
    id: 'f10',
    name: 'Unit 23_banana_split',
    age: NaN,
    skills: ['Disassembly of frozen desserts', 'Chilling presence', 'Anti-heat aura'],
    background: 'May have been an experimental freezer AI. Or a dessert.',
    workPermit: generateRandomWorkPermitDate(),
    isReal: false,
    flags: ['Non-numeric age', 'Questionable existence', 'Conflicts with refrigeration unit logs'],
  },
]

export function generateRandomProfile() {
  const all = [...realProfiles, ...fakeProfiles]
  const index = Math.floor(Math.random() * all.length)
  return all[index]
  }

function generateRandomWorkPermitDate() {

  const random = Math.random();
  
  const now = new Date()
  const futureForged = new Date(now.getFullYear(), 1, 30)

  if(random < 0.15) return {status: 'missing'}
  if(random < 0.30) return {
      status: 'forged',
      validUntil: futureForged,
  }
  
  const offsetDays = Math.floor(Math.random() * 3650) - 1000
  const validDate = new Date(Date.now() + offsetDays * 86400000)
  const isExpired = validDate < new Date()
  
  return {
    validUntil: validDate.toISOString().split('T')[0],
    status: isExpired ? 'expired' : 'ok'
  }
}