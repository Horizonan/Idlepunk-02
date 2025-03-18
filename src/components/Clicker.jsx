export default function Clickers({ collectJunk, collectTronics, electronicsUnlock }) {
  return (
    <div className="main" id="clickers">
      {electronicsUnlock && (
        <img src="/Folders/MainIcons/electricIcon.png" alt="Electro Clicker" onClick={collectTronics} className="tronics" />
      )}
      <img src="/Folders/MainIcons/TrashButtonBig.png" alt="Trash Clicker" id="trashClicker" onClick={collectJunk} />
    </div>
  );
}
export default function Clicker({ collectJunk, collectTronics, electronicsUnlock }) {
  return (
    <div className="main" id="clickers">
      {electronicsUnlock && (
        <img src="/Folders/MainIcons/electricIcon.png" alt="Electro Clicker" onClick={collectTronics} className="tronics" />
      )}
      <img src="/Folders/MainIcons/TrashButtonBig.png" alt="Trash Clicker" id="trashClicker" onClick={collectJunk} />
    </div>
  );
}
