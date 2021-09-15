import React from "react";

export default function EventDateTime(props) {
  const month = props.date.toLocaleDateString("en-GB", { month: "short" });
  const day = props.date.toLocaleDateString("en-GB", { day: "2-digit" });
  const weekday = props.date.toLocaleDateString("en-GB", { weekday: "short" });
  const time = props.date
    .toLocaleTimeString("en-GB", {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    })
    .replace(" ", "");
  return (
    <>
      {!props.shortDate && weekday} {day} {month} - {time}
    </>
  );
}
