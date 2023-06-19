import { Helmet } from "react-helmet";
import React from "react";

const Meta = (props) => {
  return (
    <Helmet
      style={[
        {
          color: `white`,
          cssText: `
          body {
              color:rgb(191, 189, 189);
          }
      `,
        },
      ]}
    >
      <meta charSet="utf-8"  />
      <title className="meta-title">{props.title}</title>
    </Helmet>
  );
};

export default Meta;
