const Chat = ({ chat: c, setShowChat }) => {
  // const colorWUser = isUserWriting ? "isWriting" : "";

  // const displayedMsg = isUserWriting
  //   ? `${writingUser.user} sta scrivendo ...`
  //   : isUserNotWriting && c.lastMsg.length > 20
  //   ? `${c.lastMsg?.split(" ")?.slice(0, 7)?.join(" ")} ...`
  //   : c.lastMsg;

  const lastMsg = c.messages.at(-1) || [];
  const displayesMsg = c.messages.length
    ? lastMsg.content.length > 20
      ? `${lastMsg.content.split(" ").slice(0, 5).join(" ")}...`
      : lastMsg.content
    : "Scrivimi un messaggio!";

  // Last msg timestamp

  const date = new Date(lastMsg?.createdAt || c.createdAt);

  let hours = date?.getHours();
  let minutes = date?.getMinutes();

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;

  const fmtdDate =
    date instanceof Date && !isNaN(date)
      ? `${hours}:${minutes}`
      : c.lastMsgDate;

  return (
    <>
      <article
        className="chat"
        onClick={() => setShowChat({ chatId: c._id, show: true })}
      >
        <div className="left">
          <img src={c.chatImage} alt={`${c.chatName}-img`} />
          <div className="content">
            <h3 className="chat-name">{c.chatName}</h3>
            <p className="last-message">{displayesMsg}</p>
          </div>
        </div>
        <p className="last-msg-timestamp">{fmtdDate}</p>
      </article>
      <hr />
    </>
  );
};

export default Chat;
