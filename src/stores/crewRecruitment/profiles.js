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