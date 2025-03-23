export default function Inventory({ credits, junk, tronics, electronicsUnlock, onCheat }) {
  return (
    <div className="inventory">
      <p>Money: {credits.toFixed(2)}C</p>
      <p>Junk: {junk}</p>
      {electronicsUnlock && <p className="tronics">Tronics: {tronics.toFixed(3)}</p>}
      
    </div>
  );
}
