import getKeys from "../data/keys";

function Piano({ octaveCount }: { octaveCount: number })
{
    const keys = getKeys(octaveCount);
  const whiteKeys = keys.filter((key) => !key.isBlack);
  const blackKeys = keys.filter((key) => key.isBlack);

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex" }}>
        {whiteKeys.map((key) => (
          <div
            key={key.position}
            style={{
              width: "48px",
              height: "180px",
              background: "white",
              border: "1px solid black",
            }}
          />
        ))}

        {blackKeys.map((key) => {
          const whiteKeysBefore = keys.filter(
            (k) => !k.isBlack && k.position < key.position,
          ).length;
          return (
            <div
              key={key.position}
              style={{
                position: "absolute",
                left: `${whiteKeysBefore * 48 - 16}px`,
                width: "32px",
                height: "110px",
                background: "black",
                zIndex: 1,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Piano;
