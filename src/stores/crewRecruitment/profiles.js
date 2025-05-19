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
  }
]

export function generateRandomProfile() {
  const all = [...realProfiles, ...fakeProfiles]
  const index = Math.floor(Math.random() * all.length)
  return all[index]
  }

function generateRandomWorkPermitDate() {
  const now = new Date()
  const offsetDays = Math.floor(Math.random() * 3650) - 1825 // ±5 Jahre
  const futureDate = new Date(now.getTime() + offsetDays * 86400000)
  return futureDate.toISOString().split('T')[0] // z. B. "2080-05-22"
}