import React from "react";

const Color = (props) => {
  const { colorData, setColor } = props;

  return (
    <>
      <ul className="colors ps-0">
        {colorData &&
          colorData?.map((item, index) => {
            return (
              <li style={{ backgroundColor: item?.title, cursor: "pointer" }} key={index} onClick={() => setColor(item?._id)}>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Color;
