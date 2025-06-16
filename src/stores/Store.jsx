import React, { useState, useEffect } from "react";
import "../styles/Store.css";

export default function Store({
  credits, itemCosts, ownedItems, craftingInventory, onBuyTrashBag,
  onBuyPicker, onBuyStreetrat,onBuyCart, onBuyJunkMagnet,
  onBuyUrbanRecycler, onBuyScrapDrone, onBuyHoloBillboard, onBuyJunkRefinery,
  onBuyShardMiner, globalJpsMultiplier, passiveIncome, onBuyClickEnhancer,
  onBuyClampjawRig, onBuyAutoClicker, onGetAutoClickersV1, canAffordV1, canAffordV2,
  onGetAutoClickersV2, onBuyAutoClickerV2, calculate10xPriceJunkClicker,
  onBack, bulkBuy, setBulkBuy, calculate10xPriceJPS, calculate10xPriceBillBoard,
  onBuyModularScrapper, onBuyScratzMiner, onBuyAutoRecycler,
}) {
  const [selectedTab, setSelectedTab] = useState("prePres");
  const [currentTab, setCurrentTab] = useState('Main');

  const [mobileInfoModal, setMobileInfoModal] = useState(null); // For mobile item info modals


  const clickItems = [
    {
      name: "Reinforced Scrap Bag",
      cost: bulkBuy ? calculate10xPriceJunkClicker(itemCosts.trashBag).totalCost :  itemCosts.trashBag,
      description: "+1 Junk/Click, +10% Cost per purchase",
      info: "A sturdy bag that helps you collect more junk with each click",
      action: onBuyTrashBag,
      purchasedCount: ownedItems.trashBag || 0,
    },
    {
      name: "Trash Picker",
      cost: bulkBuy ?calculate10xPriceJunkClicker(itemCosts.trashPicker).totalCost :  itemCosts.trashPicker,
      description: "+3 Junk/Click, +10% Cost",
      info: "Professional tool that triples your junk collection efficiency",
      action: onBuyPicker,
      purchasedCount: ownedItems.trashPicker || 0,
    },
    {
      name: "Click Enhancer",
      cost: bulkBuy ?calculate10xPriceJunkClicker(itemCosts.clickEnhancer).totalCost :  itemCosts.clickEnhancer,
      description: "+5 Junk/Click, +10% Cost",
      info: '"Built from a broken microwave and spite."',
      action: onBuyClickEnhancer,
      purchasedCount: ownedItems.clickEnhancer || 0,
    },
    {
      name: "Clampjaw Rig",
      cost: bulkBuy ? calculate10xPriceJunkClicker(itemCosts.clampjawRig).totalCost : itemCosts.clampjawRig,
      description: "+12 Junk/Click, +10% Cost",
      info: "Ripped from an old loader bot. Bolted to a scaffold. Controlled with a wire and hope.",
      action: onBuyClampjawRig,
      purchasedCount: ownedItems.clampjawRig || 0,
      hidden: !((ownedItems.trashPicker || 0) >= 5),
    },
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}mil`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}k`;
    }
    return num;
  };



  //Junk store
  const passiveItems = [
    {
      name: "Whistling Streetrat",
      cost: bulkBuy ? calculate10xPriceJPS(itemCosts.streetrat).totalCost : itemCosts.streetrat,
      description: `+${Math.floor(1 * globalJpsMultiplier)} Junk/sec, +15% Cost`,
      info: "Hire a local to automatically collect junk for you",
      action: onBuyStreetrat,
      purchasedCount: ownedItems.streetrat || 0,
    },
    {
      name: "Shopping Cart",
      cost: bulkBuy ? calculate10xPriceJPS(itemCosts.cart).totalCost  : itemCosts.cart,
      description: `+${Math.floor(5 * globalJpsMultiplier)} Junk/sec, +15% Cost`,
      info: "Large capacity cart that greatly increases automatic collection",
      action: onBuyCart,
      purchasedCount: ownedItems.cart || 0,
    },
    {
      name: "Junk Magnet",
      cost: bulkBuy ? calculate10xPriceJPS(itemCosts.junkMagnet).totalCost  : itemCosts.junkMagnet,
      description: `+${Math.floor(10 * globalJpsMultiplier)} Junk/sec, +15% Cost`,
      info: "Electromagnetic device that attracts valuable junk automatically",
      action: onBuyJunkMagnet,
      purchasedCount: ownedItems.junkMagnet || 0,
    },
    {
      name: "Urban Recycler",
      cost: bulkBuy ? calculate10xPriceJPS(itemCosts.urbanRecycler).totalCost  : itemCosts.urbanRecycler,
      description: `+${Math.floor(20 * globalJpsMultiplier)} Junk/sec, +15% Cost`,
      info: "Automated system that processes urban waste into valuable junk",
      action: onBuyUrbanRecycler,
      purchasedCount: ownedItems.urbanRecycler || 0,
    },
    {
      name: "Scrap Drone",
      cost: bulkBuy ? calculate10xPriceJPS(itemCosts.scrapDrone).totalCost  : itemCosts.scrapDrone,
      description: `+${Math.floor(25 * globalJpsMultiplier)} Junk/sec, +15% Cost`,
      info: "Autonomous drone that scans the area for valuable junk",
      action: onBuyScrapDrone,
      purchasedCount: ownedItems.scrapDrone || 0,
    },
    {
      name: "Holo Billboard",
      cost: bulkBuy ? calculate10xPriceBillBoard(itemCosts.holoBillboard).totalCost : itemCosts.holoBillboard,
      description: "+10% global Junk/sec boost",
      info: "A massive holographic display that attracts more scrappers to your territory",
      action: onBuyHoloBillboard,
      purchasedCount: ownedItems.holoBillboard || 0,
      hidden: !(
        passiveIncome >= 50 ||
        (ownedItems.scrapDrone && ownedItems.scrapDrone > 0)
      ),
    },
  ];


  //Premium Items
  const premiumItems = [
    {
      name: "Shard Miner",
      cost: { junk: 10000000, scrapCores: 5 },
      description:
        "Passively generates 1 Electro Shard every 30 minutes, up to a max of 3 stored.",
      info: "A glorified toaster tuned to the shard frequency. Hums when it works.",
      unlockCondition: () =>
        credits >= 10000000 && (craftingInventory?.["Scrap Core"] || 0) >= 5,
      purchasedCount: ownedItems.shardMiner || 0,
      action: onBuyShardMiner,
    },
    {
      name: "Scratz Miner",
      cost: { junk: itemCosts.scratzMiner },
      description:
        "Generates 1 Scrat per real-time hour while powered. Requires 1 Energy Cell per 4 hours to stay operational.",
      info: "The Scratz Miner hums to life… burning through Energy Cells like popcorn on a reactor core. It mines credits from thin air — or maybe just very old servers.",
      unlockCondition: () => credits >= itemCosts.scratzMiner,
      purchasedCount: ownedItems.scratzMiner || 0,
      action: onBuyScratzMiner, 
    },
    ];

  // Automation Menu
  const automationItems = [
    {
      name: "Auto Clicker Bot",
      cost: { junk: bulkBuy ? calculate10xPriceJPS(itemCosts.autoClicker).totalCost : itemCosts.autoClicker },
      description:
        "+1 Automatic Click per second (counts towards manual clicks)",
      info: "A simple bot that clicks for you. It's annoying, but it works.",
      disabled: !canAffordV1,
      unlockCondition: () => true,
      purchasedCount: onGetAutoClickersV1,
      action: onBuyAutoClicker,
    },
    {
      name: "Auto Clicker Bot V2",
      cost: { junk: bulkBuy ? calculate10xPriceBillBoard(itemCosts.autoClickerV2).totalCost : itemCosts.autoClickerV2 },
      description:
        "Auto Clicker Bot v2.0 – Upgraded to 2 clicks/sec.",
      info:  "Now 12% less annoying. (Consumes Auto Clicker V1)",
      disabled: !canAffordV2,
      unlockCondition: () => onGetAutoClickersV1 > 1,
      purchasedCount: onGetAutoClickersV2,
      action: onBuyAutoClickerV2,
    },
    {
      name: "Auto Recycler Unit",
      cost: { junk: itemCosts.autoRecycler },
      description: "Uses 10k junk a second to craft one scrap core every 30 seconds",
      info: "Finally puts your passive waste to good use.",
      unlockCondition: () => credits >= 5000000,
      purchasedCount: ownedItems.autoRecycler || 0,
      action: onBuyAutoRecycler,
    },
  ];



  //First Ascencion
  const firstAsc = [
    {
      name: "🔹 Junk Refinery",
      cost: { junk: bulkBuy ? calculate10xPriceBillBoard(itemCosts.junkRefinery).totalCost : itemCosts.junkRefinery},
      description: "+50 Junk/sec",
      info: "A high-tech facility that processes junk more efficiently.",
      unlockCondition: () =>
        credits >= bulkBuy ? calculate10xPriceBillBoard(itemCosts.junkRefinery) : itemCosts.junkRefinery,
      purchasedCount: ownedItems.junkRefinery,
      action: onBuyJunkRefinery,
    },
    {
      name: "🔹 Modular Scrapper",
      cost: { junk: itemCosts.modularScrapper},
      description: "Doubles current Junk/sec",
      info: "One-time purchase per prestige.",
      unlockCondition: () => (localStorage.getItem("modularScrapperPurchased") != "true" && credits >= itemCosts.modularScrapper),
      purchasedCount: ownedItems.modularScrapper,
      action: onBuyModularScrapper,
    },
  ];

  const tabs = [
    { id: "prePres", label: "Scrap Collectors" },
    { id: "premium", label: "Premium" },
    { id: "automation", label: "Automation" },
    {
      id: "firstAsc",
      label: "First Ascension",
      unlockCondition: () => localStorage.getItem("hasPrestiged") === "true",
    },
  ];

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const openMobileInfo = (item) => {
    setMobileInfoModal(item);
  };

  const closeMobileInfo = () => {
    setMobileInfoModal(null);
  };


  // Combined Items for rendering
  const renderItems = (items) => (
    <div className="store-items">
      {items.map((item) => (
        <button
          key={item.name}
          onClick={item.action}
          disabled={credits < (typeof item.cost === 'object' ? item.cost.junk : item.cost) || (item.unlockCondition && !item.unlockCondition())}
          className={`store-item ${item.disabled || (item.unlockCondition && !item.unlockCondition()) ? "disabled" : ""}`}
        >
          <div className="item-header">
            <strong>
              {item.name}
              <button 
                className="mobile-info-button"
                onClick={(e) => {
                  e.stopPropagation();
                  openMobileInfo(item);
                }}
              >
                ℹ️
              </button>
            </strong>
            <span className="cost">
              ({typeof item.cost === 'object' ? formatNumber(item.cost.junk) : formatNumber(item.cost)} Junk
              {item.cost && typeof item.cost === 'object' && item.cost.scrapCores
                ? ` + ${item.cost.scrapCores} Scrap Cores`
                : ""}
              )
            </span>
          </div>
          <div className="item-info">
            <p>{item.description}</p>
            <p>{item.info}</p>
            <p className="owned">Owned: {item.purchasedCount}</p>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="store-container">
      <div className="store-header">
        <h2>Junk Store</h2>
        <div className="store-controls">
          <button 
            onClick={() => setBulkBuy(!bulkBuy)} 
            className="bulk-buy-toggle"
          >
            {bulkBuy ? '10x' : '1x'}
          </button>
          <button onClick={onBack}>Close</button>
        </div>
      </div>
      <div className="crafting-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${selectedTab === tab.id ? "active" : ""} ${tab.unlockCondition && !tab.unlockCondition() ? "locked" : ""}`}
            onClick={() =>
              (!tab.unlockCondition || tab.unlockCondition()) &&
              setSelectedTab(tab.id)
            }
            disabled={tab.unlockCondition && !tab.unlockCondition()}
          >
            {tab.label} {tab.unlockCondition && !tab.unlockCondition() && "🔒"}
          </button>
        ))}
      </div>
      <div className="store-items">
        {selectedTab === "prePres" && (
          <>
            <div>
              <h3 style={{ color: "#9400D3", textAlign: "center" }}>
                Click Upgrades
              </h3>
              {renderItems(clickItems)}
            </div>
            <div>
              <h3 style={{ color: "#9400D3", textAlign: "center" }}>
                Passive Upgrades
              </h3>
              {renderItems(passiveItems)}
            </div>
          </>
        )}
        {selectedTab === "automation" && (
          <div>
            <h3 style={{ color: "#9400D3", textAlign: "center" }}>
              Automation Upgrades
            </h3>
            {renderItems(automationItems)}
          </div>
        )}
        {selectedTab === "premium" && (
          <div>
            <h3 style={{ color: "#9400D3", textAlign: "center" }}>
              Premium Items
            </h3>
            {renderItems(premiumItems)}
          </div>
        )}
        {selectedTab === "firstAsc" &&
          localStorage.getItem("hasPrestiged") === "true" && (
            <div>
              <h3 style={{ color: "#9400D3", textAlign: "center" }}>
                First Ascension
              </h3>
              <div className="store-items">
                {renderItems(firstAsc)}

              </div>
            </div>
          )}
      </div>

      {mobileInfoModal && (
        <div className="mobile-item-info-modal" onClick={closeMobileInfo}>
          <div className="mobile-item-info-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-item-info-header">
              <h3>{mobileInfoModal.name}</h3>
              <button className="mobile-info-close" onClick={closeMobileInfo}>
                ×
              </button>
            </div>
            <div className="mobile-item-info-body">
              <p><strong>Cost:</strong> {mobileInfoModal.name === 'Electro Surge Node' ? 
                `${mobileInfoModal.cost} Electro Shards` : 
                `${mobileInfoModal.cost} Junk`}</p>
              <p>{mobileInfoModal.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}