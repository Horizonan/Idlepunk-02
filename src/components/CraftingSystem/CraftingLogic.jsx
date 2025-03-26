
import React, { useState } from 'react';

const formatJunkCost = (cost, hasBooster) => {
  if (hasBooster) {
    cost = Math.floor(cost * 0.9);
  }
  if (cost >= 1000000) {
    return (cost / 1000000).toFixed(1) + 'M';
  } else if (cost >= 1000) {
    return (cost / 1000).toFixed(0) + 'K';
  }
  return cost;
};

const basicMaterials = [
  {
    name: 'Wires',
    cost: 25000,
    description: 'Basic conductive material',
    type: 'basic'
  },
  {
    name: 'Metal Plates',
    cost: 50000,
    description: 'Sturdy metal sheets',
    type: 'basic'
  },
  {
    name: 'Gear Bits',
    cost: 30000,
    description: 'Mechanical components',
    type: 'basic'
  },
  {
    name: 'Capacitor',
    description: 'Energy storage device',
    type: 'basic',
    uncraftable: true
  }
];

const craftableItems = [
  {
    name: 'Scrap Core',
    requirements: {
      'Metal Plates': 3,
      'Wires': 2
    },
    cost: 250000,
    description: 'A basic power core made from scrap',
    type: 'crafted'
  },
  {
    name: 'Click Rig Mk I',
    requirements: {
      'Wires': 4,
      'Gear Bits': 2
    },
    cost: 250000,
    description: 'Increases click power by 25%',
    type: 'crafted',
    onetime: true
  },
  {
    name: 'Auto Toolkit',
    requirements: {
      'Metal Plates': 3,
      'Gear Bits': 2
    },
    cost: 300000,
    description: 'Increases Auto Click efficiency by 25%',
    type: 'crafted',
    onetime: true
  },
  {
    name: 'Compression Pack',
    requirements: {
      'Scrap Core': 2,
      'Wires': 3
    },
    cost: 350000,
    description: 'Increases Junk/sec by 25%',
    type: 'crafted',
    onetime: true
  },
  {
    name: 'Reinforced Backpack',
    requirements: {
      'Metal Plates': 3,
      'Scrap Core': 2,
      'Gear Bits': 2
    },
    cost: 400000,
    description: 'Reduces cost scaling by 1% permanently',
    type: 'crafted',
    onetime: true
  },
  {
    name: 'Surge Capacitor Module',
    requirements: {
      'Capacitor': 2,
      'Scrap Core': 1,
      'Metal Plates': 2
    },
    cost: 500000,
    description: 'Increases Trash Surge duration from 5s → 10s',
    type: 'crafted',
    onetime: true
  }
];

export { formatJunkCost, basicMaterials, craftableItems };
