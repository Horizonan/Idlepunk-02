export default function Store({ credits, itemCosts, onBuyTrashBag, onBuyPicker, onBuyStreetrat, onBuyCart, onBuyJunkMagnet, onBuyUrbanRecycler, onBuyClickEnhancer, clickCount, purchasedUpgrades, onBack }) {
  const showClickEnhancer = purchasedUpgrades >= 3 || clickCount >= 1000;
  const items = [
    { 
      name: 'Scrap Bag', 
      cost: itemCosts.trashBag, 
      description: '+1 Junk/Click, +10% Cost per purchase', 
      info: 'A sturdy bag that helps you collect more junk with each click',
      action: onBuyTrashBag,
      purchasedCount: 0 // Add purchased count
    },
    { 
      name: 'Trash Picker', 
      cost: itemCosts.trashPicker, 
      description: '+3 Junk/Click, +10% Cost', 
      info: 'Professional tool that triples your junk collection efficiency',
      action: onBuyPicker,
      purchasedCount: 0 // Add purchased count
    },
    { 
      name: 'Streetrat', 
      cost: itemCosts.streetrat, 
      description: '+1 Junk/sec, +15% Cost', 
      info: 'Hire a local to automatically collect junk for you',
      action: onBuyStreetrat,
      purchasedCount: 0 // Add purchased count
    },
    { 
      name: 'Shopping Cart', 
      cost: itemCosts.cart, 
      description: '+5 Junk/sec, +15% Cost', 
      info: 'Large capacity cart that greatly increases automatic collection',
      action: onBuyCart,
      purchasedCount: 0 // Add purchased count
    },
    { 
      name: 'Junk Magnet', 
      cost: itemCosts.junkMagnet, 
      description: '+10 Junk/sec, +15% Cost', 
      info: 'A powerful magnet that attracts junk from all directions',
      action: onBuyJunkMagnet,
      purchasedCount: 0 // Add purchased count
    },
    ...(showClickEnhancer ? [{
      name: 'Click Enhancer I',
      cost: itemCosts.clickEnhancer,
      description: '+10 Junk/Click, +10% Cost',
      info: 'Enhances your clicking power significantly',
      action: onBuyClickEnhancer,
      purchasedCount: 0 // Add purchased count
    }] : []),
    { 
      name: 'Urban Recycler', 
      cost: itemCosts.urbanRecycler, 
      description: '+20 Junk/sec, +15% Cost', 
      info: 'Advanced automated system that scans and collects valuable junk',
      action: onBuyUrbanRecycler,
      purchasedCount: 0 // Add purchased count
    }
  ];

  return (
    <div className="store-container">
      <h2>Junk Store</h2>
      <div className="store-items">
        {items.map((item) => (
          <button
            key={item.name}
            onClick={item.action}
            disabled={credits < item.cost}
            className="store-item"
          >
            Buy {item.name} ({item.cost} Junk)
            <div className="item-info">
              <strong>{item.name}</strong>
              <p>{item.description}</p>
              <p>{item.info}</p>
              <p className="owned">Owned: {item.purchasedCount}</p> {/* Display purchased count */}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}