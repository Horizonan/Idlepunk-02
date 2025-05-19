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