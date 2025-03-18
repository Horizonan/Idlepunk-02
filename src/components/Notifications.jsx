export default function Notifications({ notifications }) {
  return (
    <>
      {notifications.map((msg, i) => (
        <div key={i} className="notification">{msg}</div>
      ))}
    </>
  );
}
