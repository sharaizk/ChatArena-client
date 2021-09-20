import React, { useEffect, useState } from "react";
import { countries } from "country-flags-svg";
import { Avatar, Typography } from "antd";
const CountryFlags = ({ country,setBg }) => {
  const [flag, setFlag] = useState(null);
  useEffect(() => {
    setFlag(countries.find((o) => o.name === country).flag);
  }, [country]);

  return (
    <div className="d-flex justify-content-start align-items-center">
      <Avatar size={15} src={flag} shape="square"/>
      <Typography className="ms-2 default-about">{country}</Typography>
    </div>
  );
};

export default CountryFlags;
