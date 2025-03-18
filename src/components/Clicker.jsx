export default function Clickers({ collectJunk, collectTronics, electronicsUnlock }) {
  return (
    <div className="main" id="clickers">
      {electronicsUnlock && (
        <img src="/Folders/MainIcons/electricIcon.png" alt="Electro Clicker" onClick={collectTronics} className="tronics" />
      )}
      <img src="/src/Icons/TrashButtonBig.png" alt="Trash Clicker" id="trashClicker" onClick={collectJunk} />
    </div>
  );
}

