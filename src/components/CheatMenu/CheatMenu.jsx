import { useState, useRef, useEffect } from 'react';
import ResetProgress from '../ResetProgress/ResetProgress';
import { useEmailStore } from '../../utils/emailStore';
import { useRecruitmentZustand } from '../../stores/crewRecruitment/recruitmentZustand';
import './CheatMenu.css';

function setNextSurgeTimer() {
  const nextTime = Date.now() + 10000; // 10 seconds
  localStorage.setItem('nextSurgeTime', nextTime.toString());
}

function setNextTronicsSurgeTimer() {
  const nextTime = Date.now() + 10000; // 10 seconds
  localStorage.setItem('nextTronicsSurgeTime', nextTime.toString());
  window.dispatchEvent(new Event('triggerTronicsSurge'));
}

export default function CheatMenu({ 
  onReset, onAddJunk, onClose, onResetTutorial, onNextTutorial, 
  setShowTrashBonus, onAddTronics, onAddSetPrestige, onAddElectroShard, 
  onShowCrystal, onSetTronicsSurgeActive, onSetSurgeActive, setCraftingInventory, setCredits
}) {
  const [activeTab, setActiveTab] = useState('resources');
  const [position, setPosition] = useState(() => {
    const stored = localStorage.getItem('cheatMenuPosition');
    return stored ? JSON.parse(stored) : { x: 100, y: 100 };
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        localStorage.setItem('cheatMenuPosition', JSON.stringify(position));
      }
    };

    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [isDragging, position]);

  const handleMouseDown = (e) => {
    if (e.target.closest('.cheat-action-btn') || e.target.closest('.close-btn') || e.target.closest('.minimize-btn')) return;

    setIsDragging(true);
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX - offsetX,
        y: e.clientY - offsetY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', handleMouseMove);
    }, { once: true });
  };

  const onForcePrestige = () => {
    window.dispatchEvent(new CustomEvent('forcePrestige'));
  }

  const cheatTabs = {
    resources: {
      name: 'Resources',
      icon: '💎',
      actions: [
        { name: 'Add 1M Junk', action: () => onAddJunk(1000000), type: 'primary' },
        { name: 'Add 10M Junk', action: () => onAddJunk(10000000), type: 'primary' },
        { name: 'Add 100M Junk', action: () => onAddJunk(100000000), type: 'primary' },
        { name: 'Add 1K Tronics', action: () => onAddTronics(1000), type: 'primary' },
        { name: 'Add 10K Tronics', action: () => onAddTronics(10000), type: 'primary' },
        { name: 'Add 100K Tronics', action: () => onAddTronics(100000), type: 'primary' },
        { name: 'Add Glitched Core', action: () => setCraftingInventory(prev => ({
          ...prev,
          'Glitched Scrap Core': (prev['Glitched Scrap Core'] || 0) + 1
        })), type: 'primary' },
        { name: 'Add 10 Capacitors', action: () => setCraftingInventory(prev => ({
          ...prev,
          'Capacitor': (prev['Capacitor'] || 0) + 10
        })), type: 'primary' },
        { name: 'Add Basic Materials', action: () => {
          const materials = ['Wires', 'Metal Plates', 'Gear Bits'];
          materials.forEach(material => {
            window.dispatchEvent(new CustomEvent('addMaterial', { 
              detail: { material, amount: 10 }
            }));
          });
        }, type: 'primary' },
        { name: 'Add 10 Electro Shards', action: () => onAddElectroShard(10), type: 'primary' },
        { name: 'Add 1000 Scratz', action: () => setCredits(prev => prev + 1000), type: 'primary' },
      ]
    },
    progression: {
      name: 'Progression',
      icon: '⚡',
      actions: [
        { name: 'Set Prestige 1', action: () => onAddSetPrestige(1), type: 'warning' },
        { name: 'Set to 3 Surges', action: () => {
          localStorage.setItem('surgeCount', '3');
          localStorage.setItem('hadFirstSurge', 'true');
          window.dispatchEvent(new Event('updateSurgeCount'));
        }, type: 'secondary' },
        { name: 'Prestige Ready Kit', action: () => {
          localStorage.setItem('surgeCount', '3');
          localStorage.setItem('hadFirstSurge', 'true');
          window.dispatchEvent(new Event('updateSurgeCount'));
          onAddJunk(100000000);
          setCredits(prev => prev + 200);
          onAddElectroShard(10);
        }, type: 'special' },
        { name: 'Force Prestige', action: () => {
          // Trigger prestige popup without requirements
          onForcePrestige();
        }, type: 'warning' },
        { name: 'Max Scavenging Focus', action: () => {
          const skillLevels = {
            scavengingFocus: 10,
            greaseDiscipline: JSON.parse(localStorage.getItem('skillLevels'))?.greaseDiscipline || 0
          };
          localStorage.setItem('skillLevels', JSON.stringify(skillLevels));
          window.location.reload();
        }, type: 'secondary' },
        { name: 'Max Grease Discipline', action: () => {
          const skillLevels = {
            scavengingFocus: JSON.parse(localStorage.getItem('skillLevels'))?.scavengingFocus || 0,
            greaseDiscipline: 10
          };
          localStorage.setItem('skillLevels', JSON.stringify(skillLevels));
          window.location.reload();
        }, type: 'secondary' },
        { name: 'Set 5 Successful Missions', action: () => {
          // Update the crew storage to set successfulMissions to 5
          const crewStorage = JSON.parse(localStorage.getItem('crew-storage') || '{}');
          if (crewStorage.state) {
            crewStorage.state.successfulMissions = 5;
          } else {
            crewStorage.state = { successfulMissions: 5 };
          }
          localStorage.setItem('crew-storage', JSON.stringify(crewStorage));

          // Also update the zustand store directly
          useRecruitmentZustand.setState({ successfulMissions: 5 });

          window.dispatchEvent(new CustomEvent('questsUpdated'));
        }, type: 'secondary' },
      ]
    },
    events: {
      name: 'Events',
      icon: '🎯',
      actions: [
        { name: 'Trigger Surge', action: () => onSetSurgeActive(true), type: 'primary' },
        { name: 'Trigger Crystal', action: () => {
          window.dispatchEvent(new CustomEvent('showCrystal'));
        }, type: 'special' },
        { name: 'Trigger Tronics Surge', action: () => onSetTronicsSurgeActive(true), type: 'primary' },
        { name: 'Trigger Trash Bonus', action: () => setShowTrashBonus(true), type: 'primary' },
        { name: 'Next News Cycle', action: () => window.dispatchEvent(new CustomEvent('nextNews')), type: 'secondary' },
        { name: 'Launch Relay Cascade', action: () => window.dispatchEvent(new CustomEvent('launchRelayCascade')), type: 'special' },
        { name: 'Trigger Email', action: () => {
          const emailStore = useEmailStore.getState();
          const randomTemplate = emailStore.emailTemplates[Math.floor(Math.random() * emailStore.emailTemplates.length)];
          emailStore.addEmail(randomTemplate);
        }, type: 'secondary' },
        { name: 'Set Next Surge (10s)', action: setNextSurgeTimer, type: 'secondary' },
        { name: 'Set Next Tronics Surge (10s)', action: setNextTronicsSurgeTimer, type: 'secondary' },
      ]
    },
    tools: {
      name: 'Tools',
      icon: '🔧',
      actions: [
        { name: 'Skip Shard Timer', action: () => window.dispatchEvent(new CustomEvent('skipShardTimer')), type: 'primary' },
        { name: 'Reset Tutorial', action: onResetTutorial, type: 'secondary' },
        { name: 'Next Tutorial Step', action: onNextTutorial, type: 'secondary' },
        { name: 'Lock Tronics Boost', action: () => {
          localStorage.removeItem('unlocked_tronics_boost');
          window.location.reload();
        }, type: 'warning' },
      ]
    },
    reset: {
      name: 'Reset',
      icon: '🔄',
      actions: [
        { name: 'Reset Junk', action: () => onReset('junk'), type: 'warning' },
        { name: 'Reset Credits', action: () => onReset('credits'), type: 'warning' },
        { name: 'Reset Achievements', action: () => onReset('achievements'), type: 'warning' },
      ]
    }
  };

  if (isMinimized) {
    return (
      <div 
        ref={containerRef}
        className="cheat-menu-minimized"
        style={{ left: position.x, top: position.y }}
        onClick={() => setIsMinimized(false)}
      >
        <div className="minimized-icon">👑</div>
        <div className="minimized-text">Cheats</div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="cheat-menu-redesigned"
      style={{ left: position.x, top: position.y }}
    >
      <div className="cheat-header-redesigned" onMouseDown={handleMouseDown}>
        <div className="header-left">
          <span className="cheat-icon">👑</span>
          <span className="cheat-title">Admin Console</span>
        </div>
        <div className="header-controls">
          <button className="minimize-btn" onClick={() => setIsMinimized(true)}>−</button>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
      </div>

      <div className="cheat-tabs-redesigned">
        {Object.entries(cheatTabs).map(([key, tab]) => (
          <button
            key={key}
            className={`cheat-tab-redesigned ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-name">{tab.name}</span>
          </button>
        ))}
      </div>

      <div className="cheat-content-redesigned">
        <div className="content-header">
          <h3>{cheatTabs[activeTab].name}</h3>
          <div className="content-divider"></div>
        </div>

        <div className="cheat-actions-grid">
          {cheatTabs[activeTab].actions.map((action, index) => (
            <button
              key={index}
              className={`cheat-action-btn ${action.type}`}
              onClick={action.action}
            >
              {action.name}
            </button>
          ))}

          {activeTab === 'reset' && (
            <div className="reset-special">
              <ResetProgress onReset={() => onReset('all')} />
            </div>
          )}
        </div>
      </div>

      <div className="cheat-footer">
        <div className="status-indicator"></div>
        <span className="status-text">Console Active</span>
      </div>
    </div>
  );
}